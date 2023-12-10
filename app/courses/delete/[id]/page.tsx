'use client'

import axiosInstance from '@/app/config/app.config';
import { Course } from '@/app/types/course.types';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';

interface Params {
    params: {
        id: string;
    }
}

function Page({params}: Params) {
    const router = useRouter();
    const courseId = params.id;
    const [course, setCourse] = useState<Course | null>(null);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const getCourse = async () => {
            const response = await axiosInstance.get(`course/${courseId}`);
            const course: Course = response.data.course;
            setCourse(course);
        }
        getCourse();
    },[courseId]);

    const handleDelete = async () => {
        setDeleting(true);
        axiosInstance.delete(`course/delete/${courseId}`)
            .then(() => {
                router.push('/courses');
            })
            .catch((error) => {
                if (error instanceof AxiosError) {
                    const {response} = error;
                    const errorMessage = response?.data.error;
                    return setError(errorMessage);
                }
                return setError('Something went wrong. Please try again later.');
            })
            .finally(() => {
                setDeleting(false);
            });
    }

    return (
       <div className='mx-auto mt-5 rounded-md p-5 bg-white max-w-screen-md shadow-md'>
            <h1 className='font-semibold text-lg'>Delete Course</h1>
            {error && (<p className='mt-2 text-red-500 text-base'>{error}</p>)}
            <div className='mt-5'>
                <p>This will permanently delete this course in our record.</p>
                <p className='mt-5'>Course Title:</p>
                <h1 className='text-lg font-semibold'>{course?.title}</h1>
            </div>
            <div className='mt-5 flex justify-end space-x-2'>
                <button 
                    className='py-2 px-5 rounded-md bg-blue-700 text-white text-sm' 
                    onClick={() => router.back()}
                >
                    Cancel
                </button>
                <button
                    disabled={deleting ? true : false}
                    className='py-2 px-5 rounded-md bg-red-700 text-white text-sm'
                    onClick={handleDelete}
                >
                    {deleting ? 'Deleting...' : 'Delete'}
                </button>
            </div>
       </div> 
    )
}

export default Page
