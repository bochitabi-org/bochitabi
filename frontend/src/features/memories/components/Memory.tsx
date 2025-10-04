import { Image, Text, View } from "react-native";

export function Memory() {
	return (
		<View>
			<View style={{ alignItems: "center" }}>
				<Image
					source={require("assets/Mt.tsukuba.png")}
					resizeMode="contain"
					style={{ width: 350, height: 300 }}
				/>
			</View>
			<Text>
				ああいうことした。ああいうことした。ああいうことした。ああいうことした。ああいうことした。ああいうことした。ああいうことした。ああいうことした。ああいうことした。ああいうことした。ああいうことした。
			</Text>
		</View>
	);
}
