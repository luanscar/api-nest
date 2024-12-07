import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import { ExtractJwt, Strategy } from "passport-jwt";
import {
	SignInInputPayloadDTO,
	SignInPayloadOutputDTO,
} from "../dto/sign-in.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: "process.env.JWT_SECRET",
		});
	}

	async validate(
		payload: SignInInputPayloadDTO,
	): Promise<SignInPayloadOutputDTO> {
		return {
			id: payload.sub,
			email: payload.email,
			name: payload.name,
		};
	}
}
