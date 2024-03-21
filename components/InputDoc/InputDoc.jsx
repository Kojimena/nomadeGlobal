import React from 'react'
import { FaSquareCheck } from "react-icons/fa6"


const InputDoc = ({nameDocument}) => {
  return (
    <div className='flex flex-col w-full'>
        <div className='flex items-end gap-2 justify-between'>
            <div className='sm:col-span-3 w-full'>
                <label className='labelForm'>
                {nameDocument}
                </label>
                <input type="file" className="file-input w-full font-montserrat max-h-10" />
            </div>
            <FaSquareCheck className='text-green-500 text-2xl cursor-pointer' />
        </div>
    </div>
  )
}

export default InputDoc