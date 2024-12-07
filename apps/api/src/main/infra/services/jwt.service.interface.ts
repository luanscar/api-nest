import { User } from "apps/api/src/users/entities/user.entity";

export interface IJwtService {
	generateToken(user: User): Promise<string>;
}
