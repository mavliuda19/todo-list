import React from 'react'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { useDispatch } from 'react-redux'
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn'
import styled from 'styled-components'
import { deleteTodo, toggleStatus } from '../store/todoSlice'

export const ToDoItem = ({ task, id, completed }) => {
	const dispatch = useDispatch()
	const deleteHandler = () => {
		dispatch(deleteTodo(id))
	}
	const completeHandler = () => {
		dispatch(toggleStatus(id))
	}
	return (
		<div>
			<StyledLi done={completed}>
				<AssignmentTurnedInIcon
					style={{ color: 'blue', cursor: 'pointer' }}
					onClick={completeHandler}
				/>
				<p>{task}</p>
				<DeleteForeverIcon
					style={{ color: 'red', cursor: 'pointer' }}
					onClick={deleteHandler}
					id={id}
				/>
			</StyledLi>
		</div>
	)
}
const StyledLi = styled.li`
	width: 500px;
	padding: 15px;
	padding-left: 20px;
	padding-right: 30px;
	height: 55px;
	display: flex;
	justify-content: space-between;
	margin: 1.5rem auto;
	opacity: ${(props) => (props.done ? '0.6' : '')};
	background-color: rgb(230, 221, 220);
	border-radius: 8px;
	& p {
		width: 260px;
		font-size: 20px;
		font-weight: 600;
		text-align: start;
		height: 20px;
		color: ${(props) => (props.done ? 'gray' : 'green')};
		text-decoration: ${(props) => (props.done ? 'line-through' : '')};
	}
`
