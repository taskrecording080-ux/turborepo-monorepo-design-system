import * as React from 'react';
import { createContext, useContext, useId } from 'react';
import { useControllableState } from './lib/use-controllable-state';
import { cn } from './lib/cn';

// Hand-built compound component: shows controlled/uncontrolled state + ARIA wiring without a primitive
type Ctx = {
	open: boolean;
	toggle: () => void;
	panelId: string;
	triggerId: string;
};
const DisclosureContext = createContext<Ctx | null>(null);
function useDisclosure() {
	const ctx = useContext(DisclosureContext);
	if (!ctx)
		throw new Error('Disclosure parts must be rendered inside <Disclosure>');
	return ctx;
}
export type DisclosureProps = {
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	children: React.ReactNode;
};
export function Disclosure({
	open,
	defaultOpen = false,
	onOpenChange,
	children
}: DisclosureProps) {
	const [isOpen, setOpen] = useControllableState({
		value: open,
		defaultValue: defaultOpen,
		onChange: onOpenChange
	});
	const id = useId();
	const value = React.useMemo(
		() => ({
			open: isOpen,
			toggle: () => setOpen(!isOpen),
			panelId: `${id}-panel`,
			triggerId: `${id}-trigger`
		}),
		[isOpen, setOpen, id]
	);
	return (
		<DisclosureContext.Provider value={value}>
			{children}
		</DisclosureContext.Provider>
	);
}
export function DisclosureTrigger({
	className,
	...props
}: React.ComponentProps<'button'>) {
	const { open, toggle, panelId, triggerId } = useDisclosure();
	return (
		<button
			type='button'
			id={triggerId}
			className={cn('ds-disclosure__trigger', className)}
			aria-expanded={open}
			aria-controls={panelId}
			onClick={toggle}
			{...props}
		/>
	);
}
export function DisclosureContent({
	className,
	...props
}: React.ComponentProps<'div'>) {
	const { open, panelId, triggerId } = useDisclosure();
	return (
		<div
			id={panelId}
			role='region'
			aria-labelledby={triggerId}
			hidden={!open}
			className={cn('ds-disclosure__content', className)}
			{...props}
		/>
	);
}
