import BackButton from '@/app/components/BackButton';
import ExamForm from '@/app/components/exam/ExamForm';
import Link from 'next/link';
import React from 'react'

interface Params {
    params: {
        courseId: string;
    }
}

function Page({params}: Params) {
    
    return (
        <div className=' '>
            <BackButton />
            <ExamForm 
                courseId={params.courseId}
            />
        </div>
    )
}

export default Page
