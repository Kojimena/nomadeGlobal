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

  const closePopUp = () => {
    setShowPopUp(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('userId')
    router.push('/')
  }

  const handleDocumentSelect = (nameDocument, file) => {
    setSelectedFile({ nameDocument, file })
  }

  const handleDowloadFile = async () => {
    const url = 'https://ngt-markalbrand56.koyeb.app/documents/template';
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

    const data = await response.blob();
    const file = window.URL.createObjectURL(data);
    window.open(file)
  }

  


  const handleDowloadClick = async (documentType) => {
    console.log('token', token)
    const url = `https://ngt-markalbrand56.koyeb.app/documents/${documentType}`;
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

    const data = await response.blob();
    const file = window.URL.createObjectURL(data);
    window.open(file)
  }


  const handleUploadClick = async (documentType) => {
    if (!selectedFile || selectedFile.nameDocument !== documentType) {
      setShowPopUp(true)
      setMessage('Por favor selecciona un archivo')
      return
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
        throw new Error('Error al subir el documento')
      }

      setShowPopUp(true)
      setMessage('Documento subido correctamente')
      setTimeout(() => {
        setShowPopUp(false)
        window.location.reload()  
      }, 5000)    
    } catch (error) {
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
      <PiDotsNineThin className='text-9xl text-yellow absolute bottom-0 lg:-left-10 -right-10'/>
      <h2 className="text-4xl font-Ourland text-yellow py-4 lg:text-left text-center">Documentos</h2>
      <p className="text-lg font-montserrat font-bold text-white pb-4 lg:text-left text-center">Sube tus documentos para completar tu perfil</p>
      <div className='flex flex-col items-center justify-center lg:gap-6 gap-8'>
        {documentos && Object.keys(documentos).map((documento, index) => {
          if (index === 0){
            return (
              <div key={index} className='flex flex-col items-start gap-4 w-full'>
                <InputDoc 
                key={index}
                nameDocument={documento}
                onDocumentSelect={handleDocumentSelect}
                onUploadClick={handleUploadClick}
                valueInfo={documentos[documento]}
                onDownloadClick={handleDowloadClick}
                />
               <button className='bg-yellow text-darkBlue px-4 py-2 rounded-md text-sm cursor-pointer hover:bg-yellow-600' onClick={() => handleDowloadFile()}>Descargar plantilla</button>
              </div>
            )
          }

          else if ( documentosSubidos && documentosSubidos.some(doc => doc.type === documento && doc.status )){
            return (
              <InputDoc
              key={index}
              nameDocument={documento}
              status= {documentosSubidos.find(doc => doc.type === documento).status}
              notes = {documentosSubidos.find(doc => doc.type === documento).notes}
              onDocumentSelect={handleDocumentSelect}
              onUploadClick={handleUploadClick}
              valueInfo={documentos[documento]}
              onDownloadClick={handleDowloadClick}
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
                valueInfo={documentos[documento]}
                onDownloadClick={handleDowloadClick}
                />
              )
          }
        }
        )}
      </div>
      {showPopUp && <AdvicePopUp message={message} onClose={closePopUp}/>}
    </div>
  )
}

export default Uploader