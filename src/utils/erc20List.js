const ERC20List = [
	{
		name: 'Tether USD',
		symbol: 'USDT',
		unit: 6,
		contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
		rateId: 'tether'
	},
	{
		name: 'Wrapped Ether',
		symbol: 'WETH',
		unit: 18,
		contractAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
		rateId: 'weth'
	},
	{
		name: '0x Protocol Token',
		symbol: 'ZRX',
		unit: 18,
		contractAddress: '0xe41d2489571d322189246dafa5ebde1f4699f498',
		rateId: '0x'
	},
	{
		name: 'Dai Stablecoin',
		symbol: 'DAI',
		unit: 18,
		contractAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
		rateId: 'dai'
	}
];

export default ERC20List;
