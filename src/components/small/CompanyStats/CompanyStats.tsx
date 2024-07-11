import { CompanyStat } from "../../../../utils/types";
import { TbBuildingCommunity } from "react-icons/tb";
import { MdOutlineSentimentVerySatisfied } from "react-icons/md";
import { GrMapLocation } from "react-icons/gr";
import { FaRegHourglass } from "react-icons/fa6";
import Image from "next/image";

const stats: CompanyStat[] = [
	{
		subtitle: "Properties Listed",
		value: "1,200+",
		img: "/skyline.png",
	},
	{
		subtitle: "Happy Clients",
		value: "5,000+",
		img: "/customer-service.png",
	},
	{
		subtitle: "Cities Covered",
		value: "75+",
		img: "/maps.png",
	},
	{
		subtitle: "Years in Business",
		value: "20+",
		img: "/calendar.png",
	},
];

const CompanyStats = () => {
	return (
		<div
			id="company-stats"
			className="flex justify-evenly items-center flex-wrap gap-10 my-32 sm:my-40"
		>
			{stats.map((stat) => (
				<div key={stat.subtitle} className="flex flex-col items-center">
					<Image
						className="mb-5"
						src={stat.img}
						width={80}
						height={80}
						alt="company-stat"
					/>
					<h2 className="text-[32px] font-bold">{stat.value}</h2>
					<h3 className="font-medium text-sm">{stat.subtitle}</h3>
				</div>
			))}
		</div>
	);
};

export default CompanyStats;
