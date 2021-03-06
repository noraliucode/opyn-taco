import React, { useState, useEffect } from 'react';
import { TextInput, DropDown, Button, useToast } from '@aragon/ui';
import styled, { css } from 'styled-components';
import { allOptions } from '../constants/options';
import { createOrder, broadcastOrders } from '../utils/0x';
import { useDispatch, useSelector } from 'react-redux';
import { setMakerAddress } from '../redux/actions';
import { signOrder } from '../utils/web3';
import arrow from '../assets/arrow.png';
import ERC20List from '../utils/erc20List';
// import { BigNumber } from '@0x/utils';
import { toBaseUnitBN } from '../utils/number';
import BigNumber from 'bignumber.js';

const MakeOrder = () => {
	const [ amount, setAmount ] = useState('');
	const [ takerAmount, setTakerAmount ] = useState('');
	const [ takerAssetAmount, setTakerAssetAmount ] = useState('');
	const [ selectedOptionIndex, setSelectedOptionIndex ] = useState(1000);
	const [ selectedERC20Index, setSelectedERC20Index ] = useState(1000);
	const [ selectedOption, setSelectedOption ] = useState(null);
	const [ selectedERC20, setSelectedERC20 ] = useState(null);
	const [ makerAsset, setMakerAsset ] = useState('');
	const [ takerAsset, setTakerAsset ] = useState('');
	const [ expiry, setExpiry ] = useState('');
	const [ takerAddress, setTakerAddress ] = useState('');
	const [ isSellingOtoken, setIsSellingOtoken ] = useState(false);
	const [ isCheckValue, setIsCheckValue ] = useState(false);
	
	const makerAddress = useSelector((state) => state.makerAddress);
	const dispatch = useDispatch();
	const toast = useToast();
	useEffect(
		() => {
			console.log('selectedOptionIndex', selectedOptionIndex);
			console.log('allOptions', allOptions);
			const found = allOptions.find((element, index) => index === selectedOptionIndex);
			console.log('found', found);
			setSelectedOption(found);
			const foundERC20 = ERC20List.find((element, index) => index === selectedERC20Index);
			console.log('foundERC20', foundERC20);
			setSelectedERC20(foundERC20);
		},
		[ selectedOptionIndex, selectedERC20Index ]
	);

	const inputStyle = (value) => ({
		width: '300px',
		marginBottom: '30px',
		border: value || !isCheckValue ? '' : '1px solid red'
	});

	const createAndSignOrder = async (data) => {
		const {
			maker,
			makerAsset,
			takerAsset,
			makerAssetAmount,
			takerAssetAmount,
			expiry,
			makerTokenDecimal,
			takerTokenDecimal
		} = data
		console.log('data', data);
		if (maker === '') {
      toast('Please connect wallet first');
      return;
    }
    let order;
			order = {
				maker,
				makerAsset,
				takerAsset,
				makerAssetAmount: toBaseUnitBN(makerAssetAmount, takerTokenDecimal),
				takerAssetAmount: toBaseUnitBN(takerAssetAmount, takerTokenDecimal),
				expiry
			}
      order = createOrder(order);
		const signedOrder = await signOrder(order);
		try {
			await broadcastOrders([ signedOrder ]);
		} catch (error) {
			toast(error);
		}
	}

	const renderOtokenList = () => {
		return (
			<DropDown
				style={inputStyle(selectedOption)}
				items={allOptions.map((x) => x.name)}
				selected={selectedOptionIndex}
				onChange={setSelectedOptionIndex}
				placeholder={'Select Option'}
				header={'Select Option'}
			/>
		);
	};

	const renderERC20List = () => {
		return (
			<DropDown
				style={inputStyle(selectedERC20)}
				items={ERC20List.map((x) => x.name)}
				selected={selectedERC20Index}
				onChange={setSelectedERC20Index}
				placeholder={'Select Currency'}
				header={'Select Currency'}
			/>
		);
	};

	return (
		<Wrapper>
			<RowWrapper>
				<Cointainer>
					<Title>Sending</Title>
					{isSellingOtoken ? renderOtokenList() : renderERC20List()}
					<TextInput.Number
						value={amount}
						placeholder={'Sending Amount'}
						style={inputStyle(amount)}
						onChange={({ target }) => {
							setAmount(target.value);
						}}
					/>

					<TextInput
						value={makerAddress}
						placeholder={'Maker Address'}
						style={inputStyle(makerAddress)}
						onChange={({ target }) => {
							dispatch(setMakerAddress(target.value));
						}}
					/>
				</Cointainer>

				<ButtonWrapper onClick={() => setIsSellingOtoken(!isSellingOtoken)}>
					{isSellingOtoken ? 'Sell oToken' : 'Buy oToken'}
					<img src={arrow} style={{ width: '50px', height: '50px' }} />
				</ButtonWrapper>
				<Cointainer>
					<Title>Receiving</Title>
					{isSellingOtoken ? renderERC20List() : renderOtokenList()}
					<TextInput.Number
						value={takerAmount}
						placeholder={'Receiving Amount'}
						style={inputStyle(takerAmount)}
						onChange={({ target }) => {
							setTakerAmount(target.value);
						}}
					/>

					<TextInput
						value={takerAddress}
						placeholder={'Taker Address'}
						style={inputStyle('123')}
						onChange={({ target }) => {
							setTakerAddress(target.value);
						}}
					/>
				</Cointainer>
			</RowWrapper>

			<div style={{ marginBottom: '40px' }} />

			<Button
				mode="strong"
				label="Create and Sign Order!"
				onClick={() => {
					setIsCheckValue(true)
					if (!makerAddress || !selectedOption ||  !selectedERC20 || !amount || !takerAmount) return
					createAndSignOrder({
						maker: makerAddress,
						makerAsset: isSellingOtoken ? selectedOption.addr : selectedERC20.contractAddress,
						takerAsset: isSellingOtoken ? selectedERC20.contractAddress : selectedOption.addr,
						makerAssetAmount: amount,
						takerAssetAmount: takerAmount,
						makerTokenDecimal: isSellingOtoken ? selectedOption.decimals : selectedERC20.unit,
						takerTokenDecimal: isSellingOtoken ? selectedERC20.unit : selectedOption.decimals,
						expiry: Math.round(new Date() / 1000) + 24 * 60 * 60 // expire after 1 day
					})
				}}
			/>
		</Wrapper>
	);
};

export default MakeOrder;

const ColumnWrapper = css`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Wrapper = styled.div`
	${ColumnWrapper};
	margin-top: 100px;
`;

const Cointainer = styled.div`
	${ColumnWrapper};
	margin: 30px;
`;

const RowWrapper = styled.div`
	display: flex;
	margin-bottom: 40px;
`;
const Title = styled.div`
	color: #a3a9c5;
	letter-spacing: 4px;
	line-height: 1.5;
	font-size: 16px;
	margin-bottom: 17px;
	font-weight: 700;
	font-family: Avenir-Roman;
`;

const ButtonWrapper = styled.div`
	${ColumnWrapper};
	margin: 30px;
	color: #09bee5;
	font-size: 20px;
	letter-spacing: 4px;
	text-transform: uppercase;
	height: 100px;
	justify-self: center;
	align-self: center;
	cursor: pointer;
	width: 150px;
	box-sizing: border-box;
	text-align: center;
`;
