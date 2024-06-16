import React from "react";
import { IoFilterSharp } from "react-icons/io5";

type Props = {};

const Filter = (props: Props) => {
	return (
		<div className="md:hidden block">
			<IoFilterSharp
				className="absolute top-[10px] right-0 cursor-pointer"
				size={18}
			/>
		</div>
	);
};

export default Filter;
