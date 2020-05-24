import { assetDataUtils } from '@0x/order-utils';
import BigNumber from 'bignumber.js';

const endpoint = 'https://api.0x.org/';

/**
 * Create Order Object
 * @param {string} maker
 * @param {string} makerAsset Bid: quoteAsset, Ask: baseAsset
 * @param {string} takerAsset Bid: baseAsset, Ask: quoteAsset
 * @param {BigNumber} makerAssetAmount
 * @param {BigNumber} takerAssetAmount
 * @param {number} expiry
 */
export const createOrder = (data) => {
	const { maker, makerAsset, takerAsset, makerAssetAmount, takerAssetAmount, expiry } = data;
	const salt = BigNumber.random(20).times(new BigNumber(10).pow(new BigNumber(20))).integerValue().toString(10);
	const order = {
		senderAddress: '0x0000000000000000000000000000000000000000',
		makerAddress: maker,
		takerAddress: '0x0000000000000000000000000000000000000000',
		makerFee: '0',
		takerFee: '0',
		makerAssetAmount: makerAssetAmount.toString(),
		takerAssetAmount: takerAssetAmount.toString(),
		makerAssetData: assetDataUtils.encodeERC20AssetData(makerAsset),
		takerAssetData: assetDataUtils.encodeERC20AssetData(takerAsset),
		salt,
		exchangeAddress: '0x61935cbdd02287b511119ddb11aeb42f1593b7ef',
		feeRecipientAddress: '0x1000000000000000000000000000000000000011',
		expirationTimeSeconds: expiry.toString(), // 4/20
		makerFeeAssetData: '0x',
		chainId: 1,
		takerFeeAssetData: '0x'
	};
	return order;
};

export const broadcastOrders = async (orders) => {
	const url = `${endpoint}sra/v3/orders`;
	const res = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(orders)
	});
	if (res.status === 200) return;
	const jsonRes = await res.json();
	throw jsonRes.validationErrors[0].reason;
};
