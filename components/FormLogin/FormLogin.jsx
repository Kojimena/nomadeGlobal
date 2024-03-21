"use client";
import { useState, useEffect } from 'react'
import { useRouter } from "next/navigation"
import PopUp from '../PopUp/PopUp'

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

    /* if (emailInput === "admin" && passwordInput === "admin") {
      router.push('/admin')
      return
    } */

      const response = await fetch('https://ngt-markalbrand56.koyeb.app/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        const data = await response.json()
        router.push('/uploader')
        localStorage.setItem('userId', data.token)
      }else {
        setShowPopUp(true)
        setError("No se pudo iniciar sesión. Intente nuevamente.")
      }
  }
    
  return (
    <form className='p-20 w-full bg-darkBlue lg:bg-transparent'>
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      {showPopUp ? <PopUp error={error} /> :
        <><div className="w-full">
          <h2 className="text-4xl font-Ourland text-yellow py-10">Login</h2>
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
                  type="button" className="text-sm font-semibold leading-6 text-yellow" onClick={() => router.push('/')}>
              Registrarme
              </button>
              <button
              type="submit"
              className="buttonForm"
              onClick={handleLogin}
              >
              Login
              </button>
        </div> </>
      }
    </form>
  )
}

export default FormLogin