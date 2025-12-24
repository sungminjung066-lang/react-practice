import React from 'react';

import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { type Todo, fetchTodo, fetchTodos } from './api/mockApi';

// QueryClient 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 1000, // 10초
    },
  },
});

/**
 * TanStack Query - Query Keys와 캐싱
 *
 * Query Key 설계 원칙:
 * 1. 배열 형태: ['todos'], ['todo', 1], ['todos', { status: 'active' }]
 * 2. 계층 구조: 상위 키로 하위 쿼리 무효화 가능
 * 3. 직렬화 가능: JSON.stringify로 변환 가능해야 함
 */
function QueryKeysDemo() {
  const queryClient = useQueryClient();
  const [selectedTodoId, setSelectedTodoId] = React.useState<number | null>(null);
  const [showCompleted, setShowCompleted] = React.useState(false);

  // 1. 모든 todos 조회
  const allTodosQuery = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  // 2. 필터링된 todos (computed value)
  const filteredTodos = React.useMemo(() => {
    if (!allTodosQuery.data) return [];
    return showCompleted
      ? allTodosQuery.data.filter((t) => t.completed)
      : allTodosQuery.data.filter((t) => !t.completed);
  }, [allTodosQuery.data, showCompleted]);

  // 3. 특정 todo 상세 조회 (선택된 경우에만)
  const todoDetailQuery = useQuery<Todo>({
    queryKey: ['todo', selectedTodoId],
    queryFn: () => fetchTodo(selectedTodoId!),
    enabled: selectedTodoId !== null,
  });

  // 캐시 정보 조회
  const getCacheInfo = () => {
    const cache = queryClient.getQueryCache();
    return cache.getAll().map((query) => ({
      queryKey: query.queryKey,
      state: query.state.status,
      dataUpdatedAt: query.state.dataUpdatedAt,
      isFetching: query.state.fetchStatus === 'fetching',
    }));
  };

  const [cacheInfo, setCacheInfo] = React.useState(getCacheInfo());

  // 캐시 정보 업데이트
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCacheInfo(getCacheInfo());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 특정 쿼리 무효화
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const invalidateQuery = (queryKey: any[]) => {
    queryClient.invalidateQueries({ queryKey });
  };

  // 모든 쿼리 무효화
  const invalidateAll = () => {
    queryClient.invalidateQueries();
  };

  // 캐시 초기화
  const clearCache = () => {
    queryClient.clear();
    setSelectedTodoId(null);
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* 왼쪽: Todo 목록 */}
      <div className="space-y-6">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">📝 Todo 목록</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setShowCompleted(!showCompleted)}
                className={`rounded-lg px-3 py-1 text-sm font-medium ${
                  showCompleted ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                {showCompleted ? '✅ 완료만' : '⏳ 미완료만'}
              </button>
            </div>
          </div>

          {allTodosQuery.isLoading ? (
            <p className="text-gray-500">로딩 중...</p>
          ) : (
            <div className="space-y-2">
              {filteredTodos.map((todo) => (
                <button
                  key={todo.id}
                  onClick={() => setSelectedTodoId(todo.id)}
                  className={`w-full rounded-lg border p-3 text-left transition-all ${
                    selectedTodoId === todo.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={todo.completed ? '✅' : '⏳'}></span>
                    <span
                      className={todo.completed ? 'text-gray-400 line-through' : 'text-gray-800'}
                    >
                      {todo.title}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Todo 상세 */}
        {selectedTodoId && (
          <div className="rounded-lg border-2 border-blue-500 bg-blue-50 p-4">
            <h3 className="mb-3 font-bold text-blue-900">📄 Todo 상세</h3>
            {todoDetailQuery.isLoading ? (
              <p className="text-sm text-blue-700">로딩 중...</p>
            ) : todoDetailQuery.data ? (
              <div className="space-y-2 text-sm">
                <p>
                  <strong>ID:</strong> {todoDetailQuery.data.id}
                </p>
                <p>
                  <strong>제목:</strong> {todoDetailQuery.data.title}
                </p>
                <p>
                  <strong>상태:</strong> {todoDetailQuery.data.completed ? '✅ 완료' : '⏳ 미완료'}
                </p>
                <p>
                  <strong>생성일:</strong>{' '}
                  {new Date(todoDetailQuery.data.createdAt).toLocaleString('ko-KR')}
                </p>
              </div>
            ) : null}
          </div>
        )}
      </div>

      {/* 오른쪽: 캐시 관리 */}
      <div className="space-y-6">
        {/* 캐시 제어 */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h3 className="mb-4 text-lg font-bold text-gray-800">🎛️ 캐시 제어</h3>
          <div className="space-y-2">
            <button
              onClick={() => invalidateQuery(['todos'])}
              className="w-full rounded-lg bg-orange-600 px-4 py-2 text-sm text-white hover:bg-orange-700"
            >
              🔄 ['todos'] 무효화
            </button>
            {selectedTodoId && (
              <button
                onClick={() => invalidateQuery(['todo', selectedTodoId])}
                className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm text-white hover:bg-purple-700"
              >
                🔄 ['todo', {selectedTodoId}] 무효화
              </button>
            )}
            <button
              onClick={invalidateAll}
              className="w-full rounded-lg bg-yellow-600 px-4 py-2 text-sm text-white hover:bg-yellow-700"
            >
              🔄 모든 쿼리 무효화
            </button>
            <button
              onClick={clearCache}
              className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
            >
              🗑️ 캐시 초기화
            </button>
          </div>
        </div>

        {/* 캐시 상태 */}
        <div className="rounded-lg bg-gray-800 p-6 text-white">
          <h3 className="mb-4 text-lg font-bold">💾 캐시 상태</h3>
          <div className="space-y-3">
            {cacheInfo.map((info, index) => (
              <div key={index} className="rounded-lg bg-gray-700 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <code className="text-sm text-green-400">{JSON.stringify(info.queryKey)}</code>
                  {info.isFetching && (
                    <span className="rounded bg-yellow-600 px-2 py-1 text-xs">Fetching</span>
                  )}
                </div>
                <div className="flex gap-4 text-xs">
                  <span
                    className={`${info.state === 'success' ? 'text-green-400' : 'text-gray-400'}`}
                  >
                    Status: {info.state}
                  </span>
                  <span className="text-gray-400">
                    Updated:{' '}
                    {info.dataUpdatedAt
                      ? new Date(info.dataUpdatedAt).toLocaleTimeString('ko-KR')
                      : '-'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function QueryKeysExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="mx-auto max-w-7xl p-6">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-800">
            TanStack Query - Query Keys & Cache
          </h1>
          <p className="text-gray-600">Query Key 설계와 캐시 관리 방법을 학습합니다.</p>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-md">
          <QueryKeysDemo />
        </div>

        {/* Query Key 설계 가이드 */}
        <div className="mt-8 rounded-lg bg-blue-50 p-6">
          <h3 className="mb-3 font-bold text-blue-900">🔑 Query Key 설계 가이드</h3>
          <div className="space-y-3 text-sm text-blue-800">
            <div className="rounded-lg bg-white p-3">
              <strong>1. 단순 키:</strong> <code>['todos']</code> - 모든 todos
            </div>
            <div className="rounded-lg bg-white p-3">
              <strong>2. ID 포함:</strong> <code>['todo', 1]</code> - 특정 todo
            </div>
            <div className="rounded-lg bg-white p-3">
              <strong>3. 필터 포함:</strong> <code>{`['todos', { status: 'active' }]`}</code> -
              필터링된 todos
            </div>
            <div className="rounded-lg bg-white p-3">
              <strong>4. 계층 구조:</strong> <code>{`['todos', 'list', { page: 1 }]`}</code> -
              페이지네이션
            </div>
          </div>
        </div>

        {/* 캐시 무효화 */}
        <div className="mt-8 rounded-lg bg-green-50 p-6">
          <h3 className="mb-3 font-bold text-green-900">🔄 캐시 무효화 (Invalidation)</h3>
          <ul className="space-y-2 text-sm text-green-800">
            <li>
              <strong>특정 쿼리:</strong>{' '}
              <code>invalidateQueries({`{ queryKey: ['todos'] }`})</code>
            </li>
            <li>
              <strong>하위 포함:</strong> <code>['todos']</code> 무효화 시 <code>['todos', 1]</code>
              , <code>{`['todos', { status: 'active' }]`}</code> 등도 무효화
            </li>
            <li>
              <strong>모든 쿼리:</strong> <code>invalidateQueries()</code>
            </li>
            <li>
              <strong>효과:</strong> 무효화된 쿼리는 자동으로 refetch됨
            </li>
          </ul>
        </div>

        {/* 코드 예시 */}
        <div className="mt-8 rounded-lg bg-gray-800 p-6 text-white">
          <h3 className="mb-3 font-bold">📝 코드 예시</h3>
          <pre className="overflow-x-auto text-sm">
            {`// Query Key 정의
const todosQuery = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
});

const todoQuery = useQuery({
  queryKey: ['todo', id],
  queryFn: () => fetchTodo(id),
});

// 캐시 무효화
queryClient.invalidateQueries({ queryKey: ['todos'] });
queryClient.invalidateQueries({ queryKey: ['todo', 1] });

// 캐시 초기화
queryClient.clear();

// 캐시 데이터 직접 설정
queryClient.setQueryData(['todo', 1], newTodoData);

// 캐시 데이터 가져오기
const cachedData = queryClient.getQueryData(['todos']);`}
          </pre>
        </div>
      </div>

      {/* React Query DevTools */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default QueryKeysExample;
