import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

import { Todo } from '../types';

interface TodoCardProps {
  todo: Todo;
  onToggleComplete?: (id: number, completed: boolean) => void;
}

export function TodoCard({ todo, onToggleComplete }: TodoCardProps) {
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Todo #{todo.id}</CardTitle>
      </CardHeader>
      <CardContent>
        <label
          className={cn(
            'flex items-center gap-3 text-sm',
            todo.completed && 'text-muted-foreground line-through'
          )}
          htmlFor={`todo-${todo.id}`}
        >
          <Checkbox
            checked={todo.completed}
            onCheckedChange={(checked) => onToggleComplete?.(todo.id, checked as boolean)}
            id={`todo-${todo.id}`}
          />
          <span>{todo.title}</span>
        </label>
      </CardContent>
    </Card>
  );
}
