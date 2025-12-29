/**
 * TanStack Query + Axios 에러 처리 예제
 *
 * Axios 에러와 TanStack Query의 에러 처리 기능을 함께 활용하는 방법을 보여줍니다.
 */
import { useState } from 'react';

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';

// ==================== 타입 정의 ====================

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

// ==================== 에러를 발생시키는 API ====================

// 의도적으로 에러를 발생시키는 Axios 인스턴스
const errorProneApi = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000,
});

// 에러 시뮬레이션 옵션
let shouldFail = false;
let failureCount = 0;

// 게시글 가져오기 (에러 시뮬레이션 포함)
const fetchPostWithError = async (id: number): Promise<Post> => {
  // 에러 시뮬레이션
  if (shouldFail) {
    failureCount++;
    throw new Error(`네트워크 오류 발생 (시도 횟수: ${failureCount})`);
  }

  const response = await errorProneApi.get<Post>(`/posts/${id}`);
  return response.data;
};

// 존재하지 않는 리소스 가져오기 (404 에러)
const fetchNonExistentPost = async (): Promise<Post> => {
  const response = await errorProneApi.get<Post>('/posts/99999');
  return response.data;
};

// ==================== QueryClient ====================

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
      // 에러 발생 시 재시도 설정
      retry: 3, // 3번까지 재시도
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // 지수 백오프
    },
  },
});

// ==================== 컴포넌트 ====================

function ErrorHandlingDemo() {
  const [postId, setPostId] = useState(1);
  const [enableErrorMode, setEnableErrorMode] = useState(false);
  const [test404, setTest404] = useState(false);

  // 에러 모드 토글
  const toggleErrorMode = () => {
    shouldFail = !enableErrorMode;
    failureCount = 0;
    setEnableErrorMode(!enableErrorMode);
  };

  // 게시글 조회 쿼리
  const {
    data: post,
    isLoading,
    error,
    refetch,
    isFetching,
    failureCount: queryFailureCount,
    failureReason,
  } = useQuery<Post, Error>({
    queryKey: ['post', postId, test404],
    queryFn: () => (test404 ? fetchNonExistentPost() : fetchPostWithError(postId)),
    retry: enableErrorMode ? 3 : false, // 에러 모드일 때만 재시도
    retryDelay: 1000, // 1초 간격으로 재시도
  });

  return (
    <div className="space-y-6">
      {/* 제어 패널 */}
      <div className="rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 p-6">
        <h2 className="mb-4 text-xl font-bold text-gray-800">🎛️ 에러 시뮬레이션 제어</h2>

        <div className="space-y-4">
          {/* 에러 모드 토글 */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleErrorMode}
              className={`rounded-lg px-4 py-2 font-semibold text-white transition-colors ${
                enableErrorMode ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {enableErrorMode ? '❌ 에러 모드 OFF' : '✅ 에러 모드 ON'}
            </button>
            <span className="text-sm text-gray-600">
              {enableErrorMode ? '현재 모든 요청이 실패합니다' : '현재 요청이 정상 작동합니다'}
            </span>
          </div>

          {/* 404 에러 테스트 */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                shouldFail = false;
                setEnableErrorMode(false);
                setTest404(!test404);
              }}
              className={`rounded-lg px-4 py-2 font-semibold text-white transition-colors ${
                test404 ? 'bg-orange-600 hover:bg-orange-700' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {test404 ? '🔙 정상 모드로' : '🔍 404 에러 테스트'}
            </button>
            <span className="text-sm text-gray-600">존재하지 않는 리소스 요청</span>
          </div>

          {/* 게시글 ID 선택 */}
          {!test404 && (
            <div className="flex items-center gap-3">
              <label className="text-sm font-semibold text-gray-700">게시글 ID:</label>
              <input
                type="number"
                min="1"
                max="100"
                value={postId}
                onChange={(e) => setPostId(Number(e.target.value))}
                className="w-24 rounded border border-gray-300 px-3 py-2"
              />
              <button
                onClick={() => refetch()}
                disabled={isFetching}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {isFetching ? '⏳ 로딩 중...' : '🔄 다시 가져오기'}
              </button>
            </div>
          )}
        </div>

        {/* 재시도 정보 */}
        {enableErrorMode && queryFailureCount > 0 && (
          <div className="mt-4 rounded-lg bg-yellow-100 p-3">
            <p className="text-sm font-semibold text-yellow-800">
              ⚠️ 재시도 중: {queryFailureCount}번 실패
            </p>
          </div>
        )}
      </div>

      {/* 결과 표시 영역 */}
      <div className="rounded-lg bg-white p-6 shadow-md">
        {/* 로딩 상태 */}
        {isLoading && (
          <div className="flex h-64 items-center justify-center">
            <div className="text-center">
              <div className="mb-4 animate-spin text-6xl">⏳</div>
              <p className="text-lg text-gray-600">게시글을 불러오는 중...</p>
              {queryFailureCount > 0 && (
                <p className="mt-2 text-sm text-yellow-600">재시도 중: {queryFailureCount}번</p>
              )}
            </div>
          </div>
        )}

        {/* 에러 상태 */}
        {error && (
          <div className="rounded-lg bg-red-50 p-6">
            <div className="mb-4 text-6xl">❌</div>
            <h3 className="mb-2 text-lg font-bold text-red-900">오류가 발생했습니다</h3>
            <div className="mb-4 space-y-2">
              <p className="text-red-700">
                <strong>에러 메시지:</strong> {error.message}
              </p>
              <p className="text-red-600">
                <strong>실패 횟수:</strong> {queryFailureCount}번
              </p>
              {failureReason && (
                <p className="text-red-600">
                  <strong>실패 원인:</strong> {String(failureReason)}
                </p>
              )}
            </div>
            <button
              onClick={() => refetch()}
              className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              다시 시도
            </button>
          </div>
        )}

        {/* 성공 상태 */}
        {post && !error && (
          <div className="space-y-4">
            <div className="mb-4 flex items-center gap-2">
              <div className="text-4xl">✅</div>
              <h3 className="text-xl font-bold text-green-700">게시글 로드 성공!</h3>
            </div>

            <div className="rounded-lg bg-green-50 p-4">
              <h4 className="mb-2 text-lg font-bold text-gray-800">{post.title}</h4>
              <p className="text-gray-700">{post.body}</p>
              <div className="mt-3 flex gap-4 text-sm text-gray-500">
                <span>📝 ID: {post.id}</span>
                <span>👤 User ID: {post.userId}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 설명 */}
      <div className="rounded-lg bg-blue-50 p-6">
        <h3 className="mb-3 font-bold text-blue-900">💡 에러 처리 방법</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>
            <strong>retry:</strong> 실패 시 자동으로 재시도하는 횟수 (기본값: 3)
          </li>
          <li>
            <strong>retryDelay:</strong> 재시도 간격 설정 (지수 백오프 권장)
          </li>
          <li>
            <strong>error 객체:</strong> Axios 에러 정보를 포함한 에러 객체
          </li>
          <li>
            <strong>failureCount:</strong> 현재 쿼리의 실패 횟수
          </li>
          <li>
            <strong>failureReason:</strong> 마지막 실패 원인
          </li>
          <li>
            <strong>Axios 인터셉터:</strong> 전역 에러 처리 및 사용자 친화적 메시지 변환
          </li>
        </ul>
      </div>

      {/* 코드 예시 */}
      <div className="rounded-lg bg-gray-800 p-6 text-white">
        <h3 className="mb-3 font-bold">📝 코드 예시</h3>
        <pre className="overflow-x-auto text-sm">
          {`const { data, error, failureCount } = useQuery<Post, Error>({
  queryKey: ['post', id],
  queryFn: () => fetchPost(id),
  retry: 3, // 3번까지 재시도
  retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  // 지수 백오프: 1초, 2초, 4초, 8초...
});

// Axios 인터셉터에서 에러 처리
apiClient.interceptors.response.use(
  response => response,
  error => {
    // 사용자 친화적인 에러 메시지로 변환
    if (error.response?.status === 404) {
      error.message = '요청한 리소스를 찾을 수 없습니다.';
    }
    return Promise.reject(error);
  }
);`}
        </pre>
      </div>
    </div>
  );
}

function TanstackAxiosErrorExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="mx-auto max-w-4xl p-6">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-800">
            TanStack Query + Axios - 에러 처리
          </h1>
          <p className="text-gray-600">
            Axios 에러와 TanStack Query의 재시도 메커니즘을 활용한 강력한 에러 처리
          </p>
        </div>

        <ErrorHandlingDemo />
      </div>

      {/* React Query DevTools */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default TanstackAxiosErrorExample;
