import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { listPropertyFormSchema } from "../../../../utils/validation/ListPropertyForm.schema";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const parsedBody = listPropertyFormSchema.parse(body);
		const newListing = await prisma.property.create({ data: parsedBody });
		return NextResponse.json(
			{ message: "Property listed successfully.", property: newListing },
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
					: "An error occurred while listing your property.",
			},
			{ status: error.status ? error.status : 500 }
		);
	}
}
