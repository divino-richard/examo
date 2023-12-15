import { NextRequest, NextResponse } from "next/server";
import z from 'zod';
import prisma from '@/prisma/db';
import { Question } from "@/app/types/exam.types";

const createQuestionSchema = z.object({
    examPartId: z.string(),
    number: z.number().min(1),
    text: z.string(),
})

export async function POST (request: NextRequest) {
    const body: Question = await request.json();

    const validation = createQuestionSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json({
            error: validation.error.errors[0].message,
        }, {status: 400});
    }

    if (body.examPartId) {
        const createdQuestion = await prisma.question.create({
            data: {
                examPartId: body.examPartId,
                number: body.number,
                text: body.text,
            }
        }); 
        return NextResponse.json({createdQuestion}, {status: 201})
    }
}