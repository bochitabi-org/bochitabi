import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		padding: 24,
	},
	message: {
		fontSize: 24,
		fontWeight: "600",
		marginBottom: 32,
		color: "#111827",
	},
	backButtonWrapper: {
		paddingHorizontal: 20,
		paddingVertical: 12,
		borderWidth: 1,
		borderColor: "#111827",
		borderRadius: 999,
	},
	backButtonText: {
		fontSize: 16,
		color: "#111827",
	},
});

export function MemorySearchScreen() {
	const router = useRouter();

	return (
		<View style={styles.container}>
			<Text style={styles.message}>未実装</Text>
			<View style={styles.backButtonWrapper}>
				<Text
					accessibilityRole="button"
					onPress={() => {
						router.back();
					}}
					style={styles.backButtonText}
				>
					戻る
				</Text>
			</View>
		</View>
	);
}

export default MemorySearchScreen;
