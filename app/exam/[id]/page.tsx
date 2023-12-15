'use client'

import React, { useEffect, useState } from 'react'
import { AiOutlinePlus, AiOutlineSave, AiOutlineDelete } from 'react-icons/ai'
import RomanNumerals from '@/app/constants/romanNumerals'
import { Exam, Question, Test, TestType } from '@/app/types/exam.types'
import axiosInstance from '@/app/config/app.config'
import { AxiosError } from 'axios'

interface Params {
    params: {
        id: string;
    }
} 

function Page({params}: Params) {
    const [exam, setExam] = useState<Exam | null>(null);
    const [error, setError] = useState('');
    const [gettingExam, setGettingExam] = useState(false);

    useEffect(() => {
        setGettingExam(true);
        const getExam = async () => {
            try {
                const response = await axiosInstance.get(`exam/${params.id}`);
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
    }, [params.id]);

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

    // const renderTest = (test: Test) => (
    //     <div key={test.number} className='mt-5 border border-zinc-200 p-5 rounded-md hover:shadow-lg'>
    //         <div className='flex items-center justify-between'>
    //             <h1 className='font-bold'>Test {RomanNumerals[test.number-1]}</h1>
    //             <div className='flex items-center space-x-2'>
    //                 <select 
    //                     className='bg-zinc-100 p-2 rounded-md border border-zinc-300 text-sm'
    //                     defaultValue={test.type} 
    //                     onChange={(event) => handleTestTypeChange(event.target.value as TestType, test.number)}>
    //                     <option value="MC">Multiple Choice</option>
    //                     <option value="FB">Fill in the Blank</option>
    //                     <option value="TF">True or False</option>
    //                     <option value="EW">Essay Writting</option>
    //                 </select>
    //                 <button 
    //                     onChange={() => handleRemoveTest(test.number)}
    //                     className='text-blue-700 p-2 rounded-full hover:bg-blue-700 hover:text-white'
    //                 >
    //                     <AiOutlineDelete 
    //                         size={20} />
    //                 </button>
    //             </div>
    //         </div>

    //         <div className='mt-5'>
    //             <h1 className='font-semibold'>Instruction: </h1>
    //             <textarea 
    //                 rows={2}
    //                 placeholder={`Test ${RomanNumerals[test.number-1]} instruction...`}
    //                 className='w-full p-2 rounded-md border border-zinc-200 resize-none'
    //                 onChange={(event) => handleInstructionChange(event.target.value, test.number)}
    //             />
    //         </div>

    //         {exam.tests[test.number-1].questions.map((question) => (
    //             <div key={question.number} className='flex mt-5'>
    //                 <span>{question.number}. </span>
    //                 <textarea
    //                     onChange={(event) => handleQuestionChange(
    //                         event.target.value,
    //                         test.number, 
    //                         question.number
    //                     )}
    //                     className='w-full ml-2 p-2 border border-zinc-200 rounded-md resize-none'
    //                     rows={1}
    //                     placeholder={`Question number ${question.number}`}
    //                 />
    //             </div>
    //         ))}
            
    //         <div className='flex justify-end'>
    //             <button 
    //                 onClick={() => handleAddQuestion(test.number)}
    //                 className='flex items-center mt-5 p-2 rounded-md text-blue-700 hover:bg-blue-700 hover:text-white'
    //             >
    //                 <AiOutlinePlus />
    //                 <span className='ml-2'>New Question</span>
    //             </button>
    //         </div>
    //     </div>
    // )

    return (
        <div className='bg-white p-5 rounded-md shadow-md'>
            <div>
                <h1>{}</h1>
            </div>
            {/* {exam.tests.map((test) => (
                // renderTest(test)
            ))} */}

            <div className='flex items-center space-x-2 mt-5'>
                <div className='w-full border-b border-blue-400'/>
                <div className='w-1/4'>
                    <button 
                        // onClick={handleAddTest}
                        className='mx-auto flex items-center px-2 text-blue-700'
                    >
                        <AiOutlinePlus />
                        <span className='ml-2'>New Test</span>
                    </button>
                </div>
                <div className='w-full border-b border-blue-400'/>
            </div>

            <button className='flex items-center mt-5 p-2 rounded-md bg-blue-700 text-white'>
                <AiOutlineSave />
                <span className='ml-2'>Save Exam</span>
            </button>
        </div>
    )
}

export default Page
