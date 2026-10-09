import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Disclosure, DisclosureTrigger, DisclosureContent } from './disclosure';
const Demo = (props: Partial<React.ComponentProps<typeof Disclosure>>) => (
	<Disclosure {...props}>
		<DisclosureTrigger>Details</DisclosureTrigger>
		<DisclosureContent>Secret content</DisclosureContent>
	</Disclosure>
);
describe('Disclosure', () => {
	it('works uncontrolled and wires ARIA', async () => {
		const user = userEvent.setup();
		render(<Demo />);
		const trigger = screen.getByRole('button', { name: 'Details' });
		expect(trigger).toHaveAttribute('aria-expanded', 'false');
		await user.click(trigger);
		expect(trigger).toHaveAttribute('aria-expanded', 'true');
		expect(screen.getByRole('region', { name: 'Details' })).toBeVisible();
	});
	it('works controlled: parent owns the state', async () => {
		const user = userEvent.setup();
		const onOpenChange = vi.fn();
		render(<Demo open={false} onOpenChange={onOpenChange} />);
		await user.click(screen.getByRole('button', { name: 'Details' }));
		expect(onOpenChange).toHaveBeenCalledWith(true);
		expect(screen.getByRole('button', { name: 'Details' })).toHaveAttribute(
			'aria-expanded',
			'false'
		);
	});
	it('throws a helpful error when parts are used outside <Disclosure>', () => {
		const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
		expect(() => render(<DisclosureTrigger>x</DisclosureTrigger>)).toThrow(
			/inside <Disclosure>/
		);
		spy.mockRestore();
	});
});
