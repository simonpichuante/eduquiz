export declare class CreateQuestionAnswerDto {
    text: string;
    isCorrect?: boolean;
    order?: number;
}
export declare class CreateQuestionDto {
    prompt: string;
    difficulty?: number;
    explanation?: string;
    subjectId: string;
    courseId?: string;
    institutionId?: string;
    answers: CreateQuestionAnswerDto[];
}
