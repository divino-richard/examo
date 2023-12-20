'use client';

import axiosInstance from '@/app/config/app.config';
import { Choice, Exam, Question } from '@/app/types/exam.types';
import { Popconfirm, Divider, Spin } from 'antd';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react'
import { AiOutlineClockCircle, AiOutlineClose, AiOutlinePlus, AiOutlineSave } from 'react-icons/ai'

interface Params {
    params: {
        examId: string;
    }
}

interface QuestionChangeProps {
    value: string;
    examPartIndex: number;
    questionIndex: number;
}

interface ChoiceChangeProps {
    value: string;
    examPartIndex: number;
    questionIndex: number;
    choiceIndex: number;
}

function Page({params}: Params) {
    const [savingExam, setSavingExam] = useState(false);
    const [errorSavingExam, setErrorSavingExam] = useState('');
    const [exam, setExam] = useState<Exam>({
        title: 'Untitled Exam',
        attemptLimit: 5,
        durationMinutes: 120,
        description: '',
        examPart: [{
            number: 1,
            instruction: 'Instruction here...',
            title: 'Untitled Exam Part',
            type: 'MC',
            questions: [{
                number: 1,
                text: 'Question text',
                choices: []
            }]
        }]
    });

    console.log("Exam: ", exam);

    useEffect(() => {
        const getExamById = async () => {
            try {
                const response = await axiosInstance.get(`exam/details/${params.examId}`);
                // setExam(response.data.exam);
            } catch (error) {
                console.log(error);
            }
        }

        getExamById();
    }, [params.examId]);

    const handleSaveExam = () => {
        setSavingExam(true);
        try {
            
        } catch (error) {
            if(error instanceof AxiosError) {
                const errorMessage = error.response?.data.error
                return setErrorSavingExam(errorMessage);
            }
            return setErrorSavingExam('Something went wrong. Please try again later.');
        } finally {
            setSavingExam(false);
        }
    }

    const handleAddExamPart = () => {
        const totalExamPart: number =  exam?.examPart?.length ?? 0;
        exam?.examPart?.push({
            number: totalExamPart + 1,
            instruction: 'Empty instruction',
            title: 'Untitled Exam Part',
            type: 'MC',
            questions: [{
                number: 1,
                text: 'Question text',
                choices: []
            }]
        });
        setExam({...exam, examPart: exam.examPart});
    }

    const handleAddQuestion = (examPartIndex: number) => {
        if(exam.examPart) {
            const targetExamPart = exam.examPart[examPartIndex];
            const totalQuestions: number = targetExamPart.questions?.length ?? 0;

            const questionNumber = totalQuestions + 1;
            const question: Question = {
                number: questionNumber,
                text: `Question number ${questionNumber}`,
                choices: []
            }

            exam.examPart[examPartIndex].questions?.push(question);
            setExam({...exam, examPart: exam.examPart});
        }
    }

    const CHOICE_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']
    const handleAddChoice = (examPartIndex: number, questionIndex: number) => {
        if(!exam.examPart) return;

        const questions = exam.examPart[examPartIndex].questions;

        if(!questions) return;

        const targetQuestion = questions[questionIndex];
        const totalChoices: number = targetQuestion.choices?.length ?? 0;

        if(totalChoices >= CHOICE_LETTERS.length) {
            return alert('Choices exceed');
        }

        const choiceNumber = totalChoices + 1;
        const choice: Choice = {
            letter: CHOICE_LETTERS[choiceNumber - 1],
            text: 'Choice text',
        }

        targetQuestion.choices?.push(choice);
        setExam({...exam, examPart: exam.examPart});
    }

    const handleDeleteChoice = (examPartIndex: number, questionIndex: number) => {
        if(!exam.examPart) return;

        const questions = exam.examPart[examPartIndex].questions;

        if(!questions) return;

        const targetQuestion = questions[questionIndex];
        targetQuestion.choices?.pop();

        setExam({...exam, examPart: exam.examPart});
    }

    const handleExamPartTitleChange = (value: string, examPartIndex: number) => {
        if(!exam.examPart) return;
        exam.examPart[examPartIndex].title = value;
        setExam({...exam, examPart: exam.examPart});
    }

    const handleInstructionChange = (value: string, examPartIndex: number) => {
        if(!exam.examPart) return;
        exam.examPart[examPartIndex].instruction = value;
        setExam({...exam, examPart: exam.examPart});
    }

    const handleQuestionChange = (props: QuestionChangeProps) => {
        const {value, examPartIndex, questionIndex} = props;

        if(!exam.examPart) return;

        const questions = exam.examPart[examPartIndex].questions;

        if(!questions) return;

        const targetQuestion = questions[questionIndex];
        targetQuestion.text = value;

        setExam({...exam, examPart: exam.examPart});
    }

    const handleChangeChoice = (props: ChoiceChangeProps) => {
        const {value, examPartIndex, questionIndex, choiceIndex} = props;
        if(!exam.examPart) return;

        const questions = exam.examPart[examPartIndex].questions;
        if(!questions) return;

        const choices = questions[questionIndex].choices;
        if(!choices) return;

        const targetChoice = choices[choiceIndex];
        targetChoice.text = value;

        setExam({...exam, examPart: exam.examPart});
    }

    return (
        <div className='bg-white p-5'>
            {errorSavingExam && <h1 className='text-red-500 text-center'>{errorSavingExam}</h1>}
            <header className='flex items-center'>
                <input 
                    className="w-full px-2 py-1 font-semibold outline-none focus:border-b border-zinc-500 focus:bg-zinc-100" 
                    type="text" 
                    value={exam?.title}
                    placeholder='Exam title'
                    onChange={(event) => setExam({...exam, title: event.target.value})}
                />
                <div className='flex items-center space-x-2'>
                    <div className='flex items-center px-2'>
                        <AiOutlineClockCircle size={16}/>
                        <span className='whitespace-nowrap'>{`${exam.durationMinutes} mins`}</span>
                    </div>
                </div>
            </header>
            
            {exam?.examPart && exam.examPart.map((examPart, examPartIndex) => (
                <div key={examPart.number} className='p-5 border border-zinc-200 rounded-sm mt-5'>
                    <header className='flex items-center'>
                        <input 
                            type="text" 
                            value={examPart.title}
                            className='w-full py-1 outline-none focus:border-b border-zinc-500 focus:bg-zinc-100'
                            placeholder='Exam part text'
                            onChange={(event) => handleExamPartTitleChange(event.target.value, examPartIndex)}
                        />
                        <div className='px-2'>
                            <Popconfirm
                                title="Delete Exam Part"
                                description="Are you sure to delete the entire exam part?"
                                // onConfirm={confirm}
                                // onCancel={cancel}
                                okText="Delete"
                                cancelText="Cancel"
                                okType='danger'
                            >
                                <button className='hover:text-blue-700'>
                                    <AiOutlineClose size={16}/>
                                </button>
                            </Popconfirm>
                        </div>
                    </header>

                    <div className='mt-5'>
                        <h1>Instruction:</h1>
                        <textarea 
                            rows={3}
                            value={examPart.instruction}
                            className='w-full p-2 border border-zinc-200 resize-none rounded-md focus:border-blue-500 outline-none'
                            onChange={(event) => handleInstructionChange(event.target.value, examPartIndex)}
                        />
                    </div>

                    {examPart.questions?.map((question, questionIndex) => (
                        <div key={question.number} className='mt-5'>   
                            <div className='flex mt-2 space-x-2'>
                                <span>{question.number}. </span>
                                <textarea
                                    rows={2} 
                                    value={question.text} 
                                    placeholder='Question text'
                                    className='w-full resize-none p-1 border border-zinc-200 rounded-md text-base text-zinc-500 outline-none focus:border-blue-700'
                                    onChange={(event) => {
                                        const questionChangePayload: QuestionChangeProps = {
                                            value: event.target.value,
                                            examPartIndex,
                                            questionIndex,
                                        }
                                        handleQuestionChange(questionChangePayload);
                                    }}
                                />
                            </div>
                            <div className='flex flex-wrap items-center'>
                                {question.choices?.map((choice, choiceIndex) => (
                                    <div 
                                        key={choiceIndex} 
                                        className='py-2 mx-5 flex items-center space-x-1'
                                    >
                                        <span>{choice.letter}. </span>
                                        <input 
                                            type="text" 
                                            value={choice.text} 
                                            className='px-2 outline-none rounded-md text-zinc-500 border focus:border-blue-700 text-base'
                                            onChange={(event) => {
                                                const changeChoicePayload: ChoiceChangeProps = {
                                                    value: event.target.value,
                                                    examPartIndex,
                                                    questionIndex,
                                                    choiceIndex,
                                                }
                                                handleChangeChoice(changeChoicePayload);
                                            }}
                                        />
                                        <button 
                                            onClick={() => handleDeleteChoice(examPartIndex, questionIndex)}
                                            className='hover:text-blue-700'
                                        >
                                            <AiOutlineClose size={16}/>
                                        </button>
                                    </div>
                                ))}
                                <button 
                                    onClick={() => handleAddChoice(examPartIndex, questionIndex)}
                                    className='flex items-center space-x-2 text-blue-700 text-base'
                                >
                                    <AiOutlinePlus size={16}/>
                                    <span>Choice</span>
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className='flex justify-end'>
                        <button 
                            onClick={() => handleAddQuestion(examPartIndex)}
                            className='px-1 flex items-center space-x-2 text-blue-700 text-base mt-2 border border-blue-700 border-dashed rounded-md'>
                            <AiOutlinePlus size={16}/>
                            <span>Question</span>
                        </button>
                    </div>
                </div>
            ))}

            <div className=''>
                <Divider style={{borderColor: 'blue'}}>
                    <button 
                        onClick={handleAddExamPart}
                        className='flex items-center space-x-2 text-blue-700'
                    >
                        <AiOutlinePlus size={16}/>
                        <span className='whitespace-nowrap font-semibold'>Exam Part</span>
                    </button>
                </Divider>
            </div>

            <button 
                className='flex items-center space-x-2 bg-blue-700 text-white px-2 py-1 rounded-md'
                disabled={savingExam}
            >
                <AiOutlineSave size={16}/>
                <span>
                    {savingExam ? 'Saving...' : 'Save Exam'}
                </span>
            </button>
        </div>
    )
}

export default Page
