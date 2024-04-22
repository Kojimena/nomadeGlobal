"use client"
import React, { useEffect, useState } from 'react'
import { MdOutlineDriveFolderUpload } from "react-icons/md"
import { FaCircleInfo } from "react-icons/fa6"
import { MdCancel } from "react-icons/md"
import { FaFileArrowDown } from "react-icons/fa6"





const InputDoc = ({ nameDocument, onDocumentSelect, onUploadClick, status, notes , valueInfo, onDownloadClick, plantilla, setPlantilla }) => {
  const handleFileChange = (event) => {
    if (event.target.files[0]) {
      onDocumentSelect(nameDocument, event.target.files[0])
    }
  }

  const [showInfo, setShowInfo] = useState(false)

  const handleInfo = () => {
    setShowInfo(!showInfo)
  }

  return (
    <div className='flex flex-col w-full'>
        <div className='flex items-end gap-2 justify-between'>
            <div className='sm:col-span-3 w-full'>
              <div className='flex items-start gap-2 relative flex-col'>
                  <label className='labelForm'>
                    <span className='flex lg:justify-center items-center gap-2'>
                    {nameDocument} 
                    {
                    valueInfo ?
                    <FaCircleInfo className='text-yellow cursor-pointer text-lg' onClick={handleInfo} onMouseEnter={handleInfo}/> : ''
                    } 
                    </span>
                  </label>
                  {
                      status === "Rechazado" ?
                      <div className={`flex flex-col items-start gap-2 w-full bg-rejected rounded-md`}>
                        <div className={`flex items-center gap-2 justify-between w-full`}>
                        <span className={`text-sm font-montserrat text-darkBlue p-2`}> - Estado: {status}</span>
                        <FaFileArrowDown className={`cursor-pointer text-lg text-darkBlue mr-2`} onClick={() => onDownloadClick(nameDocument)}/>
                        </div>
                        {
                            status !== "Aprobado" && notes ?
                            <span className='text-black text-sm font-medium p-2 m-0'>Notas: {notes}, vuelva a subir su archivo.</span> : ''
                        }
                      </div> 
                      :   ''
                    }
                    {
                      status === "Aprobado" ?
                      <div className={`flex flex-col items-start gap-2 w-full bg-accepted rounded-md`}>
                        <div className={`flex items-center gap-2 justify-between w-full`}>
                        <span className={`text-sm font-montserrat text-darkBlue p-2`}> - Estado: {status}</span>
                        <FaFileArrowDown className={`cursor-pointer text-lg text-darkBlue mr-2`} onClick={() => onDownloadClick(nameDocument)}/>
                        </div>
                        {
                            status !== "Aprobado" && notes ?
                            <span className='text-black text-sm font-medium p-2 m-0'>Notas: {notes}, vuelva a subir su archivo.</span> : ''
                        }
                      </div> 
                      :   ''
                    }
                    {
                      status === "En revisión" ?
                      <div className={`flex flex-col items-start gap-2 w-full bg-review rounded-md`}>
                            <div className={`flex items-center gap-2 justify-between w-full`}>
                            <span className={`text-sm font-montserrat text-darkBlue p-2`}> - Estado: {status}</span>
                            <FaFileArrowDown className={`cursor-pointer text-lg text-darkBlue mr-2`} onClick={() => onDownloadClick(nameDocument)}/>
                            </div>
                            {
                                notes ? 
                                <span className='text-black text-sm font-medium p-2 m-0'>Notas: {notes}, vuelva a subir su archivo.</span> : ''
                            }
                      </div> 
                      :   ''
                    }
                  {
                    valueInfo && showInfo ?
                    <span className='absolute bg-white text-darkBlue p-4 rounded-md text-sm font-montserrat flex flex-col gap-2 items-start'>
                      {valueInfo}
                      {
                        plantilla ? 
                        <button className=' text-green-500 text-sm cursor-pointer underline font-semibold' onClick={setPlantilla}>
                          Descargar Plantilla
                        </button>
                        : ''
                      }
                      <MdCancel className='text-red-500 ml-2 absolute top-0 right-0 cursor-pointer text-xl' onClick={handleInfo}/>
                    </span> : ''
                  }
              </div>
                {
                  !status || status === "Rechazado" ?
                  <div className='flex items-center gap-2'>
                    <input type="file" className="file-input w-full bg-white font-montserrat text-sm max-h-10 ml-2 mt-2" onChange={handleFileChange} accept="application/pdf"/>
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

