"use client"
import React, { useState } from 'react'
import { IoCloseOutline } from "react-icons/io5"

const AdvicePopUp = ({message, onClose}) => {
    const [showPopUp, setShowPopUp] = useState(true)

    const handleClose = () => {
        onClose()
    }
    

  return (
    <div className='flex flex-col w-full lg:justify-center justify-start items-center'>
    {
        showPopUp && (
            <div className='fixed top-0 right-0 w-full h-full bg-black bg-opacity-50 flex justify-end items-start'>
                <div className='bg-white p-10 rounded-lg relative top-0 right-0 m-4'>
                    <IoCloseOutline className='text-3xl text-red-500 absolute top-0 right-0 cursor-pointer' onClick={handleClose}/>
                    <h2 className='text-2xl font-bold text-center font-montserrat text-darkBlue'>{message}</h2>
                </div>
        
            </div>
        )
    }
    </div>
  )
}

export default AdvicePopUp