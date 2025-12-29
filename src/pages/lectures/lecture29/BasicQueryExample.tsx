import React from 'react';

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { type Todo, fetchTodos } from './api/mockApi';

// QueryClient 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1분간 데이터를 fresh 상태로 유지
      refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 refetch 비활성화
    },
  },
});

/**
 * TanStack Query - 기본 useQuery 사용법
 *
 * useQuery의 핵심 개념:
 * 1. queryKey: 쿼리를 식별하는 고유 키
 * 2. queryFn: 데이터를 가져오는 함수
 * 3. 자동 캐싱 및 백그라운드 업데이트
 */
function TodoList() {
  // useQuery로 데이터 가져오기
  const {
    data: todos,
    isLoading,
    error,
    refetch,
    isFetching,
    dataUpdatedAt,
  } = useQuery<Todo[]>({
    queryKey: ['todos'], // 쿼리 키 (배열 형태)
    queryFn: fetchTodos, // 데이터 페칭 함수
  });

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-6xl">⏳</div>
          <p className="text-lg text-gray-600">데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-6">
        <div className="mb-4 text-6xl">❌</div>
        <h3 className="mb-2 text-lg font-bold text-red-900">오류가 발생했습니다</h3>
        <p className="mb-4 text-red-700">{error.message}</p>
        <button
          onClick={() => refetch()}
          className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">📝 Todo 목록</h2>
          <p className="text-sm text-gray-500">
            마지막 업데이트: {new Date(dataUpdatedAt).toLocaleTimeString('ko-KR')}
          </p>
        </div>

        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isFetching ? '🔄 새로고침 중...' : '🔄 새로고침'}
        </button>
      </div>

      {/* Todo 목록 */}
      <div className="space-y-3">
        {todos?.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div
              className={`flex h-6 w-6 items-center justify-center rounded ${
                todo.completed ? 'bg-green-500' : 'bg-gray-200'
              }`}
            >
              {todo.completed && <span className="text-white">✓</span>}
            </div>
            <div className="flex-1">
              <p
                className={`font-medium ${
                  todo.completed ? 'text-gray-400 line-through' : 'text-gray-800'
                }`}
              >
                {todo.title}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(todo.createdAt).toLocaleDateString('ko-KR')}
              </p>
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

function BasicQueryExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="mx-auto max-w-4xl p-6">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-800">TanStack Query - 기본 사용법</h1>
          <p className="text-gray-600">
            useQuery를 사용하여 서버 데이터를 가져오고 자동으로 캐싱합니다.
          </p>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-md">
          <TodoList />
        </div>

        {/* 설명 */}
        <div className="mt-8 rounded-lg bg-blue-50 p-6">
          <h3 className="mb-3 font-bold text-blue-900">💡 핵심 포인트</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>
              <strong>queryKey:</strong> <code>['todos']</code> - 쿼리를 식별하는 고유 키
            </li>
            <li>
              <strong>queryFn:</strong> <code>fetchTodos</code> - 데이터를 가져오는 함수
            </li>
            <li>
              <strong>isLoading:</strong> 최초 로딩 상태 (데이터가 없을 때)
            </li>
            <li>
              <strong>isFetching:</strong> 백그라운드에서 데이터를 가져오는 중
            </li>
            <li>
              <strong>refetch:</strong> 수동으로 데이터 다시 가져오기
            </li>
            <li>
              <strong>자동 캐싱:</strong> 동일한 queryKey로 다시 요청하면 캐시된 데이터 반환
            </li>
          </ul>
        </div>

        {/* 코드 예시 */}
        <div className="mt-8 rounded-lg bg-gray-800 p-6 text-white">
          <h3 className="mb-3 font-bold">📝 코드 예시</h3>
          <pre className="overflow-x-auto text-sm">
            {`const { data, isLoading, error, refetch } = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
});

// 로딩 상태
if (isLoading) return <Loading />;

// 에러 상태
if (error) return <Error message={error.message} />;

// 데이터 표시
return <TodoList todos={data} />;`}
          </pre>
        </div>

        {/* useState와 비교 */}
        <div className="mt-8 rounded-lg bg-yellow-50 p-6">
          <h3 className="mb-3 font-bold text-yellow-900">🔄 useState vs TanStack Query</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-bold text-yellow-800">❌ useState</h4>
              <ul className="space-y-1 text-sm text-yellow-700">
                <li>• 캐싱 없음</li>
                <li>• 수동 로딩/에러 관리</li>
                <li>• 백그라운드 업데이트 없음</li>
                <li>• 보일러플레이트 많음</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-bold text-green-800">✅ TanStack Query</h4>
              <ul className="space-y-1 text-sm text-green-700">
                <li>• 자동 캐싱</li>
                <li>• 자동 로딩/에러 관리</li>
                <li>• 백그라운드 자동 업데이트</li>
                <li>• 간결한 코드</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* React Query DevTools */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default BasicQueryExample;
