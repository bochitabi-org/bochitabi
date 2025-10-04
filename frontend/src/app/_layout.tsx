import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";
import { UiProvider } from "../features/providers/UiProvider";

export default function Layout() {
	return (
		<UiProvider>
			<Tabs>
				<Tabs.Screen
					name="index"
					options={{
						title: "Home",
						headerShown: false,
						tabBarIcon: ({ color }) => (
							<FontAwesome name="home" size={28} color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="account"
					options={{
						title: "Account",
						headerShown: false,
						tabBarIcon: ({ color }) => (
							<MaterialCommunityIcons
								name="account-circle-outline"
								size={28}
								color={color}
							/>
						),
					}}
				/>
			</Tabs>
		</UiProvider>
	);
}
