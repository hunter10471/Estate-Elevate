"use client";
import React from "react";
import Button from "@/components/small/Button/Button";
import Input from "@/components/small/Input/Input";
import { Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import {
	SignupFormInputs,
	signupFormSchema,
} from "../../../../utils/validation/SignupForm.schema";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupForm = () => {
	const handleSubmit = async (values: SignupFormInputs) => {
		try {
			const response = await fetch(`/api/auth/signup`, {
				method: "POST",
				body: JSON.stringify(values),
			});
			const responseBody = await response.json();
			if (responseBody.error) {
				throw responseBody.error;
			}
			toast.success("Account created successfully! Login now.", {
				position: "bottom-left",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
				transition: Slide,
			});
		} catch (error: any) {
			console.log(error);
			toast.error(error, {
				position: "bottom-left",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
				transition: Slide,
			});
		}
	};
	return (
		<Formik<SignupFormInputs>
			initialValues={{
				username: "",
				email: "",
				password: "",
				confirmPassword: "",
			}}
			onSubmit={handleSubmit}
			validationSchema={toFormikValidationSchema(signupFormSchema)}
			validateOnChange={false}
			validateOnBlur={false}
		>
			{(formikState) => {
				const errors = formikState.errors;
				return (
					<div className="flex justify-evenly gap-10 mb-10 text-sm lg:text-base">
						<ToastContainer />
						<Form className="flex flex-col gap-4 w-[300px] md:w-[400px]">
							<h1 className="text-center md:text-left font-semibold text-[20px] lg:text-[24px] leading-snug">
								<b className="text-primary font-semibold">
									{" "}
									A warm welcome awaits!{" "}
								</b>{" "}
								<br /> Signup and let&apos;s get started
							</h1>

							<Input
								placeholder="Enter your full name"
								label="Full Name"
								type="text"
								name="username"
								error={errors["username"]}
							/>
							<Input
								placeholder="someone@email.com"
								label="Email"
								type="email"
								name="email"
								error={errors["email"]}
							/>
							<Input
								placeholder="Enter your password"
								label="Password"
								type="password"
								name="password"
								error={errors["password"]}
							/>
							<Input
								placeholder="Enter your password again"
								label="Confirm Password"
								type="password"
								name="confirmPassword"
								error={errors["confirmPassword"]}
							/>
							<span className="text-xs text-gray-400 font-medium flex items-center gap-2">
								Already have an account?
								<Link
									className="underline hover:text-primary"
									href={"/auth/login"}
								>
									Login.
								</Link>
							</span>
							<Button type="submit" text="Sign up" primary />
							<span className="text-sm text-center -mt-2 -mb-3">or</span>
							<button className="flex justify-center items-center gap-4 border-gray-300 rounded-lg py-2 px-4 text-sm font-medium hover:bg-gray-300 transition-all">
								<Image
									src={"/google.png"}
									width={24}
									height={24}
									alt="google icon"
								/>
								Sign Up with Google{" "}
							</button>
							<span className="text-xs text-gray-400 font-medium text-center">
								By signing up, you agree to the{" "}
								<b className="text-primary font-medium"> terms & conditions </b>{" "}
								and <b className="text-primary font-medium">privacy policy. </b>
							</span>
						</Form>

						<div className="hidden md:block relative h-[calc(100vh-150px)] w-[500px]">
							<Image
								className="rounded-r object-cover object-top"
								src={"/signup-2.jpg"}
								alt="yellow door of a house"
								fill
							/>
						</div>
					</div>
				);
			}}
		</Formik>
	);
};

export default SignupForm;
