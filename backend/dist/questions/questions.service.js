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
exports.QuestionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let QuestionsService = class QuestionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(dto) {
        return this.prisma.question.create({
            data: {
                prompt: dto.prompt,
                difficulty: dto.difficulty ?? 1,
                explanation: dto.explanation,
                subjectId: dto.subjectId,
                courseId: dto.courseId,
                institutionId: dto.institutionId,
                answers: {
                    create: dto.answers.map((answer) => ({
                        text: answer.text,
                        isCorrect: answer.isCorrect ?? false,
                        order: answer.order ?? 0,
                    })),
                },
            },
            include: {
                answers: true,
            },
        });
    }
    findAll() {
        return this.prisma.question.findMany({
            include: {
                answers: true,
                subject: true,
                course: true,
            },
        });
    }
    findOne(id) {
        return this.prisma.question.findUnique({
            where: { id },
            include: {
                answers: true,
                subject: true,
                course: true,
            },
        });
    }
    getRandomBySubject(subjectId, limit = 5) {
        return this.prisma.question.findMany({
            where: { subjectId },
            include: { answers: true },
            take: limit,
        });
    }
};
exports.QuestionsService = QuestionsService;
exports.QuestionsService = QuestionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], QuestionsService);
//# sourceMappingURL=questions.service.js.map