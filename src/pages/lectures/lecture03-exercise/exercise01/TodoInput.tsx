// TODO: TodoInput 컴포넌트 - 할 일을 입력받는 컴포넌트
import React from 'react';

// Props로 addTodo 함수를 받아서 사용하세요
export function TodoInput({ addTodo }: { addTodo: (text: string) => void }) {
  const [inputValue, setInputValue] = React.useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClick = () => {
    // 상위 컴포넌트의 todos 상태를 업데이트하는 addTodo 함수를 호출하세요
    addTodo(inputValue);
  };

  return (
    <div className="mb-6 flex gap-2">
      <input
        type="text"
        value={inputValue}
        placeholder="할 일을 입력하세요..."
        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
        onChange={handleChange}
      />
      <button
        className="rounded-lg bg-blue-500 px-6 py-2 font-semibold text-white hover:bg-blue-600"
        onClick={handleClick}
      >
        추가
      </button>
    </div>
  );
}
