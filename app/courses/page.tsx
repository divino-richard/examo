import Link from 'next/link'
import React, { Suspense } from 'react'
import CourseList from '../components/course/CourseList';
import { AiOutlineUnorderedList, AiOutlinePlus } from 'react-icons/ai'

function Page() {
    return (
        <div>
            <Link href='/courses/new'>
                <button className='flex items-center bg-blue-700 text-white text-sm px-5 py-2 rounded-md'>
                    <AiOutlinePlus />
                    <span className='ml-2 text-sm'>New Course</span>
                </button>
            </Link>
            <div className='flex items-center text-lg mt-5 text-zinc-700'>
                <AiOutlineUnorderedList/>
                <h1 className='ml-2 font-semibold'>Courses</h1>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <CourseList />
            </Suspense>
        </div>
    )
}

export default Page
