import { CryptographyModule } from '@/cryptography/cryptography.module';
import { DatabaseModule } from '@/database/database.module';
import { CreateUserService } from '@/services/create-user.service';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { CreateUserController } from './controllers/create-user.controller';
import { ZodValidationGuard } from './guards/zod-validation.guard';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CreateUserController],
  providers: [
    CreateUserService,
    {
      provide: APP_GUARD,
      useClass: ZodValidationGuard,
    },
  ],
})
export class HttpModule {}
