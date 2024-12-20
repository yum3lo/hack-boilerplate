import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useLazyNotify } from '@/hooks/use-lazy-notify';

import { useAddTodoMutation } from '../queries';

const todoFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  userId: z.number().default(1),
});

export type TodoFormValues = z.infer<typeof todoFormSchema>;

export function useTodoForm() {
  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: {
      title: '',
      userId: 1,
    },
  });

  const [addTodo, { isLoading, isSuccess, error }] = useAddTodoMutation();

  const onSubmit = async (data: TodoFormValues) => {
    await addTodo(data);
    form.reset();
  };

  useLazyNotify({
    isLoading,
    isSuccess,
    error,
    successMessage: 'Todo added successfully!',
    errorMessage: 'Failed to add todo.',
  });

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
