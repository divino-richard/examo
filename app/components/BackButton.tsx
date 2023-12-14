'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FiArrowLeft } from 'react-icons/fi';

function BackButton() {
    const router = useRouter();

    return (
        <div className='w-fit px-2 flex items-center hover:text-blue-700 cursor-pointer'>
            <FiArrowLeft 
                size={18}
            />
            <button
                onClick={() => router.back()}
                className='text-base font-semibold'
            >
                Back
            </button>
        </div>
    );
}

export default BackButton;