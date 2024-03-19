"use client";
import { useState } from 'react'
import { useRouter } from "next/navigation";
import PopUp from '../PopUp/PopUp';


const FormSignUpEnterprise = () => {
  const router = useRouter();
  const [nameInput, setNameInput] = useState('')
  const [usernameInput, setUsernameInput] = useState('')
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [error, setError] = useState('')
  const [showPopUp, setShowPopUp] = useState(false)

  const handleNameChange = (e) => {
    setNameInput(e.target.value)
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


  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const data = {
      "company_name": nameInput,
      "email": emailInput,
      "password": passwordInput,
      "username": usernameInput
    }
    if (!nameInput || !emailInput || !passwordInput || !usernameInput) {
      setShowPopUp(true)
      setError("Por favor complete todos los campos.")
      return
    }
    const response = await fetch('https://ngt-markalbrand56.koyeb.app/user/register/company', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (response.ok) {
      router.push('/login')
    } else {
      setShowPopUp(true)
      setError("No se pudo registrar. Intente nuevamente.")
    }
  }

  const handleLogin = () => {
    router.push('/login')
  }

  return (
    <form className='lg:p-20 p-10 w-full'>
      {showPopUp ? <PopUp error={error} /> : 
      <><div className="w-full">
          <h2 className="text-4xl font-Ourland text-darkBlue py-10">Registro</h2>
          <div className="flex flex-col">
            <div className="flex flex-col">
              <div className="sm:col-span-3">
                <label className="labelForm">
                  Nombre de la empresa
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    autoComplete="given-name"
                    className="inputForm"
                    onChange={handleNameChange} />
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
        <div className="mt-6 flex items-center justify-between gap-x-6 lg:flex-row flex-col">
            <button
              type="button"
              onClick={handleLogin}
              className="font-montserrat flex items-center gap-x-2 text-sm font-semibold leading-6 hover:text-kaqui text-black p-2">
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
    </form>
  )
}

export default FormSignUpEnterprise