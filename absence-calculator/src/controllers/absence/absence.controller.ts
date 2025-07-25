import { Body, Controller, Post } from '@nestjs/common';
import { CreateAbsenceValidator } from './validators/create-absence.validator';
import { CreateAbsenceUseCase } from 'src/business/useCases/absence/create-absence.usecase';

@Controller('/absence')
export class AbsenceController {
  constructor(private readonly createAbsenceUseCase: CreateAbsenceUseCase) {}

  @Post()
  async create(@Body() body: CreateAbsenceValidator) {
    return await this.createAbsenceUseCase.execute(body);
  }
}
