'use client'

import React, { useState } from 'react'
import { Course } from '../types/course.types'
import axiosInstance from '../config/app.config';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

interface Props {
    formTitle: string;
    buttonLabel: string;
    defaultData?: Course;
}

function CourseForm(props: Props) {
    const {formTitle, buttonLabel, defaultData} = props
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!title || !description) {
            return setError('Both fields are required');
        }
        const newCourse = {
            title,
            description,
        };
        setSubmitting(true);
        axiosInstance.post('course', newCourse)
            .then(() => {
                router.push('/courses');
            })
            .catch((error) => {
                if (error instanceof AxiosError) {
                    const {response} = error;
                    const responseError =  response?.data.error;
                    return setError(responseError);
                }
                setError('Something went wrong. Please try again later');
            })
            .finally(() => {
                setSubmitting(false);
            });
    } 

    return (
        <div className='bg-white max-w-screen-md m-auto p-5 space-y-5 mt-5'>
            <h1 className='font-semibold text-md'>{formTitle}</h1>
            <div className='flex flex-col space-y-3'>
                {error && <span className='text-red-500 text-center'>{error}</span>}   
                <input 
                    className='bg-zinc-100 p-2 border border-zinc-200 rounded-md text-sm outline-blue-700' 
                    type="text" 
                    placeholder='Name'
                    onChange={(event) => setTitle(event.target.value)}
                />
                <textarea 
                    className='bg-zinc-100 p-2 border border-zinc-200 rounded-md text-sm  outline-blue-700 resize-none'
                    rows={5} 
                    placeholder='Description'
                    onChange={(event) => setDescription(event.target.value)}
                />
                <button
                    className='bg-blue-500 text-white p-2 font-bold rounded-md'
                    onClick={handleSubmit}
                >
                    {submitting ? 'Loading...': buttonLabel}
                </button>
            </div>
        </div>
    )
}

export default CourseForm
