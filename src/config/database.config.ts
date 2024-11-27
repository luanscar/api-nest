import { registerAs } from "@nestjs/config";

export default registerAs("database", () => ({
	host: process.env.DATABASE_HOST,
	port: process.env.DATABASE_PORT || 5432,
	url:
		process.env.DATABASE_URL ||
		"postgres:postgres@localhost:5432/ecommerce-db?schema=public",
}));
