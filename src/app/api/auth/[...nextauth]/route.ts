import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { loginFormSchema } from "../../../../../utils/validation/LoginForm.schema";
import prisma from "@/lib/prisma";
import { ZodError } from "zod";
import bcrypt from "bcrypt";

declare module "next-auth" {
	interface Profile {
		picture?: string;
	}
}

const handler = NextAuth({
	session: { strategy: "jwt" },
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
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
					if (existingUser.password) {
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
							userType: existingUser.userType,
						};
					} else return null;
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
	callbacks: {
		async jwt({ user, token }) {
			token.email = user.email;
			token.id = user.id;
			token.userType = user.userType;
			return token;
		},
		async signIn({ account, profile }) {
			if (account?.type === "credentials") {
				return true;
			}
			if (!profile?.email) {
				throw new Error("No profile");
			}
			if (profile && profile.name)
				await prisma.user.upsert({
					where: { email: profile?.email },
					create: {
						email: profile.email,
						name: profile.name,
						image: profile.picture,
					},
					update: {
						name: profile.name,
						image: profile.picture,
					},
				});

			return true;
		},
	},
});

export { handler as GET, handler as POST };
