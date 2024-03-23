"use client"
import React, { useEffect, useState } from 'react'
import InputDoc from '@/components/InputDoc/InputDoc'
import { PiDotsNineThin } from "react-icons/pi"
import { IoLogOut } from "react-icons/io5"
import { useRouter } from "next/navigation"
import AdvicePopUp from '@/components/AdvicePopUp/AdvicePopUp'



const Uploader = () => {

  const router = useRouter()
  const [documentos, setDocumentos] = useState([])
  const [documentosSubidos, setDocumentosSubidos] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)
  const [token, setToken] = useState('')
  const [showPopUp, setShowPopUp] = useState(false)
  const [message, setMessage] = useState('')

  

  const handleLogout = () => {
    localStorage.removeItem('userId')
    router.push('/')
  }

  const handleDocumentSelect = (nameDocument, file) => {
    setSelectedFile({ nameDocument, file })
  }

  const handleUploadClick = async (documentType) => {
    if (!selectedFile || selectedFile.nameDocument !== documentType) {
      alert('Por favor, selecciona un archivo para ' + documentType);
      return;
    }

    const form = new FormData()
    form.append('files', selectedFile.file)


    try {
      console.log(form)
      const url = `https://ngt-markalbrand56.koyeb.app/documents/${documentType}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: form,
      })

      if (!response.ok) {
        console.log(response.message)
        throw new Error('Error al subir el documento')
      }

      const data = await response.json();
      console.log(data);
      setShowPopUp(true)
      setMessage('Documento subido correctamente')
    } catch (error) {
      console.error(error)
      setShowPopUp(true)
      setMessage('Error al subir el documento')
    }
  }

   useEffect(() => {
    const userToken = localStorage.getItem('userId')
    setToken(userToken)
    console.log('token', token)
    if (token){
      console.log('token', userToken)
      const fetchData = async () => {
        const url = 'https://ngt-markalbrand56.koyeb.app/details/documents'
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const data = await response.json()
        setDocumentos(data.data.available_documents)
        setDocumentosSubidos(data.data.user_documents)
        console.log('data', data)
      }
  
      fetchData()
    }
  }, [token])
  
  return (
    <div className='lg:p-20 p-10 w-full min-h-screen bg-darkBlue relative flex flex-col lg:justify-start justify-center'>
      <IoLogOut className='text-4xl text-white absolute top-0 right-0 cursor-pointer m-6' onClick={handleLogout}/>
      <PiDotsNineThin className='text-9xl text-yellow absolute bottom-0 -left-10'/>
      <h2 className="text-4xl font-Ourland text-yellow py-4 lg:text-left text-center">Documentos</h2>
      <div className='flex flex-col items-center justify-center gap-2'>
        {documentos && documentos.map((documento, index) => {
          documentosSubidos.forEach(doc => console.log(doc.type))
          console.log(documento)
          if (documentosSubidos.some(doc => doc.type === documento && doc.status !== 'Rechazado')){
            return (
              <p key={index} className='labelForm w-full flex justify-start'>{documento} - 
                <span className='text-orange'>{documentosSubidos.find(doc => doc.type === documento).status}
                </span>
              </p>
            )
          }
          else if (documentosSubidos.some(doc => doc.type === documento && doc.status === 'Rechazado')){
            return (
              <InputDoc
              key={index}
              nameDocument={documento}
              status='Rechazado'
              notes = {documentosSubidos.find(doc => doc.type === documento).notes}
              onDocumentSelect={handleDocumentSelect}
              onUploadClick={handleUploadClick}
              />
            )
          }
          else{
              return (
                <InputDoc 
                key={index}
                nameDocument={documento}
                onDocumentSelect={handleDocumentSelect}
                onUploadClick={handleUploadClick}
                />
              )
          }
        }
        )}
      </div>
      {showPopUp && <AdvicePopUp message={message}/>}
    </div>
  )
}

export default Uploader