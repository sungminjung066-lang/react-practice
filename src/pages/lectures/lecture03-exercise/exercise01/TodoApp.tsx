import React from 'react';

// TODO: Todo 타입 정의
interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

// TODO: TodoInput 컴포넌트 - 할 일을 입력받는 컴포넌트
// Props로 addTodo 함수를 받아서 사용하세요
function TodoInput() {
  // 여기에 코드를 작성하세요

  return (
    <div className="mb-6 flex gap-2">
      <input
        type="text"
        placeholder="할 일을 입력하세요..."
        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
      />
      <button className="rounded-lg bg-blue-500 px-6 py-2 font-semibold text-white hover:bg-blue-600">
        추가
      </button>
    </div>
  );
}

// TODO: TodoItem 컴포넌트 - 개별 할 일 항목을 표시하는 컴포넌트
// Props로 todo, onToggle, onDelete 함수를 받아서 사용하세요
function TodoItem() {
  // 여기에 코드를 작성하세요

  return (
    <li className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <input type="checkbox" className="h-5 w-5 cursor-pointer" />
      <span className="flex-1">할 일 내용</span>
      <button className="rounded bg-red-500 px-3 py-1 text-sm font-semibold text-white hover:bg-red-600">
        삭제
      </button>
    </li>
  );
}

// TODO: TodoList 컴포넌트 - 할 일 목록을 표시하는 컴포넌트
// Props로 todos, onToggle, onDelete 함수를 받아서 사용하세요
function TodoList() {
  // 여기에 코드를 작성하세요

  return (
    <ul className="space-y-2">
      {/* 여기에 TodoItem 컴포넌트를 map으로 렌더링하세요 */}
      {/* key prop을 잊지 마세요! */}
    </ul>
  );
}

// 메인 컴포넌트
function TodoApp() {
  // TODO: useState를 사용하여 todos 상태를 관리하세요
  // const [todos, setTodos] = React.useState<Todo[]>([]);

  // TODO: 할 일 추가 함수
  const addTodo = (text: string) => {
    // 여기에 코드를 작성하세요
    // 1. 빈 문자열 체크
    // 2. 새로운 Todo 객체 생성 (id는 crypto.randomUUID() 사용)
    // 3. setTodos로 상태 업데이트
  };

  // TODO: 할 일 삭제 함수
  const deleteTodo = (id: string) => {
    // 여기에 코드를 작성하세요
    // filter를 사용하여 해당 id를 제외한 새 배열 생성
  };

  // TODO: 완료 상태 토글 함수
  const toggleTodo = (id: string) => {
    // 여기에 코드를 작성하세요
    // map을 사용하여 해당 id의 completed 값을 반전
  };

  // TODO: 통계 계산
  const totalCount = 0; // todos.length
  const completedCount = 0; // todos.filter(todo => todo.completed).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-800">📝 Todo List</h1>

        <div className="rounded-xl bg-white p-6 shadow-lg">
          {/* TODO: TodoInput 컴포넌트에 필요한 props 전달 */}
          <TodoInput />

          {/* TODO: TodoList 컴포넌트에 필요한 props 전달 */}
          <TodoList />

          {/* 통계 표시 */}
          <div className="mt-6 flex justify-between border-t pt-4 text-sm text-gray-600">
            <span>전체: {totalCount}개</span>
            <span>완료: {completedCount}개</span>
            <span>남은 할 일: {totalCount - completedCount}개</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoApp;
