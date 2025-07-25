import { IAbsence } from './absence';

export interface IClass {
  id: number;
  name: string;
  class_workload: number;
  absence_limit: number;
  user_id: number;

  // user?: IUser;
  absences?: IAbsence[];
  // week_days?: IWeekDay[];
}
