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
import { PropertyWithListedBy } from "../../../../utils/types";
import Image from "next/image";
import { ListingStatus } from "@prisma/client";
import { FaCircle } from "react-icons/fa";
import Link from "next/link";

interface MapProps {
	setFullWidth?: SetStateAction<any>;
	fullWidth: boolean;
	position?: LatLngExpression;
	properties?: PropertyWithListedBy[];
	zoom: number;
}

const Map = ({
	setFullWidth,
	fullWidth,
	position,
	properties,
	zoom,
}: MapProps) => {
	return (
		<MapContainer
			className={`flex-1 transition-all ease-in-out h-full rounded-lg relative z-[99]`}
			center={
				position ||
				(properties &&
					properties.length > 0 &&
					(properties[0].latlng as LatLngExpression)) || [51.505, -0.09]
			}
			zoom={zoom}
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
			{properties?.map((property) => (
				<Marker
					key={property.id}
					position={property.latlng as LatLngExpression}
				>
					<Popup>
						<Link href={`/properties/${property.id}`} className="flex gap-4">
							<div className="relative h-[120px] w-[120px] flex-shrink-0">
								<Image
									alt="property"
									className="object-cover rounded-xl"
									fill
									src={property.images[0]}
								/>
							</div>
							<div className="flex flex-col justify-center gap-2 w-full font-heading text-text">
								<span className="text-[16px] font-medium line-clamp-2">
									{property.title}
								</span>
								{property.status === ListingStatus.SALE ? (
									<span className="text-emerald-400 gap-1 flex items-center font-semibold">
										<FaCircle size={8} />
										For sale
									</span>
								) : (
									<span className="text-orange-400 gap-1 flex items-center font-semibold">
										<FaCircle size={8} />
										For rent
									</span>
								)}
								<span className="text-[20px] font-bold">
									${property.price.toLocaleString("en-US")}
								</span>
							</div>
						</Link>
					</Popup>
				</Marker>
			))}
			{position && <Marker position={position}></Marker>}
		</MapContainer>
	);
};

export default Map;
