import { Inject, Injectable } from '@nestjs/common';
import {
  AbsenceRepositoryToken,
  IAbsenceRepository,
} from 'src/business/repositories/absence.repository.interface';
import {
  ClassRepositoryToken,
  IClassRepository,
} from 'src/business/repositories/class.repository.interface';
import { IAbsence } from 'src/domains/absence';

interface IRequest {
  date: Date;
  user_id: number;
  class_id: number;
}

@Injectable()
export class CreateAbsenceUseCase {
  constructor(
    @Inject(AbsenceRepositoryToken)
    private readonly absenceRepository: IAbsenceRepository,

    @Inject(ClassRepositoryToken)
    private readonly classRepository: IClassRepository,
  ) {}

  public async execute(request: IRequest): Promise<IAbsence> {
    const userClass = await this.classRepository.findById(request.class_id);

    if (!userClass) {
      throw new Error();
    }

    const already_created_absence =
      await this.absenceRepository.findByClassIdAndDate(
        request.class_id,
        request.date,
      );

    if (already_created_absence) {
      throw new Error();
    }

    const absence_count = await this.absenceRepository.countAbsences(
      request.class_id,
    );

    if (absence_count + 1 >= userClass.absence_limit) {
      throw new Error();
    }

    return await this.absenceRepository.create(request);
  }
}
