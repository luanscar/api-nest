export default () => ({
	api: {
		port: parseInt(process.env.PORT as string, 10) || 3000,
		name: process.env.API_NAME || "Backend API",
	},
	database: {
		host: process.env.DATABASE_HOST || "localhost",
		port: parseInt(process.env.DATABASE_PORT as string, 10) || 5432,
		url:
			process.env.DATABASE_URL ||
			"postgres:postgres@localhost:5432/ecommerce-db?schema=public",
	},
});
