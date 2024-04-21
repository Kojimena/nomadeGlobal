"use client"
import React from 'react'
import { useState } from 'react'
import { useRouter } from "next/navigation"
import PopUp from '@/components/PopUp/PopUp'
import Notification from '@/components/Notification/Notification'


const ForgotPassword = () => {
    const router = useRouter();
    const [emailInput, setEmailInput] = useState('')
    const [error, setError] = useState('')
    const [showPopUp, setShowPopUp] = useState(false)
    const [showNotification, setShowNotification] = useState(false)

    const handleEmailChange = (e) => {
        setEmailInput(e.target.value)
    }

    const handleUsernameChange = (e) => {
        setUsernameInput(e.target.value)
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const data = {
            "email": emailInput
        }
        if (!emailInput) {
            setShowPopUp(true)
            setError("Por favor complete todos los campos.")
            return
        }
        const response = await fetch('https://ngt-markalbrand56.koyeb.app/user/password/forgot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if (response.ok) {
            setShowNotification(true)
            setTimeout(() => {
                router.push('/')
            }, 5000)
        } else {
            setShowPopUp(true)
            setError("Error al enviar el correo")
        }
    }



  return (
    <form className='lg:p-20 p-10 w-full bg-darkBlue h-screen imageBackground'>
        {showNotification && <Notification message="Revisa tu correo electrónico" onCancel={() => setShowNotification(false)} counterTime={true} timerAction={5} />}
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
        {showPopUp && ( <PopUp error={error} /> )}

        <div className="w-full">
            <div className='flex justify-between items-center flex-col py-10 gap-4'>
                <img src="/images/logo_nomade.png" alt="logo" className="w-40 h-40 lg:hidden"/>
                <h2 className="text-4xl font-Ourland text-yellow text-center">Recuperar Acceso</h2>
                <span className="text-white text-center font-montserrat">Te enviaremos un correo electrónico con las instrucciones para recuperar tu contraseña. </span>
            </div>
            <div className="flex flex-col">
                <div className="flex flex-col">
                    <div className="sm:col-span-3">
                        <label className="labelForm">
                        Correo electrónico asociado
                        </label>
                        <div className="mt-2">
                        <input
                            type="text"
                            autoComplete="given-name"
                            className="inputForm"
                            onChange={handleEmailChange} />
                        </div>
                    </div>
                <div className="col-span-full py-4 flex justify-end">
                    <button className="buttonForm" onClick={handleFormSubmit}>Recuperar contraseña</button>
                </div>
                </div>
            </div>
        </div>
    </form>

  )
}

export default ForgotPassword