
export type TestType = 'MC' | 'FB' | 'TF' | 'EW';

export interface Question {
    number: number;
    text: string;
}

export interface Test {
    number: number;
    title: string;
    instruction: string;
    type: TestType;
    questions: Question[];
}

export interface Exam {
    id?: string;
    courseId: string;
    title: string;
    description: string;
    durationMinutes: number;
    attemptLimit: number;
    status?: String;
    createdAt?: Date;
}