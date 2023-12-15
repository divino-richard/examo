'use client';

import axiosInstance from '@/app/config/app.config';
import { Exam } from '@/app/types/exam.types';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react'
import ExamCard from './ExamCard';
import Link from 'next/link';

interface Props {
    courseId?: string;
}

function ExamList(props: Props) {
    const {courseId} = props
    const [exams, setExams] = useState<Exam[] | null>(null);
    const [getExamError, setGetExamError] = useState('');
    const [gettingExams, setGettingExams] = useState(false);

    useEffect(() => {
        setGettingExams(true);
        if (courseId) {
            const getExamsByCourseId = async () => {
                try {
                    const response = await axiosInstance.get(`exam/${courseId}`);
                    const exams: Exam[] = response.data.exams;
                    setExams(exams);
                } catch (error) {
                    console.log(error);
                    if (error instanceof AxiosError) {
                        const errorMessage: string = error.response?.data.error;
                        return setGetExamError(errorMessage);
                    }
                    return setGetExamError('Something went wrong. Please try again later.')
                } finally {
                    setGettingExams(false);
                }
            }
            getExamsByCourseId();
        }

    }, [courseId]);

    return (
        <div className='grid grid-cols-4 gap-5 mt-5'>
            {getExamError && <span className='text-red-500'>{getExamError}</span>}
            {gettingExams && <span>Loading...</span>}
            {exams && exams.map(exam => (
                <Link key={exam.id}  href={`/exam/${exam.id}`}>
                    <ExamCard data={exam}/>
                </Link>
            ))}
        </div>
    )
}

export default ExamList
