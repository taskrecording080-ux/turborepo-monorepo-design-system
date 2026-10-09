import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Button } from './button';
describe('Button', () => {
	it('renders a real <button> with type=button by default', () => {
		render(<Button>Save</Button>);
		expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute(
			'type',
			'button'
		);
	});
	it('applies variant classes and merges consumer className', () => {
		render(
			<Button variant='outline' className='extra'>
				Cancel
			</Button>
		);
		const btn = screen.getByRole('button', { name: 'Cancel' });
		expect(btn).toHaveClass('ds-button', 'ds-button--outline', 'extra');
	});
	it('asChild renders the child element (a link) without a wrapper', () => {
		render(
			<Button asChild>
				<a href='/home'>Home</a>
			</Button>
		);
		const link = screen.getByRole('link', { name: 'Home' });
		expect(link).toHaveClass('ds-button');
		expect(screen.queryByRole('button')).not.toBeInTheDocument();
	});
	it('calls onClick and respects disabled', async () => {
		const user = userEvent.setup();
		const onClick = vi.fn();
		const { rerender } = render(<Button onClick={onClick}>Go</Button>);
		await user.click(screen.getByRole('button', { name: 'Go' }));
		expect(onClick).toHaveBeenCalledTimes(1);
		rerender(
			<Button onClick={onClick} disabled>
				Go
			</Button>
		);
		await user.click(screen.getByRole('button', { name: 'Go' }));
		expect(onClick).toHaveBeenCalledTimes(1);
	});
	it('has no axe violations', async () => {
		const { container } = render(<Button>Save</Button>);
		expect((await axe(container)).violations).toEqual([]);
	});
});
