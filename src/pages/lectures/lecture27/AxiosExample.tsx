import { useEffect, useState } from 'react';

import axios from 'axios';

// 데이터 타입 정의
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface CreatePostData {
  title: string;
  body: string;
  userId: number;
}

/**
 * Axios 기본 사용법 예제
 *
 * 핵심 개념:
 * 1. axios.get() - 데이터 조회
 * 2. axios.post() - 데이터 생성
 * 3. async/await - 비동기 처리
 * 4. Error Handling - try/catch 블록 사용
 * 5. Interceptors - 요청/응답 가로채기 (이 예제에서는 개념만 설명)
 */
function AxiosExample() {
  // 상태 관리
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 폼 입력 상태
  const [newPost, setNewPost] = useState({ title: '', body: '' });

  // 게시물 목록 가져오기 (GET)
  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      // axios.get은 응답 데이터를 data 프로퍼티에 담아서 반환합니다.
      const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts', {
        params: {
          _limit: 5, // 5개만 가져오기
        },
      });
      setPosts(response.data);
    } catch (err: unknown) {
      const error =
        err instanceof Error ? err : new Error('데이터를 불러오는 중 오류가 발생했습니다.');
      setError(error.message || '데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 데이터 로딩
  useEffect(() => {
    fetchPosts();
  }, []);

  // 게시물 생성하기 (POST)
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title || !newPost.body) return;

    try {
      setLoading(true);
      const postData: CreatePostData = {
        title: newPost.title,
        body: newPost.body,
        userId: 1, // 테스트용 ID
      };

      const response = await axios.post<Post>(
        'https://jsonplaceholder.typicode.com/posts',
        postData,
      );

      // 실제 API가 아니므로 ID가 항상 101로 반환될 수 있음
      const createdPost = { ...response.data, id: posts.length + 101 };

      // 목록 최상단에 추가
      setPosts([createdPost, ...posts]);
      setNewPost({ title: '', body: '' }); // 폼 초기화
      alert('게시물이 성공적으로 생성되었습니다!');
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error('게시물 생성 중 오류가 발생했습니다.');
      setError(error.message || '게시물 생성 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">Axios - HTTP 비동기 통신</h1>
        <p className="text-gray-600">
          Axios는 브라우저와 Node.js를 위한 Promise 기반 HTTP 클라이언트입니다.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* 왼쪽: 게시물 생성 폼 */}
        <section className="h-fit rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-bold text-gray-800">새 게시물 작성 (POST)</h2>
          <form onSubmit={handleCreatePost} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">제목</label>
              <input
                type="text"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                placeholder="제목을 입력하세요"
                disabled={loading}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">내용</label>
              <textarea
                value={newPost.body}
                onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
                className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                placeholder="내용을 입력하세요"
                rows={4}
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? '처리 중...' : '작성하기'}
            </button>
          </form>
        </section>

        {/* 오른쪽: 게시물 목록 */}
        <section className="rounded-lg bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">게시물 목록 (GET)</h2>
            <button
              onClick={fetchPosts}
              className="text-sm text-blue-600 hover:underline"
              disabled={loading}
            >
              새로고침
            </button>
          </div>

          {error && <div className="mb-4 rounded bg-red-50 p-3 text-sm text-red-600">{error}</div>}

          {loading && posts.length === 0 ? (
            <div className="py-8 text-center text-gray-500">로딩 중...</div>
          ) : (
            <ul className="space-y-4">
              {posts.map((post) => (
                <li key={post.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <h3 className="font-semibold text-gray-900">{post.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-gray-600">{post.body}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* 설명 섹션 */}
      <div className="mt-8 rounded-lg bg-blue-50 p-6">
        <h3 className="mb-3 font-bold text-blue-900">💡 Axios 핵심 정리</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>
            <strong>Promise 기반:</strong> 비동기 처리를 위해 Promise API를 사용하며, async/await
            문법과 함께 사용하기 좋습니다.
          </li>
          <li>
            <strong>자동 JSON 변환:</strong> 응답 데이터를 별도로 console.log(JSON.parse(data)) 할
            필요 없이 자동으로 JSON 객체로 변환해줍니다.
          </li>
          <li>
            <strong>Interceptor:</strong> 요청이나 응답을 보내기 전에 가로채서 헤더 설정(토큰
            등)이나 에러 처리를 공통으로 할 수 있습니다.
          </li>
          <li>
            <strong>간편한 설정:</strong> 타임아웃, 헤더, 쿠키 등의 설정을 간단하게 할 수 있습니다.
          </li>
        </ul>
      </div>

      {/* 코드 예시 */}
      <div className="mt-8 rounded-lg bg-gray-50 p-6">
        <h3 className="mb-3 font-bold text-gray-900">📝 코드 예시</h3>
        <pre className="overflow-x-auto rounded bg-gray-800 p-4 text-sm text-white">
          {`// GET 요청
const response = await axios.get('/user?ID=12345');
console.log(response.data);

// POST 요청
await axios.post('/user', {
  firstName: 'Fred',
  lastName: 'Flintstone'
});`}
        </pre>
      </div>
    </div>
  );
}

export default AxiosExample;
