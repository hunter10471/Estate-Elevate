import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginFormSchema } from "../../../../../utils/validation/LoginForm.schema";
import prisma from "@/lib/prisma";
import { ZodError } from "zod";
import bcrypt from "bcrypt";

const handler = NextAuth({
	session: { strategy: "jwt" },
	providers: [
		CredentialsProvider({
			credentials: {
				email: { label: "email", type: "email" },
				password: { label: "password", type: "password" },
			},
			async authorize(credentials, req) {
				try {
					const parsedCredentials = loginFormSchema.parse(credentials);
					const existingUser = await prisma.user.findUnique({
						where: { email: parsedCredentials.email },
					});
					if (!existingUser) {
						throw new Error("Invalid credentials");
					}
					const passwordCorrect = await bcrypt.compare(
						parsedCredentials.password,
						existingUser.password
					);
					if (!passwordCorrect) {
						throw new Error("Invalid credentials");
					}
					return {
						id: existingUser.id,
						email: existingUser.email,
					};
				} catch (error: any) {
					if (error instanceof ZodError) {
						console.error(
							"Validation error:",
							error.errors.map((err) => err.message)
						);
						throw new Error("Validation failed");
					}

					console.error("Authorization error:", error.message);
					throw new Error(error);
				}
			},
		}),
	],
});

export { handler as GET, handler as POST };
