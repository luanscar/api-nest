import { User } from "users/entities/user.entity";

export interface IJwtService {
	generateToken(user: User): Promise<string>;
}
