import CourseForm from '@/app/components/course/CourseForm'
import Link from 'next/link'
import React from 'react'

function Page() {
    return (
        <div className='h-full'>
            <Link href='/course'>
                <button>
                    Back
                </button>
            </Link>
            <div className='w-full'>
                <CourseForm 
                    formTitle='Add New Course'
                    buttonLabel='Create'
                />
            </div>
        </div>
    )
}

export default Page
