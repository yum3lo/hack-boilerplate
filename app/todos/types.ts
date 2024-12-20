export interface TodoPayload {
  title: string;
  userId: number;
}

export interface Todo extends TodoPayload {
  id: number;
  completed: boolean;
}
