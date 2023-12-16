import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/db';
import { number } from "zod";

interface Params {
    params: {
        examId: string;
    }
}

export async function GET(request: NextRequest, {params}: Params) {
    const exam = await prisma.exam.findUnique({
        where: {
            id: params.examId,
        },
        include: {
            examPart: {
                include: {
                    questions: {
                        orderBy: {
                            number: 'asc',
                        }
                    },
                },
                orderBy: {
                    number: 'asc'
                }
            },
        },
    });

    return NextResponse.json({exam}, {status: 200});
}