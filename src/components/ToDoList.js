import React from 'react'
import { useSelector } from 'react-redux'
import { ToDoItem } from './ToDoItem'

export const ToDoList = () => {
	const todos = useSelector((state) => state.todo.todos)
	return (
		<ul>
			{todos.map((el) => {
				return (
					<ToDoItem
						key={el.id}
						id={el.id}
						task={el.title}
						completed={el.completed}
					/>
				)
			})}
		</ul>
	)
}
