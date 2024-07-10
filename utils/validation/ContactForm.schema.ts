import { TypeOf, object, string } from "zod";

export const ContactFormSchema = object({
	email: string({ message: "Please enter your email address" }).email({
		message: "Please a valid email address",
	}),
	name: string({ message: "Please enter your full name" }),
	description: string({ message: "Please enter complete description" }),
});

export type ContactFormInputs = TypeOf<typeof ContactFormSchema>;
