import React from 'react'
import { Main, Header, Button } from '@aragon/ui'
import MakeOrder from './pages/MakeOrder'

export default function App() {
  return (
    <Main>
      <Header
        primary="Opyn TaCo"
        secondary={<Button mode="strong" label="Connect" />}
      />
      <MakeOrder />
    </Main>
  )
}