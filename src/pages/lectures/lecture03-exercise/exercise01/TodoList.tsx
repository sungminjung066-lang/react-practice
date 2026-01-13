import { type Todo, TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
}

// TODO: TodoList 컴포넌트 - 할 일 목록을 표시하는 컴포넌트
// Props로 todos, onToggle, onDelete 함수를 받아서 사용하세요
export function TodoList({ todos, deleteTodo, toggleTodo }: TodoListProps) {
  // 여기에 코드를 작성하세요

  return (
    <ul className="space-y-2">
      {/* 여기에 TodoItem 컴포넌트를 map으로 렌더링하세요 */}
      {/* key prop을 잊지 마세요! */}
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
      ))}
    </ul>
  );
}
