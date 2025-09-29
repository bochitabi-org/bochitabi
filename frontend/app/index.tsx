import { Dimensions, StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

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
];

export default function Home() {
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
					/>
				))}
			</MapView>
		</View>
	);
}
