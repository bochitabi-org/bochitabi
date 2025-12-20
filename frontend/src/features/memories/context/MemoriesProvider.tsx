import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

// 座標
export type Coordinate = {
	latitude: number;
	longitude: number;
};

// 思い出ピン
export type MemoryPin = {
	id: string;
	coordinate: Coordinate;
	title: string;
	description: string;
	imageUri?: string;
	createdAt: string;
};

type AddMemoryInput = {
	coordinate: Coordinate;
	description: string;
	imageUri?: string;
	title?: string;
};

type MemoriesContextValue = {
	memories: MemoryPin[];
	addMemory: (input: AddMemoryInput) => MemoryPin;
	selectedMemoryId: string | null;
	selectMemory: (id: string | null) => void;
};

const defaultMemories: MemoryPin[] = [
	{
		id: "1",
		coordinate: {
			latitude: 36.33018692714167,
			longitude: 140.09567236901313,
		},
		title: "最初の思い出",
		description: "あの日あの時の思い出",
		createdAt: new Date().toISOString(),
	},
	{
		id: "2",
		coordinate: {
			latitude: 36.348587,
			longitude: 140.113972,
		},
		title: "近くの思い出1",
		description: "櫻川市から2キロ先での思い出",
		createdAt: new Date().toISOString(),
	},
	{
		id: "3",
		coordinate: {
			latitude: 36.311787,
			longitude: 140.077172,
		},
		title: "近くの思い出2",
		description: "櫻川市から2キロ先での思い出",
		createdAt: new Date().toISOString(),
	},
	{
		id: "4",
		coordinate: {
			latitude: 36.348387,
			longitude: 140.077372,
		},
		title: "近くの思い出3",
		description: "櫻川市から2キロ先での思い出",
		createdAt: new Date().toISOString(),
	},
	{
		id: "5",
		coordinate: {
			latitude: 36.311987,
			longitude: 140.114172,
		},
		title: "近くの思い出4",
		description: "櫻川市から2キロ先での思い出",
		createdAt: new Date().toISOString(),
	},
];

const MemoriesContext = createContext<MemoriesContextValue | undefined>(
	undefined,
);

export function MemoriesProvider({ children }: { children: ReactNode }) {
	const [memories, setMemories] = useState<MemoryPin[]>(defaultMemories);
	const [selectedMemoryId, selectMemory] = useState<string | null>(null);

	const addMemory = (input: AddMemoryInput) => {
		const nextMemory: MemoryPin = {
			id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
			title: input.title ?? "旅の記録",
			description: input.description,
			imageUri: input.imageUri,
			coordinate: input.coordinate,
			createdAt: new Date().toISOString(),
		};

		setMemories((prev) => [...prev, nextMemory]);
		selectMemory(nextMemory.id);
		return nextMemory;
	};

	return (
		<MemoriesContext.Provider
			value={{ memories, addMemory, selectedMemoryId, selectMemory }}
		>
			{children}
		</MemoriesContext.Provider>
	);
}

export function useMemories() {
	const context = useContext(MemoriesContext);

	if (!context) {
		throw new Error("useMemories must be used within a MemoriesProvider");
	}

	return context;
}
