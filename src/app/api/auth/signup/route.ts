import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
	} catch (error) {
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
