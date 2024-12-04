import { User } from "users/entities/user.entity";
import { z } from "zod";

export interface SignInOutputDTO extends Request {
	token: string;
	user: User;
}

export interface SignInInputPayloadDTO {
	sub: string;
	email: string;
	name: string;
	iat?: number;
	exp?: number;
}
export interface SignInPayloadOutputDTO {
	id: string;
	email: string;
	name: string;
}

export const signInInputSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

export type SignInInputDTO = z.infer<typeof signInInputSchema>;
