/**
 * TanStack Query + Axios 기본 예제
 *
 * useQuery와 Axios를 함께 사용하여 데이터를 가져오는 기본적인 방법을 보여줍니다.
 */
import { useState } from 'react';

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { type User, fetchUser, fetchUsers } from './api/axiosApi';

// QueryClient 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1분간 데이터를 fresh 상태로 유지
      refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 refetch 비활성화
      retry: 1, // 실패 시 1번만 재시도
    },
  },
});

/**
 * 사용자 목록을 표시하는 컴포넌트
 *
 * TanStack Query의 useQuery와 Axios를 함께 사용합니다.
 */
function UserList() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  // useQuery + Axios로 사용자 목록 가져오기
  // queryKey: 쿼리를 식별하는 고유 키
  // queryFn: 데이터를 가져오는 함수 (Axios API 함수)
  const {
    data: users,
    isLoading,
    error,
    refetch,
    isFetching,
    dataUpdatedAt,
  } = useQuery<User[]>({
    queryKey: ['users'], // 쿼리 키
    queryFn: fetchUsers, // Axios를 사용하는 API 함수
  });

  // 선택된 사용자 상세 정보 가져오기
  // enabled 옵션: selectedUserId가 있을 때만 쿼리 실행
  const {
    data: selectedUser,
    isLoading: isLoadingUser,
    error: userError,
  } = useQuery<User>({
    queryKey: ['user', selectedUserId], // 동적 쿼리 키
    queryFn: () => fetchUser(selectedUserId!), // 파라미터가 있는 API 함수
    enabled: !!selectedUserId, // selectedUserId가 있을 때만 실행
  });

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-6xl">⏳</div>
          <p className="text-lg text-gray-600">사용자 목록을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태 처리
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
          <h2 className="text-2xl font-bold text-gray-800">👥 사용자 목록</h2>
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

      {/* 사용자 목록 */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users?.map((user) => (
          <div
            key={user.id}
            onClick={() => setSelectedUserId(user.id)}
            className={`cursor-pointer rounded-lg border p-4 shadow-sm transition-all hover:shadow-md ${
              selectedUserId === user.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
            }`}
          >
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-2xl text-white">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800">{user.name}</h3>
                <p className="text-sm text-gray-500">@{user.username}</p>
              </div>
            </div>
            <div className="space-y-1 text-sm text-gray-600">
              <p>📧 {user.email}</p>
              <p>📱 {user.phone}</p>
              <p>🌐 {user.website}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 선택된 사용자 상세 정보 */}
      {selectedUserId && (
        <div className="rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800">📋 사용자 상세 정보</h3>
            <button
              onClick={() => setSelectedUserId(null)}
              className="rounded-lg bg-gray-200 px-3 py-1 text-sm hover:bg-gray-300"
            >
              닫기
            </button>
          </div>

          {isLoadingUser && (
            <div className="text-center">
              <p className="text-gray-600">로딩 중...</p>
            </div>
          )}

          {userError && (
            <div className="rounded-lg bg-red-100 p-4 text-red-700">에러: {userError.message}</div>
          )}

          {selectedUser && (
            <div className="rounded-lg bg-white p-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-gray-700">ID</p>
                  <p className="text-gray-600">{selectedUser.id}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">이름</p>
                  <p className="text-gray-600">{selectedUser.name}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">사용자명</p>
                  <p className="text-gray-600">{selectedUser.username}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">이메일</p>
                  <p className="text-gray-600">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">전화번호</p>
                  <p className="text-gray-600">{selectedUser.phone}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">웹사이트</p>
                  <p className="text-gray-600">{selectedUser.website}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 통계 */}
      <div className="rounded-lg bg-gray-50 p-4">
        <h3 className="mb-2 font-bold text-gray-700">📊 통계</h3>
        <div className="text-center">
          <p className="text-3xl font-bold text-blue-600">{users?.length || 0}</p>
          <p className="text-sm text-gray-600">총 사용자 수</p>
        </div>
      </div>
    </div>
  );
}

function TanstackAxiosBasicExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="mx-auto max-w-6xl p-6">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-800">
            TanStack Query + Axios - 기본 사용법
          </h1>
          <p className="text-gray-600">
            useQuery와 Axios를 함께 사용하여 실제 API에서 데이터를 가져옵니다.
          </p>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-md">
          <UserList />
        </div>

        {/* 설명 */}
        <div className="mt-8 rounded-lg bg-blue-50 p-6">
          <h3 className="mb-3 font-bold text-blue-900">💡 핵심 포인트</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>
              <strong>Axios 통합:</strong> queryFn에 Axios API 함수를 직접 전달
            </li>
            <li>
              <strong>자동 에러 처리:</strong> Axios 인터셉터가 에러를 처리하고 TanStack Query가
              상태 관리
            </li>
            <li>
              <strong>동적 쿼리 키:</strong> <code>['user', selectedUserId]</code>와 같이 파라미터를
              포함한 키
            </li>
            <li>
              <strong>조건부 쿼리:</strong> enabled 옵션으로 쿼리 실행 조건 설정
            </li>
            <li>
              <strong>자동 캐싱:</strong> 동일한 데이터 요청 시 캐시된 데이터 사용
            </li>
            <li>
              <strong>백그라운드 업데이트:</strong> refetch로 데이터 갱신 시 UI는 이전 데이터 유지
            </li>
          </ul>
        </div>

        {/* 코드 예시 */}
        <div className="mt-8 rounded-lg bg-gray-800 p-6 text-white">
          <h3 className="mb-3 font-bold">📝 코드 예시</h3>
          <pre className="overflow-x-auto text-sm">
            {`// Axios API 함수
export const fetchUsers = async (): Promise<User[]> => {
  const response = await apiClient.get<User[]>('/users');
  return response.data;
};

// TanStack Query에서 사용
const { data, isLoading, error } = useQuery<User[]>({
  queryKey: ['users'],
  queryFn: fetchUsers, // Axios 함수 직접 전달
});

// 파라미터가 있는 경우
const { data: user } = useQuery<User>({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
  enabled: !!userId, // userId가 있을 때만 실행
});`}
          </pre>
        </div>

        {/* Axios 인터셉터 설명 */}
        <div className="mt-8 rounded-lg bg-green-50 p-6">
          <h3 className="mb-3 font-bold text-green-900">🔧 Axios 인터셉터 동작</h3>
          <p className="mb-3 text-sm text-green-800">
            브라우저 개발자 도구의 콘솔을 열어 Axios 인터셉터가 로깅하는 내용을 확인하세요:
          </p>
          <ul className="space-y-2 text-sm text-green-800">
            <li>🚀 요청 시작: 요청 메서드, URL, 파라미터 출력</li>
            <li>✅ 응답 성공: 응답 상태, 소요 시간, 데이터 출력</li>
            <li>❌ 응답 실패: 에러 상태, 에러 메시지 출력</li>
          </ul>
        </div>
      </div>

      {/* React Query DevTools */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default TanstackAxiosBasicExample;
