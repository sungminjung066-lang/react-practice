import { useState } from 'react';

import axios, { AxiosError } from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
}

interface ApiError {
  message: string;
  statusCode: number;
  details?: string;
}

/**
 * Axios 에러 핸들링 예제
 *
 * 핵심 개념:
 * 1. AxiosError 타입을 사용한 타입 안전한 에러 처리
 * 2. HTTP 상태 코드에 따른 에러 처리
 * 3. 네트워크 에러 vs 서버 에러 구분
 * 4. 에러 재시도 로직
 * 5. 타임아웃 설정
 */
function ErrorHandlingExample() {
  const [result, setResult] = useState<string>('');
  const [errorInfo, setErrorInfo] = useState<ApiError | null>(null);
  const [loading, setLoading] = useState(false);

  // 에러 타입 판별 함수
  const handleAxiosError = (error: unknown): ApiError => {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      // 1. 응답이 있는 경우 (서버가 응답했지만 에러 상태 코드)
      // 요청이 전송되었고, 서버는 2xx 외의 상태 코드로 응답
      if (axiosError.response) {
        return {
          message: `서버 에러: ${axiosError.response.status}`,
          statusCode: axiosError.response.status,
          details: JSON.stringify(axiosError.response.data),
        };
      }

      // 2. 요청은 보냈지만 응답이 없는 경우 (네트워크 에러)
      // 요청이 전송되었고, 서버는 응답하지 않았습니다.
      if (axiosError.request) {
        return {
          message: '네트워크 에러: 서버에 연결할 수 없습니다',
          statusCode: 0,
          details: '인터넷 연결을 확인하세요',
        };
      }

      // 3. 요청 설정 중 에러
      // 요청이 전송되지 않았습니다.
      return {
        message: '요청 설정 에러',
        statusCode: -1,
        details: axiosError.message,
      };
    }

    // Axios 에러가 아닌 경우
    return {
      message: '알 수 없는 에러',
      statusCode: -1,
      details: error instanceof Error ? error.message : String(error),
    };
  };

  // 1. 정상 요청
  const fetchSuccess = async () => {
    try {
      setLoading(true);
      setErrorInfo(null);
      const response = await axios.get<User>('https://jsonplaceholder.typicode.com/users/1');
      setResult(`✅ 성공: ${response.data.name} (${response.data.email})`);
    } catch (error) {
      const errorData = handleAxiosError(error);
      setErrorInfo(errorData);
      setResult('');
    } finally {
      setLoading(false);
    }
  };

  // 2. 404 에러 (존재하지 않는 리소스)
  const fetch404 = async () => {
    try {
      setLoading(true);
      setErrorInfo(null);
      await axios.get('https://jsonplaceholder.typicode.com/users/99999');
    } catch (error) {
      const errorData = handleAxiosError(error);
      setErrorInfo(errorData);
      setResult('');
    } finally {
      setLoading(false);
    }
  };

  // 3. 네트워크 에러 (잘못된 도메인)
  const fetchNetworkError = async () => {
    try {
      setLoading(true);
      setErrorInfo(null);
      await axios.get('https://invalid-domain-that-does-not-exist-12345.com/data', {
        timeout: 3000,
      });
    } catch (error) {
      const errorData = handleAxiosError(error);
      setErrorInfo(errorData);
      setResult('');
    } finally {
      setLoading(false);
    }
  };

  // 4. 타임아웃 에러
  const fetchTimeout = async () => {
    try {
      setLoading(true);
      setErrorInfo(null);
      // 매우 짧은 타임아웃으로 타임아웃 에러 유발
      await axios.get('https://jsonplaceholder.typicode.com/users', {
        timeout: 1, // 1ms (거의 불가능)
      });
    } catch (error) {
      const errorData = handleAxiosError(error);
      setErrorInfo(errorData);
      setResult('');
    } finally {
      setLoading(false);
    }
  };

  // 5. 재시도 로직이 있는 요청
  const fetchWithRetry = async (retries = 3) => {
    setLoading(true);
    setErrorInfo(null);

    for (let i = 0; i < retries; i++) {
      try {
        const response = await axios.get<User>('https://jsonplaceholder.typicode.com/users/1');
        console.log('response', response);
        setResult(`✅ 성공: ${i + 1}번째 시도에서 성공`);
        setLoading(false);
        return;
      } catch (error) {
        if (i === retries - 1) {
          // 마지막 시도에서도 실패
          const errorData = handleAxiosError(error);
          setErrorInfo(errorData);
          setResult(`❌ ${retries}번 시도 후 실패`);
        } else {
          setResult(`⏳ ${i + 1}번째 시도 실패, 재시도 중...`);
          // 1초 대기 후 재시도
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    }
    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">Axios 에러 핸들링 - 완벽 가이드</h1>
        <p className="text-gray-600">
          다양한 에러 상황을 처리하고 타입 안전하게 에러를 핸들링하는 방법을 배웁니다.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* 왼쪽: 테스트 버튼 */}
        <section className="h-fit rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-bold text-gray-800">에러 테스트</h2>
          <div className="space-y-3">
            <button
              onClick={fetchSuccess}
              disabled={loading}
              className="w-full rounded bg-green-600 py-2 text-white hover:bg-green-700 disabled:opacity-50"
            >
              ✅ 정상 요청
            </button>
            <button
              onClick={fetch404}
              disabled={loading}
              className="w-full rounded bg-orange-600 py-2 text-white hover:bg-orange-700 disabled:opacity-50"
            >
              404 에러
            </button>
            <button
              onClick={fetchNetworkError}
              disabled={loading}
              className="w-full rounded bg-red-600 py-2 text-white hover:bg-red-700 disabled:opacity-50"
            >
              네트워크 에러
            </button>
            <button
              onClick={fetchTimeout}
              disabled={loading}
              className="w-full rounded bg-purple-600 py-2 text-white hover:bg-purple-700 disabled:opacity-50"
            >
              타임아웃 에러
            </button>
            <button
              onClick={() => fetchWithRetry(3)}
              disabled={loading}
              className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              재시도 로직 (3회)
            </button>
          </div>
        </section>

        {/* 오른쪽: 결과 표시 */}
        <section className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-bold text-gray-800">결과</h2>

          {loading && (
            <div className="mb-4 rounded-lg bg-blue-50 p-4 text-center text-blue-700">
              로딩 중...
            </div>
          )}

          {result && (
            <div
              className={`mb-4 rounded-lg p-4 ${
                result.includes('✅')
                  ? 'bg-green-50 text-green-700'
                  : result.includes('⏳')
                    ? 'bg-yellow-50 text-yellow-700'
                    : 'bg-red-50 text-red-700'
              }`}
            >
              {result}
            </div>
          )}

          {errorInfo && (
            <div className="rounded-lg border-2 border-red-300 bg-red-50 p-4">
              <h3 className="mb-2 font-bold text-red-900">에러 정보:</h3>
              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="font-semibold text-red-800">메시지:</dt>
                  <dd className="text-red-700">{errorInfo.message}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-red-800">상태 코드:</dt>
                  <dd className="text-red-700">{errorInfo.statusCode}</dd>
                </div>
                {errorInfo.details && (
                  <div>
                    <dt className="font-semibold text-red-800">상세:</dt>
                    <dd className="text-red-700">{errorInfo.details}</dd>
                  </div>
                )}
              </dl>
            </div>
          )}
        </section>
      </div>

      {/* 설명 섹션 */}
      <div className="mt-8 rounded-lg bg-blue-50 p-6">
        <h3 className="mb-3 font-bold text-blue-900">💡 에러 핸들링 핵심 정리</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>
            <strong>axios.isAxiosError():</strong> 에러가 Axios 에러인지 확인합니다.
          </li>
          <li>
            <strong>error.response:</strong> 서버가 응답했지만 2xx 범위가 아닌 상태 코드인
            경우입니다.
          </li>
          <li>
            <strong>error.request:</strong> 요청은 보냈지만 응답이 없는 경우입니다(네트워크 에러).
          </li>
          <li>
            <strong>타임아웃:</strong> timeout 옵션으로 요청 제한 시간을 설정할 수 있습니다.
          </li>
          <li>
            <strong>재시도 로직:</strong> 실패한 요청을 자동으로 재시도하여 안정성을 높일 수
            있습니다.
          </li>
        </ul>
      </div>

      {/* 코드 예시 */}
      <div className="mt-8 rounded-lg bg-gray-50 p-6">
        <h3 className="mb-3 font-bold text-gray-900">📝 코드 예시</h3>
        <pre className="overflow-x-auto rounded bg-gray-800 p-4 text-sm text-white">
          {`try {
  const response = await axios.get('/api/data', {
    timeout: 5000 // 5초 타임아웃
  });
} catch (error) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // 서버 응답 에러
      console.log(error.response.status);
    } else if (error.request) {
      // 네트워크 에러
      console.log('네트워크 에러');
    }
  }
}`}
        </pre>
      </div>
    </div>
  );
}

export default ErrorHandlingExample;
