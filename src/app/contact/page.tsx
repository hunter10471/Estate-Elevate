import Heading from "@/components/small/Heading/Heading";
import Image from "next/image";
import React from "react";
import ContactForm from "./ContactForm";
import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";

const page = () => {
	return (
		<div className="flex lg:flex-row flex-col gap-[64px]  min-h-[calc(100vh-100px)]">
			<div className="flex flex-col max-w-[600px]">
				<span className=" text-primary font-semibold">Get in touch</span>
				<Heading
					text="Let's chat, Reach out to us today!"
					subtitle="Have questions or feedback? We're here to assist. Send us a message and we'll get back within 24 hours."
				/>
				<ContactForm />
			</div>
			<div className="flex flex-col lg:items-center ">
				<div className="relative w-[450px] h-[400px] lg:block hidden mt-[100px]">
					<Image src={"/contact-us.png"} fill alt="contact-us" />
				</div>
				<div className="flex flex-wrap gap-5">
					<div className="flex gap-2 items-center">
						<span className="text-primary bg-primary/20 p-2 rounded-full">
							<MdOutlineEmail size={25} />
						</span>
						<span>
							<h2 className="font-semibold">Email</h2>
							<h3 className="text-xs font-normal">
								support@estate_elevate.com
							</h3>
						</span>
					</div>
					<div className="flex gap-2 items-center">
						<span className="text-primary bg-primary/20 p-2 rounded-full">
							<MdOutlinePhone size={25} />
						</span>
						<span>
							<h2 className="font-semibold">Phone</h2>
							<h3 className="text-xs font-normal">(033) 456-333-321</h3>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default page;
