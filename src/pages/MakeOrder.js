import React, { useState, useEffect } from 'react';
import { TextInput, DropDown, Button } from '@aragon/ui';
import styled, { css } from 'styled-components';
import { allOptions } from '../constants/options';
import { createOrder } from '../utils/0x';

const MakeOrder = () => {
	const [ amount, setAmount ] = useState('');
	const [ takerAssetAmount, setTakerAssetAmount ] = useState('');
	const [ price, setPrice ] = useState('');
	const [ makerAddress, setMakerAddress ] = useState('');
	const [ selectedOption, setSelectedOption ] = useState(1000);
	const [ makerAsset, setMakerAsset ] = useState('');
	const [ takerAsset, setTakerAsset ] = useState('');
	const [ expiry, setExpiry ] = useState('');

	const inputStyle = {
		width: '300px',
		'marginBottom': '30px'
	};

	const createAndSignOrder = (data) => {
		console.log('data', data)
	  const {maker, makerAsset, takerAsset, makerAssetAmount, takerAssetAmount, expiry} = data
		// const order = createOrder(data)
	}
	return (
		<Wrapper>
			<DropDown
				style={inputStyle}
				items={allOptions.map((x) => x.name)}
				selected={selectedOption}
				onChange={()=>{
					setSelectedOption()
					setMakerAsset(selectedOption.addr)
				}}
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
					setMakerAddress(target.value);
				}}
			/>

			<div style={{ marginBottom: '40px' }} />

			<Button mode="strong" label="Create and Sign Order!" onClick={()=>createAndSignOrder(
				{
					maker: makerAddress,
					makerAsset,
					takerAsset,
					makerAssetAmount: amount,
					takerAssetAmount,
					expiry
				})}/>
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
