import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from './lib/cn';

export const Tabs = TabsPrimitive.Root;
export function TabsList({
	className,
	...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
	return (
		<TabsPrimitive.List className={cn('ds-tabs__list', className)} {...props} />
	);
}
export function TabsTrigger({
	className,
	...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
	return (
		<TabsPrimitive.Trigger
			className={cn('ds-tabs__trigger', className)}
			{...props}
		/>
	);
}
export function TabsContent({
	className,
	...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
	return (
		<TabsPrimitive.Content
			className={cn('ds-tabs__content', className)}
			{...props}
		/>
	);
}
