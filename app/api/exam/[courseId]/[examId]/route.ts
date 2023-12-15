import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/db';

interface Params {
    params: {
        examId: string;
    }
}

export async function GET(request: NextRequest, {params}: Params) {
    const exam = await prisma.exam.findUnique({
        where: {
            id: params.examId,
        }
    });

    return NextResponse.json({exam}, {status: 200});
}