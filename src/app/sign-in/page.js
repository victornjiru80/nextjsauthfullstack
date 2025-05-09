"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardDescription, CardContent, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { TriangleAlert } from 'lucide-react'
//react icons

import Link from 'next/link'







const SignIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pending, setPending] = useState(false);
    const router = useRouter();
    const [error, setError] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();     // prevent default form submission
        setPending(true);     
   
        const res = await signIn('credentials', {
            redirect: false,    // prevent redirecting to the sign in page
            email,
            password
        })

        if(res?.ok){
            router.push('/');    // redirect to home page after successful login    
            toast.success("login successful")
        } else if (res?.status === 401) {   // if status is 401, it means invalid credentials
            setError("Invalid email or password")
            toast.error("Invalid email or password")
            setPending(false);
        } else {
            setError("Something went wrong")
            toast.error("Something went wrong")
            setPending(false);
        }

    }


  return (
    <div className='h-full flex items-center justify-center bg-[#808080]'>
        <Card className="md:h-auto w-[80%] sm:w-[420px] p-4 sm:p-8 bg-white">
            <CardHeader>
                <CardTitle className="text-center">
                    Log In
                </CardTitle>
                <CardDescription className="text-sm text-center text-accent-foreground">
                    Use your email to sign in
                </CardDescription>
            </CardHeader>

             {error && (
                            <div className='bg-destructive p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6'>
                                <TriangleAlert />
                                <p>{error}</p>
                            </div>
                        )}
            <CardContent className="px-2 sm:px-6">

                <form onSubmit={handleSubmit} className='space-y-3'>
                   
                     <Input 
                            type="email"
                            disabled={pending}
                            placeholder = "email"
                            value={email}
                            onChange ={(e)=> setEmail(e.target.value)}    //
                            required
                     />
                     <Input 
                            type="password"
                            disabled={pending}
                            placeholder = "password"
                            value={password}
                            onChange ={(e)=> setPassword(e.target.value)}
                            required
                     />
                    
                     <Button className='w-full text-white bg-black' size="lg" disabled={pending}>Continue</Button>
                </form>

                <Separator/>

                <p className='text-center text-sm mt-2 text-muted-foreground'>
                    Dont have an account? 
                    <Link href="sign-up" className='text-sky-700 ml-4 hover:underline cursor-pointer'>Create new account</Link>
                </p>

            </CardContent>
        </Card>
    </div>
  )
}

export default SignIn