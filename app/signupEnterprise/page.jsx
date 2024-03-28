"use client"
import { useEffect, useState } from "react"
import FormSignUpEnterprise from '@/components/FormSignUpEnterprise/FormSignUp'


const SignUpEnterprise = () => {
  const [viewportHeight, setViewportHeight] = useState("100vh")

  useEffect(() => {
    const adjustHeight = () => {
      setViewportHeight(`${window.innerHeight}px`)
    }

    window.addEventListener("resize", adjustHeight)
    adjustHeight()

    return () => window.removeEventListener("resize", adjustHeight)
  }, [])
  return (
    <div className='flex h-[100vh] w-full flex-col items-center justify-center  overflow-hidden' style={{ height: viewportHeight }}>
        <FormSignUpEnterprise />
    </div>
  )
}

export default SignUpEnterprise