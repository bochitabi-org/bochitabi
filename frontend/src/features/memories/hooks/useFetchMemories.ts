import { useQuery } from "@tanstack/react-query";

const host = process.env.EXPO_PUBLIC_API_HOST;

export type FetchMemoriesResponse = {
	memories: {
		id: string;
		name: string;
		story: string;
		latitude: string;
		longitude: string;
		pictures: string[];
	}[];
};

async function fetcher(): Promise<FetchMemoriesResponse> {
	const response = await fetch(`http://${host}:8080/v1/memories`);
	const json = await response.json();
	return json;
}

export function useFetchMemories() {
	return useQuery({ queryKey: ["memories"], queryFn: fetcher });
}