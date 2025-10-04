import { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Sheet } from "tamagui";
import { Memory } from "../features/memories/components/Memory";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
	container: {
		height,
		width,
		justifyContent: "flex-end",
		alignItems: "center",
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
});

// 櫻川市
const defaultRegion = {
	latitude: 36.33018692714167,
	longitude: 140.09567236901313,
	latitudeDelta: 0.05,
	longitudeDelta: 0.05,
};

const defaultMarkers = [
	{
		id: "1",
		coordinate: {
			latitude: 36.33018692714167,
			longitude: 140.09567236901313,
		},
		title: "最初の思い出",
		description: "あの日あの時の思い出",
	},
	{
		id: "2",
		coordinate: {
			latitude: 36.348587,
			longitude: 140.113972,
		},
		title: "近くの思い出1",
		description: "櫻川市から2キロ先での思い出",
	},
	{
		id: "3",
		coordinate: {
			latitude: 36.311787,
			longitude: 140.077172,
		},
		title: "近くの思い出2",
		description: "櫻川市から2キロ先での思い出",
	},
	{
		id: "4",
		coordinate: {
			latitude: 36.348387,
			longitude: 140.077372,
		},
		title: "近くの思い出3",
		description: "櫻川市から2キロ先での思い出",
	},
	{
		id: "5",
		coordinate: {
			latitude: 36.311987,
			longitude: 140.114172,
		},
		title: "近くの思い出4",
		description: "櫻川市から2キロ先での思い出",
	},
];

export default function Home() {
	const [selectedMarker, setSelectedMarker] = useState(false);

	return (
		<View style={styles.container}>
			<MapView
				provider={PROVIDER_GOOGLE}
				style={styles.map}
				region={defaultRegion}
			>
				{defaultMarkers.map((marker) => (
					<Marker
						key={marker.id}
						coordinate={marker.coordinate}
						title={marker.title}
						description={marker.description}
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
					<View>
						<Memory />
					</View>
				</Sheet.Frame>
			</Sheet>
		</View>
	);
}
