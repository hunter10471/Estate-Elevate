import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ZodError } from "zod";
import { loginFormSchema } from "../../../../../utils/validation/LoginForm.schema";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const parsedBody = loginFormSchema.parse(body);
		const existingUser = await prisma.user.findUnique({
			where: { email: parsedBody.email },
		});
		if (!existingUser) {
			return NextResponse.json(
				{
					error: "Incorrect credentials, please try again.",
				},
				{ status: 401 }
			);
		}
		const { password, ...user } = existingUser;
		return NextResponse.json(
			{ message: "Login successful, please proceed.", user },
			{ status: 200 }
		);
	} catch (error) {
		if (error instanceof ZodError) {
			return NextResponse.json(
				{
					error: error.errors.map((err) => err.message),
				},
				{ status: 400 }
			);
		}
		console.log(error);
		return NextResponse.json(
			{
				error:
					"An error occurred while signing you up, please try again later.",
			},
			{ status: 500 }
		);
	}
}
