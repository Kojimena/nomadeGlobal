"use client"
import React, { useEffect, useState } from 'react'
import InputDoc from '@/components/InputDoc/InputDoc'
import { PiDotsNineThin } from "react-icons/pi"
import { IoLogOut } from "react-icons/io5"
import { useRouter } from "next/navigation"



const Uploader = () => {

  const router = useRouter()
  const [documentos, setDocumentos] = useState([])
  const token = localStorage.getItem('userId')

  const handleLogout = () => {
    localStorage.removeItem('userId')
    router.push('/')
  }


   useEffect(() => {
    console.log('token', token)
    const fetchData = async () => {
      const url = 'https://ngt-markalbrand56.koyeb.app/details/documents'
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      setDocumentos(data.data.documents)
      console.log('data', data)
    }

    fetchData();
  }, []);
  
  return (
    <div className='lg:p-20 p-10 w-full min-h-screen bg-darkBlue relative'>
      <IoLogOut className='text-4xl text-white absolute top-0 right-0 cursor-pointer m-6' onClick={handleLogout}/>
      <PiDotsNineThin className='text-9xl text-yellow absolute bottom-0 -left-10'/>
      <h2 className="text-4xl font-Ourland text-yellow py-4 lg:text-left text-center">Documentos</h2>
      <div className='flex flex-col items-center justify-center gap-2'>
        {documentos && documentos.map((documento, index) => {
          return (
            <InputDoc key={index} nameDocument={documento}/>
          )
        }
        )}
      </div>
      <div className='flex items-center justify-end w-full'>
      <button className='buttonForm mt-10'>Subir documentos</button>
      </div>
    </div>
  )
}

export default Uploader