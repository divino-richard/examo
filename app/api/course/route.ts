import { Course } from "@/app/types/course.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    console.log("Body: ", body);
}
