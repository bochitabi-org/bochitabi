import {
	QueryClient,
	QueryClientProvider as TanstackProvider,
} from "@tanstack/react-query";
import type { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

const queryClient = new QueryClient();

export function QueryClientProvider({ children }: Props) {
	return <TanstackProvider client={queryClient}>{children}</TanstackProvider>;
}
