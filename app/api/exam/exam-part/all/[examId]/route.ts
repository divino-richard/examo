import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/db';

interface Params {
    params: {
        examId: string;
    }
}

export async function GET(request: NextRequest, {params}: Params) {
    const examParts = await prisma.examPart.findMany({
        where: {
            examId: params.examId,
        },
        orderBy: {
            createdAt: 'desc',
        }
    });

    return NextResponse.json({examParts}, {status: 200});
}
