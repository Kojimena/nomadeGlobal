"use client";
import FormLogin from "@/components/FormLogin/FormLogin"
import SocialMedia from "@/components/SocialMedia/SocialMedia"


export default function Home() {


  return (
    <div className="flex overflow-hidden h-[100vh] w-full flex-col items-center justify-start lg:justify-center bg-darkBlue lg:bg-transparent imageBackground">
        <FormLogin/>
          <SocialMedia />
    </div>
  )
}