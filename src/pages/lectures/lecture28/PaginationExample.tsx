import React from 'react';

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import {
  type PaginatedResponse,
  type Post,
  type User,
  fetchPosts,
  fetchUsers,
} from './api/mockApi';

// QueryClient 생성
const queryClient = new QueryClient();

/**
 * TanStack Query - Pagination (페이지네이션)
 *
 * 핵심 개념:
 * 1. queryKey에 page 번호 포함
 * 2. keepPreviousData: 이전 데이터 유지 (페이지 전환 시 깜빡임 방지)
 * 3. placeholderData: 이전 데이터를 placeholder로 표시
 */
function PostList() {
  const [page, setPage] = React.useState(1);
  const pageSize = 10;

  // 게시글 목록 조회
  const { data, isLoading, isPlaceholderData } = useQuery<PaginatedResponse<Post>>({
    queryKey: ['posts', { page, pageSize }],
    queryFn: () => fetchPosts(page, pageSize),
    placeholderData: (previousData) => previousData, // 이전 데이터를 placeholder로 사용
  });

  // 작성자 정보 조회 (병렬 요청)
  const authorIds = React.useMemo(() => {
    return Array.from(new Set(data?.data.map((post) => post.authorId) || []));
  }, [data]);

  const { data: users } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: fetchUsers,
    enabled: authorIds.length > 0,
  });

  // 작성자 정보 찾기
  const getAuthor = (authorId: number) => {
    return users?.find((u) => u.id === authorId);
  };

  // 이전 페이지
  const handlePrevPage = () => {
    setPage((old) => Math.max(old - 1, 1));
  };

  // 다음 페이지
  const handleNextPage = () => {
    if (data && page < data.totalPages) {
      setPage((old) => old + 1);
    }
  };

  // 특정 페이지로 이동
  const goToPage = (pageNum: number) => {
    setPage(pageNum);
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-6xl">⏳</div>
          <p className="text-lg text-gray-600">게시글을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 페이지 번호 생성
  const pageNumbers = [];
  const totalPages = data?.totalPages || 1;
  // const maxPagesToShow = 5;

  // let startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
  // const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  // if (endPage - startPage + 1 < maxPagesToShow) {
  //   startPage = Math.max(1, endPage - maxPagesToShow + 1);
  // }

  const startPage = 1;
  const endPage = totalPages;

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">📰 게시글 목록</h2>
          <p className="text-sm text-gray-500">
            전체 {data?.total}개 • 페이지 {page}/{data?.totalPages}
          </p>
        </div>

        {isPlaceholderData && (
          <div className="rounded-lg bg-yellow-100 px-4 py-2 text-sm text-yellow-800">
            🔄 새 데이터 로딩 중...
          </div>
        )}
      </div>

      {/* 게시글 목록 */}
      <div className="space-y-3">
        {data?.data.map((post) => {
          const author = getAuthor(post.authorId);
          return (
            <div
              key={post.id}
              className={`rounded-lg border bg-white p-6 shadow-sm transition-all ${
                isPlaceholderData ? 'opacity-60' : 'opacity-100'
              }`}
            >
              <div className="mb-3 flex items-start justify-between">
                <h3 className="text-lg font-bold text-gray-800">{post.title}</h3>
                <div className="flex items-center gap-2 text-sm text-red-600">❤️ {post.likes}</div>
              </div>

              <p className="mb-4 text-gray-600">{post.content}</p>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{author?.avatar || '👤'}</span>
                  <div>
                    <p className="font-medium text-gray-700">{author?.name || '알 수 없음'}</p>
                    <p>{new Date(post.createdAt).toLocaleDateString('ko-KR')}</p>
                  </div>
                </div>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs">#{post.id}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 페이지네이션 */}
      <div className="flex items-center justify-center gap-2">
        {/* 이전 페이지 */}
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="rounded-lg bg-gray-200 px-4 py-2 font-medium text-gray-700 hover:bg-gray-300 disabled:opacity-50"
        >
          ← 이전
        </button>

        {/* 첫 페이지 */}
        {/* {startPage > 1 && (
          <>
            <button
              onClick={() => goToPage(1)}
              className="rounded-lg bg-gray-200 px-4 py-2 font-medium text-gray-700 hover:bg-gray-300"
            >
              1
            </button>
            {startPage > 2 && <span className="px-2 text-gray-500">...</span>}
          </>
        )} */}

        {/* 페이지 번호 */}
        {pageNumbers.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => goToPage(pageNum)}
            className={`rounded-lg px-4 py-2 font-medium ${
              page === pageNum
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {pageNum}
          </button>
        ))}

        {/* 마지막 페이지 */}
        {/* {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="px-2 text-gray-500">...</span>}
            <button
              onClick={() => goToPage(totalPages)}
              className="rounded-lg bg-gray-200 px-4 py-2 font-medium text-gray-700 hover:bg-gray-300"
            >
              {totalPages}
            </button>
          </>
        )} */}

        {/* 다음 페이지 */}
        <button
          onClick={handleNextPage}
          disabled={page === data?.totalPages}
          className="rounded-lg bg-gray-200 px-4 py-2 font-medium text-gray-700 hover:bg-gray-300 disabled:opacity-50"
        >
          다음 →
        </button>
      </div>

      {/* 페이지 정보 */}
      <div className="rounded-lg bg-blue-50 p-4 text-center">
        <p className="text-sm text-blue-800">
          <strong>{(page - 1) * pageSize + 1}</strong> -{' '}
          <strong>{Math.min(page * pageSize, data?.total || 0)}</strong> / {data?.total}개
        </p>
      </div>
    </div>
  );
}

function PaginationExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="mx-auto max-w-4xl p-6">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-800">TanStack Query - Pagination</h1>
          <p className="text-gray-600">
            페이지네이션을 구현하고 이전 데이터를 유지하여 부드러운 UX를 제공합니다.
          </p>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-md">
          <PostList />
        </div>

        {/* 설명 */}
        <div className="mt-8 rounded-lg bg-purple-50 p-6">
          <h3 className="mb-3 font-bold text-purple-900">💡 Pagination 핵심 포인트</h3>
          <ul className="space-y-2 text-sm text-purple-800">
            <li>
              <strong>queryKey에 page 포함:</strong> <code>['posts', {'{page, pageSize}'}]</code>
            </li>
            <li>
              <strong>placeholderData:</strong> 이전 데이터를 placeholder로 사용 (깜빡임 방지)
            </li>
            <li>
              <strong>isPlaceholderData:</strong> placeholder 데이터인지 확인
            </li>
            <li>
              <strong>자동 캐싱:</strong> 방문했던 페이지는 캐시에서 즉시 로드
            </li>
            <li>
              <strong>Prefetching:</strong> 다음 페이지를 미리 로드하여 UX 향상 가능
            </li>
          </ul>
        </div>

        {/* 코드 예시 */}
        <div className="mt-8 rounded-lg bg-gray-800 p-6 text-white">
          <h3 className="mb-3 font-bold">📝 코드 예시</h3>
          <pre className="overflow-x-auto text-sm">
            {`const [page, setPage] = React.useState(1);

const { data, isPlaceholderData } = useQuery({
  queryKey: ['posts', { page, pageSize }],
  queryFn: () => fetchPosts(page, pageSize),
  placeholderData: (previousData) => previousData,
});

// 페이지 이동
setPage((old) => old + 1);  // 다음 페이지
setPage((old) => old - 1);  // 이전 페이지`}
          </pre>
        </div>

        {/* Prefetching 설명 */}
        <div className="mt-8 rounded-lg bg-green-50 p-6">
          <h3 className="mb-3 font-bold text-green-900">🚀 Prefetching으로 더 빠르게</h3>
          <p className="mb-3 text-sm text-green-800">
            다음 페이지를 미리 로드하여 사용자가 버튼을 클릭했을 때 즉시 표시할 수 있습니다.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-green-900 p-4 text-xs text-green-50">
            {`React.useEffect(() => {
  // 다음 페이지 prefetch
  if (page < data?.totalPages) {
    queryClient.prefetchQuery({
      queryKey: ['posts', { page: page + 1, pageSize }],
      queryFn: () => fetchPosts(page + 1, pageSize),
    });
  }
}, [page, data, queryClient]);`}
          </pre>
        </div>
      </div>

      {/* React Query DevTools */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default PaginationExample;
