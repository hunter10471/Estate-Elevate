"use client";
import Button from "@/components/small/Button/Button";
import Input from "@/components/small/Input/Input";
import { Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
	LoginFormInputs,
	loginFormSchema,
} from "../../../../utils/validation/LoginForm.schema";
import { toFormikValidationSchema } from "zod-formik-adapter";

const page = () => {
	return (
		<Formik<LoginFormInputs>
			initialValues={{
				email: "",
				password: "",
			}}
			onSubmit={(values) => {
				console.log(values);
			}}
			validationSchema={toFormikValidationSchema(loginFormSchema)}
			validateOnChange={false}
			validateOnBlur={false}
		>
			{(formikState) => {
				const errors = formikState.errors;
				return (
					<div className="flex justify-evenly items-center gap-5 md:mb-10 text-sm lg:text-base">
						<div className="hidden md:block relative h-[calc(100vh-150px)] w-[500px]">
							<Image
								className="rounded-l object-cover"
								src={"/login.jpg"}
								alt="room with sofa and plants"
								fill
							/>
						</div>
						<Form className="flex flex-col gap-4 min-w-[350px]">
							<h1 className="text-center md:text-left font-semibold text-[20px] lg:text-[24px] leading-snug my-2">
								<b className="text-primary font-semibold"> Welcome Back! </b>{" "}
								<br /> Sign in to your account
							</h1>

							<Input
								name="email"
								placeholder="someone@email.com"
								label="Email"
								type="email"
								error={errors["email"]}
							/>
							<Input
								name="password"
								placeholder="Enter your password"
								label="Password"
								type="password"
								error={errors["password"]}
							/>

							<span className="text-xs text-gray-400 font-medium flex items-center gap-2">
								Don't have an account?
								<Link
									className="underline hover:text-primary"
									href={"/auth/signup"}
								>
									Create one now.
								</Link>
							</span>
							<Button type="submit" text="Sign in" primary />
							<span className="text-center -mt-1 -mb-2">or</span>
							<button className="flex justify-center items-center gap-4 border-gray-300 rounded-lg py-2 px-4 text-sm font-medium hover:bg-gray-300 transition-all">
								<Image
									src={"/google.png"}
									width={24}
									height={24}
									alt="google icon"
								/>
								Sign in with Google{" "}
							</button>
						</Form>
					</div>
				);
			}}
		</Formik>
	);
};

export default page;
