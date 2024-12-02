import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
});

export const metadata: Metadata = {
	title: 'My Full App',
	description: 'An app to place anything just to try',
};

type RootProps = {
	children: React.ReactNode;
};

export default function RootLayout({ children }: RootProps) {
	return (
		<html lang="en">
			<body
				className={cn(
					'min-h-screen bg-background font-sans antialiased',
					fontSans.variable
				)}
			>
				<header></header>
				<main>{children}</main>
				<footer></footer>
			</body>
		</html>
	);
}
