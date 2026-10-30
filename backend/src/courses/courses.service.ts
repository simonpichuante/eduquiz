import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateCourseDto) {
    return this.prisma.course.create({
      data: {
        name: dto.name,
        level: dto.level ?? 'Básico',
        subjectId: dto.subjectId,
        institutionId: dto.institutionId,
      },
    });
  }

  findAll() {
    return this.prisma.course.findMany({
      include: {
        subject: true,
        questions: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.course.findUnique({
      where: { id },
      include: {
        subject: true,
        questions: {
          include: { answers: true },
        },
      },
    });
  }
}
