export declare class StartGameDto {
    title: string;
    subjectId?: string;
    courseId?: string;
    institutionId?: string;
    createdById?: string;
    mode?: string;
    durationSeconds?: number;
    questionLimit?: number;
}
export declare class AnswerGameDto {
    userId: string;
    questionId: string;
    selectedAnswerId: string;
}
