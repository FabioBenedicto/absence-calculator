import { Module } from '@nestjs/common';
import { ControllerModule } from '../../controllers/controller.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ControllerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
  ],
})
export class AppModule {}
