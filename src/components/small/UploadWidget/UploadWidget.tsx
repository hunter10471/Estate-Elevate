import { SetStateAction, createContext, useEffect, useState } from "react";
import Button from "../Button/Button";

declare global {
	interface Window {
		cloudinary: any;
	}
}

const CloudinaryScriptContext = createContext({});

const UploadWidget = ({
	uwConfig,
	setState,
}: {
	uwConfig: any;
	setPublicId?: any;
	setState?: SetStateAction<any>;
}) => {
	const [loaded, setLoaded] = useState(false);
	const [widgetInitialized, setWidgetInitialized] = useState(false);
	useEffect(() => {
		// Check if the script is already loaded
		if (!loaded) {
			const uwScript = document.getElementById("uw");
			if (!uwScript) {
				// If not loaded, create and load the script
				const script = document.createElement("script");
				script.setAttribute("async", "");
				script.setAttribute("id", "uw");
				script.src = "https://upload-widget.cloudinary.com/global/all.js";
				script.addEventListener("load", () => setLoaded(true));
				document.body.appendChild(script);
			} else {
				// If already loaded, update the state
				setLoaded(true);
			}
		}
	}, [loaded]);

	const initializeCloudinaryWidget = () => {
		if (loaded && !widgetInitialized) {
			const myWidget = window.cloudinary.createUploadWidget(
				uwConfig,
				(error: any, result: any) => {
					if (!error && result && result.event === "success") {
						console.log(result.info);
						console.log("Done! Here is the image info: ", result.info);
						setState(result.info.secure_url);
					}
				}
			);
			document.getElementById("upload_widget")!.addEventListener(
				"click",
				function () {
					myWidget.open();
				},
				false
			);
			setWidgetInitialized(true);
		}
	};

	return (
		<CloudinaryScriptContext.Provider value={{ loaded }}>
			<Button
				type="button"
				id="upload_widget"
				action={initializeCloudinaryWidget}
				text="Upload new photo"
			/>
		</CloudinaryScriptContext.Provider>
	);
};

export default UploadWidget;
export { CloudinaryScriptContext };
