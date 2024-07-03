import { ListingStatus, PropertyType } from "@prisma/client";
import {
	object,
	nativeEnum,
	string,
	number,
	array,
	any,
	TypeOf,
	boolean,
	coerce,
} from "zod";

const PropertyTypeEnum = nativeEnum(PropertyType);
const ListingStatusEnum = nativeEnum(ListingStatus);

export const listPropertyFormSchema = object({
	title: string().min(1, "Title is required"),
	description: string().min(1, "Description is required"),
	price: coerce.number().positive("Price must be a positive number"),
	type: PropertyTypeEnum,
	status: ListingStatusEnum,
	address: string().min(1, "Address is required").optional(),
	city: string({ required_error: "City is required" }).min(
		1,
		"City is required"
	),
	state: string({ required_error: "State is required" }).min(
		1,
		"State is required"
	),
	country: string({ required_error: "Country is required" }).min(
		1,
		"Country is required"
	),
	latlng: array(number()).length(2),
	bedrooms: number().int().positive("Bedrooms must be a positive integer"),
	bathrooms: number().int().positive("Bathrooms must be a positive integer"),
	area: number().positive("Area must be a positive number"),
	yearBuilt: number()
		.int()
		.positive("Year built must be a positive integer")
		.optional()
		.nullable(),
	images: array(any()).min(1, "Images are required"),
	facilities: array(any()).min(1, "Facilities are required"),
	negotiable: boolean().default(false),
	listedById: string({required_error:"ID of user listing the property is required"}).uuid("ListedBy ID must be a valid UUID"),
});

const typeSchema = object({
	status: ListingStatusEnum,
});

const categorySchema = object({
	type: PropertyTypeEnum,
});

const locationSchema = object({
	country: string({ required_error: "Country is required" }).min(
		1,
		"Country is required"
	),
	city: string({ required_error: "City is required" }).min(
		1,
		"City is required"
	),
	state: string({ required_error: "State is required" }).min(
		1,
		"State is required"
	),
	latlng: array(number()).length(
		2,
		"Coordinates must be an array of 2 numbers"
	),
});

const infoSchema = object({
	bedrooms: number({ required_error: "Please enter number of bedrooms" })
		.int()
		.positive("Bedrooms must be a positive integer"),
	bathrooms: number({ required_error: "Please enter number of bathrooms" })
		.int()
		.positive("Bathrooms must be a positive integer"),
	area: number({ required_error: "Please enter area of the house" }).positive(
		"Area must be a positive number"
	),
	yearBuilt: number({
		required_error: "Please enter the year the house was built in",
	})
		.int()
		.positive("Year built must be a positive integer")
		.optional()
		.nullable(),
});

const moreInfoSchema = object({
	facilities: array(any()).min(1, "At least one facility is required"),
});

const imagesSchema = object({
	images: array(any()).min(1, "At least one image is required"),
});

const descriptionSchema = object({
	title: string({ required_error: "Please enter title" }).min(
		1,
		"Title is required"
	),
	description: string({ required_error: "Please enter description" }).min(
		1,
		"Description is required"
	),
});

const priceSchema = object({
	price: coerce
		.number({
			required_error: "Please enter price of the property",
			invalid_type_error: "Only use numbers to state the price",
		})
		.positive("Price must be a positive number")
		.default(0),
	negotiable: boolean().default(false),
});

const stepSchemas = [
	typeSchema,
	categorySchema,
	locationSchema,
	infoSchema,
	moreInfoSchema,
	imagesSchema,
	descriptionSchema,
	priceSchema,
];

export { stepSchemas };

export type ListPropertyFormSchemaInputs = TypeOf<
	typeof listPropertyFormSchema
>;
