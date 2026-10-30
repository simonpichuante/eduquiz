import { CreateSubjectDto } from './dto/create-subject.dto';
import { SubjectsService } from './subjects.service';
export declare class SubjectsController {
    private readonly subjectsService;
    constructor(subjectsService: SubjectsService);
    create(dto: CreateSubjectDto): import(".prisma/client").Prisma.Prisma__SubjectClient<{
        id: string;
        institutionId: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        questions: {
            id: string;
            institutionId: string | null;
            createdAt: Date;
            updatedAt: Date;
            subjectId: string;
            prompt: string;
            difficulty: number;
            explanation: string | null;
            courseId: string | null;
        }[];
        courses: {
            id: string;
            institutionId: string | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            level: string;
            subjectId: string;
        }[];
    } & {
        id: string;
        institutionId: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
    })[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__SubjectClient<({
        questions: ({
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
        })[];
        courses: {
            id: string;
            institutionId: string | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            level: string;
            subjectId: string;
        }[];
    } & {
        id: string;
        institutionId: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
}
