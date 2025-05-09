"use client"
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Loader } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'
import { signOut } from "next-auth/react"





const UserButton = () => {

    const router = useRouter();
    const {data: session, status} = useSession();

    if (status === "loading") {
        return (
            <Loader className='size-6 mr-4 mt-4 float-right animate-spin'/>
        )
    }

    const handleSignOut = async () => {
        await signOut({
            redirect: false
        });
        router.push('/')
        
    }





  return (
    <nav>
     <div suppressHydrationWarning={true}>
        {
            session ? (
                <>
                    <DropdownMenu modal={false}>  
                        <DropdownMenuTrigger className="outline-none relative float-right p-4 md:p-8">
                            <div className='flex gap-4 items-center'>
                                <span>{session.user?.name}</span>
                                <Avatar className="size-10 hover:opacity-75 transition">
                                    <AvatarImage src={session.user?.image || undefined} alt="User Avatar" className="size-10 hover:opacity-75 transition" />
                                    <AvatarFallback className="bg-sky-900 text-white ">
                                        { session?.user?.name?.charAt(0).toUpperCase() || "U" }
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="center" side="bottom">
                            <DropdownMenuItem className="cursor-pointer h-10" onClick={() => handleSignOut()}>Log Out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    

                    <div>

                    </div>
                </>


                ) : (

                    <>
                        <div className='flex justify-end p-4 gap-4'>
                            <Button className='text-black-200 bg-[#fff] border border-black-200 rounded-2xl' size="lg" variant="outline" asChild>
                                <Link href='sign-in'>Sign in</Link>
                            </Button>

                        </div>

                        <div>

                        </div>
                    </>
                )
        }
      </div>
    </nav>
  )
}

export default UserButton 