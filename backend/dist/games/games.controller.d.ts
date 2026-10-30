import { AnswerGameDto, StartGameDto } from './dto/game.dto';
import { GamesService } from './games.service';
export declare class GamesController {
    private readonly gamesService;
    constructor(gamesService: GamesService);
    start(dto: StartGameDto): Promise<{
        game: {
            id: string;
            institutionId: string | null;
            createdAt: Date;
            updatedAt: Date;
            subjectId: string | null;
            courseId: string | null;
            title: string;
            mode: string;
            status: string;
            durationSeconds: number;
            createdById: string | null;
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
    }>;
    answer(id: string, dto: AnswerGameDto): Promise<{
        correct: boolean;
        explanation: string;
        updatedParticipant: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            gameId: string;
            userId: string;
            score: number;
            correctAnswers: number;
            totalAnswers: number;
        };
    }>;
    findOne(id: string): Promise<{
        subject: {
            id: string;
            institutionId: string | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            slug: string;
        } | null;
        course: {
            id: string;
            institutionId: string | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            level: string;
            subjectId: string;
        } | null;
        participants: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            gameId: string;
            userId: string;
            score: number;
            correctAnswers: number;
            totalAnswers: number;
        }[];
    } & {
        id: string;
        institutionId: string | null;
        createdAt: Date;
        updatedAt: Date;
        subjectId: string | null;
        courseId: string | null;
        title: string;
        mode: string;
        status: string;
        durationSeconds: number;
        createdById: string | null;
    }>;
}
