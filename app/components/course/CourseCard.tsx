import { Course } from '@/app/types/course.types'
import React from 'react'

interface Props {
    data: Course;
}

function CourseCard(props: Props) {
    const {data} = props

    return (
        <div className='w-60 h-44 bg-white rounded-lg mt-5 mr-5'>
            <div className='w-full h-24 bg-zinc-200 p-2 rounded-lg'>
                <h1 className='text-lg font-semi-bold'>{data.title}</h1>
            </div>
            <div className='p-2 overflow-hidden'>
                <p className='text-sm line-clamp-3'>{data.description}</p>
            </div>
        </div>
    )
}

export default CourseCard
