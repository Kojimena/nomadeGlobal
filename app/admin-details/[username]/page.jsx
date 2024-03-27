"use client"
import React, { useEffect, useState } from 'react'

const AdminDetails = ({params}) => {

    const [token , setToken] = useState('')

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
        console.log(data)
    }

    useEffect(() => {
        setToken(localStorage.getItem('userId'))

        token && handleClient()

    }
    , [token])


  return (
    <div>AdminDetails</div>
  )
}

export default AdminDetails