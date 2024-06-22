"use client";
import Button from "@/components/small/Button/Button";
import Heading from "@/components/small/Heading/Heading";
import Input from "@/components/small/Input/Input";
import useStore from "@/store/store";
import Image from "next/image";
import React from "react";

const PersonalInfo = () => {
	const sidebarState = useStore((state) => state);
	return (
		<div className="p-10 max-w-[800px]">
			{sidebarState.sidebarTab === "editProfile" ? (
				<div>
					<div className="flex lg:flex-row flex-col items-center gap-4">
						<div className="rounded-full h-[75px] w-[75px] lg:h-[120px] lg:w-[120px] relative">
							<Image
								src={"/avatar.jpg"}
								alt="avatar"
								fill
								className=" object-cover rounded-full"
							/>
						</div>
						<div className="flex flex-col lg:items-start gap-1">
							<Button text="Upload new photo" />
							<span className="text-gray-400 text-xs lg:text-sm px-6 lg:text-left text-center">
								Atleast 600x600 px recommended. <br /> JPG or PNG is allowed.
							</span>
						</div>
					</div>
					<div className="my-10">
						<Heading text="Personal Info" mediumSize weight="semibold" />
						<div className="flex justify-between gap-6 my-5 lg:flex-row flex-col">
							<Input
								label="Username"
								placeholder="username"
								type="text"
								defaultValue="John Doe"
							/>
							<Input
								label="Email"
								placeholder="someone@mail.com"
								type="email"
								defaultValue="john@mail.com"
							/>
							<Input
								label="Phone"
								placeholder="(XXX) XXX-XXXX"
								type="text"
								defaultValue="(219) 555-2014"
							/>
						</div>
					</div>
					<div className="my-10">
						<Heading text="Location" mediumSize weight="semibold" />
						<div className="flex justify-between gap-6 my-5 lg:flex-row flex-col">
							<Input
								label="Country"
								placeholder="Enter your country"
								type="text"
								defaultValue="Pakistan"
							/>
							<Input
								label="State"
								placeholder="Enter your state"
								type="text"
								defaultValue="Sindh"
							/>
							<Input
								label="City"
								placeholder="Enter your city"
								type="text"
								defaultValue="Karachi"
							/>
						</div>
					</div>
					<div className="my-10">
						<Heading text="Bio" mediumSize weight="semibold" />
						<Input
							placeholder="Enter your bio"
							type="text"
							defaultValue="Hi, I'm John. Hope you're having a good day :)"
						/>
					</div>
					<div className="flex justify-end gap-5">
						<Button text="Cancel" outline />
						<Button text="Update" primary />
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
						/>
						<Input
							label="New Password"
							placeholder="Enter new password"
							type="password"
						/>
						<Input
							label="Confirm Password"
							placeholder="Enter password again"
							type="password"
						/>
					</div>
					<div className="flex mt-10 gap-5">
						<Button text="Cancel" outline />
						<Button text="Update" primary />
					</div>
				</div>
			)}
		</div>
	);
};

export default PersonalInfo;
