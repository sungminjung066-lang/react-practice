/**
 * TanStack Query + Axios Mutation 예제
 *
 * useMutation과 Axios를 함께 사용하여 데이터 생성, 수정, 삭제하는 방법을 보여줍니다.
 */
import { useState } from 'react';

import { QueryClient, QueryClientProvider, useMutation, useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { type Todo, createTodo, deleteTodo, fetchTodos, updateTodo } from './api/axiosApi';

// QueryClient 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

/**
 * Todo 관리 컴포넌트
 *
 * useMutation을 사용하여 CRUD 작업을 수행합니다.
 */
function TodoManager() {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');

  // ==================== Query ====================

  // Todo 목록 가져오기 (useQuery)
  const {
    data: todos,
    isLoading,
    error,
  } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    // 상위 20개만 표시
    select: (data) => data.slice(0, 20),
  });

  // ==================== Mutations ====================

  // Todo 생성 Mutation
  const createMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      // 성공 시 쿼리 무효화하여 목록 새로고침
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setNewTodoTitle(''); // 입력 필드 초기화
      console.log('✅ Todo 생성 성공!');
    },
    onError: (error) => {
      console.error('❌ Todo 생성 실패:', error.message);
      alert('Todo 생성에 실패했습니다.');
    },
  });

  // Todo 업데이트 Mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Todo> }) => updateTodo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setEditingId(null);
      console.log('✅ Todo 업데이트 성공!');
    },
    onError: (error) => {
      console.error('❌ Todo 업데이트 실패:', error.message);
      alert('Todo 업데이트에 실패했습니다.');
    },
  });

  // Todo 삭제 Mutation (낙관적 업데이트 포함)
  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    // 낙관적 업데이트: 서버 응답 전에 UI 먼저 업데이트
    onMutate: async (deletedId) => {
      // 진행 중인 refetch 취소
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      // 이전 데이터 백업
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);

      // 낙관적으로 캐시 업데이트
      queryClient.setQueryData<Todo[]>(['todos'], (old) =>
        old ? old.filter((todo) => todo.id !== deletedId) : [],
      );

      // 롤백을 위한 컨텍스트 반환
      return { previousTodos };
    },
    onError: (error, deletedId, context) => {
      // 에러 발생 시 이전 데이터로 롤백
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos);
      }
      console.error('❌ Todo 삭제 실패:', error.message);
      alert('Todo 삭제에 실패했습니다.');
    },
    onSuccess: () => {
      console.log('✅ Todo 삭제 성공!');
    },
    onSettled: () => {
      // 성공/실패 여부와 관계없이 최종적으로 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  // ==================== Event Handlers ====================

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) {
      alert('Todo 제목을 입력하세요.');
      return;
    }

    createMutation.mutate({
      userId: 1,
      title: newTodoTitle,
      completed: false,
    });
  };

  const handleToggle = (todo: Todo) => {
    updateMutation.mutate({
      id: todo.id,
      data: { completed: !todo.completed },
    });
  };

  const handleEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
  };

  const handleSaveEdit = (id: number) => {
    if (!editTitle.trim()) {
      alert('Todo 제목을 입력하세요.');
      return;
    }

    updateMutation.mutate({
      id,
      data: { title: editTitle },
    });
  };

  const handleDelete = (id: number) => {
    if (confirm('정말로 이 Todo를 삭제하시겠습니까?')) {
      deleteMutation.mutate(id);
    }
  };

  // ==================== Render ====================

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-6xl">⏳</div>
          <p className="text-lg text-gray-600">Todo 목록을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-6">
        <div className="mb-4 text-6xl">❌</div>
        <h3 className="mb-2 text-lg font-bold text-red-900">오류가 발생했습니다</h3>
        <p className="text-red-700">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">✅ Todo 관리</h2>
        <p className="text-sm text-gray-500">
          useMutation과 Axios로 데이터를 생성, 수정, 삭제합니다.
        </p>
      </div>

      {/* Todo 생성 폼 */}
      <form onSubmit={handleCreate} className="rounded-lg bg-blue-50 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            placeholder="새 Todo를 입력하세요..."
            className="flex-1 rounded-lg border border-blue-200 px-4 py-2 focus:border-blue-500 focus:outline-none"
            disabled={createMutation.isPending}
          />
          <button
            type="submit"
            disabled={createMutation.isPending}
            className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {createMutation.isPending ? '⏳ 추가 중...' : '➕ 추가'}
          </button>
        </div>
      </form>

      {/* Todo 목록 */}
      <div className="space-y-2">
        {todos?.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
          >
            {/* 체크박스 */}
            <button
              onClick={() => handleToggle(todo)}
              disabled={updateMutation.isPending}
              className={`flex h-6 w-6 items-center justify-center rounded transition-colors ${
                todo.completed ? 'bg-green-500' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {todo.completed && <span className="text-white">✓</span>}
            </button>

            {/* 제목 */}
            {editingId === todo.id ? (
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="flex-1 rounded border border-blue-300 px-2 py-1"
                autoFocus
              />
            ) : (
              <p
                className={`flex-1 ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}
              >
                {todo.title}
              </p>
            )}

            {/* 액션 버튼 */}
            <div className="flex gap-2">
              {editingId === todo.id ? (
                <>
                  <button
                    onClick={() => handleSaveEdit(todo.id)}
                    disabled={updateMutation.isPending}
                    className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
                  >
                    💾 저장
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="rounded bg-gray-400 px-3 py-1 text-sm text-white hover:bg-gray-500"
                  >
                    취소
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEdit(todo)}
                    disabled={updateMutation.isPending}
                    className="rounded bg-yellow-500 px-3 py-1 text-sm text-white hover:bg-yellow-600"
                  >
                    ✏️ 수정
                  </button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    disabled={deleteMutation.isPending}
                    className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                  >
                    🗑️ 삭제
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 통계 */}
      <div className="rounded-lg bg-gray-50 p-4">
        <h3 className="mb-2 font-bold text-gray-700">📊 통계</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600">{todos?.length || 0}</p>
            <p className="text-sm text-gray-600">전체</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">
              {todos?.filter((t) => t.completed).length || 0}
            </p>
            <p className="text-sm text-gray-600">완료</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-orange-600">
              {todos?.filter((t) => !t.completed).length || 0}
            </p>
            <p className="text-sm text-gray-600">미완료</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TanstackAxiosMutationExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="mx-auto max-w-4xl p-6">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-800">
            TanStack Query + Axios - Mutation
          </h1>
          <p className="text-gray-600">
            useMutation과 Axios를 함께 사용하여 데이터를 생성, 수정, 삭제합니다.
          </p>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-md">
          <TodoManager />
        </div>

        {/* 설명 */}
        <div className="mt-8 rounded-lg bg-purple-50 p-6">
          <h3 className="mb-3 font-bold text-purple-900">💡 핵심 포인트</h3>
          <ul className="space-y-2 text-sm text-purple-800">
            <li>
              <strong>useMutation:</strong> 데이터 변경 작업 (POST, PUT, DELETE)을 위한 Hook
            </li>
            <li>
              <strong>mutationFn:</strong> Axios API 함수를 전달
            </li>
            <li>
              <strong>onSuccess:</strong> 성공 시 쿼리 무효화하여 데이터 재조회
            </li>
            <li>
              <strong>onError:</strong> 에러 발생 시 사용자에게 알림
            </li>
            <li>
              <strong>낙관적 업데이트:</strong> onMutate에서 서버 응답 전에 UI 먼저 업데이트
            </li>
            <li>
              <strong>롤백:</strong> 에러 발생 시 onError에서 이전 상태로 복원
            </li>
            <li>
              <strong>invalidateQueries:</strong> 캐시 무효화하여 최신 데이터 가져오기
            </li>
          </ul>
        </div>

        {/* 코드 예시 */}
        <div className="mt-8 rounded-lg bg-gray-800 p-6 text-white">
          <h3 className="mb-3 font-bold">📝 코드 예시</h3>
          <pre className="overflow-x-auto text-sm">
            {`// Todo 생성
const createMutation = useMutation({
  mutationFn: createTodo,
  onSuccess: () => {
    // 성공 시 쿼리 무효화
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  },
});

// 실행
createMutation.mutate({ title: 'New Todo', completed: false });

// 낙관적 업데이트
const deleteMutation = useMutation({
  mutationFn: deleteTodo,
  onMutate: async (deletedId) => {
    // 진행 중인 refetch 취소
    await queryClient.cancelQueries({ queryKey: ['todos'] });
    
    // 이전 데이터 백업
    const previous = queryClient.getQueryData(['todos']);
    
    // UI 먼저 업데이트
    queryClient.setQueryData(['todos'], (old) =>
      old.filter((todo) => todo.id !== deletedId)
    );
    
    return { previous }; // 롤백용
  },
  onError: (err, variables, context) => {
    // 에러 시 롤백
    queryClient.setQueryData(['todos'], context.previous);
  },
});`}
          </pre>
        </div>

        {/* 참고사항 */}
        <div className="mt-8 rounded-lg bg-yellow-50 p-6">
          <h3 className="mb-3 font-bold text-yellow-900">⚠️ 참고사항</h3>
          <p className="text-sm text-yellow-800">
            JSONPlaceholder는 실제로 데이터를 저장하지 않는 테스트 API입니다. 따라서 생성/수정/삭제
            작업은 시뮬레이션되며, 페이지를 새로고침하면 원래 데이터로 돌아갑니다.
          </p>
        </div>
      </div>

      {/* React Query DevTools */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default TanstackAxiosMutationExample;
