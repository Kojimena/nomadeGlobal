"use client"
import React, { useEffect, useState } from 'react'
import { FaRegArrowAltCircleLeft } from "react-icons/fa"
import { useRouter } from "next/navigation"
import { TbEditOff } from "react-icons/tb"
import { TbEdit } from "react-icons/tb"



const AdminDetails = ({params}) => {
    const [token , setToken] = useState('')
    const [clientData, setClientData] = useState([])
    const router = useRouter()
    const [edit, setEdit] = useState(false)

    const handleClient = async () => {
        const url = `https://ngt-markalbrand56.koyeb.app/admin/user/${params.username}`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
              },
        })

        if (!response.ok) {
            console.log(response.message)
            throw new Error('Error al descargar el documento')
        }

        const data = await response.json();
        setClientData(data.user)
    }

    const handleChangeStatus = async ({documentType, status, username}) => {
        const url = `https://ngt-markalbrand56.koyeb.app/admin/user/${params.username}`
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                },
            body: JSON.stringify({
                documentType,
                status,
                username
            })
        })

        if (!response.ok) {
            console.log(response.message)
        }
    }


    useEffect(() => {
        setToken(localStorage.getItem('userId'))

        token && handleClient()

    }
    , [token])


  return (
    <div className='lg:p-20 p-10 w-full min-h-screen bg-white relative'>
        <FaRegArrowAltCircleLeft className='absolute top-10 left-10 text-2xl cursor-pointer text-darkBlue' onClick={() => router.back()} />
        <h2 className="text-4xl font-Ourland text-darkBlue py-4 lg:text-left text-center">Admin Panel</h2>
        <div className="flex flex-col lg:items-start items-center">
            <h3 className="text-2xl font-Ourland text-lightBlue py-4">Detalles de usuario</h3>
                {clientData.role === 'worker' && 
                    <div className="flex flex-col lg:items-start items-center">
                        <p className='labelDark'>Nombre: {clientData.name}</p>
                        <p className='labelDark'>Apellido: {clientData.lastName}</p>
                        <p className='labelDark'>Correo: {clientData.email}</p>
                        <p className='labelDark'>Programa: {clientData.work_program}</p>
                    </div>
                }
                {
                    clientData.role === 'company' &&
                    <div className="flex flex-col lg:items-start items-center">
                        <p className='labelDark'>Nombre: {clientData.company_name}</p>
                        <p className='labelDark'>Correo: {clientData.email}</p>
                        <p className='labelDark'>Rol: {clientData.role}</p>
                    </div>
                }
        </div>
        <div className="flex flex-col lg:items-start items-center">
            <h3 className="text-2xl font-Ourland text-lightBlue py-4">Documentos</h3>
            <div className="flex flex-col  items-start border-gray-300 border-2 rounded-md">
                {!edit && clientData && clientData.documents.map((document, index) => (
                    <div key={index} className="flex flex-col justify-start items-start relative w-60 h-24 gap-4">
                        <h2 className='labelDark'>Documento: {document.file_name}</h2>
                        <p className='labelDark'>Status: {document.status}</p>
                        <TbEdit className='text-2xl text-darkBlue cursor-pointer absolute bottom-0 right-0' onClick={() => setEdit(!edit)}/>
                    </div>
                ))}
                {
                    edit && clientData && clientData.documents.map((document, index) => (
                        <div key={index} className="flex flex-col justify-start items-start relative p-8 gap-4">
                            <h2 className='labelDark'>Documento: {document.file_name}</h2>
                            <details className="dropdown">
                                <summary className="m-1 btn text-sm">Cambiar status</summary>
                                <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 text-sm">
                                    <li><a>Item 1</a></li>
                                    <li><a>Item 2</a></li>
                                </ul>
                            </details>
                            <TbEditOff className='text-2xl text-darkBlue cursor-pointer absolute bottom-0 right-0' onClick={() => setEdit(!edit)}/>
                        </div>
                    ))
                }
            </div>
        </div>

    </div>
  )
}

export default AdminDetails