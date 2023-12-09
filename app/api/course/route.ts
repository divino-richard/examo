import { Course } from "@/app/types/course.types";
import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";
import z from 'zod';

const createCourseSchema = z.object({
    title: z.string().min(1).max(50),
    description: z.string().min(1),
});

export async function POST(request: NextRequest) {
    const body: Course = await request.json();
    
    const validation = createCourseSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json({
            error: validation.error.errors[0].message
        }, {status: 400});
    }

    const createdCourse = await prisma.courses.create({
        data: {
            title: body.title,
            description: body.description,
        }
    });
    
    return NextResponse.json({newCourse: createdCourse}, {status: 201});
}

export async function GET() {
    const courses: Course[] = await prisma.courses.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });

    return NextResponse.json({courses}, {status: 200});
}
