"use client";
import React from "react";
import { BeatLoader } from "react-spinners";

const loading = () => {
	return (
		<div className="flex items-center justify-center h-[calc(100vh-120px)]">
			<BeatLoader
				loading={true}
				color="#007BFF"
				size={15}
				aria-label="Loading Spinner"
				data-testid="loader"
			/>
		</div>
	);
};

export default loading;
