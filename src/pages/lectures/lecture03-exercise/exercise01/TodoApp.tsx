import React from 'react';

import { TodoContainer } from './TodoContainer';
import { TodoInfo } from './TodoInfo';
import { TodoInput } from './TodoInput';
import type { Todo } from './TodoItem';
import { TodoList } from './TodoList';

// 메인 컴포넌트
function TodoApp() {
  // TODO: useState를 사용하여 todos 상태를 관리하세요
  const [todos, setTodos] = React.useState<Todo[]>([]);
  console.log('todos', todos);
  // TODO: 할 일 추가 함수
  const addTodo = (text: string) => {
    // 여기에 코드를 작성하세요
    // 1. 빈 문자열 체크
    // 2. 새로운 Todo 객체 생성 (id는 crypto.randomUUID() 사용)
    // 3. setTodos로 상태 업데이트
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  // TODO: 할 일 삭제 함수
  const deleteTodo = (id: string) => {
    // 여기에 코드를 작성하세요
    // filter를 사용하여 해당 id를 제외한 새 배열 생성
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // TODO: 완료 상태 토글 함수
  const toggleTodo = (id: string) => {
    // 여기에 코드를 작성하세요
    // map을 사용하여 해당 id의 completed 값을 반전
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  };

  // TODO: 통계 계산
  const totalCount = todos.length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <TodoContainer>
      {/* TODO: TodoInput 컴포넌트에 필요한 props 전달 */}
      <TodoInput addTodo={addTodo} />

      {/* TODO: TodoList 컴포넌트에 필요한 props 전달 */}
      <TodoList todos={todos} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />

      {/* 통계 표시 */}
      <TodoInfo totalCount={totalCount} completedCount={completedCount} />
    </TodoContainer>
  );
}

export default TodoApp;
