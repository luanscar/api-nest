import { z } from 'zod';
const errorMessages = {
  name: {
    required: 'Nome completo é obrigatório.',
    minLength: 'Nome: mínimo de 3 caracteres.',
  },
  email: {
    required: 'Email é obrigatório.',
    invalid: 'Email inválido. Verifique o formato.',
  },
  password: {
    minLength: 'Senha: mínimo de 6 caracteres.',
  },
  role: {
    required: 'Selecione uma função.',
  },
};

const createUserBodySchema = z.object({
  name: z.string().min(1, { message: errorMessages.name.required }),
  email: z.string({ message: errorMessages.email.required }).email({ message: errorMessages.email.invalid }),
  password: z.string().min(6, { message: errorMessages.password.minLength }),
});

const authenticateUserBodySchema = z.object({
  email: z.string().min(1, { message: 'Informe um e-mail válido.' }),
  password: z.string().min(1, { message: 'A senha é obrigatória.' }),
});

type CreateUserBodySchema = z.infer<typeof createUserBodySchema>;
type AuthenticateUserBodySchema = z.infer<typeof authenticateUserBodySchema>;

export { authenticateUserBodySchema, AuthenticateUserBodySchema, createUserBodySchema, CreateUserBodySchema };
