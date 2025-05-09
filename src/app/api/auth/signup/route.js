import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'
import userModel from '@/models/users'
import connectToDatabase from '@/lib/mongodb'


export async function POST(request) {
    const {name, email, password, confirmPassword} = await request.json();

    const isValidEmail = (email) => {
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    if(!name || !email || !password || !confirmPassword) {
        return NextResponse.json({message: "All fields are required"}, {status: 400});
    }
    if(!isValidEmail(email)) {
        return NextResponse.json({message: "Invalid email address"}, {status: 400});
    }
    if(password !== confirmPassword) {
        return NextResponse.json({message: "Passwords do not match"}, {status: 400});
    }
    if(password.length < 6) {
        return NextResponse.json({message: "Password must be at least 6 characters"}, {status: 400});
    }
    try{
        await connectToDatabase();
        const existingUser = await userModel.findOne({ email });
        if(existingUser) {
            return NextResponse.json({message: "User already exists"}, {status: 400});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        return NextResponse.json({message: "User created successfully"}, {status: 201});

    }catch(err) {
        return NextResponse.json({message: "Internal server error"}, {status: 500});
    }
}