import { useCallback, useState } from 'react';

type Args<T> = { value?: T; defaultValue: T; onChange?: (value: T) => void };

/** One hook that makes a component work both controlled (value) and uncontrolled (defaultValue). */
export function useControllableState<T>({
	value,
	defaultValue,
	onChange
}: Args<T>) {
	const [inner, setInner] = useState(defaultValue);
	const controlled = value !== undefined;
	const current = controlled ? (value as T) : inner;
	const set = useCallback(
		(next: T) => {
			if (!controlled) setInner(next);
			onChange?.(next);
		},
		[controlled, onChange]
	);
	return [current, set] as const;
}
