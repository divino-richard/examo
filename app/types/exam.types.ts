
export type ExamPartType = 'MC' | 'FB' | 'TF' | 'EW';

export interface Question {
    id?: string; 
    examPartId?: string;
    number: number;
    text: string;
    choices?: Choice[];
    createdAt?: string;
}

export interface ExamPart {
    id?: string,
    number: number;
    title: string;
    instruction: string;
    type: ExamPartType;
    questions?: Question[];
    createdAt?: Date;
}

export interface Exam {
    id?: string;
    courseId?: string;
    title: string;
    description: string;
    durationMinutes: number;
    attemptLimit: number;
    status?: string;
    examPart?: ExamPart[];
    createdAt?: Date;
}

export interface Choice {
    id?: string;
    questionId?: string;
    letter: string;
    text: string;
    createdAt?: Date;
    updatedAt?: Date;
}
