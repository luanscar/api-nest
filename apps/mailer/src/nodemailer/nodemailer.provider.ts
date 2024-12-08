import * as nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: parseInt(process.env.SMTP_PORT as string) || 587,
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
	},
});

export const NodemailerProvider = {
	provide: "NODEMAILER_PROVIDER",
	useValue: transporter,
};
