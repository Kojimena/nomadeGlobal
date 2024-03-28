"use client"
import { useEffect, useState } from "react"
import FormSignUp from '@/components/FormSignUp/FormSignUp'


const SignUpWorker = () => {
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
    <div className="flex h-[100vh] w-full flex-col items-center justify-center overflow-hidden" style={{ height: viewportHeight }}>
        <FormSignUp />
    </div>
  )
}

export default SignUpWorker