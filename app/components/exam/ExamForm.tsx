'use client'

import axiosInstance from '@/app/config/app.config';
import { Exam } from '@/app/types/exam.types';
import { AxiosError } from 'axios';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

interface Props {
    courseId: string;
}

function ExamForm(props: Props) {
    const {courseId} = props;
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [attemptLimit, setAttemptLimit] = useState(0);
    const [durationMinutes, setDurationMinutes] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const handleSubmit = async () => {
        const newExam: Exam = {
            courseId,
            title,
            description,
            durationMinutes,
            attemptLimit,
        };
        setSubmitting(true);
        try {
            const response = await axiosInstance.post('exam/', newExam);
            router.back();
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError) {
                const errorMessage: string = error.response?.data.error; 
                return setSubmitError(errorMessage);
            }
            return setSubmitError('Something went wrong. Please try again later');
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className='bg-white max-w-screen-md m-auto p-5 space-y-5 mt-5 shadow-sm'>
            <h1 className='font-semibold text-lg'>Create New Exam</h1>
            <div className='flex flex-col space-y-3'>
                {submitError && (
                    <span className='text-red-500 text-center text-base'>
                        {submitError}
                    </span>
                )}
                <input 
                    type="text" 
                    placeholder='Exam title'
                    className='bg-zinc-50 p-2 border-b border-zinc-200'
                    onChange={(event) => setTitle(event.target.value)}
                />
                <div
                    className='flex items-center space-x-5'
                >
                    <input 
                        type="number" 
                        placeholder='Duration in minutes'
                        className='w-full p-2 rounded-md bg-zinc-50 border border-zinc-200'
                        onChange={(event) => setDurationMinutes(Number(event.target.value))}
                    />
                    <input 
                        type="number" 
                        placeholder='Attempt limits'
                        className='w-full p-2 rounded-md bg-zinc-50 border border-zinc-200'
                        onChange={(event) => setAttemptLimit(Number(event.target.value))}
                    />
                </div>
                <textarea 
                    rows={3} 
                    placeholder='Exam description...'
                    className='p-2 rounded-md resize-none border border-zinc-200 bg-zinc-50'
                    onChange={(event) => setDescription(event.target.value)}
                />
                <button
                    className='bg-blue-500 text-white p-2 font-bold rounded-md'
                    disabled={submitting}
                    onClick={handleSubmit}
                >
                    {submitting ? 'Submiting...' : 'Create Exam'}
                </button>
            </div>
        </div>
    );
}

export default ExamForm
  