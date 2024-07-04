"use client";
import React, { SetStateAction } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import { AiOutlineFullscreen } from "react-icons/ai";
import { AiOutlineFullscreenExit } from "react-icons/ai";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "./Map.css";
import MapChild from "./MapChild";

interface MapProps {
	setFullWidth?: SetStateAction<any>;
	fullWidth: boolean;
	position?: LatLngExpression;
}

const Map = ({ setFullWidth, fullWidth, position }: MapProps) => {
	return (
		<MapContainer
			className={`flex-1 transition-all ease-in-out h-full rounded-lg relative z-[99]`}
			center={position || [51.505, -0.09]}
			zoom={5}
			scrollWheelZoom={false}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{position && <MapChild center={position} />}
			{setFullWidth && (
				<button
					onClick={() => setFullWidth((prev: any) => !prev)}
					className="absolute right-5 top-5 bg-white p-2 rounded-full z-[999] hover:scale-110 transition-all"
				>
					{fullWidth ? (
						<AiOutlineFullscreenExit size={25} />
					) : (
						<AiOutlineFullscreen size={25} />
					)}{" "}
				</button>
			)}
			<Marker position={position || [51.505, -0.09]}>
				{/* <Popup>
					
				</Popup> */}
			</Marker>
		</MapContainer>
	);
};

export default Map;
