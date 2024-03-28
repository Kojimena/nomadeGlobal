"use client"
import React, { useEffect, useState } from 'react'
import { FaRegArrowAltCircleLeft } from "react-icons/fa"
import { useRouter } from "next/navigation"
import { TbEditOff } from "react-icons/tb"
import { TbEdit } from "react-icons/tb"
import { HiOutlineDocumentDownload } from "react-icons/hi"
import AdvicePopUp from '@/components/AdvicePopUp/AdvicePopUp'

const AdminDetails = ({params}) => {
    const [clientData, setClientData] = useState([])
    const router = useRouter()
    const [edit, setEdit] = useState({})
    const [showPopUp, setShowPopUp] = useState(false)
    const [message, setMessage] = useState('')
    const [token, setToken] = useState('')
    const [note, setNote] = useState('')

    const handleClient = async () => {
        console.log(params.username)
        const url = `https://ngt-markalbrand56.koyeb.app/admin/user/${params.username}`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('userId')}`,
              },
        })

        if (!response.ok) {
            console.log(response.message)
            throw new Error('Error al descargar el documento')
        }

        const data = await response.json();
        setClientData(data.user)
        console.log(data)
    }

    const handleChangeStatus = async ({documentType, status, username}) => {
        console.log(documentType, status, username)
        const body = {
            "document_type": documentType,
            "status": status,
            "username": username
        }
        const url = `https://ngt-markalbrand56.koyeb.app/admin/document/status`
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                },
            body: JSON.stringify(body)
                
        })

        if (!response.ok) {
            console.log(response)
        } else {
            //show pop up 3 seconds
            setMessage('Estado actualizado')
            setShowPopUp(true)
            setTimeout(() => {
                handlePopUp()
                setEdit(false)
                handleClient()

            }, 3000)
        }
    } 

    const handleAddNote = async ({documentType, note, username}) => {
        console.log(documentType, note, username)
        const body = {
            "document_type": documentType,
            "note": note,
            "username": username
        }
        const url = `https://ngt-markalbrand56.koyeb.app/admin/document/note`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                },
            body: JSON.stringify(body)

        })

        if (!response.ok) {
            console.log(response)
        } else {
            //show pop up 3 seconds
            setMessage('Nota añadida')
            setShowPopUp(true)
            setTimeout(() => {
                handlePopUp()
                setEdit(false)
                handleClient()
            }, 3000)
        }
    }

    const handleDowloadClick = async (documentType) => {
        console.log('token', token)
        const url = `https://ngt-markalbrand56.koyeb.app/admin/document/${params.username}/${documentType}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })

        if (!response.ok) {
            throw new Error('Error al descargar el documento')
        }


        const data = await response.blob();
        const file = window.URL.createObjectURL(data);
        window.open(file)
    }

    const handlePopUp = () => {
        setShowPopUp(false)
    }

    const handleNote = (event) => {
        setNote(event.target.value)
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
                {clientData && clientData.role === 'worker' && 
                    <div className="flex flex-col lg:items-start items-center">
                        <p className='labelDark'>Nombre: {clientData.name}</p>
                        <p className='labelDark'>Apellido: {clientData.lastName}</p>
                        <p className='labelDark'>Correo: {clientData.email}</p>
                        <p className='labelDark'>Programa: {clientData.work_program}</p>
                    </div>
                }
                {
                    clientData && clientData.role === 'company' &&
                    <div className="flex flex-col lg:items-start items-center">
                        <p className='labelDark'>Nombre: {clientData.company_name}</p>
                        <p className='labelDark'>Correo: {clientData.email}</p>
                        <p className='labelDark'>Rol: {clientData.role}</p>
                    </div>
                }
        </div>
        <div className="flex flex-col lg:items-start items-center">
            <h3 className="text-2xl font-Ourland text-lightBlue py-4">Documentos</h3>
            <div className="flex flex-col items-start p-4 w-full  gap-4 ">

                {
                    clientData?.documents?.map((document, index) => {
                        if (edit[index]){
                            return(
                            <div key={index} className="flex flex-col justify-start items-start  border-gray-300 border-2 rounded-md w-full relative p-6">
                                <h2 className='labelDark'>Documento: {document.file_name}</h2>
                                <div className='flex lg:gap-10 flex-col lg:flex-row gap-4'>
                                    <div className="dropdown dropdown-hover">
                                        <div tabIndex={0} role="button" className="dropSummary">Cambiar status</div>
                                        <div tabIndex={0} className="dropdown-content z-[1] card card-compact w-64 p-2 shadow bg-darkBlue">
                                            <ul className="card-body">
                                                <li onClick={() => handleChangeStatus({documentType: document.type, status: 2, username: params.username})}><a>En revisión</a></li>
                                                <li onClick={() => handleChangeStatus({documentType: document.type, status: 1, username: params.username})}><a>Aprobado</a></li>
                                                <li onClick={() => handleChangeStatus({documentType: document.type, status: 0, username: params.username})}><a>Rechazado</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="dropdown dropdown-hover">
                                        <div tabIndex={0} role="button" className="dropSummary">Añadir nota</div>
                                        <div tabIndex={0} className="dropdown-content z-[1] card card-compact w-64 p-2 shadow bg-darkBlue">
                                            <div className="card-body">
                                            <h3 className="card-title">Nota</h3>
                                            <textarea className="textarea h-24 bg-white text-black" placeholder="Textarea"  onChange={handleNote}/>
                                            <button className="btn bg-lightBlue hover:bg-green-500  text-white" onClick={() => handleAddNote({documentType: document.type, note: note, username: params.username})}>Añadir</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <TbEditOff className='text-2xl text-darkBlue cursor-pointer absolute bottom-0 right-0' onClick={() => setEdit({...edit, [index]: false})}/>
                            </div>
                            )
                        }
                        else {
                            return (
                                <div key={index} className="flex flex-col justify-start items-start border-gray-300 border-2 rounded-md w-full relative p-6">
                                    <h2 className='text-darkBlue font-bold'>Tipo de documento: {document.type}</h2>
                                    <span className='labelDark'>Documento subido: {document.file_name}</span>
                                    <p className='labelDark'>Estado actual: {document.status}</p>
                                    {document.notes && <p className='labelDark'>Nota: {document.notes}</p>}
                                    <TbEdit className='text-3xl text-darkBlue cursor-pointer absolute bottom-0 right-0 hover:text-lightBlue' onClick={() => setEdit({...edit, [index]: true})}/>
                                    <HiOutlineDocumentDownload className='text-3xl text-darkBlue cursor-pointer absolute bottom-0 right-12 hover:text-lightBlue' onClick={() => handleDowloadClick(document.type)}/>
                                </div>
                            )
                        }

                    })
                } 
            </div>
        </div>
        {showPopUp && <AdvicePopUp message={message} setShowPopUp={setShowPopUp} onClose={handlePopUp}/>}
    </div>
  )
}

export default AdminDetails