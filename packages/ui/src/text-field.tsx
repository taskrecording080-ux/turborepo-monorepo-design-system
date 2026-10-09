import * as React from 'react';
import { useId } from 'react';
import { cn } from './lib/cn';

export type TextFieldProps = Omit<React.ComponentProps<'input'>, 'id'> & {
	label: string;
	hint?: string;
	error?: string;
};

export function TextField({
	label,
	hint,
	error,
	className,
	...props
}: TextFieldProps) {
	const id = useId();
	const hintId = hint ? `${id}-hint` : undefined;
	const errorId = error ? `${id}-error` : undefined;
	const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;
	return (
		<div className='ds-field'>
			<label htmlFor={id} className='ds-field__label'>
				{label}
			</label>
			<input
				id={id}
				className={cn('ds-field__input', className)}
				aria-invalid={error ? true : undefined}
				aria-describedby={describedBy}
				{...props}
			/>
			{hint && (
				<p id={hintId} className='ds-field__hint'>
					{hint}
				</p>
			)}
			{error && (
				<p id={errorId} className='ds-field__error'>
					{error}
				</p>
			)}
		</div>
	);
}
