import { Exam } from "@/app/types/exam.types";
import { NextRequest, NextResponse } from "next/server";
import z from 'zod';
import prisma from '@/prisma/db';

const createExamSchema = z.object({
    courseId: z.string(),
    title: z.string().min(1).max(255),
    description: z.string().min(1).max(255),
    durationMinutes: z.number().min(1),
    attemptLimit: z.number().min(1)
})

export async function POST(request: NextRequest) {
    const body: Exam = await request.json(); 
    
    const validation = createExamSchema.safeParse(body);
    if (!validation.success) {
        console.log(validation.error.errors[0]);

        return NextResponse.json({
            error: validation.error.errors[0].message,
        }, { status: 400});
    }

    const createdExam = await prisma.exam.create({
        data: {...body, status: 'DRAFT'}   
    });

    return NextResponse.json({createdExam}, {status: 201});
}
