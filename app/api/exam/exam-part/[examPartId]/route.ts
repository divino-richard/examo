import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/db';

interface Params {
    params: {
        examPartId: string;
    }
}
export async function DELETE(request: NextRequest, {params}: Params) {
    const foundExamPart = await prisma.examPart.findUnique({
        where: {
            id: params.examPartId
        }
    })

    if (!foundExamPart) {
        return NextResponse.json({
            error: 'Exam part not found'
        })
    }

    await prisma.question.deleteMany({
        where: {
            examPartId: foundExamPart.id,
        }
    })
    
    const deletedExamPart = await prisma.examPart.delete({
        where: {
            id: foundExamPart.id
        }
    })

    return NextResponse.json({deletedExamPart}, {status: 200});
}