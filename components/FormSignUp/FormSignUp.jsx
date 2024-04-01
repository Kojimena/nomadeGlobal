"use client";
import { useState } from 'react'
import { useRouter } from "next/navigation"
import PopUp from '../PopUp/PopUp'
import SocialMedia from '../SocialMedia/SocialMedia'


const FormSignUp = () => {
  const router = useRouter();
  const [nameInput, setNameInput] = useState('')
  const [lastNameInput, setLastNameInput] = useState('')
  const [usernameInput, setUsernameInput] = useState('')
  const [workProgramInput, setWorkProgramInput] = useState('')
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [error, setError] = useState('')
  const [showPopUp, setShowPopUp] = useState(false)

  const handleNameChange = (e) => {
    setNameInput(e.target.value)
  }

  const handleLastNameChange = (e) => {
    setLastNameInput(e.target.value)
  }

  const handleEmailChange = (e) => {
    setEmailInput(e.target.value)
  }

  const handleUsernameChange = (e) => {
    setUsernameInput(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPasswordInput(e.target.value)
  }

  const handleWorkProgramChange = (e) => {
    setWorkProgramInput(e.target.value)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const data = {
      "email": emailInput,
      "lastName": lastNameInput,
      "name": nameInput,
      "password": passwordInput,
      "username": usernameInput,
      "work_program": workProgramInput
    }
    if (!nameInput || !emailInput || !passwordInput || !lastNameInput || !usernameInput || !workProgramInput) {
      setShowPopUp(true)
      setError("Por favor complete todos los campos.")
      return
    }
    const response = await fetch('https://ngt-markalbrand56.koyeb.app/user/register/worker', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (response.ok) {
      router.push('/')
    } else if (response.status === 409) {
      setShowPopUp(true)
      setError("Nombre de usuario o email ya están en uso.")
    }
  }

  const handleLogin = () => {
    router.push('/')
  }

  return (
    <form className='lg:p-20 p-10 w-full bg-darkBlue h-screen imageBackground '>
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      {showPopUp ? <PopUp error={error} /> : 
      <><div className="w-full">
          <h2 className="text-4xl font-Ourland text-yellow py-10">Registro</h2>
          <div className="flex flex-col">
            <div className="flex flex-col">
              <div className="sm:col-span-3">
                <label className="labelForm">
                  Nombres
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    autoComplete="given-name"
                    className="inputForm"
                    onChange={handleNameChange} />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label className="labelForm">
                  Apellidos
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    autoComplete="email"
                    className="inputForm"
                    onChange={handleLastNameChange} />
                </div>
              </div>

              <div className="col-span-full">
                <label  className="labelForm">
                  Programa de trabajo en el que quedaste seleccionado
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    className="inputForm"
                    onChange={handleWorkProgramChange} />
                </div>
              </div>

              <div className="col-span-full">
                <label  className="labelForm">
                  Nombre de usuario
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    autoComplete="street-address"
                    className="inputForm"
                    onChange={handleUsernameChange} />
                </div>
              </div>

              <div className="col-span-full">
                <label  className="labelForm">
                  Correo electrónico
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    autoComplete="street-address"
                    className="inputForm"
                    onChange={handleEmailChange} />
                </div>
              </div>
              
              <div className="col-span-full">
                <label  className="labelForm">
                  Contraseña
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    autoComplete="street-address"
                    className="inputForm"
                    onChange={handlePasswordChange} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between gap-x-6 flex-row ">
            <button
              type="button"
              onClick={handleLogin}
              className="font-montserrat text-start flex items-center gap-x-2 text-sm font-semibold leading-6 hover:text-kaqui text-white p-2 hover:text-yellow">
              Ya tengo una cuenta
            </button>
              <button
                type="submit"
                className="buttonForm"
                onClick={handleFormSubmit}
              >
                Registrarme
              </button>
            </div>
          </>}
          <div className='flex-end p-6 lg:p-0 lg:absolute lg:bottom-0 lg:right-10'>
            <SocialMedia /> 
          </div>
    </form>
  )
}

export default FormSignUp