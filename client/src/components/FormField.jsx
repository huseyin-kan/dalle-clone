import React from 'react'

const FormField = ({labelName,type,name,placeholder,value,handleChange, isSurpriseMe, handleSurpriseMe}) => {
  return (
    <div>
      <div className='flex items-center gap-2 mb-2'>
        <label htmlFor={name} className='block text-sm font-meidum text-gray-900'>{labelName}</label>
        {isSurpriseMe && (
          <button type='button' onClick={handleSurpriseMe} className='font-semibold text-sm bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black'>
            Surprise me
          </button>
        )}
      </div>
      <input type={type} id={name} name={name} placeholder={placeholder} onChange={handleChange} value={value} 
      className='bg-gray-50 border-gray-300 border text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3'/>
    </div>
  )
}

export default FormField