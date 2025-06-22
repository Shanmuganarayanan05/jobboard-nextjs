import React from "react";

interface InputProps{
    htmlFor?: string,
    placeholder?: string,
    type:string,
    error:string,
    onChange: any,
    value: any,
    id: string,
    name: string,
    label?: string,
    required?: boolean
}

export default function Input(Props:InputProps) {
    return(
        <div>
            <label htmlFor={Props.htmlFor} className="block text-sm font-medium text-gray-700 mb-2">
                {Props.label}{Props.required && <span className="text-red-500">{" "}*</span>}
            </label>
            <input 
            type={Props.type}
            id={Props.id} 
            name={Props.name}
            value={Props.value} 
            onChange={Props.onChange} 
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500 ${Props.error ? 'border-red-500' : 'border-gray-300'}`} 
            />
            {Props.error && <p className="text-red-500 text-xs mt-1">{Props.error}</p>}
        </div>
    )
}