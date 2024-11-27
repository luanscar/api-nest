class User {
	id?: string;
	name: string;
	email: string;
	password: string;
	createdAt?: Date | null | string;
	updatedAt?: Date | null | string;
	ownerId?: string | null;
	updatedById?: string | null;
}

export { User };
