import ExamList from '@/app/components/exam/ExamList';
import NewExamButton from '@/app/components/exam/NewExamButton';
import axiosInstance from '@/app/config/app.config'
import { Course } from '@/app/types/course.types';
import Link from 'next/link';
import React from 'react'
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlus, AiOutlineUnorderedList } from 'react-icons/ai'
import { FiUsers } from 'react-icons/fi'

interface Params {
    params: {
        id: string;
    }
}

async function Page ({ params }: Params) {
    const response = await axiosInstance.get(`course/${params.id}`);
    const course: Course = response.data.course; 
    const buttonActionStyle = 'w-10 h-10 flex items-center justify-center hover:bg-blue-700 hover:text-white rounded-full'

    return (
        <div>
            <div className='flex items-center justify-between p-2 rounded-md bg-white shadow-md'>
                <h1 className='text-base font-bold text-zinc-700'>{course.title}</h1>
                <div className='flex items-center space-x-2'>
                    <Link href={`/course/edit/${params.id}`}>
                        <button className={buttonActionStyle} title='Edit Course'>
                            <AiOutlineEdit />
                        </button>
                    </Link>
                    <Link href={`/course/delete/${params.id}`}>
                        <button className={buttonActionStyle}  title='Delete Course'>
                            <AiOutlineDelete />
                        </button>
                    </Link>
                    <button className={buttonActionStyle}  title='Students'>
                        <FiUsers />
                    </button>
                </div>
            </div>
            {/* <Link href={`/exam/new/${params.id}`}>
                <button className='flex items-center bg-blue-700 text-white py-2 px-5 rounded-md mt-5'>
                    <AiOutlinePlus />
                    <span className='ml-2 text-sm'>New Exam</span>
                </button>
            </Link> */}
            <NewExamButton courseId={params.id}/>
            
            <div className='flex items-center text-lg mt-5 text-zinc-700'>
                <AiOutlineUnorderedList />
                <h1 className='ml-2 font-semibold'>Exams</h1>
            </div>
            <ExamList courseId={params.id}/>
        </div>
    )
}

export default Page 
