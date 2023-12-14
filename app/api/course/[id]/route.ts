import prisma from "@/prisma/db";
import { Course } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

interface Params {
    params: {
        id: string;
    }
}

export async function GET (request: Request, {params}:Params) {
    if(!params.id) {
        return NextResponse.json({
            error: 'Invalid course id'
        }, {status: 400});
    }
    const course = await prisma.course.findUnique({
        where: {
            id: params.id
        }
    })
    return NextResponse.json({course}, {status: 200});
}

const updateCourseSchema = z.object({
    title: z.string().min(1).max(50),
    description: z.string().min(1),
})

export async function PUT(request: NextRequest, {params}: Params) {
    const body: Course = await request.json();
    const courseId = params.id;

    if(!courseId) {
        return NextResponse.json({error: 'Empty course id'}, {status: 400});
    }

    const validation = updateCourseSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json({
            error: validation.error.errors[0].message
        }, {status: 400});
    }

    const foundCourse = await prisma.course.findUnique({
        where: {
            id: courseId
        }
    });
    if (!foundCourse) {
        return NextResponse.json({error: 'No course found!'}, {status: 400});
    }

    const updatedCourse = await prisma.course.update({
        where: {
            id: courseId
        },
        data: {
            title: body.title,
            description: body.description,
        }
    });

    return NextResponse.json({updatedCourse}, {status: 200});
}

export async function DELETE(request: NextRequest, {params}: Params) {
    const courseId = params.id;

    if (!courseId) {
        return NextResponse.json({error: 'Empty course id'}, {status: 400});
    }

    const foundCourse = await prisma.course.findUnique({
        where: {
            id: courseId,
        }
    });
    if (!foundCourse) {
        return NextResponse.json({error: 'Course not found!'});
    }

    const deletedCourse =  await prisma.course.delete({
        where: {
            id: courseId,
        }
    });
    return NextResponse.json({deletedCourse}, {status: 200});
}
