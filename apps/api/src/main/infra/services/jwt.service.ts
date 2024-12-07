import { User } from "apps/api/src/users/entities/user.entity";
import jwt from "jsonwebtoken";
import { IJwtService } from "./jwt.service.interface";

export class JwtService implements IJwtService {
	async generateToken(user: User): Promise<string> {
		const JWTPayload = {
			id: user.id as string,
			name: user.name,
			email: user.email,
		};

		return jwt.sign(JWTPayload, process.env.JWT_SECRET as string, {
			expiresIn: `${process.env.JWT_EXPIRES_IN}d`,
		});
	}
}
