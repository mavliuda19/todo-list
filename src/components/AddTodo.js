import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { addNewTodo } from '../store/todoSlice'

export const AddTodo = () => {
	const [inputValue, setInputValue] = useState('')
	const dispatch = useDispatch()
	const inputChangeHandler = (e) => {
		setInputValue(e.target.value)
	}
	const addTodoHandler = (event) => {
		event.preventDefault()
		if (inputValue.trim().length > 0) {
			dispatch(addNewTodo(inputValue))
		}
		setInputValue('')
	}
	return (
		<StyledContainer>
			<StyledInput onChange={inputChangeHandler} value={inputValue} />
			<StyledButton onClick={addTodoHandler}>Add</StyledButton>
		</StyledContainer>
	)
}

const StyledContainer = styled.div`
	width: 420px;
	display: flex;
	justify-content: space-between;
	margin: 5px auto;
`
const StyledInput = styled.input`
	width: 290px;
	height: 40px;
	border-radius: 8px;
	padding: 0%;
	border: 1px solid green;
`

const StyledButton = styled.button`
	width: 95px;
	height: 39px;
	border-radius: 8px;
	border: 1px solid green;
	color: white;
	background-color: gray;
	cursor: pointer;
`
