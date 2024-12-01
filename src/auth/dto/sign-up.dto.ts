import { User } from "users/entities/user.entity";
import { z } from "zod";

export const signUpInputSchema = z.object({
	name: z.string().min(3),
	email: z.string().email(),
	password: z.string().min(6),
});

export const signInInputSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

export type SignUpInputDTO = z.infer<typeof signUpInputSchema>;

export type SignInInputDTO = z.infer<typeof signInInputSchema>;

export class SignUpOutputDTO {
	user: User;
}
