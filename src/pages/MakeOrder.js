import React, { useState } from 'react';
import { TextInput, DropDown, Button } from '@aragon/ui';
import styled, { css } from 'styled-components';
import { allOptions } from '../constants/options';

const MakeOrder = () => {
	const [ amount, setAmount ] = useState('');
	const [ price, setPrice ] = useState('');
	const [ makerAddress, setMakerAddress ] = useState('');
	const [ selectedOption, setSelectedOption ] = useState('');

	const inputStyle = {
		width: '300px',
		'margin-bottom': '30px'
	};
	return (
		<Wrapper>
			<DropDown
				style={inputStyle}
				items={allOptions.map((x) => x.name)}
				selected={selectedOption}
				onChange={setSelectedOption}
				placeholder={'Select an Option'}
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

			<Button mode="strong" label="Create and Sign Order!" />
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
	margin-top: 200px;
`;
