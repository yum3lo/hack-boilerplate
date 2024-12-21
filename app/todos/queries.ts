import { reduxAPI } from '@/lib/store/api/root';

import { Todo, TodoPayload } from './types';

export const todosApi = reduxAPI.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], { search?: string }>({
      query({ search }) {
        return {
          url: `todos`,
          params: { search },
        };
      },
      providesTags: ['GET_TODOS'],
    }),
    addTodo: builder.mutation<Todo[], TodoPayload>({
      query(body) {
        return {
          url: `todos`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['GET_TODOS'],
    }),
    toggleTodo: builder.mutation<Todo[], { id: number; completed: boolean }>({
      query({ id, completed }) {
        return {
          url: `todos/${id}`,
          method: 'PATCH',
          body: { completed },
        };
      },
      invalidatesTags: ['GET_TODOS'],
    }),
  }),
  overrideExisting: true,
});

export const { useGetTodosQuery, useAddTodoMutation, useToggleTodoMutation } = todosApi;


