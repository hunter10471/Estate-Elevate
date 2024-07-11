"use client";
import { propertyTypes } from "@/components/medium/PropertyTypes/PropertyTypes";
import Button from "@/components/small/Button/Button";
import Heading from "@/components/small/Heading/Heading";
import { Form, Formik, FormikProps, useField } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import {
	ListPropertyFormSchemaInputs,
	stepSchemas,
} from "../../../../utils/validation/ListPropertyForm.schema";
import { ListingStatus, PropertyType } from "@prisma/client";
import CountrySelect from "@/components/small/CountrySelect/CountrySelect";
import Map from "@/components/medium/Map/Map";
import Input from "@/components/small/Input/Input";
import { LatLngExpression } from "leaflet";
import useGeocoding from "@/hooks/useGeoCoding";
import CounterInput from "@/components/small/CounterInput/CounterInput";
import {
	MdOutlineBed,
	MdOutlineShower,
	MdOutlineCalendarToday,
	MdClose,
} from "react-icons/md";
import { IoIosExpand } from "react-icons/io";
import { BiDollar } from "react-icons/bi";
import { IoHomeOutline } from "react-icons/io5";
import Facilities from "@/components/small/Facilities/Facilities";
import UploadWidget from "@/components/small/UploadWidget/UploadWidget";
import { RiImageAddLine } from "react-icons/ri";
import { PiHandshake } from "react-icons/pi";
import { RxValueNone } from "react-icons/rx";
import StepIndicator from "@/components/medium/StepIndicator/StepIndicator";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Slide, ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { revalidatePath } from "next/cache";
import { CreateListingResponse } from "../../../../utils/types";
import Image from "next/image";

interface ListPropertyModal {
	children: React.ReactNode;
	userId: string;
}

enum STEPS {
	TYPE = 0,
	CATEGORY = 1,
	LOCATION = 2,
	INFO = 3,
	MORE_INFO = 4,
	IMAGES = 5,
	DESCRIPTION = 6,
	PRICE = 7,
}

const ListPropertyModal = ({ children, userId }: ListPropertyModal) => {
	const [show, setShow] = useState(false);
	const [step, setStep] = useState(STEPS.TYPE);
	const [loading, setLoading] = useState(false);
	const [thumbnail, setThumbnail] = useState(0);
	const router = useRouter();
	const initialValues = {
		title: "",
		description: "",
		price: 0.0,
		type: PropertyType.HOUSE,
		status: ListingStatus.SALE,
		city: "",
		state: "",
		country: "",
		latlng: [0, 0],
		bedrooms: 1,
		bathrooms: 1,
		area: 0.0,
		yearBuilt: null,
		images: [],
		facilities: [],
		negotiable: false,
		listedById: userId,
	};
	const onBack = () => {
		setStep((value) => value - 1);
	};
	const onNext = (formik: FormikProps<ListPropertyFormSchemaInputs>) => {
		if (formik.isValid) {
			setStep((prevStep) => prevStep + 1);
		} else {
			formik.validateForm();
		}
	};

	const modal = useRef<HTMLDivElement>(null);
	const handleClickOutside = (e: React.MouseEvent<Document>) => {
		if (modal.current && !modal.current.contains(e.target as Node)) {
			setShow(false);
		}
	};

	useEffect(() => {
		if (show) {
			document.addEventListener(
				"mousedown",
				handleClickOutside as unknown as EventListener
			);
		} else {
			document.removeEventListener(
				"mousedown",
				handleClickOutside as unknown as EventListener
			);
		}
		return () => {
			document.removeEventListener(
				"mousedown",
				handleClickOutside as unknown as EventListener
			);
		};
	}, [show]);

	const headingText = (): { title: string; subtitle?: string } => {
		switch (step) {
			case STEPS.TYPE:
				return {
					title: "How would you like to list your property?",
					subtitle: "Pick a listing type",
				};
			case STEPS.CATEGORY:
				return {
					title: "Which of these best describes your place?",
					subtitle: "Pick a category",
				};
			case STEPS.LOCATION:
				return {
					title: "Where is your place located?",
					subtitle: "Help us find you!",
				};
			case STEPS.INFO:
				return {
					title: "Share some basics about your place",
					subtitle: "What amenities do you have?",
				};
			case STEPS.MORE_INFO:
				return {
					title: "Add Nearby Amenities",
					subtitle: "Select from the following amenities and features",
				};
			case STEPS.IMAGES:
				return {
					title: "Add Photos of your property",
					subtitle: "Try adding snaps of the property from different angles",
				};
			case STEPS.DESCRIPTION:
				return {
					title: "How would you describe your property?",
					subtitle:
						"Highlight the unique features and benefits of your property to attract potential buyers or renters",
				};
			case STEPS.PRICE:
				return {
					title: "Set Your Listing Price",
					subtitle: "Specify the price at which you want to list your property",
				};
			default:
				return {
					title: "Tell us more about your place",
					subtitle: "Share some details about the property",
				};
		}
	};

	const selectThumbnail = (images: string[]) => {
		if (thumbnail !== 0) {
			const image = images[thumbnail];
			images.splice(thumbnail, 1);
			images.unshift(image);
		}
		return images;
	};

	const onSubmit = async (values: ListPropertyFormSchemaInputs) => {
		try {
			setLoading(true);
			values.images = selectThumbnail(values.images);
			values.listedById = userId;
			const response = await fetch(`/api/property`, {
				method: "POST",
				body: JSON.stringify(values),
			});
			const responseBody: CreateListingResponse = await response.json();
			if (responseBody.error) {
				throw responseBody.error;
			}
			toast.success("Listing has been created successfully.", {
				position: "bottom-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
				transition: Slide,
				onClose() {
					router.refresh();
					router.push(`/properties/${responseBody.property?.id}`);
				},
			});
		} catch (error: any) {
			console.log(error);
			toast.error(error, {
				position: "bottom-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
				transition: Slide,
			});
		}
		setLoading(false);
		setShow(false);
	};

	const BodyContent = ({
		formikState,
	}: {
		formikState: FormikProps<ListPropertyFormSchemaInputs>;
	}): React.ReactNode => {
		console.log(formikState.values);
		const { country, city, state } = formikState.values;
		const [debouncedCity, setDebouncedCity] = useState(city);
		const [debouncedState, setDebouncedState] = useState(state);
		const [image, setImage] = useState();

		useEffect(() => {
			if (image) {
				const imagesArr = formikState.values.images;
				if (imagesArr.length > 0) {
					formikState.setFieldValue("images", [...imagesArr, image]);
				} else {
					formikState.setFieldValue("images", [image]);
				}
			}
		}, [image]);
		const { coordinates } = useGeocoding(
			country,
			debouncedCity,
			debouncedState
		);
		useEffect(() => {
			formikState.setFieldValue("latlng", coordinates);
		}, [coordinates]);
		useEffect(() => {
			const handler = setTimeout(() => {
				setDebouncedCity(city);
				setDebouncedState(state);
			}, 2000);

			return () => {
				clearTimeout(handler);
			};
		}, [city, state]);

		switch (step) {
			case STEPS.TYPE:
				const { status } = formikState.values;
				return (
					<div className="flex flex-col gap-2 justify-between items-center mt-8">
						<div
							onClick={() =>
								formikState.setFieldValue("status", ListingStatus.SALE)
							}
							className={`cursor-pointer p-2 font-medium w-[200px] h-[150px] rounded-xl border-2 ${
								status === ListingStatus.SALE
									? "border-primaryLight"
									: "border-gray-300"
							}  gap-2 flex items-center justify-center  hover:border-primaryLight`}
						>
							<BiDollar size={20} /> For Sale
						</div>
						<span className="text-sm ">OR</span>
						<div
							onClick={() =>
								formikState.setFieldValue("status", ListingStatus.RENT)
							}
							className={`cursor-pointer p-2 font-medium w-[200px] h-[150px] rounded-xl border-2  ${
								status === ListingStatus.RENT
									? "border-primaryLight"
									: "border-gray-300"
							}	 gap-2 flex items-center justify-center  hover:border-primaryLight`}
						>
							<IoHomeOutline size={20} /> For Rent
						</div>
					</div>
				);
			case STEPS.CATEGORY:
				return (
					<div className="flex flex-wrap my-5 gap-4 justify-between">
						{propertyTypes.map((propertyType) => (
							<span
								key={propertyType.name}
								onClick={() =>
									formikState.setFieldValue(
										"type",
										PropertyType[propertyType.type]
									)
								}
								className={` flex flex-col gap-1 w-[48%] p-5 rounded-lg border-2  hover:border-primaryLight ${
									formikState.values.type === propertyType.type
										? "border-primaryLight"
										: "border-gray-300"
								} transition-all cursor-pointer`}
							>
								<propertyType.icon size={25} />
								{propertyType.name}
							</span>
						))}
					</div>
				);
			case STEPS.LOCATION:
				return (
					<div className="h-full">
						<div className="my-4 z-[9999]">
							<CountrySelect label formik={formikState} />
							<div className="flex gap-4 my-3">
								<Input
									name="state"
									error={formikState.errors.state}
									type="text"
									label="State"
									placeholder="Enter your property's state"
								/>
								<Input
									name="city"
									error={formikState.errors.city}
									type="text"
									label="City"
									placeholder="Enter your property's city"
								/>
							</div>
						</div>
						<div className="h-[200px]">
							<Map
								zoom={8}
								position={coordinates as LatLngExpression}
								fullWidth
							/>
						</div>
					</div>
				);
			case STEPS.INFO:
				return (
					<div>
						<CounterInput
							formik={formikState}
							name="bedrooms"
							title="Rooms"
							subtitle="How many bedrooms does the property have?"
							icon={MdOutlineBed}
						/>
						<CounterInput
							formik={formikState}
							name="bathrooms"
							title="Bathrooms"
							subtitle="How many bathrooms does the property have?"
							icon={MdOutlineShower}
						/>
						<CounterInput
							formik={formikState}
							name="area"
							title="Area"
							subtitle="What is the area of the property in sqft?"
							icon={IoIosExpand}
							intialValue={250}
						/>
						<CounterInput
							formik={formikState}
							name="yearBuilt"
							title="Year Built"
							subtitle="When was this property constructed?"
							icon={MdOutlineCalendarToday}
							intialValue={new Date().getFullYear()}
						/>
					</div>
				);
			case STEPS.MORE_INFO:
				return <Facilities formik={formikState} listing />;
			case STEPS.IMAGES:
				const images = formikState.values.images;
				const removeImage = (removeIndex: number) => {
					const filteredImages = images.filter(
						(image, index) => index !== removeIndex
					);
					formikState.setFieldValue("images", filteredImages);
				};
				return (
					<div>
						<div className="flex items-center justify-center border-2 border-dashed border-gray-300 mt-8 h-[200px] flex-col text-gray-500 mb-4">
							<RiImageAddLine size={40} />
							<UploadWidget
								uwConfig={{
									cloudName: "dz79wze9e",
									uploadPreset: "Estate Elevate",
									multiple: true,
									maxImageFileSize: 2000000,
									folder: "properties",
								}}
								setState={setImage}
							/>
						</div>
						{images && images.length > 0 && (
							<span className="text-xs font-semibold text-primaryDark">
								Select an image from images below to be your listing&apos;s
								thumbnail image:
							</span>
						)}
						<div className="flex gap-2 mt-5">
							{images.map((image, index) => (
								<div
									key={image}
									className={`border-2 rounded-xl ${
										index === thumbnail
											? "border-primary"
											: "border-transparent"
									} relative h-[80px] w-[80px] hover:border-primaryLight `}
								>
									<Image
										onClick={() => setThumbnail(index)}
										src={image}
										alt="Property"
										fill
										className="rounded-lg object-cover cursor-pointer"
									/>
									<button
										onClick={() => removeImage(index)}
										type="button"
										className="p-1 rounded-full bg-white hover:scale-105 active:scale-95 transition-all absolute -right-2 -top-2 border-2"
									>
										<MdClose size={15} />
									</button>
								</div>
							))}
						</div>
					</div>
				);
			case STEPS.DESCRIPTION:
				return (
					<div className="flex flex-col gap-5 mt-5">
						<Input
							name="title"
							type="text"
							placeholder="Enter your title"
							label="Title"
							error={formikState.errors.title}
						/>
						<Input
							name="description"
							type="text"
							placeholder="Enter your description"
							label="Description"
							error={formikState.errors.description}
						/>
					</div>
				);
			case STEPS.PRICE:
				const { negotiable } = formikState.values;
				return (
					<div className="my-5">
						<Input
							name="price"
							placeholder="Enter your property price"
							error={formikState.errors.price}
							type="text"
							label="Price"
							dollar
						/>
						<label
							className={` text-xs md:text-sm font-medium block mt-6 mb-2`}
						>
							Is the price negotiable?
						</label>
						<div className="flex gap-2 justify-between items-center">
							<div
								onClick={() => formikState.setFieldValue("negotiable", true)}
								className={`cursor-pointer p-2 font-medium w-[200px] h-[150px] rounded-xl border-2 ${
									negotiable ? "border-primaryLight" : "border-gray-300"
								}  gap-2 flex items-center justify-center  hover:border-primaryLight`}
							>
								<PiHandshake size={20} /> Negotiable
							</div>
							<span className="text-sm ">OR</span>
							<div
								onClick={() => formikState.setFieldValue("negotiable", false)}
								className={`cursor-pointer p-2 font-medium w-[200px] h-[150px] rounded-xl border-2  ${
									!negotiable ? "border-primaryLight" : "border-gray-300"
								}	 gap-2 flex items-center justify-center  hover:border-primaryLight`}
							>
								<RxValueNone size={20} /> Not Negotiable
							</div>
						</div>
					</div>
				);
			default:
				return (
					<div className="flex items-center flex-col justify-center h-[300px]">
						<h1 className="text-[24px] font-bold text-gray-400">
							There&apos;s nothing to show here
						</h1>
						<p className="text-gray-400 text-sm">
							Try going back to the previous page
						</p>
					</div>
				);
		}
	};

	return (
		<Formik<ListPropertyFormSchemaInputs>
			initialValues={initialValues}
			validationSchema={toFormikValidationSchema(stepSchemas[step] as any)}
			validateOnBlur
			onSubmit={onSubmit}
		>
			{(formikState) => {
				const errors = formikState.errors;
				return (
					<>
						<ToastContainer />
						<Form
							className={`w-screen h-screen fixed ${
								show ? "opacity-100" : "opacity-0 pointer-events-none"
							} bg-black/40 z-[99999] flex justify-center items-center duration-500  m-auto top-0 right-0 overflow-hidden`}
						>
							<div
								ref={modal}
								className={`${
									show ? "translate-y-[0%]" : "translate-y-[100%]"
								} transition-all duration-500 ease-in-out flex flex-col justify-between bg-white max-w-[600px] w-[90vw] max-h-[700px] h-[90vh] rounded-xl`}
							>
								<div className="mb-2 py-5 flex justify-center relative border-b-[1px] border-gray-300">
									<Heading
										smallSize
										weight="medium"
										text="List your property details"
									/>
									<button
										className="absolute p-1 hover:bg-gray-300 rounded-full transition-all right-5 top-5"
										onClick={() => setShow(false)}
									>
										<IoMdClose size={20} />
									</button>
								</div>
								<StepIndicator currentStep={step} />
								<div className="flex flex-col justify-between px-5 py-2 mb-auto">
									<Heading
										weight="medium"
										mediumSize
										text={headingText().title}
										subtitle={headingText().subtitle}
									/>
									<BodyContent formikState={formikState} />
								</div>
								<div className="flex gap-5 m-5">
									{step !== STEPS.TYPE && (
										<Button
											action={onBack}
											outline
											text="Back"
											type="button"
											full
										/>
									)}
									{step !== STEPS.PRICE ? (
										<Button
											action={() => onNext(formikState)}
											primary
											type="button"
											text="Next"
											full
										/>
									) : (
										<Button
											loading={loading}
											primary
											type="submit"
											text="Create listing"
											full
										/>
									)}
								</div>
							</div>
						</Form>
						<div onClick={() => setShow((prev) => !prev)}>{children}</div>
					</>
				);
			}}
		</Formik>
	);
};

export default ListPropertyModal;
