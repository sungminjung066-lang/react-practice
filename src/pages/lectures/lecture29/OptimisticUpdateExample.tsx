import React from 'react';

import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { type PaginatedResponse, type Post, fetchPosts, likePost } from './api/mockApi';

// QueryClient 생성
const queryClient = new QueryClient();

/**
 * TanStack Query - Optimistic Updates (낙관적 업데이트)
 *
 * 낙관적 업데이트란?
 * - 서버 응답을 기다리지 않고 즉시 UI를 업데이트
 * - 성공할 것으로 "낙관적"으로 가정
 * - 실패 시 이전 상태로 롤백
 * - 빠른 사용자 경험 제공
 */
function PostListWithOptimistic() {
  const queryClient = useQueryClient();
  const [page] = React.useState(1);

  // 게시글 목록 조회
  const { data, isLoading } = useQuery({
    queryKey: ['posts', { page }],
    queryFn: () => fetchPosts(page, 10),
  });

  // 좋아요 Mutation (낙관적 업데이트)
  const likeMutation = useMutation({
    mutationFn: likePost,

    // 1. Mutation 실행 직전
    onMutate: async (postId: number) => {
      // 진행 중인 refetch 취소 (낙관적 업데이트 덮어쓰기 방지)
      await queryClient.cancelQueries({ queryKey: ['posts', { page }] });

      // 이전 데이터 스냅샷 저장 (롤백용)
      const previousData = queryClient.getQueryData(['posts', { page }]);

      // 낙관적으로 캐시 업데이트
      queryClient.setQueryData(['posts', { page }], (old: PaginatedResponse<Post>) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.map((post: Post) =>
            post.id === postId ? { ...post, likes: post.likes + 1 } : post,
          ),
        };
      });

      // 롤백 정보 반환 (context로 반환해서 onError에서 사용)
      return { previousData };
    },

    // 2. 에러 발생 시 (롤백)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err, postId, context: any) => {
      // 이전 데이터로 복원
      queryClient.setQueryData(['posts', { page }], context.previousData);
      alert('❌ 좋아요 실패: ' + err.message);
    },

    // 3. 성공 또는 실패 후
    onSettled: () => {
      // 서버 데이터와 동기화
      queryClient.invalidateQueries({ queryKey: ['posts', { page }] });
    },
  });

  const handleLike = (postId: number) => {
    likeMutation.mutate(postId);
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
      {/* 안내 메시지 */}
      <div className="rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 p-6">
        <h3 className="mb-2 text-lg font-bold text-purple-900">🚀 낙관적 업데이트 체험하기</h3>
        <p className="text-sm text-purple-700">
          ❤️ 버튼을 클릭하면 <strong>즉시</strong> 숫자가 증가합니다! (서버 응답 대기 X)
        </p>
      </div>

      {/* Mutation 상태 */}
      {likeMutation.isPending && (
        <div className="rounded-lg bg-yellow-100 p-4 text-center">
          <p className="text-sm font-medium text-yellow-800">
            🔄 서버에 요청 중... (UI는 이미 업데이트됨)
          </p>
        </div>
      )}

      {/* 게시글 목록 */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {data?.data.slice(0, 8).map((post) => (
          <div key={post.id} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-bold text-gray-800">{post.title}</h3>
            <p className="mb-4 line-clamp-2 text-sm text-gray-600">{post.content}</p>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                {new Date(post.createdAt).toLocaleDateString('ko-KR')}
              </span>

              <button
                onClick={() => handleLike(post.id)}
                disabled={likeMutation.isPending}
                className="group flex items-center gap-2 rounded-lg bg-pink-100 px-4 py-2 transition-all hover:bg-pink-200 disabled:opacity-50"
              >
                <span className="text-2xl group-hover:scale-110">❤️</span>
                <span className="font-bold text-pink-600">{post.likes}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 통계 */}
      <div className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
        <h3 className="mb-4 text-lg font-bold text-blue-900">📊 전체 통계</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-3xl font-bold text-blue-600">{data?.data.slice(0, 8).length}</p>
            <p className="text-sm text-blue-700">게시글</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-pink-600">
              {data?.data.slice(0, 8).reduce((sum, post) => sum + post.likes, 0)}
            </p>
            <p className="text-sm text-pink-700">총 좋아요</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-purple-600">
              {Math.round(
                (data?.data.slice(0, 8).reduce((sum, post) => sum + post.likes, 0) || 0) /
                  (data?.data.slice(0, 8).length || 1),
              )}
            </p>
            <p className="text-sm text-purple-700">평균 좋아요</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function OptimisticUpdateExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="mx-auto max-w-6xl p-6">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-800">
            TanStack Query - Optimistic Updates
          </h1>
          <p className="text-gray-600">낙관적 업데이트로 빠른 사용자 경험을 제공합니다.</p>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-md">
          <PostListWithOptimistic />
        </div>

        {/* 낙관적 업데이트 흐름 */}
        <div className="mt-8 rounded-lg bg-purple-50 p-6">
          <h3 className="mb-3 font-bold text-purple-900">🔄 낙관적 업데이트 흐름</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 font-bold text-white">
                1
              </span>
              <div className="flex-1 rounded-lg bg-white p-3">
                <strong>onMutate:</strong> 진행 중인 refetch 취소 → 이전 데이터 저장 → 캐시 즉시
                업데이트
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 font-bold text-white">
                2
              </span>
              <div className="flex-1 rounded-lg bg-white p-3">
                <strong>mutationFn:</strong> 서버에 실제 요청 (백그라운드)
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 font-bold text-white">
                ✓
              </span>
              <div className="flex-1 rounded-lg bg-white p-3">
                <strong>성공:</strong> onSettled → invalidateQueries → 서버 데이터와 동기화
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 font-bold text-white">
                ✕
              </span>
              <div className="flex-1 rounded-lg bg-white p-3">
                <strong>실패:</strong> onError → 이전 데이터로 롤백
              </div>
            </div>
          </div>
        </div>

        {/* 코드 예시 */}
        <div className="mt-8 rounded-lg bg-gray-800 p-6 text-white">
          <h3 className="mb-3 font-bold">📝 코드 예시</h3>
          <pre className="overflow-x-auto text-sm">
            {`const likeMutation = useMutation({
  mutationFn: likePost,
  
  onMutate: async (postId) => {
    // 1. 진행 중인 쿼리 취소
    await queryClient.cancelQueries({ queryKey: ['posts'] });
    
    // 2. 이전 데이터 저장 (롤백용)
    const previousData = queryClient.getQueryData(['posts']);
    
    // 3. 낙관적 업데이트 (즉시 UI 변경)
    queryClient.setQueryData(['posts'], (old) => {
      // ... 데이터 업데이트 로직
    });
    
    return { previousData };
  },
  
  onError: (err, postId, context) => {
    // 실패 시 롤백
    queryClient.setQueryData(['posts'], context.previousData);
  },
  
  onSettled: () => {
    // 성공/실패 후 서버와 동기화
    queryClient.invalidateQueries({ queryKey: ['posts'] });
  },
});`}
          </pre>
        </div>

        {/* 장단점 */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-green-50 p-6">
            <h3 className="mb-3 font-bold text-green-900">✅ 장점</h3>
            <ul className="space-y-2 text-sm text-green-800">
              <li>• 즉각적인 피드백 (빠른 UX)</li>
              <li>• 네트워크 지연 무시</li>
              <li>• 앱이 더 반응적으로 느껴짐</li>
              <li>• 사용자 만족도 향상</li>
            </ul>
          </div>

          <div className="rounded-lg bg-yellow-50 p-6">
            <h3 className="mb-3 font-bold text-yellow-900">⚠️ 주의사항</h3>
            <ul className="space-y-2 text-sm text-yellow-800">
              <li>• 에러 처리 필수 (롤백)</li>
              <li>• 복잡한 로직 필요</li>
              <li>• 실패 시 혼란 가능성</li>
              <li>• 중요한 작업은 신중히 적용</li>
            </ul>
          </div>
        </div>

        {/* 사용 시나리오 */}
        <div className="mt-8 rounded-lg bg-blue-50 p-6">
          <h3 className="mb-3 font-bold text-blue-900">🎯 적합한 사용 시나리오</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>✓ 좋아요/북마크 토글</li>
            <li>✓ Todo 완료/미완료 전환</li>
            <li>✓ 간단한 데이터 업데이트</li>
            <li>✓ 높은 성공 확률이 예상되는 작업</li>
            <li>✗ 결제, 중요한 트랜잭션 (권장 안 함)</li>
            <li>✗ 복잡한 검증이 필요한 작업</li>
          </ul>
        </div>
      </div>

      {/* React Query DevTools */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default OptimisticUpdateExample;
