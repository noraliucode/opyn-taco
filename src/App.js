import React from 'react';
import { Main, Header, Button } from '@aragon/ui';
import MakeOrder from './pages/MakeOrder';
import ConnectButton from './components/NavBar/ConnectButton';
import { HashRouter as Router, Route } from 'react-router-dom';

export default function App() {
	return (
		<Router>
			<Main>
				<Header primary="Opyn TaCo" secondary={<ConnectButton />} />
				<Route path="/">
					<MakeOrder />
				</Route>
			</Main>
		</Router>
	);
}
