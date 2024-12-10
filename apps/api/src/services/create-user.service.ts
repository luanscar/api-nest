import { HashGenerator } from '@/cryptography/contracts/contract-hash-generator';
import { UsersRepository } from '@/database/contracts/contract-users.repository';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { ResourceAlreadyExistsError } from './errors/resource-already-exists-error';

type CreateUserServiceRequest = {
  name: string;
  email: string;
  password: string;
};

type CreateUserServiceResponse = {
  user: User;
};

@Injectable()
export class CreateUserService {
  constructor(
    private hashGenerator: HashGenerator,
    private userRepository: UsersRepository,
  ) {}

  async execute({ email, name, password }: CreateUserServiceRequest): Promise<CreateUserServiceResponse> {
    const passwordHash = await this.hashGenerator.hash(password);

    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new ResourceAlreadyExistsError('Usuário', 'email', email);
    }

    return {
      user: await this.userRepository.create({ email, name, password: passwordHash }),
    };
  }
}
