import { createFileRoute } from '@tanstack/react-router'
import Todolist from './Todolist'

import { mutationOptions, queryOptions } from '@tanstack/react-query'

export const todosQueryOptions = queryOptions({
    queryKey:['todos'],
    queryFn:async ()=>{
        var res = await fetch("http://localhost:4000/api/todos")
        var data = await res.json()
        return data as Array<any>
    }
})

// 2. Add this NEW logic for POST (adding a todo)
export const createTodo = async (todo: any) => {
    const res = await fetch("http://localhost:4000/api/todos", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    })
    if (!res.ok) throw new Error('Failed to create todo')
    return res.json()
}

export const deleteTodo = async (id: string) => {
    const res = await fetch(`http://localhost:4000/api/todos/${id}`, {
        method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete")
    return res.json()
}


export const Route = createFileRoute('/Todolist/')({
  loader: ({ context: { queryClient } }) => {
      return queryClient.ensureQueryData(todosQueryOptions)
    },
  component: Todolist,
})
