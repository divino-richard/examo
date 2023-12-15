import { Exam } from '@/app/types/exam.types';
import React from 'react';
import { FiFileText } from 'react-icons/fi';

interface Props {
    data: Exam;
}

function ExamCard(props: Props) {
    const {data} = props

    return (
        <div className='p-2 rounded-md border border-zinc-200 bg-white'>
            <div className='flex pb-2 items-center justify-between border-b border-zinc-200'>
                <div className='p-2 mr-2 rounded-full bg-blue-700 text-white'>
                    <FiFileText size={20}/>
                </div>
                <h1 className='font-semibold text-base line-clamp-1'>{data.title}</h1>
                <span>{data.status?.toLowerCase()}</span>
            </div>
            <div>
                <p>{data.description}</p>
            </div>
        </div>
    )
}

export default ExamCard
