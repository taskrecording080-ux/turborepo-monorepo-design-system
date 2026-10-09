import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Button } from './button';
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
	DialogClose
} from './dialog';

function Example() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Delete project</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>Delete project?</DialogTitle>
				<DialogDescription>This cannot be undone.</DialogDescription>
				<DialogClose asChild>
					<Button variant='outline'>Cancel</Button>
				</DialogClose>
			</DialogContent>
		</Dialog>
	);
}

describe('Dialog keyboard and focus behaviour', () => {
	it('opens with the keyboard, is labelled, closes with Escape and returns focus to the trigger', async () => {
		const user = userEvent.setup();
		render(<Example />);
		const trigger = screen.getByRole('button', { name: 'Delete project' });

		trigger.focus();
		await user.keyboard('{Enter}');

		const dialog = await screen.findByRole('dialog', {
			name: 'Delete project?'
		});
		expect(dialog).toHaveAccessibleDescription('This cannot be undone.');
		expect(dialog).toContainElement(document.activeElement as HTMLElement); // focus moved inside

		await user.keyboard('{Escape}');
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
		await waitFor(() => expect(trigger).toHaveFocus()); // Radix restores focus asynchronously
	});

	it('keeps Tab focus inside the dialog', async () => {
		const user = userEvent.setup();
		render(<Example />);
		await user.click(screen.getByRole('button', { name: 'Delete project' }));
		const dialog = await screen.findByRole('dialog');
		await user.tab();
		await user.tab();
		await user.tab();
		expect(dialog).toContainElement(document.activeElement as HTMLElement);
	});

	it('has no axe violations when open', async () => {
		const user = userEvent.setup();
		render(<Example />);
		await user.click(screen.getByRole('button', { name: 'Delete project' }));
		const dialog = await screen.findByRole('dialog');
		expect((await axe(dialog)).violations).toEqual([]);
	});
});
