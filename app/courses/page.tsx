import Link from 'next/link'
import React, { Suspense } from 'react'
import CourseList from '../components/course/CourseList';

export const revalidate = 3600

function Courses() {
    return (
        <div>
            <Link href='/courses/new'>
                <button className='bg-blue-700 text-white text-sm px-5 py-2 rounded-md'>
                    New Course
                </button>
            </Link>

            <Suspense fallback={<div>Loading...</div>}>
                <CourseList />
            </Suspense>
        </div>
    )
}

export default Courses
