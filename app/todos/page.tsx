'use client';

import { isEmpty, times } from 'lodash';

import { Skeleton } from '@/components/ui/skeleton';
import { useLazyNotify } from '@/hooks/use-lazy-notify';

import PrivateLayout from '../layouts/private';
import AddTodoDialog from './components/add-todo-dialog';
import { TodoCard } from './components/card';
import { useGetTodosQuery, useToggleTodoMutation } from './queries';

const TodosPage = () => {
  const { data: todos, isLoading } = useGetTodosQuery({});
  const [toggleTodo, { isLoading: isToggling, isSuccess: isToggled, error: toggleError }] =
    useToggleTodoMutation();

  useLazyNotify({
    isLoading: isToggling,
    isSuccess: isToggled,
    error: toggleError,
    successMessage: 'Todo toggled successfully!',
    errorMessage: 'Failed to toggle todo.',
  });

  return (
    <PrivateLayout title="Todos">
      <main>
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Todos</h1>
            <AddTodoDialog />
          </div>

          <div className="space-y-4">
            {isLoading ? (
              times(5, (i: number) => <Skeleton key={i} className="h-20" />)
            ) : !isEmpty(todos) ? (
              todos
                ?.slice(0, 5)
                .map((todo) => (
                  <TodoCard
                    key={todo.id}
                    todo={todo}
                    onToggleComplete={(id, completed) => toggleTodo({ id, completed })}
                  />
                ))
            ) : (
              <p className="text-muted-foreground">No todos found.</p>
            )}
          </div>
        </section>
      </main>
    </PrivateLayout>
  );
};

export default TodosPage;
