import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/db';

interface Params {
    params: {
        courseId: string;
    }
}
export async function GET(request: NextRequest, {params}: Params) {
    const exams = await prisma.exam.findMany({
        where: {
            courseId: params.courseId,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return NextResponse.json({exams}, {status: 200});
}
