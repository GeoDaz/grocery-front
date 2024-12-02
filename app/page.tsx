import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import GroceryList from '@/app/components/GroceryList';
import SearchBar from '@/src/components/ui/SearchBar';

export default function Home() {
	const { data: session } = useSession();

	const { data: groceryItems, isLoading, error } = useQuery({
		queryKey: ['groceryList'],
		queryFn: async () => {
			// Replace with your actual API endpoint
			const response = await fetch('/api/groceryList');
			if (!response.ok) {
				throw new Error('Failed to fetch grocery list');
			}
			return response.json();
		},
	});

	if (!session) {
		return <div>Please sign in to access the grocery list application.</div>;
	}

	return (
		<div>
			<h1>Grocery List Application</h1>
			<SearchBar />
			{isLoading ? (
				<div>Loading...</div>
			) : error ? (
				<div>Error: {error.message}</div>
			) : (
				<GroceryList items={groceryItems} />
			)}
		</div>
	);
}
