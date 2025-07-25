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

@Controller('/class')
export class ClassController {
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
    return await this.aiProvider.extractClasses(file.buffer, file.mimetype);
  }
}
