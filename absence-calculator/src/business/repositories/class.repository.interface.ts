import { IClass } from 'src/domains/class';

export interface IClassRepository {
  findById(id: number): Promise<IClass | null>;
}

export const ClassRepositoryToken = Symbol.for('ClassRepositoryToken');
