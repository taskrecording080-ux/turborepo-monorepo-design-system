import { lazy, Suspense, useEffect, useState } from 'react';
import {
	Button,
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
	DialogClose,
	Tabs,
	TabsList,
	TabsTrigger,
	TabsContent,
	Disclosure,
	DisclosureTrigger,
	DisclosureContent,
	TextField
} from '@acme/ui';

// Code-splitting: the heavy demo is only downloaded when the user opens that tab.
const HeavyList = lazy(() => import('./HeavyList'));

function usePersistedAttr(attr: 'theme' | 'brand', initial: string) {
	const [value, setValue] = useState(
		() => document.documentElement.dataset[attr] ?? initial
	);
	useEffect(() => {
		document.documentElement.dataset[attr] = value;
		try {
			localStorage.setItem(attr, value);
		} catch {
			/* storage may be unavailable */
		}
	}, [attr, value]);
	return [value, setValue] as const;
}

export function App() {
	const [theme, setTheme] = usePersistedAttr('theme', 'light');
	const [brand, setBrand] = usePersistedAttr('brand', 'acme');
	const [email, setEmail] = useState('');
	const emailError =
		email && !email.includes('@') ? 'Enter a valid email address' : undefined;

	return (
		<>
			<a className='skip-link' href='#main'>
				Skip to main content
			</a>
			<div className='page'>
				<header className='toolbar'>
					<h1>Turborepo Design System</h1>
					<label>
						<span className='visually-hidden'>Brand</span>
						<select
							value={brand}
							onChange={(e) => setBrand(e.target.value)}
							aria-label='Brand'
						>
							<option value='acme'>Acme</option>
							<option value='globex'>Globex</option>
						</select>
					</label>
					<Button
						variant='outline'
						size='sm'
						onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
					>
						Toggle theme
					</Button>
					<span role='status' className='visually-hidden'>
						Theme: {theme}, brand: {brand}
					</span>
				</header>

				<main id='main' tabIndex={-1} className='page' style={{ padding: 0 }}>
					<section aria-labelledby='buttons'>
						<h2 id='buttons'>Buttons</h2>
						<div className='toolbar'>
							<Button variant='primary'>Primary</Button>
							<Button variant='outline'>Outline</Button>
							<Button asChild>
								<a href='#main'>Button styled link</a>
							</Button>
							<Button disabled>Disabled</Button>
						</div>
					</section>

					<section aria-labelledby='responsive'>
						<h2 id='responsive'>Container-query card</h2>
						<div className='card-host'>
							<div className='card'>
								<p style={{ margin: 0 }}>
									Resize the window: this card changes layout based on its own
									width.
								</p>
								<Button size='sm'>Action</Button>
							</div>
						</div>
					</section>

					<section aria-labelledby='dialog'>
						<h2 id='dialog'>Dialog (Radix)</h2>
						<Dialog>
							<DialogTrigger asChild>
								<Button>Delete project</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogTitle>Delete project?</DialogTitle>
								<DialogDescription>This cannot be undone.</DialogDescription>
								<div className='toolbar'>
									<DialogClose asChild>
										<Button variant='outline'>Cancel</Button>
									</DialogClose>
									<DialogClose asChild>
										<Button>Delete</Button>
									</DialogClose>
								</div>
							</DialogContent>
						</Dialog>
					</section>

					<section aria-labelledby='tabs'>
						<h2 id='tabs'>Tabs, disclosure, form, performance</h2>
						<Tabs defaultValue='form'>
							<TabsList aria-label='Demos'>
								<TabsTrigger value='form'>Form</TabsTrigger>
								<TabsTrigger value='disclosure'>Disclosure</TabsTrigger>
								<TabsTrigger value='perf'>Performance</TabsTrigger>
							</TabsList>
							<TabsContent value='form'>
								<TextField
									label='Email'
									type='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									hint='We never share it'
									error={emailError}
								/>
							</TabsContent>
							<TabsContent value='disclosure'>
								<Disclosure>
									<DisclosureTrigger>What is a design token?</DisclosureTrigger>
									<DisclosureContent>
										A named design decision (color, space, radius) stored once
										and reused everywhere.
									</DisclosureContent>
								</Disclosure>
							</TabsContent>
							<TabsContent value='perf'>
								<Suspense fallback={<p>Loading...</p>}>
									<HeavyList />
								</Suspense>
							</TabsContent>
						</Tabs>
					</section>
				</main>
			</div>
		</>
	);
}
