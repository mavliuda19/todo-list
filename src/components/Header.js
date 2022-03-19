import React from 'react'
import styled from 'styled-components'
export const Header = () => {
	return (
		<StyledContainer>
			<img src='https://us.123rf.com/450wm/lenm/lenm1601/lenm160100019/49922126-illustration-of-a-cup-of-coffee-sitting-atop-a-pile-of-books.jpg?ver=6' />
			<h2>Study now be proud later</h2>
		</StyledContainer>
	)
}

const StyledContainer = styled.div`
	display: flex;
	margin: 0 auto;
	width: 470px;
	justify-content: space-between;
	align-items: center;
	color: green;
	& img {
		width: 130px;
	}
`
