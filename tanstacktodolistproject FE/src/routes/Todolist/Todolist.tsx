
import { useMutation, useSuspenseQuery, useQueryClient } from '@tanstack/react-query'
import { createTodo, todosQueryOptions, deleteTodo } from '.'
import { useState } from 'react'

function Todolist() {
  const [newTodo, setNewTodo] = useState('')

  const queryClient = useQueryClient()
  const { data: todos } = useSuspenseQuery(todosQueryOptions)

  const mutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  })

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg p-6 rounded-xl">
      <h1 className="text-3xl font-bold text-center mb-4 text-black-600">
        Todolist
      </h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter todo..."
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          onClick={() => mutation.mutate({ title: newTodo, status: true })}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">Add</button>
      </div>

      <ul className="space-y-2">
        {todos.map((t) => (
          <li
            key={t._id}
            className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm"
          >
            <span className="text-gray-700 font-medium">{t.title}</span>

            <button
              onClick={() => deleteMutation.mutate(t._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Todolist
