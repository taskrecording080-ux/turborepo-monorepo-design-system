import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from './lib/cn';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export function DialogContent({
	className,
	children,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
	return (
		<DialogPrimitive.Portal>
			<DialogPrimitive.Overlay className='ds-dialog__overlay' />
			<DialogPrimitive.Content
				className={cn('ds-dialog__content', className)}
				{...props}
			>
				{children}
			</DialogPrimitive.Content>
		</DialogPrimitive.Portal>
	);
}
export function DialogTitle({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
	return (
		<DialogPrimitive.Title
			className={cn('ds-dialog__title', className)}
			{...props}
		/>
	);
}
export function DialogDescription({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
	return (
		<DialogPrimitive.Description
			className={cn('ds-dialog__description', className)}
			{...props}
		/>
	);
}
