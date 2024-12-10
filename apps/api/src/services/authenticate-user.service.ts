import { Encrypter } from '@/cryptography/contracts/contract-encrypter';
import { HashComparer } from '@/cryptography/contracts/contract-hash-comparer';
import { Injectable } from '@nestjs/common';

type AuthenticateUserServiceRequest = {
  email: string;
  password: string;
};

type AuthenticateUserServiceResponse = {
  accessToken: string;
};

@Injectable()
export class AuthenticateUserService {
  constructor(
    private encrypter: Encrypter,
    private hashComparer: HashComparer,
  ) {}

  async execute({ email, password }: AuthenticateUserServiceRequest): Promise<any> {
    return 'Method not implemented: AuthenticateUserService';
  }
}
