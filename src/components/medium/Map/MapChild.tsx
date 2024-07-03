"use client";
import { LatLngExpression } from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "./Map.css";

interface MapChildProps {
	center: LatLngExpression;
}

const MapChild = ({ center }: MapChildProps) => {
	const map = useMap();

	useEffect(() => {
		if (center) {
			map.setView(center, map.getZoom(), {
				animate: true,
				duration: 2,
				easeLinearity: 10,
			});
		}
	}, [center, map]);

	return null;
};

export default MapChild;
