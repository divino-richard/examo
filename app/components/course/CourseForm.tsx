'use client'

import React, { useState } from 'react'
import { Course } from '../../types/course.types'
import axiosInstance from '../../config/app.config';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

interface Props {
    formTitle: string;
    buttonLabel: string;
    action?: 'ADD' | 'EDIT';
    defaultData?: Course;
}

function CourseForm(props: Props) {
    const {formTitle, buttonLabel, action = "ADD", defaultData} = props
    const router = useRouter();
    const [title, setTitle] = useState(defaultData?.title??'');
    const [description, setDescription] = useState(defaultData?.description??'');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!title || !description) {
            return setError('Both fields are required');
        }
        const courseData = {
            title,
            description,
        };
        setSubmitting(true);

        switch(action) {
            case 'ADD':
                axiosInstance.post('course', courseData)
                    .then(() => {
                        router.push('/course');
                    })
                    .catch((error) => {
                        console.log(error);
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
                break;
            case "EDIT":
                axiosInstance.put(`course/${defaultData?.id}`, courseData)
                    .then(() => {
                        router.back();
                    })
                    .catch((error) => {
                        console.log(error);
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
                break;
        }
        
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
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
                <textarea 
                    className='bg-zinc-100 p-2 border border-zinc-200 rounded-md text-sm  outline-blue-700 resize-none'
                    rows={5} 
                    placeholder='Description'
                    value={description}
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
