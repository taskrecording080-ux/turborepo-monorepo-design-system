import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from './lib/cn';

export const buttonVariants = cva('ds-button', {
	variants: {
		variant: {
			primary: 'ds-button--primary',
			outline: 'ds-button--outline'
		},
		size: { sm: 'ds-button--sm', md: 'ds-button--md' }
	},
	defaultVariants: { variant: 'primary', size: 'md' }
});

export type ButtonProps = React.ComponentPropsWithoutRef<'button'> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	};

/**
 * forwardRef is REQUIRED on React 18: Radix (Dialog trigger, Slot) attaches a ref to this component
 * to manage focus. In React 19 `ref` is a normal prop and forwardRef is no longer needed.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	function Button(
		{ className, variant, size, asChild = false, type, ...props },
		ref
	) {
		const Comp = asChild ? Slot : 'button';
		return (
			<Comp
				ref={ref}
				className={cn(buttonVariants({ variant, size }), className)}
				type={asChild ? undefined : type ?? 'button'}
				{...props}
			/>
		);
	}
);
