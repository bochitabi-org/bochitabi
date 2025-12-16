import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import MapView, {
	MapPressEvent,
	Marker,
	PROVIDER_GOOGLE,
} from "react-native-maps";
import { Sheet } from "tamagui";
import { useMemories } from "../context/MemoriesProvider";
import { Memory } from "./Memory";
import { useFetchMemories } from "../hooks/useFetchMemories";


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
	// 上部コントロールのスタイル
	topControls: {
		position: "absolute",
		top: 60,
		right: 24,
		gap: 12,
	},
	// 上部コントロール内ボタンのスタイル
	controlButton: {
		backgroundColor: "white",
		width: 44,
		height: 44,
		borderRadius: 22,
		alignItems: "center",
		justifyContent: "center",
		elevation: 6,
		shadowColor: "#000",
		shadowOpacity: 0.2,
		shadowRadius: 4,
		shadowOffset: {
			height: 3,
			width: 0,
		},
	},
});

// デフォルト座標：櫻川市
const defaultRegion = {
	latitude: 36.33018692714167,
	longitude: 140.09567236901313,
	latitudeDelta: 0.05,
	longitudeDelta: 0.05,
};

export function MemoryMap() {
	const mapRef = useRef<MapView | null>(null);
	const router = useRouter();
	const { memories, selectedMemoryId, selectMemory } = useMemories();
	const selectedMemory =
		memories.find((memory) => memory.id === selectedMemoryId) ?? null;

	const handleMapPress = (event: MapPressEvent) => {
		// Avoid closing the sheet when a marker itself was pressed
		if (event.nativeEvent.action === "marker-press") {
			return;
		}
		selectMemory(null);
	};

	useEffect(() => {
		if (selectedMemory) {
			mapRef.current?.animateToRegion(
				{
					latitude: selectedMemory.coordinate.latitude,
					longitude: selectedMemory.coordinate.longitude,
					latitudeDelta: 0.02,
					longitudeDelta: 0.02,
				},
				350,
			);
		}
	}, [selectedMemory]);

	return (
		<View style={styles.container}>
			<MapView
				provider={PROVIDER_GOOGLE}
				ref={(ref) => {
					mapRef.current = ref;
				}}
				style={styles.map}
				initialRegion={defaultRegion}
				onPress={handleMapPress}
			>
				{memories.map((marker) => (
					<Marker
						key={marker.id}
						coordinate={marker.coordinate}
						title={marker.title}
						description={marker.description}
						onPress={() => selectMemory(marker.id)}
					/>
				))}
			</MapView>
			<View style={styles.topControls}>
				<Pressable
					style={styles.controlButton}
					onPress={() => router.push("/post")}
					accessibilityRole="button"
					accessibilityLabel="投稿する"
				>
					<FontAwesome5 name="thumbtack" size={20} color="#c1121f" />
				</Pressable>
				<Pressable
					style={styles.controlButton}
					onPress={() => router.push("/search")}
					accessibilityRole="button"
					accessibilityLabel="投稿を検索する"
				>
					<FontAwesome5 name="search" size={20} color="#111" />
				</Pressable>
			</View>
			<Sheet
				animation="fast"
				open={Boolean(selectedMemory)}
				modal={false}
				snapPoints={[90]}
				dismissOnSnapToBottom
				onOpenChange={(nextOpen: boolean) => {
					if (!nextOpen) {
						selectMemory(null);
					}
				}}
			>
				<Sheet.Overlay opacity={0} />
				<Sheet.Handle />
				<Sheet.Frame padding="$4">
					{selectedMemory ? <Memory memory={selectedMemory} /> : null}
				</Sheet.Frame>
			</Sheet>
		</View>
	);
}
