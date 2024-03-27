"use client"
import React, { useEffect, useState } from 'react'

const AdminDetails = ({params}) => {
    console.log(params)
    const [token , setToken] = useState('')
    const [clientData, setClientData] = useState([])

    const handleClient = async () => {
        const url = `https://ngt-markalbrand56.koyeb.app/admin/user/${params.username}`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
              },
        })

        console.log(response)

        if (!response.ok) {
            console.log(response.message)
            throw new Error('Error al descargar el documento')
        }

        const data = await response.json();
        setClientData(data)
    }

    useEffect(() => {
        setToken(localStorage.getItem('userId'))

        token && handleClient()

    }
    , [token])


  return (
    <div className='lg:p-20 p-10 w-full min-h-screen bg-white relative'>
        <h1>Documentos de {clientData.username}</h1>
    </div>
  )
}

export default AdminDetails