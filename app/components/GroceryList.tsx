import React, { useState } from 'react';
import GroceryItem from '@/src/types/GroceryItem';
import { useQuery } from 'react-query';

type GroceryItems = Record<string, GroceryItem[]>;

const itemsToCategories = (items: GroceryItem[]) =>
	items.reduce((acc, item) => {
		if (!acc[item.category]) {
			acc[item.category] = [];
		}
		acc[item.category].push(item);
		return acc;
	}, {} as GroceryItems);

interface GroceryListProps {
	items: GroceryItem[];
}

const GroceryList: React.FC<GroceryListProps> = async ({ items = [] }) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['groceryList'],
		queryFn: async () => {
			const response = await fetch('/api/groceryList');
			if (!response.ok) {
				throw new Error('Failed to fetch grocery list');
			}
			return response.json();
		},
	});
	const [groceryItems, setGroceryItems] = useState<GroceryItems>(() =>
		itemsToCategories(items)
	);

	const toggleInCart = (id: number) => {
		setGroceryItems(items => {
			const nextItems = { ...items };
			Object.entries(nextItems).forEach(([category, items]) => {
				nextItems[category] = items.filter(item => item.id !== id);
			});
			return nextItems;
		});
	};

	return (
		<div>
			<h2>Grocery List</h2>
			{Object.entries(groceryItems).map(([category, items]) => (
				<div key={category}>
					<h3>{category}</h3>
					<ul>
						{items.map(item => (
							<li key={item.id}>
								<input
									type="checkbox"
									checked={item.inCart}
									onChange={() => toggleInCart(item.id)}
								/>
								{item.name} - Quantity: {item.quantity}
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
};

export default GroceryList;
