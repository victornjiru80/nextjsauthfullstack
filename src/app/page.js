"use client";

import UserButton from "@/components/userButton";
import { SessionProvider } from "next-auth/react";   // wrap the app with SessionProvider
import Slider from "@/components/slider";


export default function Home() {
  return (
    <div >
      <SessionProvider>
        <UserButton/>
        <Slider/>
      </SessionProvider>
      

    </div>
  );
}
