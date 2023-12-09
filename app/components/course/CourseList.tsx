'use client'

import axiosInstance from '@/app/config/app.config';
import { Course } from '@/app/types/course.types';
import React, { useState, useEffect } from 'react'
import CourseCard from './CourseCard';

function CourseList() {
    const [courses, setCourses] = useState<Course[] | null>(null);

    useEffect(() => {
        const getCourses = async () => {
            const response = await axiosInstance.get('course');
            const courses: Course[] = response.data.courses;
            setCourses(courses);
        }
        getCourses();
    }, []);

    return (
        <div className='flex flex-wrap'>
            {courses && courses.map((course: Course) => (
                <CourseCard key={course.id} data={course}/>
            ))}
        </div>
    )
}

export default CourseList
