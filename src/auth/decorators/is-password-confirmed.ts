import {
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
} from "class-validator";

export function IsPasswordConfirmed(
	property: string,
	validationOptions?: ValidationOptions,
) {
	return (object: Record<string, any>, propertyName: string) => {
		registerDecorator({
			name: "IsPasswordConfirmed",
			target: object.constructor,
			propertyName,
			constraints: [property],
			options: validationOptions,
			validator: {
				validate(value: string, args: ValidationArguments) {
					const [relatedPropertyName] = args.constraints;
					const relatedValue = (args.object as Record<string, any>)[
						relatedPropertyName
					];
					return value === relatedValue; // Verifica se os dois campos são iguais
				},
				defaultMessage() {
					return "Password and confirm password do not match";
				},
			},
		});
	};
}
