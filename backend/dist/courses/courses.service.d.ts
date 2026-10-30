import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
export declare class CoursesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateCourseDto): import(".prisma/client").Prisma.Prisma__CourseClient<{
        id: string;
        institutionId: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        level: string;
        subjectId: string;
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
    } & {
        id: string;
        institutionId: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        level: string;
        subjectId: string;
    })[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__CourseClient<({
        subject: {
            id: string;
            institutionId: string | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            slug: string;
        };
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
    } & {
        id: string;
        institutionId: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        level: string;
        subjectId: string;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
}
