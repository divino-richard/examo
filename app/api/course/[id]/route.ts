import prisma from "@/prisma/db";
import { NextResponse } from "next/server";

export async function GET (request: Request, {params}:{params: {id: string}}) {
    if(!params.id) {
        return NextResponse.json({
            error: 'Invalid course id'
        }, {status: 400});
    }
    const course = await prisma.courses.findUnique({
        where: {
            id: params.id
        }
    })
    return NextResponse.json({course}, {status: 200});
}
