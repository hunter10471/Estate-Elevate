import { TypeOf, object, string } from "zod";
import { passwordValidation } from "./PasswordValidation";

export const editProfileFormSchema = object({
	username: string()
		.min(5, { message: "Full name must be at least 5 characters long" })
		.max(20, { message: "Full name cannot be longer than 20 characters" })
		.optional(),
	email: string({ required_error: "Please enter an email" })
		.email({
			message: "Invalid email address",
		})
		.optional(),
	phone: string()
		.regex(/^\(\d{3}\) \d{3}-\d{4}$/, {
			message: "Invalid phone number format (XXX) XXX-XXXX",
		})
		.optional()
		.nullable(),
	country: string()
		.min(1, { message: "Country is required" })
		.optional()
		.nullable(),
	state: string()
		.min(1, { message: "State is required" })
		.optional()
		.nullable(),
	city: string().min(1, { message: "City is required" }).optional().nullable(),
	bio: string()
		.max(160, { message: "Bio must be less than 160 characters" })
		.optional()
		.nullable(),
	oldPassword: string().min(1, { message: "Country is required" }).optional(),
	password: string()
		.max(25, { message: "Password cannot be longer than 25 characters." })
		.regex(passwordValidation, {
			message:
				"Password must be at least 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character",
		})
		.optional(),
	confirmPassword: string()
		.min(6, { message: "Confirm password must be at least 8 characters" })
		.optional(),
}).superRefine(({ confirmPassword, password }, ctx) => {
	if (confirmPassword !== password) {
		ctx.addIssue({
			code: "custom",
			message: "Passwords do not match",
			path: ["confirmPassword"],
		});
	}
});

export type EditProfileFormInputs = TypeOf<typeof editProfileFormSchema>;
