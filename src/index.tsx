import {
	type PropsWithChildren,
	type ReactNode,
	useEffect,
	useLayoutEffect,
	useSyncExternalStore,
} from "react";

const useIsomorphicLayoutEffect =
	typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Listener = () => void;
function createTunnel() {
	let localState: ReactNode[] = [];
	let listeners: Listener[] = [];

	function subscribe(listener: Listener) {
		listeners = [...listeners, listener];

		return () => {
			listeners = listeners.filter((l) => l !== listener);
		};
	}

	function notifyListeners() {
		for (const listener of listeners) {
			listener();
		}
	}

	return {
		In({ children }: PropsWithChildren) {
			useIsomorphicLayoutEffect(() => {
				localState = [...localState, children];
				notifyListeners();
				return () => {
					localState = localState.filter((c) => c !== children);
				};
			}, [children]);

			return null;
		},
		Out() {
			const currentState = useSyncExternalStore(subscribe, () => localState);
			return <>{currentState}</>;
		},
	};
}

export { createTunnel };
