import { IAbsenceRepository } from 'src/business/repositories/absence.repository.interface';
import { PrismaService } from '../database/prisma/prisma.service';
import { ICreateAbsenceDTO } from 'src/business/dtos/absence/create-absence.dto';
import { IAbsence } from 'src/domains/absence';
import { ICreateAbsencesDTO } from 'src/business/dtos/absence/create-absences.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AbsenceRepository implements IAbsenceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: ICreateAbsenceDTO): Promise<IAbsence> {
    return await this.prisma.absence.create({ data });
  }

  async createMany(data: ICreateAbsencesDTO): Promise<void> {
    await this.prisma.absence.createMany({
      data: data.dates.map((date) => {
        return {
          date,
          user_id: data.user_id,
          class_id: data.user_id,
        };
      }),
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.absence.delete({ where: { id } });
  }

  async findById(id: number): Promise<IAbsence | null> {
    return await this.prisma.absence.findUnique({ where: { id } });
  }

  async findByClassIdAndDate(
    class_id: number,
    date: Date,
  ): Promise<IAbsence | null> {
    const iso_date = date.toISOString().split('T')[0];

    const start_day = new Date(`${iso_date}T00:00:00.000Z`);
    const end_day = new Date(`${iso_date}T23:59:59.999Z`);

    return await this.prisma.absence.findFirst({
      where: {
        class_id,
        date: {
          gte: start_day,
          lte: end_day,
        },
      },
    });
  }

  async countAbsences(class_id: number): Promise<number> {
    return await this.prisma.absence.count({
      where: {
        id: class_id,
      },
    });
  }
}
