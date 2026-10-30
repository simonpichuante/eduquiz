import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionsService } from './questions.service';
export declare class QuestionsController {
    private readonly questionsService;
    constructor(questionsService: QuestionsService);
    create(dto: CreateQuestionDto): import(".prisma/client").Prisma.Prisma__QuestionClient<{
        answers: {
            id: string;
            text: string;
            isCorrect: boolean;
            order: number;
            questionId: string;
        }[];
    } & {
        id: string;
        institutionId: string | null;
        createdAt: Date;
        updatedAt: Date;
        subjectId: string;
        prompt: string;
        difficulty: number;
        explanation: string | null;
        courseId: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        subject: {
            id: string;
            institutionId: string | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            slug: string;
        };
        course: {
            id: string;
            institutionId: string | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            level: string;
            subjectId: string;
        } | null;
        answers: {
            id: string;
            text: string;
            isCorrect: boolean;
            order: number;
            questionId: string;
        }[];
    } & {
        id: string;
        institutionId: string | null;
        createdAt: Date;
        updatedAt: Date;
        subjectId: string;
        prompt: string;
        difficulty: number;
        explanation: string | null;
        courseId: string | null;
    })[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__QuestionClient<({
        subject: {
            id: string;
            institutionId: string | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            slug: string;
        };
        course: {
            id: string;
            institutionId: string | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            level: string;
            subjectId: string;
        } | null;
        answers: {
            id: string;
            text: string;
            isCorrect: boolean;
            order: number;
            questionId: string;
        }[];
    } & {
        id: string;
        institutionId: string | null;
        createdAt: Date;
        updatedAt: Date;
        subjectId: string;
        prompt: string;
        difficulty: number;
        explanation: string | null;
        courseId: string | null;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
}
