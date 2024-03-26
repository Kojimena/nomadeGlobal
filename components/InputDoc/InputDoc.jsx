"use client"
import React, { useEffect, useState } from 'react'
import { MdOutlineDriveFolderUpload } from "react-icons/md"
import { FaCircleInfo } from "react-icons/fa6"
import { MdCancel } from "react-icons/md"
import { FaFileArrowDown } from "react-icons/fa6"





const InputDoc = ({ nameDocument, onDocumentSelect, onUploadClick, status, notes , valueInfo, onDownloadClick }) => {
  const handleFileChange = (event) => {
    if (event.target.files[0]) {
      onDocumentSelect(nameDocument, event.target.files[0])
    }
  }

  const [showInfo, setShowInfo] = useState(false)

  const handleInfo = () => {
    setShowInfo(!showInfo)
  }

  const statusInfo = {
    'Aprobado': "text-green-500",
    'Rechazado': "text-red-500",
    'En revisión': "text-orange"
  }


  return (
    <div className='flex flex-col w-full'>
        <div className='flex items-end gap-2 justify-between'>
            <div className='sm:col-span-3 w-full'>
              <div className='flex lg:items-center gap-2 relative lg:flex-row flex-col'>
                  <label className='labelForm'>
                    <span className='flex lg:justify-center items-center gap-2'>
                    {nameDocument} 
                    {
                    valueInfo ?
                    <FaCircleInfo className='text-yellow cursor-pointer' onClick={handleInfo} onMouseEnter={handleInfo}/> : ''
                    } 
                    </span>
                  </label>
                  {
                      status ? 
                      <div className='flex items-center gap-2'>
                        <span className={`text-sm font-montserrat ${statusInfo[status]}`}> - Estado: {status}</span>
                        <FaFileArrowDown className={`cursor-pointer ${statusInfo[status]}`} onClick={() => onDownloadClick(nameDocument)}/>
                      </div> 
                      : ''
                    }
                  {
                    valueInfo && showInfo ?
                    <span className='absolute bg-white text-darkBlue p-4 rounded-md text-sm font-montserrat'>
                      {valueInfo}
                      <MdCancel className='text-red-500 ml-2 absolute top-0 right-0 cursor-pointer text-xl' onClick={handleInfo}/>
                    </span> : ''
                  }
              </div>
                {
                    notes ? 
                    <span className='text-gray-500 text-sm font-medium py-4'>Notas: {notes}, vuelva a subir su archivo.</span> : ''
                }
                {
                  !status || status === "Rechazado" ?
                  <div className='flex items-center gap-2'>
                    <input type="file" className="file-input w-full bg-white font-montserrat text-sm max-h-10 ml-2" onChange={handleFileChange} />
                    <button className='bg-green-500 text-white px-4 py-2 rounded-md text-lg cursor-pointer hover:bg-green-600' onClick={() => onUploadClick(nameDocument)} >
                      <MdOutlineDriveFolderUpload size={20} className='text-white'/>
                    </button>
                  </div>
                  : ''
                }
            </div>
        </div>
    </div>
  )
}

export default InputDoc

