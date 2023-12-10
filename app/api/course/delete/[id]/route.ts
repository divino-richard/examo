import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/db';

interface Params {
    params: {
        id: string;
    }
}

export async function DELETE(request: NextRequest, {params}: Params) {
    const courseId = params.id;

    if (!courseId) {
        return NextResponse.json({error: 'Empty course id'}, {status: 400});
    }

    const foundCourse = await prisma.courses.findUnique({
        where: {
            id: courseId,
        }
    });
    if (!foundCourse) {
        return NextResponse.json({error: 'Course not found!'});
    }

    const deletedCourse =  await prisma.courses.delete({
        where: {
            id: courseId,
        }
    });
    return NextResponse.json({deletedCourse}, {status: 200});
}
