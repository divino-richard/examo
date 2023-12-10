import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";
import { z } from "zod";
import { Course } from "@/app/types/course.types";


interface Params {
    params: {
        id: string;
    }
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

    const foundCourse = await prisma.courses.findUnique({
        where: {
            id: courseId
        }
    });
    if (!foundCourse) {
        return NextResponse.json({error: 'No course found!'}, {status: 400});
    }

    const updatedCourse = await prisma.courses.update({
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
