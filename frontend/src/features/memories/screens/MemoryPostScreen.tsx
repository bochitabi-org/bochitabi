import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
	Alert,
	Image,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { Coordinate } from "../context/MemoriesProvider";
import { useMemories } from "../context/MemoriesProvider";

type PickerType = "library" | "camera";

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#fff",
	},
	container: {
		paddingHorizontal: 24,
		paddingTop: 16,
		paddingBottom: 32,
		gap: 24,
	},
	actionsRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 16,
	},
	actionButton: {
		flex: 1,
		backgroundColor: "#f3f4f6",
		borderRadius: 12,
		height: 120,
		alignItems: "center",
		justifyContent: "center",
		borderColor: "#d1d5db",
		borderWidth: 1,
	},
	actionLabel: {
		marginTop: 8,
		fontSize: 14,
		fontWeight: "600",
		color: "#374151",
	},
	commentInput: {
		borderColor: "#c7cdd5",
		borderWidth: 1,
		borderRadius: 14,
		minHeight: 160,
		padding: 16,
		fontSize: 16,
		textAlignVertical: "top",
		backgroundColor: "#fff",
	},
	previewImage: {
		width: "100%",
		height: 220,
		borderRadius: 16,
	},
	previewWrapper: {
		borderRadius: 18,
		overflow: "hidden",
		borderWidth: 1,
		borderColor: "#e5e7eb",
	},
	errorText: {
		color: "#dc2626",
		fontSize: 14,
	},
	infoText: {
		fontSize: 13,
		color: "#6b7280",
	},
	submitRow: {
		flexDirection: "row",
		gap: 12,
	},
	primaryButton: {
		flex: 1,
		backgroundColor: "#4f46e5",
		paddingVertical: 16,
		borderRadius: 12,
		alignItems: "center",
	},
	primaryLabel: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 16,
	},
	secondaryButton: {
		flex: 1,
		borderColor: "#4f46e5",
		borderWidth: 1,
		paddingVertical: 16,
		borderRadius: 12,
		alignItems: "center",
	},
});

function tryParseCoordinatePart(value: unknown) {
	if (Array.isArray(value) && value.length >= 3) {
		const [deg = 0, min = 0, sec = 0] = value;
		const toNumber = (part: unknown) =>
			typeof part === "number" ? part : Number(part);
		const decimal = toNumber(deg) + toNumber(min) / 60 + toNumber(sec) / 3600;
		return Number.isFinite(decimal) ? decimal : null;
	}

	if (typeof value === "number" && Number.isFinite(value)) {
		return value;
	}

	if (typeof value === "string") {
		const parsed = Number(value);
		return Number.isFinite(parsed) ? parsed : null;
	}

	return null;
}

function convertToDecimalCoordinate(value: unknown, ref: unknown) {
	const parsed = tryParseCoordinatePart(value);

	if (parsed === null) {
		return null;
	}

	if (ref === "S" || ref === "W") {
		return parsed * -1;
	}

	return parsed;
}

function extractCoordinateFromExif(exif: ImagePicker.ImagePickerAsset["exif"]) {
	if (!exif) {
		return null;
	}

	const record = exif as Record<string, unknown>;
	const getValue = (...keys: string[]) => {
		for (const key of keys) {
			if (record[key] !== undefined) {
				return record[key];
			}
		}
		return undefined;
	};

	const latitude = convertToDecimalCoordinate(
		getValue("GPSLatitude", "gpsLatitude", "Latitude", "lat"),
		getValue("GPSLatitudeRef", "gpsLatitudeRef", "LatitudeRef", "latRef"),
	);
	const longitude = convertToDecimalCoordinate(
		getValue("GPSLongitude", "gpsLongitude", "Longitude", "lng", "lon"),
		getValue("GPSLongitudeRef", "gpsLongitudeRef", "LongitudeRef", "lngRef"),
	);

	if (typeof latitude === "number" && typeof longitude === "number") {
		return { latitude, longitude };
	}

	return null;
}

export default function MemoryPostScreen() {
	const router = useRouter();
	const { addMemory } = useMemories();
	const [selectedImage, setSelectedImage] =
		useState<ImagePicker.ImagePickerAsset | null>(null);
	const [location, setLocation] = useState<Coordinate | null>(null);
	const [comment, setComment] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [submitting, setSubmitting] = useState(false);

	const onSelectAsset = (asset: ImagePicker.ImagePickerAsset) => {
		setSelectedImage(asset);
		const coords = extractCoordinateFromExif(asset.exif);
		setLocation(coords);
		if (!coords) {
			setError(
				"写真に位置情報が含まれていません。位置情報付きの写真を選択してください。",
			);
		} else {
			setError(null);
		}
	};

	const handlePick = async (type: PickerType) => {
		try {
			const permissionResult =
				type === "library"
					? await ImagePicker.requestMediaLibraryPermissionsAsync()
					: await ImagePicker.requestCameraPermissionsAsync();

			if (!permissionResult.granted) {
				Alert.alert(
					"権限が必要です",
					type === "library"
						? "フォトライブラリへのアクセスを許可してください。"
						: "カメラへのアクセスを許可してください。",
				);
				return;
			}

			const pickerResult =
				type === "library"
					? await ImagePicker.launchImageLibraryAsync({
							mediaTypes: ImagePicker.MediaTypeOptions.Images,
							exif: true,
							quality: 0.8,
						})
					: await ImagePicker.launchCameraAsync({
							mediaTypes: ImagePicker.MediaTypeOptions.Images,
							exif: true,
							quality: 0.8,
						});

			if (!pickerResult.canceled && pickerResult.assets.length > 0) {
				onSelectAsset(pickerResult.assets[0]);
			}
		} catch (pickerError) {
			console.error(pickerError);
			setError("画像の取得中に問題が発生しました。");
		}
	};

	const handleSubmit = async () => {
		if (!selectedImage) {
			setError("画像を選択してください。");
			return;
		}

		if (!location) {
			setError(
				"写真から位置情報を取得できませんでした。別の写真をお試しください。",
			);
			return;
		}

		if (!comment.trim()) {
			setError("旅のストーリーを入力してください。");
			return;
		}

		setError(null);
		setSubmitting(true);
		try {
			addMemory({
				coordinate: location,
				description: comment.trim(),
				imageUri: selectedImage.uri,
				title: comment.trim().slice(0, 20) || "旅の記録",
			});
			router.replace("/(tabs)/index");
		} catch (submitError) {
			console.error(submitError);
			setError("投稿に失敗しました。再度お試しください。");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : undefined}
			>
				<ScrollView contentContainerStyle={styles.container}>
					<View>
						<Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 12 }}>
							写真を追加
						</Text>
						<View style={styles.actionsRow}>
							<Pressable
								style={styles.actionButton}
								onPress={() => handlePick("library")}
								accessibilityRole="button"
								accessibilityLabel="ライブラリから選択"
							>
								<FontAwesome5 name="image" size={32} color="#4b5563" />
								<Text style={styles.actionLabel}>ライブラリ</Text>
							</Pressable>
							<Pressable
								style={styles.actionButton}
								onPress={() => handlePick("camera")}
								accessibilityRole="button"
								accessibilityLabel="カメラで撮影"
							>
								<FontAwesome5 name="camera" size={32} color="#4b5563" />
								<Text style={styles.actionLabel}>カメラ</Text>
							</Pressable>
						</View>
						{selectedImage ? (
							<View style={[styles.previewWrapper, { marginTop: 20 }]}>
								<Image
									source={{ uri: selectedImage.uri }}
									style={styles.previewImage}
								/>
							</View>
						) : (
							<Text style={[styles.infoText, { marginTop: 16 }]}>
								位置情報付きの写真を選択するとマップにピンが立ちます。
							</Text>
						)}
					</View>
					<View>
						<Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 12 }}>
							旅のストーリー
						</Text>
						<TextInput
							multiline
							value={comment}
							onChangeText={setComment}
							style={styles.commentInput}
							placeholder="旅のストーリーを綴りましょう"
							placeholderTextColor="#9ca3af"
						/>
						{location ? (
							<Text style={[styles.infoText, { marginTop: 10 }]}>
								位置情報を検出しました（{location.latitude.toFixed(3)}°,{" "}
								{location.longitude.toFixed(3)}°）
							</Text>
						) : null}
					</View>
					{error ? <Text style={styles.errorText}>{error}</Text> : null}
					<View style={styles.submitRow}>
						<Pressable
							style={[styles.primaryButton, submitting && { opacity: 0.6 }]}
							disabled={submitting}
							onPress={handleSubmit}
						>
							<Text style={styles.primaryLabel}>
								{submitting ? "投稿中..." : "投稿する"}
							</Text>
						</Pressable>
						<Pressable
							style={styles.secondaryButton}
							onPress={() => router.back()}
						>
							<Text style={{ color: "#4f46e5", fontWeight: "600" }}>
								キャンセル
							</Text>
						</Pressable>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

export { MemoryPostScreen };
