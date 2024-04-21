"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"


const Verification = ({params}) => {
    const router = useRouter()
    const [showInfo , setShowInfo] = useState(false)
    const [error, setError] = useState('')

    const handleVerify = async () => {
        const response = await fetch(`https://ngt-markalbrand56.koyeb.app/user/verify/email/${params.idUser}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        console.log(data)

        if (response.ok) {
            setShowInfo(true)
        }
        else {
            setError("Ha ocurrido un error, por favor contactanos.")
        }
    }

    useEffect(() => {
        handleVerify()
    }
    , [])


  return (
    <div className="flex h-[calc(100dvh)] w-full flex-col items-center justify-center bg-darkBlue gap-4 lg:p-20 p-10">
    <div id="stars"></div>
    <div id="stars2"></div>
    <div id="stars3"></div>
    {showInfo ? 
    <div className="flex flex-col items-center justify-center gap-2">
        <img src="/images/verification.png" alt="logo" className="w-40 mx-auto"/>
    <h1 className="text-4xl font-bold font-montserrat text-white lg:w-1/2 text-center">Tu cuenta ha sido verificada correctamente!</h1>
    <div className="flex lg:flex-row flex-col items-center justify-center gap-10 ">
        <button onClick={() => router.push('/login')} className="buttonForm">
            <p className="font-montserrat">Iniciar sesión</p>
        </button>
    </div> 
    </div>
    : null}
    {error ? <h1 className="text-4xl font-bold font-montserrat text-red-500 lg:w-1/2 text-center">{error}</h1> : null}
    </div>
  )
}

export default Verification