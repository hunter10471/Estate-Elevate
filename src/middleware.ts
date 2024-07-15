import { UserType } from "@prisma/client";
import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
	function middleware(req) {
		const isOnEditProfile = req.nextUrl.pathname.startsWith("/profile");
		const isOnChat = req.nextUrl.pathname.startsWith("/chat");
		const isOnLogin = req.nextUrl.pathname.startsWith("/auth/login");
		const isOnRegister = req.nextUrl.pathname.startsWith("/auth/signup");
		console.log(req.nextauth);
		const token = req.nextauth.token;
		if ((isOnEditProfile || isOnChat) && !token) {
			return NextResponse.redirect(new URL("/auth/login", req.url));
		}
		if ((isOnLogin || isOnRegister) && token) {
			return NextResponse.redirect(new URL("/", req.url));
		}
		return NextResponse.next();
	},
	{
		callbacks: {
			authorized({ req, token }) {
				const isOnAdminPanel = req.nextUrl.pathname.startsWith("/admin");
				if (token?.userType !== UserType.ADMIN && isOnAdminPanel) {
					return false;
				}
				return true;
			},
		},
		pages: {
			signOut: "/auth/login",
		},
	}
);

export const config = {
	matcher: ["/admin", "/profile", "/auth/login", "/auth/signup", "/chat"],
};
