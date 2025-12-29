import { useState } from 'react';

import axios, { type AxiosInstance } from 'axios';

interface Post {
  id: number;
  title: string;
  body: string;
}

/**
 * Axios 인스턴스와 설정(Config) 예제
 *
 * 핵심 개념:
 * 1. axios.create()로 커스텀 인스턴스 생성
 * 2. baseURL, timeout, headers 등 기본 설정
 * 3. 여러 API 서버를 위한 다중 인스턴스 관리
 * 4. 인스턴스별 독립적인 설정
 */

// API 인스턴스 생성
const jsonPlaceholderAPI: AxiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000, // 10초
  headers: {
    'Content-Type': 'application/json',
    'X-Custom-Header': 'CustomValue',
  },
});

// 다른 API 서버용 인스턴스 (예시)
// const exampleAPI: AxiosInstance = axios.create({
//   baseURL: 'https://api.example.com',
//   timeout: 5000,
//   headers: {
//     'Authorization': 'Bearer token-here',
//   },
// });

function ConfigExample() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [configInfo, setConfigInfo] = useState<string>('');

  // 인스턴스를 사용한 GET 요청
  const fetchWithInstance = async () => {
    try {
      setLoading(true);
      // baseURL이 설정되어 있으므로 상대 경로만 작성
      const response = await jsonPlaceholderAPI.get<Post[]>('/posts', {
        params: { _limit: 5 },
      });
      setPosts(response.data);
      setConfigInfo('✅ 커스텀 인스턴스로 요청 성공');
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Failed to fetch');
      setConfigInfo('❌ 에러: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // 기본 axios를 사용한 요청 (비교용)
  const fetchWithDefault = async () => {
    try {
      setLoading(true);
      // 전체 URL을 작성해야 함
      const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts', {
        params: { _limit: 5 },
      });
      setPosts(response.data);
      setConfigInfo('✅ 기본 axios로 요청 성공');
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Failed to fetch');
      setConfigInfo('❌ 에러: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // POST 요청 (인스턴스 사용)
  const createPost = async () => {
    try {
      setLoading(true);
      const newPost = {
        title: '새로운 게시물',
        body: '인스턴스를 사용한 POST 요청입니다.',
        userId: 1,
      };

      const response = await jsonPlaceholderAPI.post<Post>('/posts', newPost);
      setPosts([response.data, ...posts]);
      setConfigInfo(`✅ 게시물 생성 성공 (ID: ${response.data.id})`);
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Failed to create');
      setConfigInfo('❌ 에러: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // 인스턴스 설정 확인
  const showInstanceConfig = () => {
    const config = {
      baseURL: jsonPlaceholderAPI.defaults.baseURL,
      timeout: jsonPlaceholderAPI.defaults.timeout,
      headers: jsonPlaceholderAPI.defaults.headers,
    };
    setConfigInfo(`📋 인스턴스 설정:\n${JSON.stringify(config, null, 2)}`);
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">Axios 인스턴스와 설정 - Config</h1>
        <p className="text-gray-600">
          axios.create()로 커스텀 인스턴스를 만들어 재사용 가능한 설정을 관리합니다.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* 왼쪽: 컨트롤 */}
        <section className="h-fit rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-bold text-gray-800">테스트 컨트롤</h2>
          <div className="space-y-3">
            <button
              onClick={fetchWithInstance}
              disabled={loading}
              className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              커스텀 인스턴스로 GET
            </button>
            <button
              onClick={fetchWithDefault}
              disabled={loading}
              className="w-full rounded bg-green-600 py-2 text-white hover:bg-green-700 disabled:opacity-50"
            >
              기본 axios로 GET
            </button>
            <button
              onClick={createPost}
              disabled={loading}
              className="w-full rounded bg-purple-600 py-2 text-white hover:bg-purple-700 disabled:opacity-50"
            >
              커스텀 인스턴스로 POST
            </button>
            <button
              onClick={showInstanceConfig}
              className="w-full rounded bg-gray-200 py-2 text-gray-700 hover:bg-gray-300"
            >
              인스턴스 설정 확인
            </button>
          </div>

          {/* 게시물 목록 */}
          {posts.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-2 font-semibold text-gray-800">게시물 목록:</h3>
              <ul className="space-y-2 text-sm">
                {posts.slice(0, 3).map((post) => (
                  <li key={post.id} className="rounded bg-gray-50 p-2">
                    <strong>{post.title}</strong>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* 오른쪽: 결과 */}
        <section className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-bold text-gray-800">결과 및 설정</h2>

          {loading && (
            <div className="mb-4 rounded-lg bg-blue-50 p-4 text-center text-blue-700">
              로딩 중...
            </div>
          )}

          {configInfo && (
            <div
              className={`rounded-lg p-4 ${
                configInfo.includes('✅')
                  ? 'bg-green-50 text-green-700'
                  : configInfo.includes('📋')
                    ? 'bg-gray-50 text-gray-700'
                    : 'bg-red-50 text-red-700'
              }`}
            >
              <pre className="text-sm whitespace-pre-wrap">{configInfo}</pre>
            </div>
          )}
        </section>
      </div>

      {/* 설명 섹션 */}
      <div className="mt-8 rounded-lg bg-blue-50 p-6">
        <h3 className="mb-3 font-bold text-blue-900">💡 인스턴스 설정 핵심 정리</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>
            <strong>axios.create():</strong> 독립적인 설정을 가진 새로운 axios 인스턴스를
            생성합니다.
          </li>
          <li>
            <strong>baseURL:</strong> 모든 요청의 기본 URL을 설정하여 중복을 제거합니다.
          </li>
          <li>
            <strong>timeout:</strong> 요청의 최대 대기 시간을 밀리초 단위로 설정합니다.
          </li>
          <li>
            <strong>headers:</strong> 모든 요청에 포함될 기본 헤더를 설정합니다. 인증 토큰 등에
            유용합니다.
          </li>
          <li>
            <strong>다중 인스턴스:</strong> 서로 다른 API 서버를 위해 여러 인스턴스를 만들 수
            있습니다.
          </li>
        </ul>
      </div>

      {/* 실제 사용 예시 */}
      <div className="mt-8 rounded-lg bg-purple-50 p-6">
        <h3 className="mb-3 font-bold text-purple-900">🏗️ 실제 프로젝트 구조 예시</h3>
        <pre className="overflow-x-auto rounded bg-gray-800 p-4 text-sm text-white">
          {`// src/api/client.ts
export const mainAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터로 토큰 자동 추가
mainAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  return config;
});

// src/api/user.ts
export const getUser = (id: number) => 
  mainAPI.get(\`/users/\${id}\`);

export const updateUser = (id: number, data: User) =>
  mainAPI.put(\`/users/\${id}\`, data);`}
        </pre>
      </div>

      {/* 코드 예시 */}
      <div className="mt-8 rounded-lg bg-gray-50 p-6">
        <h3 className="mb-3 font-bold text-gray-900">📝 기본 코드 예시</h3>
        <pre className="overflow-x-auto rounded bg-gray-800 p-4 text-sm text-white">
          {`// 인스턴스 생성
const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  headers: {
    'Authorization': 'Bearer token',
    'Content-Type': 'application/json'
  }
});

// 사용
const response = await api.get('/users');
await api.post('/users', { name: 'John' });`}
        </pre>
      </div>
    </div>
  );
}

export default ConfigExample;
