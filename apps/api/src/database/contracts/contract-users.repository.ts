import { User } from '@prisma/client';

export type CreateUser = {
  name: string;
  email: string;
  password: string;
};

export type UpdateUser = {
  id: string;
};

export abstract class UsersRepository {
  abstract create: (data: CreateUser) => Promise<User>;
  abstract update: (data: UpdateUser) => Promise<User>;
  abstract delete(id: string): Promise<void>;
  abstract findById: (id: string) => Promise<User | null>;
  abstract findByEmail: (email: string) => Promise<User | null>;
  abstract findMany: () => Promise<User[]>;
}
