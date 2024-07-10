"use client";
import Button from "@/components/small/Button/Button";
import Input from "@/components/small/Input/Input";
import { Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
	LoginFormInputs,
	loginFormSchema,
} from "../../../../utils/validation/LoginForm.schema";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { signIn } from "next-auth/react";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const LoginForm = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const handleSubmit = async (values: LoginFormInputs) => {
		try {
			setLoading(true);
			const response = await signIn("credentials", {
				email: values.email,
				password: values.password,
				redirect: false,
			});
			if (response?.error) {
				throw response.error;
			}
			toast.success("Successfully logged in! Redirecting now", {
				position: "bottom-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
				transition: Slide,
				onClose() {
					router.push("/");
				},
			});
		} catch (error: any) {
			console.log(error);
			toast.error(error?.split(":")[1], {
				position: "bottom-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
				transition: Slide,
			});
		}
		setLoading(false);
	};
	return (
		<Formik<LoginFormInputs>
			initialValues={{
				email: "",
				password: "",
			}}
			onSubmit={handleSubmit}
			validationSchema={toFormikValidationSchema(loginFormSchema)}
			validateOnChange={false}
			validateOnBlur={false}
		>
			{(formikState) => {
				const errors = formikState.errors;
				return (
					<div className="flex justify-evenly items-center gap-5 md:mb-10 text-sm lg:text-base">
						<ToastContainer />
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
								Don&apos;t have an account?
								<Link
									className="underline hover:text-primary"
									href={"/auth/signup"}
								>
									Create one now.
								</Link>
							</span>
							<Button loading={loading} type="submit" text="Sign in" primary />
							<span className="text-center -mt-1 -mb-2">or</span>
							<button
								onClick={() => signIn("google")}
								type="button"
								className="flex justify-center items-center gap-4 border-gray-300 rounded-lg py-2 px-4 text-sm font-medium hover:bg-gray-300 transition-all"
							>
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

export default LoginForm;
