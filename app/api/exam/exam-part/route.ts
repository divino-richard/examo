import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from '@/prisma/db';

const createExamPartSchema = z.object({
    examId: z.string(),
    number: z.number().min(1),
    title: z.string(),
    instruction: z.string(),
    type: z.string(),
});

export async function POST(request: NextRequest) {
    const body = await request.json();

    const validation = createExamPartSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json({
            error: validation.error.errors[0].message
        })
    }

    const createdExamPart = await prisma.examPart.create({
        data: {
            examId: body.examId,
            number: body.number,
            title: body.title,
            instruction: body.instruction,
            type: body.type,
        }
    });

    return NextResponse.json({createdExamPart}, {status: 201});
}
