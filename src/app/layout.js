import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Auth",
  description: "auth with nextjs",
};



export default function RootLayout({ children }) {
  return (
    <html 
        suppressHydrationWarning="true"
        data-qb-installed="true">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastContainer/>
        {children}
      </body>
    </html>
  );
}
