# 실습 04: Custom Hooks 라이브러리 만들기

## 📝 학습 목표
- Custom Hook을 만들고 재사용하는 방법 익히기
- 여러 개의 Hook을 조합하여 복잡한 로직 캡슐화하기
- 재사용 가능한 로직을 분리하여 코드 중복 줄이기
- 실용적인 Custom Hook 패턴 학습하기

## 🎯 요구사항

다음의 4가지 Custom Hook을 만들고, 이를 활용한 데모 페이지를 구성하세요.

### 1. useLocalStorage
- localStorage에 데이터를 저장하고 불러오는 Hook
- 타입 안전성 보장 (TypeScript Generic 사용)
- JSON 직렬화/역직렬화 자동 처리

### 2. useToggle
- boolean 상태를 토글하는 Hook
- 명시적으로 true/false로 설정할 수도 있어야 함
- 모달, 드롭다운 등에 활용

### 3. useDebounce
- 입력값을 지연(debounce)시키는 Hook
- 검색 입력, API 호출 최적화에 활용
- 지연 시간을 커스터마이징 가능

### 4. useFetch (또는 useAsync)
- API 호출을 쉽게 만드는 Hook
- 로딩, 에러, 데이터 상태 관리
- 재시도(refetch) 기능 포함

## 🏗️ 파일 구조

```
assignment04/
├─ assignment.md (이 파일)
├─ hooks/
│  ├─ useLocalStorage.ts
│  ├─ useToggle.ts
│  ├─ useDebounce.ts
│  └─ useFetch.ts
└─ CustomHooksDemo.tsx (데모 페이지)
```

## 💡 각 Hook 구현 힌트

### 1. useLocalStorage

```typescript
function useLocalStorage<T>(key: string, initialValue: T) {
  // localStorage에서 초기값 불러오기
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  
  // 값 설정 함수
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };
  
  return [storedValue, setValue] as const;
}

// 사용 예시
const [name, setName] = useLocalStorage<string>('user-name', '');
```

### 2. useToggle

```typescript
function useToggle(initialValue: boolean = false) {
  const [value, setValue] = React.useState(initialValue);
  
  const toggle = () => setValue(prev => !prev);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);
  
  return {
    value,
    toggle,
    setTrue,
    setFalse,
  };
}

// 사용 예시
const modal = useToggle(false);
// modal.value, modal.toggle(), modal.setTrue(), modal.setFalse()
```

### 3. useDebounce

```typescript
function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);
  
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
}

// 사용 예시
const [searchTerm, setSearchTerm] = React.useState('');
const debouncedSearchTerm = useDebounce(searchTerm, 500);
```

### 4. useFetch

```typescript
interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };
  
  React.useEffect(() => {
    fetchData();
  }, [url]);
  
  return { data, loading, error, refetch: fetchData };
}

// 사용 예시
const { data, loading, error, refetch } = useFetch<User[]>('https://api.example.com/users');
```

## 📋 체크리스트

### useLocalStorage
- [ ] localStorage에 값을 저장할 수 있다
- [ ] localStorage에서 값을 불러올 수 있다
- [ ] JSON 직렬화/역직렬화가 자동으로 처리된다
- [ ] TypeScript Generic으로 타입 안전성이 보장된다
- [ ] 에러 처리가 포함되어 있다

### useToggle
- [ ] toggle() 함수로 상태를 반전시킬 수 있다
- [ ] setTrue(), setFalse()로 명시적 설정이 가능하다
- [ ] 초기값을 설정할 수 있다

### useDebounce
- [ ] 입력값이 지연되어 업데이트된다
- [ ] delay 시간을 커스터마이징할 수 있다
- [ ] 이전 타이머가 정리(cleanup)된다

### useFetch
- [ ] API 호출이 자동으로 실행된다
- [ ] loading, error, data 상태가 관리된다
- [ ] refetch 함수로 재호출이 가능하다
- [ ] TypeScript Generic으로 응답 타입을 지정할 수 있다

### 데모 페이지
- [ ] 4가지 Hook을 모두 사용하는 예시가 있다
- [ ] 각 Hook의 동작을 시각적으로 확인할 수 있다
- [ ] UI가 깔끔하게 구성되어 있다

## 🎨 데모 페이지 구성 예시

```typescript
function CustomHooksDemo() {
  return (
    <div className="p-8">
      <h1>Custom Hooks 데모</h1>
      
      {/* useLocalStorage 데모 */}
      <section>
        <h2>1. useLocalStorage</h2>
        <input /* name 입력 후 localStorage에 저장 */ />
      </section>
      
      {/* useToggle 데모 */}
      <section>
        <h2>2. useToggle</h2>
        <button /* 모달 열기/닫기 */ />
        {/* 모달 컴포넌트 */}
      </section>
      
      {/* useDebounce 데모 */}
      <section>
        <h2>3. useDebounce</h2>
        <input /* 검색어 입력 */ />
        <p>즉시 업데이트: {searchTerm}</p>
        <p>지연 업데이트 (500ms): {debouncedValue}</p>
      </section>
      
      {/* useFetch 데모 */}
      <section>
        <h2>4. useFetch</h2>
        {/* 사용자 목록 또는 다른 API 데이터 표시 */}
      </section>
    </div>
  );
}
```

## 📚 관련 학습 내용
- Lecture 22: Custom Hook
- Lecture 02: useState
- Lecture 09: useEffect
- Lecture 26: useEffect 심화

## 💪 추가 도전 과제

1. **useWindowSize**: 윈도우 크기를 추적하는 Hook
2. **useOnClickOutside**: 특정 요소 외부 클릭을 감지하는 Hook
3. **useInterval**: setInterval을 안전하게 사용하는 Hook
4. **usePrevious**: 이전 값을 저장하는 Hook
5. **useMedia**: 미디어 쿼리 매칭을 감지하는 Hook

## 🔍 디버깅 팁
- console.log로 Hook의 실행 흐름 확인
- React DevTools로 state 변화 관찰
- 개발자 도구의 Application 탭에서 localStorage 확인
- Network 탭에서 API 호출 확인

## 🎯 학습 포인트

Custom Hook을 만들 때는:
1. **이름은 `use`로 시작**해야 합니다
2. **다른 Hook을 내부에서 사용**할 수 있습니다
3. **재사용 가능한 로직**을 캡슐화합니다
4. **컴포넌트가 아니므로** JSX를 반환하지 않습니다
5. **상태와 부수 효과를 포함**할 수 있습니다

이 실습을 통해 실무에서 자주 사용되는 유용한 Custom Hook 패턴을 익힐 수 있습니다!

