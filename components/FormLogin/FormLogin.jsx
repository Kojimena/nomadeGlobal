"use client";
import { useState, useEffect } from 'react'
import { useRouter } from "next/navigation"
import PopUp from '../PopUp/PopUp'
import SocialMedia from '../SocialMedia/SocialMedia';

const FormLogin = () => {
  const router = useRouter();
  const [passwordInput, setPasswordInput] = useState('')
  const [usernameInput, setUsernameInput] = useState('')
  const [error, setError] = useState('')
  const [showPopUp, setShowPopUp] = useState(false)


  const handlePassword = (e) => {
    setPasswordInput(e.target.value)
  }

  const handleUsername = (e) => {
    setUsernameInput(e.target.value)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const data = {
      "password": passwordInput,
      "username": usernameInput
    }
    
    if (!passwordInput || !usernameInput) {
      setShowPopUp(true)
      setError("Por favor complete todos los campos.")
      return
    }

      const response = await fetch('https://ngt-markalbrand56.koyeb.app/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('userId', data.token)
        console.log(data)
        if (data.role === "lawyer") {
          router.push('/admin')
        } else {
          router.push('/uploader')
        }
      }else {
        console.log(response.message)
        setShowPopUp(true)
        setError("No se pudo iniciar sesión. Intente nuevamente.")
      }
  }
    
  return (
    <form className='p-20 w-full bg-darkBlue lg:bg-transparent h-full justify-center flex-col flex'>
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      {showPopUp ? <PopUp error={error} /> :
        <><div className="w-full">
          <img src="/images/logo_nomade.png" alt="logo" className="w-40 mx-auto lg:hidden"/>
          <h2 className="text-4xl font-Ourland text-yellow py-10 lg:text-start text-center">Login</h2>
          <div className="flex flex-col">
            <div className="flex flex-col">
              <div className="sm:col-span-4">
                <label  className="labelForm">
                  Nombre de usuario
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    autoComplete="username"
                    className="inputForm"
                    onChange={handleUsername}
                  />
                </div>
              </div>
              <div className="col-span-full">
                <label className="labelForm">
                  Contraseña
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    autoComplete="password"
                    className="inputForm"
                    onChange={handlePassword}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-x-6">
              <button 
                  type="button" className="text-sm font-semibold leading-6 text-yellow" onClick={() => router.push('/register')}>
              Registrarme
              </button>
              <button
              type="submit"
              className="buttonForm"
              onClick={handleLogin}
              >
              Login
              </button>
        </div>
        </>
      }
      <div className='flex-end pt-20 lg:p-0 lg:absolute lg:bottom-0 lg:right-10'>
        <SocialMedia /> 
      </div>
    </form>
  )
}

export default FormLogin