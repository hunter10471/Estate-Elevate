"use client";
import Button from "@/components/small/Button/Button";
import Input from "@/components/small/Input/Input";
import { Form, Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import {
	ContactFormInputs,
	ContactFormSchema,
} from "../../../utils/validation/ContactForm.schema";
import { useState } from "react";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactForm = () => {
	const [loading, setLoading] = useState(false);
	const onSubmit = (values: ContactFormInputs) => {
		setLoading(true);
		setTimeout(() => {
			toast.success("Message sent!", {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
				transition: Slide,
			});
			setLoading(false);
		}, 3000);
	};
	return (
		<Formik<ContactFormInputs>
			initialValues={{
				name: "",
				email: "",
				description: "",
			}}
			onSubmit={onSubmit}
			validationSchema={toFormikValidationSchema(ContactFormSchema)}
		>
			{(formikState) => {
				const errors = formikState.errors;
				return (
					<Form className="flex flex-col gap-4 mt-2">
						<ToastContainer />
						<Input
							name="name"
							type="text"
							label="Full Name"
							placeholder="Enter your full name"
							error={errors["name"]}
						/>
						<Input
							name="email"
							type="email"
							label="Email"
							placeholder="Enter your email"
							error={errors["email"]}
						/>
						<Input
							name="description"
							type="text"
							label="Message"
							placeholder="Enter your message"
							error={errors["description"]}
						/>
						<div className="flex gap-4 mt-5">
							<Button loading={loading} primary text="Submit" type="submit" />
							<Button text="Reset" type="reset" />
						</div>
					</Form>
				);
			}}
		</Formik>
	);
};

export default ContactForm;
