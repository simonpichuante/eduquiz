import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AnswerGameDto, StartGameDto } from './dto/game.dto';

@Injectable()
export class GamesService {
  constructor(private readonly prisma: PrismaService) {}

  async startGame(dto: StartGameDto) {
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

  async submitAnswer(gameId: string, dto: AnswerGameDto) {
    const game = await this.prisma.game.findUnique({
      where: { id: gameId },
      include: { participants: true },
    });

    if (!game) {
      throw new NotFoundException('Juego no encontrado');
    }

    const participant =
      (await this.prisma.gameParticipant.findFirst({
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
      throw new NotFoundException('Pregunta no encontrada');
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

  async findOne(id: string) {
    const game = await this.prisma.game.findUnique({
      where: { id },
      include: {
        participants: true,
        subject: true,
        course: true,
      },
    });

    if (!game) {
      throw new NotFoundException('Juego no encontrado');
    }

    return game;
  }
}
