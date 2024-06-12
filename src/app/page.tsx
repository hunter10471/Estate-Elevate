import SearchBar from "@/components/medium/SearchBar/SearchBar";
import Image from "next/image";

export default function Home() {
	return (
		<main className="flex">
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
		</main>
	);
}
