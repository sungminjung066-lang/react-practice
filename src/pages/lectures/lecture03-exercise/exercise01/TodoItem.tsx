export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
}
// TODO: TodoItem 컴포넌트 - 개별 할 일 항목을 표시하는 컴포넌트
// Props로 todo, onToggle, onDelete 함수를 받아서 사용하세요
export function TodoItem({ todo, deleteTodo, toggleTodo }: TodoItemProps) {
  // 여기에 코드를 작성하세요
  const { id, text, completed } = todo;

  const handleClick = () => {
    deleteTodo(id);
  };

  const handleToggle = () => {
    toggleTodo(id);
  };

  return (
    <li className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <input
        type="checkbox"
        className="h-5 w-5 cursor-pointer"
        checked={completed}
        onChange={handleToggle}
      />
      <span className="flex-1">{text}</span>
      <button
        className="rounded bg-red-500 px-3 py-1 text-sm font-semibold text-white hover:bg-red-600"
        onClick={handleClick}
      >
        삭제
      </button>
    </li>
  );
}
