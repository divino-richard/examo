'use client'

import React, { useEffect, useState } from 'react'
import { AiOutlinePlus, AiOutlineSave, AiOutlineDelete } from 'react-icons/ai'
import RomanNumerals from '@/app/constants/romanNumerals'
import { Exam, Question, ExamPart, ExamPartType } from '@/app/types/exam.types'
import axiosInstance from '@/app/config/app.config'
import { AxiosError } from 'axios'
import ExamPartForm from '@/app/components/exam/ExamPartForm'
import Modal from '@/app/components/Modal'

interface Params {
    params: {
        courseId: string;
        examId: string;
    }
} 

function Page({params}: Params) {
    const [exam, setExam] = useState<Exam | null>(null);
    const [error, setError] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [gettingExam, setGettingExam] = useState(false);

    useEffect(() => {
        setGettingExam(true);
        const getExam = async () => {
            try {
                const response = await axiosInstance.get(`exam/${params.courseId}/${params.examId}`);
                const exam: Exam = response.data.exam;
                console.log(response)
                setExam(exam);
            } catch (error) {
                if (error instanceof AxiosError)  {
                    const errorMessage = error.response?.data.error;
                    return setError(errorMessage);
                }
                return setError('Something went wrong. Please try again later.');
            } finally {
                setGettingExam(false);
            }
        }
        getExam();
    }, [params]);

    // const [exam, setExam] = useState({
    //     tests: [{
    //         number: 1,
    //         instruction: '',
    //         questions: [{
    //             number: 1,
    //             text: '',
    //         }],
    //         title: '',
    //         type: 'MC'
    //     }]
    // });

    // console.log('Exam', exam);

    // const handleAddTest = () => {
    //     const newTest: Test = {
    //         number: exam.tests.length + 1,
    //         instruction: '',
    //         questions: [{
    //             number: 1,
    //             text: '',
    //         }],
    //         title: '',
    //         type: 'MC',
    //     } 
    //     exam.tests.push(newTest);
    //     setExam({...exam, tests: exam.tests});
    // }

    // const handleRemoveTest = (testNumber: number) => {
    //     const filteredTests = exam.tests.filter(test => test.number !== testNumber);
    //     setExam({...exam, tests: filteredTests});
    // }

    // const handleInstructionChange = (value: string, testNumber: number) => {
    //     const targetTest = exam.tests[testNumber-1];
    //     targetTest.instruction = value;
    //     setExam({...exam, tests: exam.tests});
    // }

    // const handleAddQuestion = (testNumber: number) => {
    //     const totalQuestions = exam.tests[testNumber-1].questions.length;
    //     const lastQuestion = exam.tests[testNumber-1].questions[totalQuestions-1];
        
    //     if (lastQuestion.text === '') {
    //         return alert(`Please complete question number ${lastQuestion.number}`)
    //     }

    //     const newQuestion: Question = {
    //         text: '',
    //         number: exam.tests[testNumber-1].questions?.length + 1,
    //     }

    //     exam.tests[testNumber-1].questions.push(newQuestion);
    //     setExam({...exam, tests: exam.tests})
    // }

    // const handleQuestionChange = (value: string, testNumber: number, questionNumber: number) => {
    //     const targetTest = exam.tests[testNumber-1]
    //     const targetQuestion = targetTest.questions[questionNumber-1];
    //     targetQuestion.text = value; 
    //     setExam({...exam, tests: exam.tests});
    // }

    // const handleTestTypeChange = (newTestType: TestType, testNumber: number) => {
    //     const targetTest = exam.tests[testNumber - 1];
    //     targetTest.type = newTestType;
    //     setExam({...exam, tests: exam.tests});
    // }

    return (
        <div className='bg-white p-5 rounded-md shadow-md'>
            <div className='flex items-center justify-between'>
                <h1 className='font-bold text-lg text-zinc-500'>{exam?.title}</h1>
                <div className='flext items-center space-x-5'>
                    <span>Duration: {exam?.durationMinutes} mins</span>
                    <span>Attempt Limit: {exam?.attemptLimit}</span>
                    <span>{exam?.status?.toLowerCase()}</span>
                </div>
            </div>
            {/* {exam.tests.map((test) => (
                // renderTest(test)
            ))} */}

            <div className='flex items-center space-x-2 mt-5'>
                <div className='w-full border-b border-blue-400'/>
                <div className='w-1/4'>
                    <button 
                        onClick={() => setOpenModal(true)}
                        className='mx-auto flex items-center px-2 text-blue-700'
                    >
                        <AiOutlinePlus />
                        <span className='ml-2'>New Exam Part</span>
                    </button>
                </div>
                <div className='w-full border-b border-blue-400'/>
            </div>

            <button className='flex items-center mt-5 p-2 rounded-md bg-blue-700 text-white'>
                <AiOutlineSave />
                <span className='ml-2'>Save Exam</span>
            </button>

            <Modal
                onClose={() => setOpenModal(false)}
                open={openModal}
            >
                <ExamPartForm examId={params.examId}/>
            </Modal>
        </div>
    )
}

export default Page
