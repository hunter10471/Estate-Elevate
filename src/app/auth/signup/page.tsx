import Button from "@/components/small/Button/Button";
import Input from "@/components/small/Input/Input";
import Image from "next/image";
import React from "react";

type Props = {};

const page = (props: Props) => {
	return (
		<div className="flex justify-evenly gap-10 mb-10 text-sm lg:text-base">
			<div className="flex flex-col gap-4">
				<h1 className="text-center md:text-left font-semibold text-[20px] lg:text-[24px] leading-snug my-2">
					<b className="text-primary font-semibold"> A warm welcome awaits! </b>{" "}
					<br /> Signup and let's get started
				</h1>

				<Input
					placeholder="Enter your full name"
					label="Full Name"
					type="text"
				/>
				<Input placeholder="someone@email.com" label="Email" type="email" />
				<Input
					placeholder="Enter your password"
					label="Password"
					type="password"
				/>
				<Input
					placeholder="Enter your password again"
					label="Confirm Password"
					type="password"
				/>
				<span className="text-xs text-gray-400 font-medium">
					By signing up, you agree to the{" "}
					<b className="text-primary font-medium"> terms & conditions </b> and{" "}
					<b className="text-primary font-medium">privacy policy. </b>
				</span>
				<Button text="Sign up" primary />
				<span className="text-center -mt-1 -mb-2">or</span>
				<button className="flex justify-center items-center gap-4 border-gray-300 rounded-lg py-2 px-4 text-sm font-medium hover:bg-gray-300 transition-all">
					<Image src={"/google.png"} width={24} height={24} alt="google icon" />
					Sign Up with Google{" "}
				</button>
			</div>

			<div className="hidden md:block relative h-[calc(100vh-120px)] w-[500px]">
				<Image
					className="rounded-r object-cover"
					src={"/signup.jpg"}
					alt="room with sofa and plants"
					fill
				/>
			</div>
		</div>
	);
};

export default page;
