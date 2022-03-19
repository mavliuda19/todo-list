import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BASE_URL } from '../utils/constants'

export const fetchTodos = createAsyncThunk(
	'todos/fetchTodos',
	async function (_, { rejectWithValue,dispatch }) {
		try {
			const response = await fetch(`${BASE_URL}/todo.json`)
			if (!response.ok) {
				throw new Error('Request failed')
			}
			const data = await response.json()
			const transformedData=[]
			for(const key in data){
				transformedData.push({
					id:key,
					title:data[key].title,
					completed: data[key].completed
				})
			}
			return transformedData
		} catch (error) {
			return rejectWithValue(error.message)
		}
	},
)

export const deleteTodo = createAsyncThunk(
	'todos/deleteTodo',
	async function (id, { rejectWithValue, dispatch }) {
		try {
			const response = await fetch(`${BASE_URL}/todo/${id}.json`, {
				method: 'DELETE',
			})
			if (!response.ok) {
				throw new Error("Can't delete task. Server error.")
			}
			dispatch(todoActions.removeTodo(id))
		} catch (error) {
			return rejectWithValue(error.message)
		}
	},
)

export const toggleStatus = createAsyncThunk(
	'todos/toggleStatus',
	async function (id, { rejectWithValue, dispatch, getState }) {
		const todo = getState().todo.todos.find((el) => el.id === id)
		try {
			const response = await fetch(`${BASE_URL}/todo/${id}.json`, {
				method: 'PATCH',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify({
					completed: !todo.completed,
				}),
			})
			if (!response.ok) {
				throw new Error("Can't toggle task. Server error.")
			}
			dispatch(todoActions.completetodo(id))
		} catch (error) {
			return rejectWithValue(error.message)
		}
	},
)

export const addNewTodo = createAsyncThunk(
	'todos/addNewtodo',
	async function (inputValue, { rejectWithValue, dispatch }) {
		try {
			const todo = {
				title: inputValue,
				completed: false,
			}
			const response = await fetch(`${BASE_URL}/todo.json`, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify(todo),
			})
			if (!response.ok) {
				throw new Error("Can't add task. Server error.")
			}
			const data = await response.json()
			dispatch(todoActions.addTodo({...todo,id : data.name}))
		} catch (error) {
			return rejectWithValue(error.message)
		}
	},
)
const setError = (state, action) => {
	state.status = 'rejected'
	state.error = action.payload
}

const initState = { todos: [], status: null, error: null }
const todoSlice = createSlice({
	name: 'todo',
	initialState: initState,
	reducers: {
		addTodo(state, action) {
			state.todos.unshift(action.payload)
		},
		removeTodo(state, action) {
			state.todos= state.todos.filter((item) => item.id !== action.payload)
		},
		completetodo(state, action) {
			const todo = state.todos.find((el) => el.id === action.payload)
			todo.completed = !todo.completed
		},
	},
	extraReducers: {
		[fetchTodos.pending]: (state) => {
			state.status = 'loading'
			state.error = null
		},
		[fetchTodos.fulfilled]: (state, action) => {
			state.status = 'resolved'
			state.todos = action.payload
		},
		[fetchTodos.rejected]: setError,
		[deleteTodo.rejected]: setError,
		[toggleStatus.rejected]: setError,
	},
})

export const todoActions = todoSlice.actions
export default todoSlice

