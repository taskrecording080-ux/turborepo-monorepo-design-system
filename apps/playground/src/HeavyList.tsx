import { memo, useDeferredValue, useMemo, useState } from 'react';
import { TextField } from '@acme/ui';

const ITEMS = Array.from({ length: 3000 }, (_, i) => `Component ${i + 1}`);

// memo: rows only re-render when their own `text` changes.
const Row = memo(function Row({ text }: { text: string }) {
	return <li>{text}</li>;
});

export default function HeavyList() {
	const [query, setQuery] = useState('');
	// useDeferredValue: typing stays responsive; the big list updates at lower priority.
	const deferred = useDeferredValue(query);
	const filtered = useMemo(
		() => ITEMS.filter((t) => t.toLowerCase().includes(deferred.toLowerCase())),
		[deferred]
	);
	return (
		<div>
			<TextField
				label='Filter components'
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				hint={`${filtered.length} of ${ITEMS.length} shown`}
			/>
			<ul className='list' aria-label='Component list'>
				{filtered.slice(0, 200).map((t) => (
					<Row key={t} text={t} />
				))}
			</ul>
		</div>
	);
}
