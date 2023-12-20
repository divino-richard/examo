'use client';

import axiosInstance from '@/app/config/app.config';
import { Exam } from '@/app/types/exam.types';
import { Spin } from 'antd';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

interface Props {
    courseId: string
}

function NewExamButton(props: Props) {
    const {courseId} = props
    const router = useRouter();

    const newExam: Exam = {
        title: 'Untitled Exam',
        description: 'Empty Description',
        attemptLimit: 5,
        courseId,
        durationMinutes: 120,
    };

    const [creatingExam, setCreatingExam] = useState(false);
    const [errorCreateExam, setErrorCreateExam] = useState('');

    const handleCreateExam = async () => {
        setCreatingExam(true);
        try {
            const response = await axiosInstance.post('exam/', newExam);
            console.log('Create Exam Response: ', response);
            const createdExam: Exam = response.data.createdExam;
            router.push(`/exam/edit/${createdExam.id}`);
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data.error;
                return setErrorCreateExam(errorMessage);
            }
            return setErrorCreateExam('Something went wrong. Please try again later.')
        } finally {
            setCreatingExam(false);
        }
    }

    return (
        <button 
            onClick={handleCreateExam}
            className='flex items-center bg-blue-700 text-white py-2 px-5 rounded-md mt-5'
            disabled={creatingExam}
        >
            <AiOutlinePlus />
            <span className='ml-2 text-sm'>New Exam</span>
            {creatingExam && <Spin size='small' />}
        </button>
    )
}

export default NewExamButton
