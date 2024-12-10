import { Module } from '@nestjs/common';
import { UsersRepository } from './contracts/contract-users.repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaUserRepository } from './repositories/prisma-user-repository';

@Module({
  providers: [PrismaService, { provide: UsersRepository, useClass: PrismaUserRepository }],
  exports: [PrismaService, UsersRepository],
})
export class DatabaseModule {}
