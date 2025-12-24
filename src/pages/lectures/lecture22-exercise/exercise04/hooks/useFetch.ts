import React from 'react';

// TODO: useFetch Hook의 반환 타입 정의
interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// TODO: useFetch Hook 구현
// API 호출을 쉽게 만드는 Hook
function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  
  // TODO: 데이터를 가져오는 함수
  const fetchData = async () => {
    try {
      // 여기에 코드를 작성하세요
      // 1. loading을 true로 설정
      // 2. error를 null로 초기화
      // 3. fetch로 API 호출
      // 4. response.ok 체크
      // 5. JSON 파싱
      // 6. data 상태 업데이트
    } catch (err) {
      // 에러 처리
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      // loading을 false로 설정
      setLoading(false);
    }
  };
  
  // TODO: url이 변경될 때마다 데이터 가져오기
  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]); // url이 변경될 때마다 실행
  
  return { data, loading, error, refetch: fetchData };
}

export default useFetch;

