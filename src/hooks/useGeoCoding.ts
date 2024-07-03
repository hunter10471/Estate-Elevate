import { useState, useEffect } from "react";

const useGeocoding = (country: string, city: string, state: string) => {
	const [coordinates, setCoordinates] = useState([51.505, -0.09]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (country && (city || state)) {
			setLoading(true);

			const query = `${city ? city + "," : ""} ${
				state ? state + "," : ""
			} ${country}`;
			const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
				query
			)}`;

			fetch(url)
				.then((response) => {
					if (!response.ok) {
						throw new Error("Network response was not ok");
					}
					return response.json();
				})
				.then((data) => {
					if (data && data.length > 0) {
						const location = data[0];
						setCoordinates([
							parseFloat(location.lat),
							parseFloat(location.lon),
						]);
					}
					setLoading(false);
				})
				.catch((err) => {
					setError(err);
					setLoading(false);
				});
		}
	}, [country, city, state]);

	return { coordinates, loading, error };
};

export default useGeocoding;
