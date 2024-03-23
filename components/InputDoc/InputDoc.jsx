import React from 'react'
import { MdOutlineDriveFolderUpload } from "react-icons/md"


const InputDoc = ({ nameDocument, onDocumentSelect, onUploadClick, status, notes }) => {
  const handleFileChange = (event) => {
    if (event.target.files[0]) {
      onDocumentSelect(nameDocument, event.target.files[0]);
    }
  }

  return (
    <div className='flex flex-col w-full'>
        <div className='flex items-end gap-2 justify-between'>
            <div className='sm:col-span-3 w-full'>
                <label className='labelForm'>
                  {nameDocument}
                  {
                    status ? <span className='text-red-500'> - {status}</span> : ''
                  }
                </label>
                {
                    notes ? 
                    <span className='text-gray-500 text-sm font-medium py-4'>Notas: {notes}, vuelva a subir su archivo.</span> : ''
                }
                <input type="file" className="file-input w-full font-montserrat max-h-10" onChange={handleFileChange} />
            </div>
            <button className='bg-green-500 text-white px-4 py-2 rounded-md text-lg cursor-pointer hover:bg-green-600' onClick={() => onUploadClick(nameDocument)} >
              <MdOutlineDriveFolderUpload size={20} className='text-white'/>
            </button>
        </div>
    </div>
  )
}

export default InputDoc

