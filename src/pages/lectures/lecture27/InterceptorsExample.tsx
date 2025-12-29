import { useEffect, useState } from 'react';

import axios from 'axios';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

/**
 * Axios Interceptors 예제
 *
 * Interceptors란?
 * - 요청이나 응답이 처리되기 전에 가로채서 특정 로직을 실행할 수 있는 기능
 * - 인증 토큰 자동 추가, 공통 에러 처리, 로딩 상태 관리 등에 활용
 */
function InterceptorsExample() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [isInterceptorActive, setIsInterceptorActive] = useState(true);

  // 로그 추가 함수
  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${timestamp}] ${message}`, ...prev].slice(0, 10));
  };

  useEffect(() => {
    // Request Interceptor: 요청 전에 실행
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        if (isInterceptorActive) {
          addLog(`✅ Request Interceptor: ${config.method?.toUpperCase()} ${config.url}`);
          // 실제 사용 예: 인증 토큰 추가
          // config.headers.Authorization = `Bearer ${token}`;
          
          // 실제 사용 예: API 키 추가
          // config.headers['X-API-Key'] = process.env.REACT_APP_API_KEY;
          
          // 실제 사용 예: 로딩 상태 시작
          // store.dispatch(setLoading(true));
          
          // 실제 사용 예: 타임스탬프 추가
          // config.headers['X-Request-Time'] = new Date().toISOString();
          
          // 실제 사용 예: 언어 설정 추가
          // config.headers['Accept-Language'] = i18n.language;
          
          // 실제 사용 예: CSRF 토큰 추가
          // config.headers['X-CSRF-Token'] = getCsrfToken();
          
          config.headers['X-Custom-Header'] = 'InterceptorExample';
        }
        return config;
      },
      (error) => {
        addLog('❌ Request Error: ' + error.message);
        return Promise.reject(error);
      },
    );

    // Response Interceptor: 응답 후에 실행
    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
        if (isInterceptorActive) {
          addLog(`✅ Response Interceptor: Status ${response.status} from ${response.config.url}`);
        }
        
        // 실제 사용 예: 로딩 상태 종료
        // store.dispatch(setLoading(false));
        
        // 실제 사용 예: 응답 데이터 변환 (snake_case -> camelCase)
        // response.data = transformKeysToCamelCase(response.data);
        
        // 실제 사용 예: 응답 캐싱
        // cache.set(response.config.url, response.data, expiresIn);
        
        // 실제 사용 예: 성공 로그 기록
        // logger.info('API Success', { url: response.config.url, status: response.status });
        
        // 실제 사용 예: 분석/모니터링 데이터 전송
        // analytics.track('api_request_success', { endpoint: response.config.url });
        
        // 실제 사용 예: 토스트 메시지 (특정 API만)
        // if (response.config.url?.includes('/save')) {
        //   toast.success('저장되었습니다');
        // }
        
        return response;
      },
      (error) => {
        addLog(`❌ Response Error: ${error.response?.status || 'Network Error'}`);
        // 실제 사용 예: 401 에러 시 로그인 페이지로 리다이렉트
        // if (error.response?.status === 401) {
        //   window.location.href = '/login';
        // }
        
        // 실제 사용 예: 403 에러 시 권한 없음 페이지로 이동
        // if (error.response?.status === 403) {
        //   navigate('/access-denied');
        // }
        
        // 실제 사용 예: 토스트 메시지로 에러 표시
        // toast.error(error.response?.data?.message || '요청 실패');
        
        // 실제 사용 예: 에러 로깅 서비스로 전송 (Sentry 등)
        // logger.error('API Error', { url: error.config?.url, status: error.response?.status });
        
        // 실제 사용 예: 토큰 만료 시 자동 갱신 후 재시도
        // if (error.response?.status === 401 && !error.config._retry) {
        //   error.config._retry = true;
        //   const newToken = await refreshToken();
        //   error.config.headers.Authorization = `Bearer ${newToken}`;
        //   return axios(error.config);
        // }
        
        // 실제 사용 예: 로딩 상태 종료
        // store.dispatch(setLoading(false));
        return Promise.reject(error);
      },
    );

    // 컴포넌트 언마운트 시 인터셉터 제거
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [isInterceptorActive]);

  // 데이터 가져오기
  const fetchTodos = async () => {
    try {
      addLog('🚀 Fetching todos...');
      const response = await axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos', {
        params: { _limit: 5 },
      });
      setTodos(response.data);
      addLog('✅ Todos fetched successfully');
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Failed to fetch todos');
      addLog('❌ Failed to fetch: ' + err.message);
    }
  };

  // 존재하지 않는 엔드포인트 호출 (에러 테스트)
  const triggerError = async () => {
    try {
      addLog('🚀 Triggering error (invalid endpoint)...');
      await axios.get('https://jsonplaceholder.typicode.com/invalid-endpoint');
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Request failed');
      addLog('❌ Expected error occurred: ' + err.message);
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">
          Axios Interceptors - 요청/응답 가로채기
        </h1>
        <p className="text-gray-600">
          Interceptors를 사용하여 모든 요청과 응답에 공통 로직을 적용할 수 있습니다.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* 왼쪽: 컨트롤 패널 */}
        <section className="h-fit rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-bold text-gray-800">테스트 컨트롤</h2>

          <div className="mb-6 rounded-lg bg-yellow-50 p-4">
            <label className="flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={isInterceptorActive}
                onChange={(e) => {
                  setIsInterceptorActive(e.target.checked);
                  addLog(e.target.checked ? '🟢 Interceptor 활성화' : '🔴 Interceptor 비활성화');
                }}
                className="mr-3 h-5 w-5"
              />
              <span className="font-medium text-gray-700">Interceptor 활성화</span>
            </label>
          </div>

          <div className="space-y-3">
            <button
              onClick={fetchTodos}
              className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700"
            >
              ✅ 정상 요청 (GET /todos)
            </button>
            <button
              onClick={triggerError}
              className="w-full rounded bg-red-600 py-2 text-white hover:bg-red-700"
            >
              ❌ 에러 요청 (404)
            </button>
            <button
              onClick={() => setLogs([])}
              className="w-full rounded bg-gray-200 py-2 text-gray-700 hover:bg-gray-300"
            >
              로그 초기화
            </button>
          </div>

          {/* Todo 목록 */}
          {todos.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-2 font-semibold text-gray-800">받아온 데이터:</h3>
              <ul className="space-y-2 text-sm">
                {todos.map((todo) => (
                  <li key={todo.id} className="rounded bg-gray-50 p-2">
                    {todo.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* 오른쪽: 로그 */}
        <section className="rounded-lg bg-gray-900 p-6 shadow-md">
          <h2 className="mb-4 text-xl font-bold text-white">실행 로그</h2>
          <div className="space-y-2 font-mono text-sm">
            {logs.length === 0 ? (
              <p className="text-gray-500">버튼을 클릭하여 요청을 테스트하세요.</p>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="text-green-400">
                  {log}
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {/* 설명 섹션 */}
      <div className="mt-8 rounded-lg bg-blue-50 p-6">
        <h3 className="mb-3 font-bold text-blue-900">💡 Interceptors 핵심 정리</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>
            <strong>Request Interceptor:</strong> 요청이 서버로 전송되기 전에 실행됩니다. 인증 토큰
            추가, 헤더 설정 등에 사용됩니다.
          </li>
          <li>
            <strong>Response Interceptor:</strong> 응답을 받은 후 실행됩니다. 공통 에러 처리, 데이터
            변환 등에 사용됩니다.
          </li>
          <li>
            <strong>eject():</strong> 인터셉터를 제거할 수 있습니다. 컴포넌트 언마운트 시 호출하여
            메모리 누수를 방지합니다.
          </li>
          <li>
            <strong>실제 활용 예:</strong> JWT 토큰 자동 추가, 401 에러 시 자동 로그아웃, 로딩 상태
            관리, API 응답 공통 처리 등
          </li>
        </ul>
      </div>

      {/* 코드 예시 */}
      <div className="mt-8 rounded-lg bg-gray-50 p-6">
        <h3 className="mb-3 font-bold text-gray-900">📝 코드 예시</h3>
        <pre className="overflow-x-auto rounded bg-gray-800 p-4 text-sm text-white">
          {`// Request Interceptor 추가
axios.interceptors.request.use(
  (config) => {
    // 요청 전에 실행
    config.headers.Authorization = \`Bearer \${token}\`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor 추가
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 에러 시 로그아웃
    if (error.response?.status === 401) {
      logout();
    }
    return Promise.reject(error);
  }
);`}
        </pre>
      </div>
    </div>
  );
}

export default InterceptorsExample;
