import { TypeOf, object, string } from "zod";
import { passwordValidation } from "./PasswordValidation";

export const signupFormSchema = object({
	name: string({ required_error: "Please enter your full name" })
		.min(5, { message: "Full name must be at least 5 characters long" })
		.max(20, { message: "Full name cannot be longer than 20 characters" }),
	email: string({ required_error: "Please enter an email" }).email({
		message: "Invalid email address",
	}),
	password: string({ required_error: "Please enter your password" })
		.max(25, { message: "Password cannot be longer than 25 characters." })
		.regex(passwordValidation, {
			message:
				"Password must be at least 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character",
		}),
	confirmPassword: string({
		required_error: "Please enter your password again",
	}),
}).superRefine(({ confirmPassword, password }, ctx) => {
	if (confirmPassword !== password) {
		ctx.addIssue({
			code: "custom",
			message: "Passwords do not match",
			path: ["confirmPassword"],
		});
	}
});

export type SignupFormInputs = TypeOf<typeof signupFormSchema>;
