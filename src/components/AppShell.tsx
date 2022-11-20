import { ReactNode } from 'react';
import Footer from './Footer';

type Props = {
	children: ReactNode;
};

const AppShell = ({ children }: Props): JSX.Element => {
	return (
		<div className='app-container'>
			<main>{children}</main>
			<Footer />
		</div>
	);
};

export default AppShell;
