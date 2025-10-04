import { defaultConfig } from "@tamagui/config/v4";
import type { ReactNode } from "react";
import { createTamagui, TamaguiProvider } from "tamagui";

type Props = {
	children: ReactNode;
};

const config = createTamagui(defaultConfig);

export function UiProvider({ children }: Props) {
	return <TamaguiProvider config={config}>{children}</TamaguiProvider>;
}
