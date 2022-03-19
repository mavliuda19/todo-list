import './App.css'
import { AddTodo } from './components/AddTodo'
import { ToDoList } from './components/ToDoList'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {fetchTodos } from './store/todoSlice'
import { Header } from './components/Header'
function App() {
	const {status,error} = useSelector((state) => state.todo)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(fetchTodos())
	}, [dispatch])

	return (
		<div className='App'>
			<Header/>
			<AddTodo />
			{status === 'loading' && <h2>Loading...</h2>}
			
			{error&& <h2>An error occured: {error}</h2>}
				<ToDoList />
			
		</div>
	)
}

export default App
