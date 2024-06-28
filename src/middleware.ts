import { UserType } from "@prisma/client";
import { NextResponse, type NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
	// `withAuth` augments your `Request` with the user's token.
	function middleware(req) {
		const isOnAdminPanel = req.nextUrl.pathname.startsWith("/admin");
		const isOnEditProfile = req.nextUrl.pathname.startsWith("/profile");
		const isOnLogin = req.nextUrl.pathname.startsWith("/auth/login");
		const isOnRegister = req.nextUrl.pathname.startsWith("/auth/signup");
		const token = req.nextauth.token;
		if (isOnAdminPanel && token?.userType !== UserType.USER) {
			return NextResponse.redirect("/");
		}
		if (isOnEditProfile && token) {
			return NextResponse.redirect("/auth/login");
		}
		if ((isOnLogin || isOnRegister) && token) {
			return NextResponse.redirect("/");
		}
		return NextResponse.next();
	}
);

export const config = { matcher: ["/"] };
