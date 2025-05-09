"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardDescription, CardContent, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import  { signIn } from 'next-auth/react'


//react icons

import Link from 'next/link'
import { set } from 'mongoose'
import { TriangleAlert } from 'lucide-react'



const SignUp = () => {

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })  

    const [pending, setPending] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();    


    const handleSubmit = async (e) => {
        e.preventDefault();
        setPending(true);
        // Performing sign up logic here
        //  can use the form state to send a request to your backend API for sign up
        // After the request is complete, reset the form or show a success message
        console.log(form);

        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(form)
        })

        const data = await res.json();

        if(res.ok){
            setPending(false);
            toast.success(data.message);
            router.push('/sign-in')  // redirect to sign in page after successful signup
        } else if (res.status === 400) {
            setError(data.message);
            setPending(false);      // set pending to false to enable the button again
            toast.error(data.message);
        } else if (res.status === 500) {
            setError(data.message);
            setPending(false);
            toast.error(data.message);
        }
    }





  return (
    <div className='h-full flex items-center justify-center bg-[#808080]'>
        <Card className="md:h-auto w-[80%] sm:w-[420px] p-4 sm:p-8 bg-white">
            <CardHeader>
                <CardTitle className="text-center">
                    Sign Up
                </CardTitle>
                <CardDescription className="text-sm text-center text-accent-foreground">
                    Use your email to create an account
                </CardDescription>
            </CardHeader>

            {error && (
                <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6'>
                    <TriangleAlert />
                    <p>{error}</p>
                </div>
            )}

            <CardContent className="px-2 sm:px-6">

                <form action="" onSubmit={handleSubmit} className='space-y-3'>
                    <Input 
                            type="text"
                            disabled={pending}
                            placeholder = "Full name"
                            value={form.name}
                            onChange ={(e)=> setForm({...form, name: e.target.value})}
                            required
                     />
                     <Input 
                            type="email"
                            disabled={pending}
                            placeholder = "Email"
                            value={form.email}
                            onChange ={(e)=>{setForm({...form, email: e.target.value})}}
                            required
                     />
                     <Input 
                            type="password"
                            disabled={pending}
                            placeholder = "Password"
                            value={form.password}
                            onChange ={(e)=>{setForm({...form, password: e.target.value})}}
                            required
                     />
                     <Input 
                            type="password"
                            disabled={pending}
                            placeholder = "Confirm password"
                            value={form.confirmPassword}
                            onChange ={(e)=>{setForm({...form, confirmPassword: e.target.value})}}
                            required
                     />
                     <Button className='w-full text-white bg-black' size="lg" disabled= {pending}> Continue</Button>
                </form>

                <Separator/>

                <p className='text-center text-sm mt-2 text-muted-foreground'>
                    Already have an account? 
                    <Link href="sign-in" className='text-sky-700 ml-4 hover:underline cursor-pointer'>Sign in</Link>
                </p>

            </CardContent>
        </Card>
    </div>
  )
}


export default SignUp