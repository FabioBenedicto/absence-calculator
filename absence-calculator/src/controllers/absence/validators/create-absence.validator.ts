import { Type } from 'class-transformer';
import { IsDate, IsNumber } from 'class-validator';

export class CreateAbsenceValidator {
  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsNumber()
  user_id: number;

  @IsNumber()
  class_id: number;
}
