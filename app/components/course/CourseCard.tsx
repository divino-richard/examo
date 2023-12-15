import { Course } from '@/app/types/course.types'
import React from 'react'
import { AiOutlineBook } from 'react-icons/ai'

interface Props {
    data: Course;
}

function CourseCard(props: Props) {
    const {data} = props

    return (
        <div className='h-44 bg-white rounded-lg border border-zinc-200'>
            <div className='w-full h-24 bg-zinc-200 p-2 rounded-lg overflow-hidden flex box-border'>
                <div className='w-10 h-10 rounded-full flex items-center justify-center bg-blue-700 mr-2'>
                    <AiOutlineBook size={18} className='text-white'/>
                </div>
                <div className='flex-1'>
                    <h1 className='text-lg font-semi-bold line-clamp-3'>{data.title}</h1>
                </div>
            </div>
            <div className='p-2 overflow-hidden'>
                <p className='text-sm line-clamp-3'>{data.description}</p>
            </div>
        </div>
    )
}

export default CourseCard
