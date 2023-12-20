'use client'

import React, { useEffect, useState } from 'react'
import { AiOutlinePlus, AiOutlineDelete, AiOutlineClose } from 'react-icons/ai'
import RomanNumerals from '@/app/constants/romanNumerals'
import { Choice, Exam, ExamPart, ExamPartType, Question } from '@/app/types/exam.types'
import axiosInstance from '@/app/config/app.config'
import { AxiosError } from 'axios'
// import ExamPartForm from '@/app/components/exam/ExamPartForm'
import { Popconfirm, Modal, Spin } from 'antd'

interface Params {
    params: {
        courseId: string;
        examId: string;
    }
}

interface QuestionWithChoices extends Question {
    choices: Choice[];
}

function Page({params}: Params) {
    const [exam, setExam] = useState<Exam | null>(null);
    const [error, setError] = useState('');
    const [openExamPartModal, setOpenExamPartModal] = useState(false);
    const [openQuestionModal, setOpenQuestionModal] = useState(false);
    const [newExamPart, setNewExamPart] = useState<ExamPart>({
        number: 0,
        title: '',
        type: 'MC',
        instruction: '',
    });
    const [newQuestion, setNewQuestion] = useState<QuestionWithChoices>({
        number: 0,
        text: '',
        choices: []
    });
    const [examPartError, setExamPartError] =  useState('');
    const [gettingExam, setGettingExam] = useState(false);
    const [deletingExamPart, setDeletingExamPart] = useState(false);
    const [addingExamPart, setAddingExamPart] = useState(false);
    const [addingQuestion, setAddingQuestion] = useState(false);

    useEffect(() => {
        const getExam = async () => {
            setGettingExam(true);
            try {
                const response = await axiosInstance.get(`exam/${params.courseId}/${params.examId}`);
                const exam: Exam = response.data.exam;
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

    const handleSaveExamPart = async () => {
        if(!newExamPart.title) {
            return setExamPartError('Title is required');
        }

        if(!newExamPart.instruction) {
            return setExamPartError('Instruction is required');
        }

        setAddingExamPart(true);
        
        try {
            const examPartResponse = await axiosInstance.post(`exam/exam-part/`, {
                ...newExamPart, 
                examId: params.examId
            });
            const createdExamPart: ExamPart = examPartResponse.data.createdExamPart;
            setOpenExamPartModal(false);
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data.error;
                return setError(errorMessage);
            } 
            return setError('Something went wrong. Please try again later.')
        } finally {
            setAddingExamPart(false);
        }
    }

    const handleDeleteExamPart = async (examPartId: string) => {
        if (!examPartId) {
            return
        }

        setDeletingExamPart(true);
        
        try {
            const response = await axiosInstance.delete(`exam/exam-part/${examPartId}`);
            console.log(response);
        } catch (error) {
            if(error instanceof AxiosError) {
                const errorMessage = error.response?.data.error;
                return setError(errorMessage);
            }
            return setError('Something went wrong. Please try again later.')
        } finally {
            setDeletingExamPart(false);
        }
    }

    const handleAddQuestion = async () => {
        if (!newQuestion.text) {
            return
        }
        setAddingQuestion(true);
        try {
            const response = await axiosInstance.post(`exam/question/`, newQuestion);
            setOpenQuestionModal(false);
        } catch (error) {
            if(error instanceof AxiosError) {
                const errorMessage = error.response?.data.error;
                return setError(errorMessage);
            }
            return setError('Something went wrong. Please try again later.')
        } finally {
            setAddingQuestion(false);
        }
    }

    const handleAddChoice = () => {
        const choice: Choice = {
            letter: 'A',
            text: 'Choice text',
        }
        newQuestion.choices.push(choice);
        setNewQuestion({...newQuestion, choices: newQuestion.choices});
    }

    const handleChoiceTextChange = () => {
        
    }

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

            {exam?.examPart && exam.examPart.map(examPart => (
                <div 
                    key={examPart.id} 
                    className='mt-5 border border-zinc-200 rounded-md p-2'
                >
                    <div className='flex items-center justify-between border-b border-zinc-200 pb-2'>
                        <h1 className='font-semibold text-base text-zinc-500'>{examPart.title}</h1>
                        <Popconfirm
                            title="Delete the exam part"
                            description="Are you sure to delete this exam part?"
                            okText="Yes"
                            cancelText="No"
                            okType='danger'
                            onConfirm={() => handleDeleteExamPart(examPart.id??'')}
                        >
                            <button className='hover:text-red-500'>
                                <AiOutlineDelete 
                                    size={16}
                                />
                            </button>
                        </Popconfirm>
                    </div>

                    <div className='flex items-center space-x-2 text-base text-zinc-500 mt-2'>
                        <h1 className='font-semibold'>Instruction:</h1>
                        <p>{examPart.instruction}</p>
                    </div>
                    
                    {examPart.questions && examPart.questions.map(question => (
                        <div 
                            key={question.id}
                            className='p-2 rounded-md flex items-center space-x-2 mt-2 text-zinc-500 hover:shadow-md hover:bg-zinc-100'    
                        >
                            <h1>{question.number}.</h1>
                            <p>{question.text}</p>
                        </div>
                    ))}

                    <button 
                        className='flex items-center space-x-2 text-blue-700 border border-dashed border-blue-700 px-3 py-1 rounded-sm mt-2'
                        onClick={() => {
                            setNewQuestion({
                                ...newQuestion, 
                                examPartId: examPart.id,
                                number: examPart.questions ? examPart.questions.length + 1 : 1,
                            })
                            setOpenQuestionModal(true);
                        }}
                    >
                        <AiOutlinePlus size={16}/>
                        <span>Question</span>
                    </button>
                </div>
            ))}

            <div className='flex items-center space-x-2 mt-5'>
                <div className='w-full border-b border-blue-400'/>
                <div className='w-1/3'>
                    <button 
                        onClick={() =>{
                            setNewExamPart({
                                ...newExamPart, 
                                number: exam?.examPart ? exam?.examPart.length + 1 : 0
                            });
                            setOpenExamPartModal(true);
                        }}
                        className='mx-auto flex items-center px-2 text-blue-700'
                    >
                        <AiOutlinePlus />
                        <span className='ml-2'>New Exam Part</span>
                    </button>
                </div>
                <div className='w-full border-b border-blue-400'/>
            </div>
            
            <Modal 
                title="Add Exam Part" 
                open={openExamPartModal} 
                onOk={handleSaveExamPart} 
                onCancel={() => {                    
                    setOpenExamPartModal(false);
                }}
                okType='default'
                okText={addingExamPart ? <Spin /> : 'Save'}
                okButtonProps={{
                    disabled: addingExamPart
                }}
            >
                <div>
                    {examPartError && <h1 className='text-red-500 mt-2 text-center'>{examPartError}</h1>}
                    <input 
                        className='p-2 rounded-md w-full border border-zinc-200 mt-2'
                        type="text" 
                        placeholder='title'
                        onChange={(event) => setNewExamPart({
                            ...newExamPart, 
                            title: event.target.value
                        })}
                    />
                        
                    <select
                        className='bg-zinc-100 p-2 rounded-md border border-zinc-300 text-sm mt-2'
                        onChange={(event) => setNewExamPart({
                            ...newExamPart, 
                            type: event.target.value as ExamPartType
                        })}
                    >
                        <option value="MC">Multiple Choice</option>
                        <option value="FB">Fill in the Blank</option>
                        <option value="TF">True or False</option>
                        <option value="EW">Essay Writting</option>
                    </select>

                    <div className='mt-2'>
                        <h1 className='font-semibold'>Instruction: </h1>
                        <textarea 
                            rows={4}
                            placeholder={'Exam part instruction...'}
                            className='w-full p-2 rounded-md border border-zinc-200 resize-none'
                            onChange={(event) => setNewExamPart({
                                ...newExamPart, 
                                instruction: event.target.value
                            })}
                        />
                    </div>
                </div>
            </Modal>

            <Modal
                title='Add Question'
                open={openQuestionModal}
                onCancel={() => setOpenQuestionModal(false)}
                onOk={handleAddQuestion}
                okType='default'
                okText={addingQuestion ? <Spin /> : 'Save'}
                okButtonProps={{
                    disabled: addingQuestion
                }}
            >   
                <h1>Number {newQuestion.number}</h1>
                <textarea 
                    rows={4} 
                    placeholder={`Question for number 1`}
                    className='p-2 rounded-md w-full border border-zinc-300 resize-none'
                    onChange={(event) => setNewQuestion({
                        ...newQuestion, 
                        text: event.target.value
                    })}
                />

                <div>
                    {newQuestion.choices.map((choice: Choice) => (
                        <div key={new Date().getMilliseconds()} className='flex items-center border border-zinc-300 mt-2 p-2 rounded-md'>
                            <input 
                                value={choice.text}
                                className='w-full outline-none'
                                type='text' 
                                placeholder='Choice text'
                            />
                            <button className='p-1 cursor-pointer'>
                                <AiOutlineClose className='text-zinc-500 hover:text-blue-700' size={16}/>
                            </button>
                        </div>
                    ))}
                    
                    <button
                        onClick={handleAddChoice}
                        className='flex items-center space-x-2 text-blue-700 border border-dashed border-blue-700 px-3 py-1 rounded-sm mt-2'
                    >
                        <AiOutlinePlus size={16}/>
                        <span>Choice</span>
                    </button>
                </div>
            </Modal>
        </div>
    )
}

export default Page
