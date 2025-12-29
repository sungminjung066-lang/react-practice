# Lecture 28: TanStack Query (React Query)

## 📚 학습 목표

TanStack Query는 React 애플리케이션에서 서버 상태를 관리하기 위한 강력한 라이브러리입니다.

### TanStack Query의 장점

1. **자동 캐싱**: 데이터를 자동으로 캐싱하여 성능 향상
2. **백그라운드 업데이트**: 백그라운드에서 자동으로 데이터 갱신
3. **중복 제거**: 동일한 요청을 자동으로 중복 제거
4. **Optimistic Updates**: 낙관적 업데이트로 UX 향상
5. **Pagination & Infinite Scroll**: 페이지네이션과 무한 스크롤 내장 지원
6. **DevTools**: 강력한 개발자 도구

## 📖 주요 개념

### 1. Client State vs Server State

#### Client State (클라이언트 상태)
- 앱 내부에서만 관리되는 상태
- 예: 모달 열림/닫힘, 폼 입력값, 테마 설정
- 관리: useState, useReducer, Context API

#### Server State (서버 상태)
- 서버에서 가져오는 데이터
- 예: 사용자 목록, 게시글, 댓글
- 특징: 비동기, 공유, 캐싱 필요
- 관리: **TanStack Query** ✨

### 2. useQuery Hook

데이터를 가져올 때 사용합니다.

```typescript
const { data, isLoading, error, refetch } = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
});
```

**주요 속성:**
- `queryKey`: 쿼리를 식별하는 고유 키 (배열 형태)
- `queryFn`: 데이터를 가져오는 함수 (Promise 반환)
- `data`: 가져온 데이터
- `isLoading`: 로딩 상태
- `error`: 에러 정보
- `refetch`: 수동으로 데이터 다시 가져오기

### 3. useMutation Hook

데이터를 생성/수정/삭제할 때 사용합니다.

```typescript
const mutation = useMutation({
  mutationFn: createTodo,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  },
});

mutation.mutate({ title: 'New Todo' });
```

**주요 속성:**
- `mutationFn`: 실행할 함수
- `mutate`: mutation 실행
- `onSuccess`: 성공 시 콜백
- `onError`: 실패 시 콜백

### 4. Query Keys

쿼리를 식별하고 캐싱하는데 사용됩니다.

```typescript
// 단순 키
['todos']

// 파라미터가 있는 키
['todos', { status: 'active' }]
['todo', 1]

// 계층 구조
['todos', 'list', { page: 1 }]
```

### 5. Query Invalidation

캐시를 무효화하여 데이터를 다시 가져옵니다.

```typescript
// 특정 쿼리 무효화
queryClient.invalidateQueries({ queryKey: ['todos'] });

// 모든 todos 관련 쿼리 무효화
queryClient.invalidateQueries({ queryKey: ['todos'] });
```

## 🔧 설정 방법

### 1. QueryClient 생성 및 Provider 설정

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1분
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourApp />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

### 2. 주요 옵션

- `staleTime`: 데이터가 신선한(fresh) 상태로 유지되는 시간
- `cacheTime`: 캐시에 데이터가 유지되는 시간 (기본 5분)
- `refetchOnWindowFocus`: 윈도우 포커스 시 자동 refetch
- `refetchOnReconnect`: 네트워크 재연결 시 자동 refetch
- `retry`: 실패 시 재시도 횟수

## 📂 예제 파일 구성

1. **BasicQueryExample.tsx** - 기본 useQuery 사용법
2. **MutationExample.tsx** - CRUD 작업 (Create, Update, Delete)
3. **PaginationExample.tsx** - 페이지네이션
4. **QueryKeysExample.tsx** - Query Keys와 캐싱 관리
5. **OptimisticUpdateExample.tsx** - 낙관적 업데이트

## 💡 useState vs TanStack Query

### useState를 사용한 데이터 페칭

```typescript
const [data, setData] = React.useState(null);
const [loading, setLoading] = React.useState(true);
const [error, setError] = React.useState(null);

React.useEffect(() => {
  setLoading(true);
  fetch('/api/todos')
    .then(res => res.json())
    .then(data => {
      setData(data);
      setLoading(false);
    })
    .catch(err => {
      setError(err);
      setLoading(false);
    });
}, []);
```

**문제점:**
- 캐싱 없음 (새로고침하면 다시 로딩)
- 백그라운드 업데이트 없음
- 중복 요청 제거 없음
- 보일러플레이트 코드가 많음

### TanStack Query 사용

```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
});
```

**장점:**
- 자동 캐싱
- 백그라운드 업데이트
- 중복 요청 자동 제거
- 간결한 코드
- 로딩/에러 상태 자동 관리

## 🎯 실습 순서

1. BasicQueryExample.tsx - 기본 데이터 페칭 학습
2. MutationExample.tsx - 데이터 변경 작업 학습
3. PaginationExample.tsx - 페이지네이션 구현
4. QueryKeysExample.tsx - 쿼리 키와 캐싱 이해
5. OptimisticUpdateExample.tsx - 낙관적 업데이트로 UX 개선

## 🔗 공식 문서

https://tanstack.com/query/latest

## ⚡ 성능 최적화 팁

1. **적절한 queryKey 설계**: 세밀한 캐시 관리
2. **staleTime 설정**: 불필요한 refetch 방지
3. **select 옵션**: 필요한 데이터만 선택
4. **enabled 옵션**: 조건부 쿼리 실행
5. **Prefetching**: 미리 데이터 로드

---

**TanStack Query를 마스터하면 서버 상태 관리가 훨씬 쉬워집니다! 🚀**

