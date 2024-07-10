"use client";
import Button from "@/components/small/Button/Button";
import Heading from "@/components/small/Heading/Heading";
import Input from "@/components/small/Input/Input";
import useStore from "@/store/store";
import { Form, Formik } from "formik";
import Image from "next/image";
import React, { useState } from "react";
import {
	EditProfileFormInputs,
	editProfileFormSchema,
} from "../../../../utils/validation/EditProfileForm.schema";
import { SafeUser } from "../../../../utils/types";
import { toFormikValidationSchema } from "zod-formik-adapter";
import UploadWidget from "@/components/small/UploadWidget/UploadWidget";
import { updateCurrentUser } from "@/app/actions/userActions";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import CountrySelect, {
	CountrySelectValue,
} from "@/components/small/CountrySelect/CountrySelect";

interface PersonalInfoProps {
	user: SafeUser | null;
}

const PersonalInfo = ({ user }: PersonalInfoProps) => {
	const sidebarState = useStore((state) => state);
	const [avatar, setAvatar] = useState(user?.image);
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const handleSubmit = async (values: EditProfileFormInputs) => {
		setLoading(true);
		try {
			if (avatar) {
				values.image = avatar;
			}
			const response = await updateCurrentUser(values);
			if (response) {
				toast.success("Profile updated successfully.", {
					position: "bottom-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "colored",
					transition: Slide,
					onClose: () => {
						router.refresh();
					},
				});
			}
		} catch (error: any) {
			console.log(error);
			toast.error("An error occured while updating your profile", {
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
		} finally {
			setLoading(false);
		}
	};

	return (
		<Formik<EditProfileFormInputs>
			validationSchema={toFormikValidationSchema(editProfileFormSchema)}
			validateOnChange={false}
			validateOnBlur={false}
			initialValues={{
				...user,
			}}
			onSubmit={handleSubmit}
		>
			{(formikState) => {
				const errors = formikState.errors;
				return (
					<Form className="p-10 max-w-[800px]">
						<ToastContainer />
						{sidebarState.sidebarTab === "editProfile" ? (
							<div>
								<div className="flex lg:flex-row flex-col items-center gap-4">
									<div className="rounded-full h-[75px] w-[75px] lg:h-[120px] lg:w-[120px] relative">
										<Image
											src={avatar || "/no-avatar.jpg"}
											alt="avatar"
											fill
											className=" object-cover rounded-full"
										/>
									</div>
									<div className="flex flex-col lg:items-start gap-1">
										<UploadWidget
											uwConfig={{
												cloudName: "dz79wze9e",
												uploadPreset: "Estate Elevate",
												multiple: false,
												maxImageFileSize: 200000,
												folder: "avatars",
											}}
											setState={setAvatar}
										/>
										<span className="text-gray-400 text-xs lg:text-sm px-6 lg:text-left text-center">
											Atleast 600x600 px recommended. <br /> JPG or PNG is
											allowed.
										</span>
									</div>
								</div>
								<div className="my-10">
									<Heading text="Personal Info" mediumSize weight="semibold" />
									<div className="flex justify-between gap-6 my-5 lg:flex-row flex-col">
										<Input
											label="Full Name"
											placeholder="Enter your full name"
											type="text"
											defaultValue={user?.name}
											name="name"
											error={errors["name"]}
										/>
										<Input
											label="Email"
											placeholder="someone@mail.com"
											type="email"
											defaultValue={user?.email}
											name="email"
											error={errors["email"]}
										/>
										<Input
											label="Phone"
											placeholder="(XXX) XXX-XXXX"
											type="text"
											defaultValue={user?.phone || ""}
											name="phone"
											error={errors["phone"]}
										/>
									</div>
								</div>
								<div className="my-10">
									<Heading text="Location" mediumSize weight="semibold" />
									<div className="flex justify-between gap-6 my-5 lg:flex-row flex-col">
										<CountrySelect label formik={formikState} />
										<Input
											label="State"
											placeholder="Enter your state"
											type="text"
											defaultValue={user?.state || ""}
											name="state"
											error={errors["state"]}
										/>
										<Input
											label="City"
											placeholder="Enter your city"
											type="text"
											defaultValue={user?.city || ""}
											name="city"
											error={errors["city"]}
										/>
									</div>
								</div>
								<div className="my-10">
									<Heading text="Bio" mediumSize weight="semibold" />
									<Input
										placeholder="Enter your bio"
										type="text"
										defaultValue={user?.bio || ""}
										name="bio"
										error={errors["bio"]}
									/>
								</div>
								<div className="flex justify-end gap-5">
									<Button type="reset" text="Cancel" outline />
									<Button
										loading={loading}
										type="submit"
										text="Update"
										primary
									/>
								</div>
							</div>
						) : (
							<div>
								<Heading text="Change Password" mediumSize weight="semibold" />
								<div className="flex flex-col justify-between gap-6 my-5 max-w-[350px]">
									<Input
										label="Current Password"
										placeholder="Enter current password"
										type="password"
										name="oldPassword"
										error={errors["oldPassword"]}
									/>
									<Input
										label="New Password"
										placeholder="Enter new password"
										type="password"
										name="password"
										error={errors["password"]}
									/>
									<Input
										label="Confirm Password"
										placeholder="Enter password again"
										type="password"
										name="confirmPassword"
										error={errors["confirmPassword"]}
									/>
								</div>
								<div className="flex mt-10 gap-5">
									<Button type="reset" text="Cancel" outline />
									<Button
										loading={loading}
										type="submit"
										text="Update"
										primary
									/>
								</div>
							</div>
						)}
					</Form>
				);
			}}
		</Formik>
	);
};

export default PersonalInfo;
