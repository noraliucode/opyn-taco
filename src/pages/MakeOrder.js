import React, { useState } from 'react';
import { TextInput } from '@aragon/ui';
import styled, { css } from 'styled-components';

const MakeOrder = () => {
	const [ amount, setAmount ] = useState('');
	const [ price, setPrice ] = useState('');
	const [ makerAddress, setMakerAddress ] = useState('');
	const inputStyle = {
		width: '300px',
		'margin-bottom': '30px'
	};
	return (
		<Wrapper>
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

const Wrapper = styled.div`${ColumnWrapper};`;
