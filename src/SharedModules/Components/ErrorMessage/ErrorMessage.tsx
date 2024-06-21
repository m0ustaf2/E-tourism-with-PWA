
import React from 'react'
import { MdError } from 'react-icons/md'

 const ErrorMessage: React.FC<{ text: string }>=({text}) =>{

  return (

    <div className="group relative w-auto">
    <span className="text-red-300">
      <MdError />
    </span>
    <label className="bg-red-200 rounded-l-lg rounded-b-lg absolute z-10 p-2 left-[-1000%] border-2 border-red-950 text-red-700 opacity-0 group-hover:opacity-100 group-hover:duration-1000">
      {String(text)}
    </label>
  </div>
  )
}
export default ErrorMessage;