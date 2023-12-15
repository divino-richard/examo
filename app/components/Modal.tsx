import React, { ReactNode } from 'react'
import { AiOutlineClose } from 'react-icons/ai';


interface Props {
    open: boolean;
    onClose: () => void;
    children?: ReactNode;
}

function Modal(props: Props) {
    const {open, onClose} = props
    
    if(!open) return;

    return (
        <div 
            className='px-24 absolute top-0 left-0 w-full h-screen' 
            style={{backgroundColor: 'rgba(0, 0, 0, .3)'}}
        >
            <div className='bg-white w-full mt-10 p-5 h-5/6 overflow-auto'>
                <div className='flex justify-end pb-5'>
                    <button className='hover:text-blue-700' onClick={onClose}>
                        <AiOutlineClose size={20}/>
                    </button>
                </div>
                {props.children}    
            </div>
        </div>
    )
}

export default Modal
