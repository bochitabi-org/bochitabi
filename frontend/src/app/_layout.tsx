import { Stack } from "expo-router";
import { MemoriesProvider } from "../features/memories/context/MemoriesProvider";
import { UiProvider } from "../features/providers/UiProvider";

export default function Layout() {
	return (
		<UiProvider>
			<MemoriesProvider>
				<Stack>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					<Stack.Screen
						name="post"
						options={{
							title: "思い出を投稿する",
						}}
					/>
					<Stack.Screen
						name="search"
						options={{
							title: "思い出を検索する",
						}}
					/>
				</Stack>
			</MemoriesProvider>
		</UiProvider>
	);
}
