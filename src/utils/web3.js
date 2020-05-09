import Web3 from 'web3';
// import BigNumber from 'bignumber.js';
import { MetamaskSubprovider } from '@0x/subproviders';
import { signatureUtils } from '@0x/order-utils';
import Onboard from 'bnc-onboard';
// import { notify } from './blockNative';
// import { getAllowance, getPremiumToPay } from './infura';
import { getPreference } from './storage';

const INFURA_KEY = process.env.REACT_APP_INFURA_KEY;
// const FORTMATIC_KEY = process.env.REACT_APP_FORTMATIC_KEY;

let web3;

const onboard = Onboard({
  darkMode: getPreference('theme', 'light') === 'dark',
  // dappId: BLOCKNATIVE_KEY, // [String] The API key created by step one above
  networkId: 1, // [Integer] The Ethereum network ID your Dapp uses.
  subscriptions: {
    wallet: (wallet) => {
      web3 = new Web3(wallet.provider);
    },
  },
  walletSelect: {
    description: 'Please select a wallet to connect to Opyn Monitor',
    wallets: [
      { walletName: 'metamask' },
      {
        walletName: 'walletConnect',
        infuraKey: INFURA_KEY,
      },
      // {
      //   walletName: 'fortmatic',
      //   apiKey: FORTMATIC_KEY,
      // },
      { walletName: 'trust' },
      { walletName: 'coinbase' },
      { walletName: 'status' },
    ],
  },
});

export const checkConnectedAndGetAddress = async () => {
  let checked = false;
  try {
    checked = await onboard.walletCheck();
  } catch (error) {
    await onboard.walletSelect();
    checked = await onboard.walletCheck();
  } finally {
    if (checked) return onboard.getState().address;
  }
};

/**
* Sign Order
* @param {*} order
*/
export const signOrder = async (order) => {
  const account = await checkConnectedAndGetAddress();
  const provider = new MetamaskSubprovider(web3.currentProvider);
  return signatureUtils.ecSignOrderAsync(provider, order, account);
};