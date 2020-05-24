import React, { useState, useEffect } from 'react';
import { TextInput, DropDown, Button, textStyle } from '@aragon/ui';
import styled, { css } from 'styled-components';
import { allOptions } from '../constants/options';
import { createOrder } from '../utils/0x';
import { useDispatch, useSelector } from 'react-redux';
import { setMakerAddress } from '../redux/actions';
import { signOrder } from '../utils/web3';
import arrow from '../assets/arrow.png';

const MakeOrder = () => {
	const [ amount, setAmount ] = useState('');
	const [ takerAssetAmount, setTakerAssetAmount ] = useState('');
	const [ price, setPrice ] = useState('');
	const [ selectedOptionIndex, setSelectedOptionIndex ] = useState(1000);
	const [ selectedOption, setSelectedOption ] = useState(null);
	const [ makerAsset, setMakerAsset ] = useState('');
	const [ takerAsset, setTakerAsset ] = useState('');
	const [ expiry, setExpiry ] = useState('');
	const makerAddress = useSelector((state) => state.makerAddress);
	const dispatch = useDispatch();
	useEffect(
		() => {
			console.log('selectedOptionIndex', selectedOptionIndex);
			console.log('allOptions', allOptions);
			const found = allOptions.find((element, index) => index === selectedOptionIndex);
			console.log('found', found);
			setSelectedOption(found);
		},
		[ selectedOptionIndex ]
	);

	const inputStyle = {
		width: '300px',
		marginBottom: '30px'
	};

	const createAndSignOrder = (data) => {
		console.log('data', data);
		const { maker, makerAsset, takerAsset, makerAssetAmount, takerAssetAmount, expiry } = data;
		const order = createOrder(data);
		signOrder(order);
	};

	return (
		<Wrapper>
			{/* <RowWrapper>
				<Button mode="strong" label="Buy oToken" />
				<Button>Sell oToken</Button>
			</RowWrapper> */}

			<RowWrapper>
				<Cointainer>
					<Title>Sending</Title>
					<DropDown
						style={inputStyle}
						items={allOptions.map((x) => x.name)}
						selected={selectedOptionIndex}
						onChange={setSelectedOptionIndex}
						placeholder={'Select an Option'}
						header={'Select an Option'}
					/>
					<TextInput
						value={amount}
						placeholder={'Amount'}
						style={inputStyle}
						onChange={({ target }) => {
							setAmount(target.value);
						}}
					/>

					<TextInput
						value={price}
						placeholder={'Price'}
						style={inputStyle}
						onChange={({ target }) => {
							setPrice(target.value);
						}}
					/>

					<TextInput
						value={makerAddress}
						placeholder={'MakerAddress'}
						style={inputStyle}
						onChange={({ target }) => {
							dispatch(setMakerAddress(target.value));
						}}
					/>
				</Cointainer>

				<ButtonWrapper>
					Sell otoken
					<img src={arrow} style={{ width: '50px', height: '50px' }} />
				</ButtonWrapper>
				<Cointainer>
					<Title>Receiving</Title>
					<DropDown
						style={inputStyle}
						items={allOptions.map((x) => x.name)}
						selected={selectedOptionIndex}
						onChange={setSelectedOptionIndex}
						placeholder={'Select an Option'}
						header={'Select an Option'}
					/>
					<TextInput
						value={amount}
						placeholder={'Amount'}
						style={inputStyle}
						onChange={({ target }) => {
							setAmount(target.value);
						}}
					/>

					<TextInput
						value={price}
						placeholder={'Price'}
						style={inputStyle}
						onChange={({ target }) => {
							setPrice(target.value);
						}}
					/>

					<TextInput
						value={makerAddress}
						placeholder={'MakerAddress'}
						style={inputStyle}
						onChange={({ target }) => {
							dispatch(setMakerAddress(target.value));
						}}
					/>
				</Cointainer>
			</RowWrapper>

			<div style={{ marginBottom: '40px' }} />

			<Button
				mode="strong"
				label="Create and Sign Order!"
				onClick={() =>
					createAndSignOrder({
						maker: makerAddress,
						makerAsset: selectedOption.addr,
						takerAsset: selectedOption.addr,
						makerAssetAmount: amount,
						takerAssetAmount: 0,
						expiry: Math.round(new Date() / 1000) + 24 * 60 * 60 // expire after 1 day
					})}
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
	font-size: 25px;
	letter-spacing: 4px;
	text-transform: uppercase;
`;
