import React from "react";

interface Buttonmodelprops {
    onClick?: () => void,
    type: string,
    disabled?: boolean
    children: any
}

export default function Button(props: Buttonmodelprops) {
    return(
        <button 
            className="w-full bg-indigo-800 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50 flex items-center justify-center"
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    )
}