import React from 'react'
import { Course } from '../types/course.types'

interface Props {
    formTitle: string;
    buttonLabel: string;
    defaultData?: Course;
}

function CourseForm(props: Props) {
    const {formTitle, buttonLabel, defaultData} = props

    return (
        <div className='bg-white max-w-screen-md m-auto p-5 space-y-5 mt-5'>
            <h1 className='font-semibold text-md'>{formTitle}</h1>
            <div className='flex flex-col space-y-3'>
                <input 
                    className='bg-zinc-100 p-2 border border-zinc-200 rounded-md text-sm outline-blue-700' 
                    type="text" 
                    placeholder='Name'
                />
                <textarea 
                    className='bg-zinc-100 p-2 border border-zinc-200 rounded-md text-sm  outline-blue-700 resize-none'
                    rows={5} 
                    
                    placeholder='Description'
                />
                <button
                    className='bg-blue-500 text-white p-2 font-bold rounded-md'
                >{buttonLabel}</button>
            </div>
        </div>
    )
}

export default CourseForm
