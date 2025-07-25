import { Inject, Injectable } from '@nestjs/common';
import {
  AbsenceRepositoryToken,
  IAbsenceRepository,
} from 'src/business/repositories/absence.repository.interface';
import {
  ClassRepositoryToken,
  IClassRepository,
} from 'src/business/repositories/class.repository.interface';

interface IRequest {
  dates: Date[];
  user_id: number;
  class_id: number;
}

@Injectable()
export class CreateAbsencesUseCase {
  constructor(
    @Inject(AbsenceRepositoryToken)
    private readonly absenceRepository: IAbsenceRepository,

    @Inject(ClassRepositoryToken)
    private readonly classRepository: IClassRepository,
  ) {}

  public async execute(request: IRequest): Promise<void> {
    const userClass = await this.classRepository.findById(request.class_id);

    if (!userClass) {
      throw new Error();
    }

    await Promise.all(
      request.dates.map(async (date) => {
        const already_created_absence =
          await this.absenceRepository.findByClassIdAndDate(
            request.class_id,
            date,
          );

        if (already_created_absence) {
          throw new Error();
        }
      }),
    );

    const absence_count = await this.absenceRepository.countAbsences(
      request.class_id,
    );

    if (absence_count + request.dates.length >= userClass.absence_limit) {
      throw new Error();
    }

    await this.absenceRepository.createMany(request);
  }
}
