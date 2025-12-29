import React from 'react';
import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { createTodo, deleteTodo, fetchTodos, updateTodo, type Todo } from './api/mockApi';

// QueryClient 생성
const queryClient = new QueryClient();

/**
 * TanStack Query - useMutation 사용법
 * 
 * useMutation의 핵심 개념:
 * 1. mutationFn: 실행할 함수 (POST, PUT, DELETE 등)
 * 2. onSuccess: 성공 시 콜백
 * 3. onError: 실패 시 콜백
 * 4. invalidateQueries: 쿼리 무효화하여 다시 가져오기
 */
function TodoManager() {
  const queryClient = useQueryClient();
  const [newTodoTitle, setNewTodoTitle] = React.useState('');

  // 데이터 조회
  const { data: todos, isLoading } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  // Todo 생성 Mutation
  const createMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      // 성공 시 todos 쿼리를 무효화하여 다시 가져오기
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setNewTodoTitle('');
      alert('✅ Todo가 추가되었습니다!');
    },
    onError: (error: Error) => {
      alert(`❌ 오류: ${error.message}`);
    },
  });

  // Todo 업데이트 Mutation (완료/미완료 토글)
  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  // Todo 삭제 Mutation
  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      alert('🗑️ Todo가 삭제되었습니다!');
    },
  });

  // Todo 추가 핸들러
  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) {
      alert('Todo 제목을 입력해주세요!');
      return;
    }
    createMutation.mutate({ title: newTodoTitle });
  };

  // 완료 토글 핸들러
  const handleToggleComplete = (todo: Todo) => {
    updateMutation.mutate({
      id: todo.id,
      completed: !todo.completed,
    });
  };

  // 삭제 핸들러
  const handleDelete = (id: number) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-lg text-gray-600">⏳ 로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Todo 추가 폼 */}
      <form onSubmit={handleAddTodo} className="rounded-lg bg-blue-50 p-6">
        <h3 className="mb-4 text-lg font-bold text-blue-900">➕ 새 Todo 추가</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            placeholder="할 일을 입력하세요..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            disabled={createMutation.isPending}
          />
          <button
            type="submit"
            disabled={createMutation.isPending}
            className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {createMutation.isPending ? '추가 중...' : '추가'}
          </button>
        </div>
      </form>

      {/* Mutation 상태 표시 */}
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className={`rounded-lg p-3 ${createMutation.isPending ? 'bg-yellow-100' : 'bg-gray-100'}`}>
          <p className="font-medium text-gray-700">생성 중</p>
          <p className="text-2xl">{createMutation.isPending ? '🔄' : '⚪'}</p>
        </div>
        <div className={`rounded-lg p-3 ${updateMutation.isPending ? 'bg-yellow-100' : 'bg-gray-100'}`}>
          <p className="font-medium text-gray-700">업데이트 중</p>
          <p className="text-2xl">{updateMutation.isPending ? '🔄' : '⚪'}</p>
        </div>
        <div className={`rounded-lg p-3 ${deleteMutation.isPending ? 'bg-yellow-100' : 'bg-gray-100'}`}>
          <p className="font-medium text-gray-700">삭제 중</p>
          <p className="text-2xl">{deleteMutation.isPending ? '🔄' : '⚪'}</p>
        </div>
      </div>

      {/* Todo 목록 */}
      <div className="space-y-3">
        {todos?.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md"
          >
            {/* 완료 체크박스 */}
            <button
              onClick={() => handleToggleComplete(todo)}
              disabled={updateMutation.isPending}
              className={`flex h-8 w-8 items-center justify-center rounded transition-colors ${
                todo.completed ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-200 hover:bg-gray-300'
              } disabled:opacity-50`}
            >
              {todo.completed && <span className="text-lg text-white">✓</span>}
            </button>

            {/* Todo 내용 */}
            <div className="flex-1">
              <p
                className={`font-medium ${
                  todo.completed ? 'text-gray-400 line-through' : 'text-gray-800'
                }`}
              >
                {todo.title}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(todo.createdAt).toLocaleString('ko-KR')}
              </p>
            </div>

            {/* 삭제 버튼 */}
            <button
              onClick={() => handleDelete(todo.id)}
              disabled={deleteMutation.isPending}
              className="rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200 disabled:opacity-50"
            >
              🗑️ 삭제
            </button>
          </div>
        ))}
      </div>

      {/* 통계 */}
      <div className="rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 p-6">
        <h3 className="mb-4 text-lg font-bold text-purple-900">📊 통계</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-3xl font-bold text-purple-600">{todos?.length || 0}</p>
            <p className="text-sm text-purple-700">전체 Todo</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-green-600">
              {todos?.filter((t) => t.completed).length || 0}
            </p>
            <p className="text-sm text-green-700">완료</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-orange-600">
              {todos?.filter((t) => !t.completed).length || 0}
            </p>
            <p className="text-sm text-orange-700">미완료</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MutationExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="mx-auto max-w-4xl p-6">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-800">
            TanStack Query - useMutation
          </h1>
          <p className="text-gray-600">
            useMutation으로 데이터를 생성, 수정, 삭제합니다.
          </p>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-md">
          <TodoManager />
        </div>

        {/* 설명 */}
        <div className="mt-8 rounded-lg bg-green-50 p-6">
          <h3 className="mb-3 font-bold text-green-900">💡 useMutation 핵심 포인트</h3>
          <ul className="space-y-2 text-sm text-green-800">
            <li>
              <strong>mutationFn:</strong> 실행할 비동기 함수 (POST, PUT, DELETE 등)
            </li>
            <li>
              <strong>mutate():</strong> mutation을 실행하는 함수
            </li>
            <li>
              <strong>isPending:</strong> mutation이 실행 중인지 여부
            </li>
            <li>
              <strong>onSuccess:</strong> 성공 시 실행될 콜백 함수
            </li>
            <li>
              <strong>onError:</strong> 실패 시 실행될 콜백 함수
            </li>
            <li>
              <strong>invalidateQueries:</strong> 쿼리를 무효화하여 자동으로 refetch
            </li>
          </ul>
        </div>

        {/* 코드 예시 */}
        <div className="mt-8 rounded-lg bg-gray-800 p-6 text-white">
          <h3 className="mb-3 font-bold">📝 코드 예시</h3>
          <pre className="overflow-x-auto text-sm">
            {`const createMutation = useMutation({
  mutationFn: createTodo,
  onSuccess: () => {
    // todos 쿼리 무효화 → 자동 refetch
    queryClient.invalidateQueries({ queryKey: ['todos'] });
    alert('추가 완료!');
  },
  onError: (error) => {
    alert(\`오류: \${error.message}\`);
  },
});

// mutation 실행
createMutation.mutate({ title: 'New Todo' });

// 상태 확인
createMutation.isPending  // 실행 중
createMutation.isSuccess  // 성공
createMutation.isError    // 실패`}
          </pre>
        </div>

        {/* CRUD 작업 흐름 */}
        <div className="mt-8 rounded-lg bg-purple-50 p-6">
          <h3 className="mb-3 font-bold text-purple-900">🔄 CRUD 작업 흐름</h3>
          <div className="space-y-3 text-sm text-purple-800">
            <div className="rounded-lg bg-white p-3">
              <strong>1. Create (생성):</strong> mutate() 호출 → API 요청 → onSuccess → invalidateQueries → 자동 refetch
            </div>
            <div className="rounded-lg bg-white p-3">
              <strong>2. Update (수정):</strong> mutate() 호출 → API 요청 → onSuccess → invalidateQueries → 자동 refetch
            </div>
            <div className="rounded-lg bg-white p-3">
              <strong>3. Delete (삭제):</strong> mutate() 호출 → API 요청 → onSuccess → invalidateQueries → 자동 refetch
            </div>
          </div>
        </div>
      </div>

      {/* React Query DevTools */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MutationExample;

