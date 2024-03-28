import React from "react"
import FormLogin from "@/components/FormLogin/FormLogin"

export default function Home() {

  return (
    <div
      className="flex h-[calc(100dvh)] w-full flex-col items-center justify-start lg:justify-center bg-darkBlue lg:bg-transparent imageBackground overflow-hidden">
      <FormLogin />
    </div>
  )
}
