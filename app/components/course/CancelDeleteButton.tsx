'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

function CancelDeleteButton() {
    const router = useRouter();
    return (
        <button 
            className='py-2 px-5 rounded-md bg-blue-700 text-white text-sm' 
            onClick={() => router.back()}
        >
            Cancel
        </button>
    )
}

export default CancelDeleteButton
