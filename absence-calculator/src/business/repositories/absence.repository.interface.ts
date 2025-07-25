import { IAbsence } from 'src/domains/absence';
import { ICreateAbsenceDTO } from '../dtos/absence/create-absence.dto';
import { ICreateAbsencesDTO } from '../dtos/absence/create-absences.dto';

export interface IAbsenceRepository {
  create(data: ICreateAbsenceDTO): Promise<IAbsence>;
  createMany(data: ICreateAbsencesDTO): Promise<void>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<IAbsence | null>;
  findByClassIdAndDate(class_id: number, date: Date): Promise<IAbsence | null>;
  countAbsences(class_id: number): Promise<number>;
  // findByLocation(location: string): Promise<IBanner | null>;
  // findAllAndCount(options: IListBannersDTO): Promise<IFindAndCount<IBanner>>;
  // countByIds(ids: number[]): Promise<number>;
}

export const AbsenceRepositoryToken = Symbol.for('AbsenceRepositoryToken');
