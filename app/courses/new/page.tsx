import CourseForm from '@/app/components/CourseForm'
import Link from 'next/link'
import React from 'react'

function NewCourse() {
    return (
        <div className='h-full'>
            <Link href='/courses'>
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

export default NewCourse
