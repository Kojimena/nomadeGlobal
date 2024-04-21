"use client"
import React from 'react'
import { useState } from 'react'
import { useRouter } from "next/navigation"
import PopUp from '@/components/PopUp/PopUp'
import Notification from '@/components/Notification/Notification'
import { FaRegEye } from "react-icons/fa"
import { FaRegEyeSlash } from "react-icons/fa"

const ResetPassword = ({params}) => {

    const router = useRouter();
    const [passwordInput, setPasswordInput] = useState('')
    const [verifyPasswordInput, setVerifyPasswordInput] = useState('')
    const [error, setError] = useState('')
    const [showPopUp, setShowPopUp] = useState(false)
    const [showNotification, setShowNotification] = useState(false)
    const [inputType, setInputType] = useState('password')

    const handlePasswordChange = (e) => {
        setPasswordInput(e.target.value)
    }

    const handleVerifyPasswordChange = (e) => {
        setVerifyPasswordInput(e.target.value)
    }

    const handleShowPassword = () => {
        if (inputType === 'password') {
            setInputType('text')
        } else {
            setInputType('password')
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        if (!passwordInput || !verifyPasswordInput) {
            setShowPopUp(true)
            setError("Por favor complete todos los campos.")
            return
        }
        if (passwordInput !== verifyPasswordInput) {
            setShowPopUp(true)
            setError("Las contraseñas no coinciden")
            return
        }
        const data = {
            "password": passwordInput,
            "token": params.idToken
        }

        const response = await fetch('https://ngt-markalbrand56.koyeb.app/user/password/reset', {
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
            setError("Error al resetear la contraseña")
        }
    }


  return (
    <form className='lg:p-20 p-10 w-full bg-darkBlue h-screen imageBackground'>
        {showNotification && <Notification message="Contraseña cambiada exitosamente" onCancel={() => setShowNotification(false)} counterTime={true} timerAction={5} />}
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
        {showPopUp && ( <PopUp error={error} /> )}

        <div className="w-full">
            <div className='flex justify-between items-center flex-col'>
                <img src="/images/logo_nomade.png" alt="logo" className="w-40 h-40 lg:hidden"/>
                <h2 className="text-4xl font-Ourland text-yellow py-10 text-center">Recuperar Acceso</h2>
            </div>
            <div className="flex flex-col">
                <div className="flex flex-col">
                    <div className="sm:col-span-3">
                        <label className="labelForm">
                        Ingresa tu nueva contraseña
                        </label>
                        <div className="mt-2 relative z-0">
                        <input
                            type={inputType}
                            autoComplete="password"
                            className="inputForm"
                            onChange={handlePasswordChange}
                        />
                        <button type="button" className="absolute right-0 top-0 mt-2 mr-2" onClick={handleShowPassword}>
                            {inputType === 'password' ? <FaRegEyeSlash /> : <FaRegEye />}
                        </button>
                        </div>
                    </div>
                    <div className="col-span-full">
                        <label className="labelForm">
                        Confirma tu nueva contraseña
                        </label>
                        <div className="mt-2 relative">
                        <input
                            type={inputType}
                            autoComplete="password"
                            className="inputForm"
                            onChange={handleVerifyPasswordChange}
                        />
                        <button type="button" className="absolute right-0 top-0 mt-2 mr-2" onClick={handleShowPassword}>
                            {inputType === 'password' ? <FaRegEyeSlash /> : <FaRegEye />}
                        </button>
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

export default ResetPassword