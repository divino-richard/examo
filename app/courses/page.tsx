import Link from 'next/link'
import React from 'react'

function Courses() {
    return (
        <div>
            <Link href='/courses/new'>
                <button className='bg-blue-700 text-white text-sm px-5 py-2 rounded-md'>
                    New Course
                </button>
            </Link>

            
        </div>
    )
}

export default Courses
