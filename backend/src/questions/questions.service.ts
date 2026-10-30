import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';

@Injectable()
export class QuestionsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateQuestionDto) {
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

  findOne(id: string) {
    return this.prisma.question.findUnique({
      where: { id },
      include: {
        answers: true,
        subject: true,
        course: true,
      },
    });
  }

  getRandomBySubject(subjectId: string, limit = 5) {
    return this.prisma.question.findMany({
      where: { subjectId },
      include: { answers: true },
      take: limit,
    });
  }
}
