import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSubjectDto } from './dto/create-subject.dto';

@Injectable()
export class SubjectsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateSubjectDto) {
    return this.prisma.subject.create({
      data: {
        name: dto.name,
        slug: dto.slug ?? dto.name.toLowerCase().replace(/\s+/g, '-'),
        institutionId: dto.institutionId,
      },
    });
  }

  findAll() {
    return this.prisma.subject.findMany({
      include: {
        courses: true,
        questions: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.subject.findUnique({
      where: { id },
      include: {
        courses: true,
        questions: {
          include: { answers: true },
        },
      },
    });
  }
}
