'use client'

import axiosInstance from '@/app/config/app.config';
import { Course } from '@/app/types/course.types';
import React, { useState, useEffect } from 'react'
import CourseCard from './CourseCard';
import Link from 'next/link';

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
        <div className='grid gap-5 grid-cols-4 mt-5'>
            {courses && courses.map((course: Course) => (
                <Link  key={course.id} href={`courses/${course.id}`}>
                    <CourseCard data={course}/>
                </Link>
            ))}
        </div>
    )
}

export default CourseList
