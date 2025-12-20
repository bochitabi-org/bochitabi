import { Image, Text, View } from "react-native";
import type { MemoryPin } from "../context/MemoriesProvider";

type Props = {
	memory: MemoryPin;
};

export function Memory({ memory }: Props) {
	const imageSource = memory.imageUri
		? { uri: memory.imageUri }
		: require("assets/Mt.tsukuba.png");
	const formattedDate = new Date(memory.createdAt).toLocaleDateString("ja-JP");

	return (
		<View>
			<View style={{ alignItems: "center", marginBottom: 16 }}>
				<Image
					source={imageSource}
					resizeMode="cover"
					style={{
						width: "100%",
						height: 220,
						borderRadius: 12,
						backgroundColor: "#f1f1f1",
					}}
				/>
			</View>
			<Text
				style={{
					fontSize: 20,
					fontWeight: "bold",
					marginBottom: 4,
				}}
			>
				{memory.title}
			</Text>
			<Text style={{ color: "#6b7280", marginBottom: 12 }}>
				{formattedDate}
			</Text>
			<Text style={{ lineHeight: 20 }}>{memory.description}</Text>
		</View>
	);
}
