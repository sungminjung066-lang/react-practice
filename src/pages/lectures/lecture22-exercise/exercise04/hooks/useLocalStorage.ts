import React from 'react';

// TODO: useLocalStorage Hook 구현
// Generic 타입 T를 사용하여 타입 안전성을 보장하세요
function useLocalStorage<T>(key: string, initialValue: T) {
  // TODO: localStorage에서 초기값 불러오기
  // useState의 lazy initialization을 사용하세요
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    try {
      // 여기에 코드를 작성하세요
      // 1. localStorage에서 key로 아이템 가져오기
      // 2. 아이템이 있으면 JSON.parse 후 반환
      // 3. 아이템이 없으면 initialValue 반환
      return initialValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return initialValue;
    }
  });
  
  // TODO: 값을 설정하는 함수
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // 여기에 코드를 작성하세요
      // 1. value가 함수인지 확인 (함수형 업데이트 지원)
      // 2. storedValue 상태 업데이트
      // 3. localStorage에 JSON.stringify 후 저장
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  };
  
  return [storedValue, setValue] as const;
}

export default useLocalStorage;

