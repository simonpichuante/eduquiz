"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let GamesService = class GamesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async startGame(dto) {
        const game = await this.prisma.game.create({
            data: {
                title: dto.title,
                mode: dto.mode ?? 'INDIVIDUAL',
                status: 'ACTIVE',
                durationSeconds: dto.durationSeconds ?? 120,
                institutionId: dto.institutionId,
                subjectId: dto.subjectId,
                courseId: dto.courseId,
                createdById: dto.createdById,
            },
        });
        const questions = await this.prisma.question.findMany({
            where: {
                subjectId: dto.subjectId,
                ...(dto.courseId ? { courseId: dto.courseId } : {}),
            },
            include: { answers: true },
            take: dto.questionLimit ?? 5,
        });
        return {
            game,
            questions,
        };
    }
    async submitAnswer(gameId, dto) {
        const game = await this.prisma.game.findUnique({
            where: { id: gameId },
            include: { participants: true },
        });
        if (!game) {
            throw new common_1.NotFoundException('Juego no encontrado');
        }
        const participant = (await this.prisma.gameParticipant.findFirst({
            where: { gameId, userId: dto.userId },
        })) ??
            (await this.prisma.gameParticipant.create({
                data: {
                    gameId,
                    userId: dto.userId,
                    score: 0,
                    correctAnswers: 0,
                    totalAnswers: 0,
                },
            }));
        const question = await this.prisma.question.findUnique({
            where: { id: dto.questionId },
            include: { answers: true },
        });
        if (!question) {
            throw new common_1.NotFoundException('Pregunta no encontrada');
        }
        const selectedAnswer = question.answers.find((answer) => answer.id === dto.selectedAnswerId);
        const isCorrect = Boolean(selectedAnswer?.isCorrect);
        await this.prisma.gameResponse.create({
            data: {
                participantId: participant.id,
                questionId: question.id,
                selectedAnswerId: selectedAnswer?.id,
                isCorrect,
            },
        });
        const updatedParticipant = await this.prisma.gameParticipant.update({
            where: { id: participant.id },
            data: {
                score: participant.score + (isCorrect ? 100 : 0),
                correctAnswers: participant.correctAnswers + (isCorrect ? 1 : 0),
                totalAnswers: participant.totalAnswers + 1,
            },
        });
        return {
            correct: isCorrect,
            explanation: question.explanation ?? 'Respuesta procesada correctamente.',
            updatedParticipant,
        };
    }
    async findOne(id) {
        const game = await this.prisma.game.findUnique({
            where: { id },
            include: {
                participants: true,
                subject: true,
                course: true,
            },
        });
        if (!game) {
            throw new common_1.NotFoundException('Juego no encontrado');
        }
        return game;
    }
};
exports.GamesService = GamesService;
exports.GamesService = GamesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GamesService);
//# sourceMappingURL=games.service.js.map