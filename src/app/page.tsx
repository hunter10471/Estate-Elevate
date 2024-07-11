import CardSlider from "@/components/large/CardSlider/CardSlider";
import ReviewSlider from "@/components/large/ReviewSlider/ReviewSlider";
import SearchBar from "@/components/medium/SearchBar/SearchBar";
import UpcomingProjects from "@/components/medium/UpcomingProjects/UpcomingProjects";
import Button from "@/components/small/Button/Button";
import CompanyStats from "@/components/small/CompanyStats/CompanyStats";
import Heading from "@/components/small/Heading/Heading";
import Image from "next/image";

export default async function Home() {
	return (
		<main className="pt-5">
			<div className="w-full min-h-[300px] lg:min-h-[450px] relative">
				<Image
					src={"/hero.jpg"}
					alt="hero"
					className="object-cover object-top rounded-xl"
					fill
				/>
				<div className="bg-white lg:bg-transparent w-[90%] bg-opacity-20 backdrop-blur-md lg:backdrop-blur-none shadow-lg lg:shadow-none rounded-lg p-5 flex flex-col font-heading gap-2 lg:gap-4 absolute z-10 top-8 left-0 right-0 ml-auto mr-auto text-center text-blue-950">
					<h1 className="font-bold text-[20px] md:text-[32px] lg:text-[48px]  tracking-wide leading-tight">
						Find Your Dream <b className="font-bold text-primary">Home</b> Today
					</h1>
					<span className="font-medium text-xs lg:text-sm">
						Connecting you to beautiful homes and the best real estate deals,
						all in one place.
					</span>
				</div>
				<SearchBar />
			</div>
			<div className="flex justify-center items-center flex-col md:flex-row gap-5 sm:gap-8 mb-[100px] mt-[300px] sm:mt-[200px]">
				<div className="md:flex-1 flex-none relative w-full md:max-w-[400px] h-[350px]">
					<Image
						className="rounded-lg object-cover"
						src={"/home-1.jpg"}
						alt="home"
						fill
					/>
				</div>
				<div className="flex-1 max-w-[500px]">
					<Heading text="Unlock the Best Real Estate Deals Today!" />
					<p className="mt-6 text-justify font-heading font-medium text-xs md:text-sm">
						At Estate Elevate, we pride ourselves on offering unparalleled real
						estate deals that cater to every need and budget. Whether
						you&apos;re searching for a cozy rental, a luxurious home for sale,
						or the perfect commercial property, our curated listings ensure you
						find exactly what you&apos;re looking for. <br /> <br /> Our expert
						team negotiates the best prices and terms, so you don&apos;t have
						to. Trust us to guide you through the entire process with
						transparency and professionalism.
					</p>
					<div className="flex mt-6 gap-5">
						<Button scrollToId="company-stats" outline text="Learn more" />
						<Button redirect="/contact" primary text="Contact us" />
					</div>
				</div>
			</div>
			<CompanyStats />
			<UpcomingProjects />
			<div className="my-10">
				<div className="max-w-[400px] my-5 sm:my-10">
					<Heading text="Recently added trending properties" />
				</div>
				<CardSlider />
			</div>
			<ReviewSlider />
		</main>
	);
}
