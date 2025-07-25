import {
  Controller,
  Inject,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  AiProviderToken,
  IAiProvider,
} from 'src/business/providers/ai.provider.interface';

@Controller('/holiday')
export class HolidayController {
  constructor(
    @Inject(AiProviderToken)
    private readonly aiProvider: IAiProvider,
  ) {}

  @Post('/extract')
  @UseInterceptors(FileInterceptor('file'))
  async extract(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return await this.aiProvider.extractHolidays(file.buffer, file.mimetype);
  }
}
