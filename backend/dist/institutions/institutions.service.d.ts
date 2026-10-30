import { PrismaService } from '../prisma/prisma.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
export declare class InstitutionsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateInstitutionDto): import(".prisma/client").Prisma.Prisma__InstitutionClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        shortName: string | null;
        rut: string | null;
        address: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        shortName: string | null;
        rut: string | null;
        address: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        shortName: string | null;
        rut: string | null;
        address: string | null;
    }>;
}
