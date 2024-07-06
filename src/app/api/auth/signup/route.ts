import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { signupFormSchema } from "../../../../../utils/validation/SignupForm.schema";
import { ZodError } from "zod";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const parsedBody = signupFormSchema.parse(body);
		const existingUser = await prisma.user.findUnique({
			where: { email: parsedBody.email },
		});
		if (existingUser) {
			throw {
				message:
					"A user already exists with the given email, if you already have an account please login.",

				status: 409,
			};
		}
		const salt = 10;
		const hashedPass = await bcrypt.hash(parsedBody.password, salt);
		parsedBody.password = hashedPass;
		const { confirmPassword, ...others } = parsedBody;
		const newUser = await prisma.user.create({
			data: others,
			select: { id: true, name: true, email: true, createdAt: true },
		});
		return NextResponse.json(
			{ message: "Sign up successful, please login.", user: newUser },
			{ status: 201 }
		);
	} catch (error: any) {
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
				error: error.message
					? error.message
					: "An error occurred while signing you up, please try again later.",
			},
			{ status: error.status ? error.status : 500 }
		);
	}
}
