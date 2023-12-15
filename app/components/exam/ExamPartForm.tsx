'use client'

import axiosInstance from '@/app/config/app.config';
import { ExamPart, ExamPartType } from '@/app/types/exam.types';
import { AxiosError } from 'axios';
import React, { useState } from 'react'
import { AiOutlineDelete, AiOutlinePlus, AiOutlineClose, AiOutlineSave } from 'react-icons/ai'

interface Props {
    examId?: string    
}

function ExamPartForm(props: Props) {
    const {examId} = props;
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [examPart, setExamPart] = useState<ExamPart>({
        number: 1,
        title: '',
        type: 'MC',
        instruction: '',
        questions: [{
            number: 1,
            text: '',
        }],
    });

    const handleAddQuestion = () => {
        const totalQuestions = examPart.questions.length;
        const number = totalQuestions + 1;
        examPart.questions.push({
            number,
            text: '',
        });
        setExamPart({...examPart, questions: examPart.questions})
    }

    const handleQuestionChange = (text: string, questionNumber: number) => {
        const targetQuestion = examPart.questions[questionNumber - 1];
        targetQuestion.text = text;
        setExamPart({...examPart, questions: examPart.questions});
    }

    const handleSaveExamPart = async () => {
        setSubmitting(true);
        try {
            const examPartResponse = await axiosInstance.post(`exam/exam-part/`, {
                examId,
                number: examPart.number,
                title: examPart.title,
                instruction: examPart.instruction,
                type: examPart.type,
            });
            const createdExamPart: ExamPart = examPartResponse.data.createdExamPart;

            const promises = examPart.questions.map(async(question) => {
                const response = axiosInstance.post(`exam/question/`, {
                    examPartId: createdExamPart.id,
                    number: question.number,
                    text: question.text,
                });
                return response;
            });

            const questionResponses = await Promise.all(promises);
            console.log("Question responses", questionResponses);
            
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data.error;
                return setError(errorMessage);
            } 
            return setError('Something went wrong. Please try again later.')
        } finally {
            setSubmitting(false);
        }
    }
    
    return (
        <div className='p-5 border border-zinc-200p-5 rounded-md'>
            <div className='flex items-center justify-between'>
                <h1 className='font-bold'>Part</h1>
                <div className='flex items-center space-x-2'>
                    <select
                        className='bg-zinc-100 p-2 rounded-md border border-zinc-300 text-sm'
                        onChange={(event) => setExamPart({...examPart, type: event.target.value as ExamPartType})}
                    >
                        <option value="MC">Multiple Choice</option>
                        <option value="FB">Fill in the Blank</option>
                        <option value="TF">True or False</option>
                        <option value="EW">Essay Writting</option>
                    </select>
                    <button 
                        className='text-blue-700 p-2 rounded-full hover:bg-blue-700 hover:text-white'
                    >
                        <AiOutlineDelete 
                            size={20} />
                    </button>
                </div>
            </div>

            <div className='mt-5'>
                <h1 className='font-semibold'>Instruction: </h1>
                <textarea 
                    rows={2}
                    placeholder={'Exam part instruction...'}
                    className='w-full p-2 rounded-md border border-zinc-200 resize-none'
                    onChange={((event) => setExamPart({...examPart, instruction: event.target.value}))}
                />
            </div>

            {examPart.questions.map(question => (
                <div key={question.number} className='flex mt-5'>
                    <span>{question.number}. </span>
                    <textarea
                        className='w-full ml-2 p-2 border border-zinc-200 rounded-md resize-none'
                        rows={1}
                        placeholder={`Question number ${question.number}`}
                        onChange={(event) => handleQuestionChange(
                            event.target.value, 
                            question.number
                        )}
                    />
                </div>
            ))}
            
            <div className='flex items-center justify-end space-x-5'>
                <button 
                    onClick={handleAddQuestion}
                    className='flex items-center mt-5 p-2 rounded-md text-blue-700 hover:bg-blue-700 hover:text-white'
                >
                    <AiOutlinePlus />
                    <span className='ml-2'>New Question</span>
                </button>
                <button 
                    onClick={handleSaveExamPart}
                    className='flex items-center mt-5 p-2 rounded-md bg-blue-700 text-white'>
                    <AiOutlineSave />
                    <span className='ml-2'>
                        {submitting ? 'Submitting...' : 'Save Part'}
                    </span>
                </button>
            </div>
        </div>
    )
}

export default ExamPartForm
