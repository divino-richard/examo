
export type ExamPartType = 'MC' | 'FB' | 'TF' | 'EW';

export interface Question {
    examPartId?: string;
    number: number;
    text: string;
}

export interface ExamPart {
    id?: string,
    number: number;
    title: string;
    instruction: string;
    type: ExamPartType;
    questions: Question[];
    createdAt?: Date;
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