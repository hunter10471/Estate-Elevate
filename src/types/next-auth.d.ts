import { UserType } from "@prisma/client";
import { DefaultUser, DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
	interface User extends DefaultUser {
		id: string;
		userType: UserType;
		email: string;
	}
	interface Session {
		user: {
			id: string;
			userType: UserType;
			email: string;
		} & DefaultSession["user"];
	}
}

declare module "next-auth/jwt" {
	interface JWT extends DefaultJWT {
		id: string;
		userType: UserType;
		email: string;
	}
}
