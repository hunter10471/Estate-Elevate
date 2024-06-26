import { TypeOf, object, string } from "zod";

export const loginFormSchema = object({
	email: string({ message: "Please enter your email address" }).email({
		message: "Please a valid email address",
	}),
	password: string({ message: "Please enter your password" }),
});

export type LoginFormInputs = TypeOf<typeof loginFormSchema>;
