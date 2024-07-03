import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const useUpdateQuery = () => {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const router = useRouter();
	const updateQuery = useCallback(
		(key: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(key, value);
			router.push(`${pathname}?${params.toString()}`);
		},
		[pathname, searchParams, router]
	);
	const getQueryParam = useCallback(
		(key: string) => {
			return searchParams.get(key);
		},
		[searchParams]
	);

	return { updateQuery, getQueryParam };
};

export default useUpdateQuery;
