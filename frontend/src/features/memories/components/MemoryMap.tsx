import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Sheet } from "tamagui";
import { Memory } from "./Memory";

const host = process.env.EXPO_PUBLIC_API_HOST;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
	container: {
		height,
		width,
		justifyContent: "center",
		alignItems: "center",
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
});

async function fetchMemories(): Promise<Response> {
	const response = await fetch(`http://${host}:8080/v1/memories`);
	const json = await response.json();
	return json;
}

// 櫻川市
const defaultRegion = {
	latitude: 36.33018692714167,
	longitude: 140.09567236901313,
	latitudeDelta: 0.05,
	longitudeDelta: 0.05,
};

type Response = {
	memories: {
		id: string;
		name: string;
		story: string;
		latitude: string;
		longitude: string;
		pictures: string[];
	}[];
};

export function MemoryMap() {
	const [selectedMarker, setSelectedMarker] = useState(false);
	const query = useQuery({ queryKey: ["memories"], queryFn: fetchMemories });
	const { data, isPending, error } = query;

	if (isPending) {
		return (
			<View style={styles.container}>
				<Text>Loading...</Text>
			</View>
		);
	}

	if (error) {
		throw new Error("fetch error");
	}

	return (
		<View style={styles.container}>
			<MapView
				provider={PROVIDER_GOOGLE}
				style={styles.map}
				region={defaultRegion}
			>
				{data?.memories?.map((memory) => (
					<Marker
						key={memory.id}
						coordinate={{
							latitude: Number(memory.latitude),
							longitude: Number(memory.longitude),
						}}
						title={memory.name}
						description={memory.story}
						onPress={() => setSelectedMarker((prev) => !prev)}
					/>
				))}
			</MapView>
			<Sheet
				animation="fast"
				open={selectedMarker}
				modal={false}
				snapPoints={[90]}
				dismissOnSnapToBottom
				onOpenChange={setSelectedMarker}
			>
				<Sheet.Overlay opacity={0} />
				<Sheet.Handle />
				<Sheet.Frame padding="$4">
					<Memory />
				</Sheet.Frame>
			</Sheet>
		</View>
	);
}
