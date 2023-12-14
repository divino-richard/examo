import CourseForm from '@/app/components/course/CourseForm'
import axiosInstance from '@/app/config/app.config'
import { Course } from '@/app/types/course.types'
import Link from 'next/link'
import React from 'react'

interface Params {
    params: {
        id: string
    }
}

async function Page({params}:Params) {
    const response = await axiosInstance.get(`/course/${params.id}`);
    const course: Course = response.data.course;

    return (
        <div className='h-full'>
            <Link href={`/course/${course.id}`}>
                <button>
                    Back
                </button>
            </Link>
            <div className='w-full'>
                <CourseForm
                    formTitle='Edit'
                    buttonLabel='Submit'
                    action='EDIT'
                    defaultData={course}
                />
            </div>
        </div>
    )
}

export default Page
