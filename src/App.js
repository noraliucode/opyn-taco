import React from 'react'
import { Main, Header, Button } from '@aragon/ui'
import MakeOrder from './pages/MakeOrder'
import ConnectButton from './components/NavBar/ConnectButton'


export default function App() {
  return (
    <Main>
      <Header
        primary="Opyn TaCo"
        secondary={<ConnectButton />}
      />
      <MakeOrder />
    </Main>
  )
}