import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, IdentityBadge, IconConnect, Box, IconPower, LinkBase,
} from '@aragon/ui';

// import { connect, disconnect } from '../../utils/web3';
import { checkAddressAndAddToStorage } from '../../utils/storage';
import { connect, disconnect } from '../../utils/web3';
import { useDispatch } from "react-redux";
import { setMakerAddress } from '../../redux/actions';

function ConnectButton() {
  const [user, setUser] = useState(''); // the current connected user
  const [isConnected, setIsConnected] = useState(false);
  const dispatch = useDispatch();

  const connectWeb3 = async () => {
    const address = await connect();
    console.log('address', address)
    if (address === false) return;
    setIsConnected(true);
    setUser(address);
    checkAddressAndAddToStorage(address);
    dispatch(setMakerAddress(address))
  };

  const disconnectWeb3 = async () => {
    // await disconnect();
    setIsConnected(false);
    setUser('');
  };

  return isConnected ? (
    <>
      <div style={{ paddingTop: 5, paddingRight: 5 }}>
        <LinkBase onClick={disconnectWeb3} size="small">
          {' '}
          <IconPower />
          {' '}
        </LinkBase>
      </div>
      <Box padding={6}>
        <IdentityBadge entity={user} />
      </Box>

    </>
  ) : (
    <Button icon={<IconConnect />} label="Connect" onClick={connectWeb3} />
  );
}

export default ConnectButton;
