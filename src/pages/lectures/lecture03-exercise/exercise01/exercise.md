# 실습 01: 간단한 투두 리스트 만들기

## 📝 학습 목표
- `useState`를 사용한 상태 관리 이해하기
- Props를 통한 컴포넌트 간 데이터 전달 익히기
- 이벤트 핸들링 실습하기
- 리스트 렌더링과 `key` prop 이해하기

## 🎯 요구사항

### 기본 기능
1. **할 일 추가**: input 창에 할 일을 입력하고 버튼을 클릭하면 목록에 추가
2. **할 일 삭제**: 각 할 일 항목 옆에 삭제 버튼이 있고, 클릭하면 해당 항목 삭제
3. **할 일 완료 체크**: 체크박스를 클릭하면 완료된 항목에 취소선 표시

### UI 요구사항
- Input 창과 추가 버튼
- 할 일 목록 (체크박스, 할 일 내용, 삭제 버튼)
- 전체 할 일 개수와 완료된 할 일 개수 표시
- Tailwind CSS를 사용하여 스타일링

## 🏗️ 컴포넌트 구조 예시

```
TodoApp (메인 컴포넌트)
├─ TodoInput (입력 컴포넌트)
└─ TodoList (목록 컴포넌트)
   └─ TodoItem (개별 항목 컴포넌트)
```

## 💡 힌트

### 1. Todo 타입 정의
```typescript
interface Todo {
  id: string;
  text: string;
  completed: boolean;
}
```

### 2. 사용할 Hook
- `useState<Todo[]>`: 할 일 목록 상태 관리
- `useState<string>`: input 값 상태 관리

### 3. 주요 기능 구현 힌트
```typescript
// 할 일 추가
const addTodo = (text: string) => {
  const newTodo: Todo = {
    id: crypto.randomUUID(),
    text,
    completed: false
  };
  setTodos([...todos, newTodo]);
};

// 할 일 삭제
const deleteTodo = (id: string) => {
  setTodos(todos.filter(todo => todo.id !== id));
};

// 완료 토글
const toggleTodo = (id: string) => {
  setTodos(todos.map(todo => 
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  ));
};
```

## 📋 체크리스트

기본 요구사항:
- [ ] 할 일을 입력할 수 있는 input과 추가 버튼이 있다
- [ ] 추가 버튼을 클릭하면 목록에 새 항목이 추가된다
- [ ] 빈 값은 추가되지 않는다
- [ ] 각 항목에 체크박스, 텍스트, 삭제 버튼이 표시된다
- [ ] 체크박스를 클릭하면 취소선이 표시/해제된다
- [ ] 삭제 버튼을 클릭하면 해당 항목이 삭제된다
- [ ] 전체 개수와 완료된 개수가 표시된다
- [ ] 각 항목에 고유한 `key` prop이 설정되어 있다

추가 도전 과제:
- [ ] Enter 키를 눌러도 할 일이 추가되도록 구현
- [ ] "전체 삭제" 버튼 추가
- [ ] "완료된 항목만 삭제" 버튼 추가
- [ ] 완료되지 않은 항목만 보기 / 완료된 항목만 보기 필터 기능

## 🎨 UI 참고 예시

```
┌─────────────────────────────────────────┐
│  📝 Todo List                           │
├─────────────────────────────────────────┤
│  [_____________] [추가]                  │
│                                          │
│  ☐ React 공부하기          [삭제]       │
│  ☑ 실습 문제 풀기          [삭제]       │
│  ☐ 복습하기               [삭제]        │
│                                          │
│  전체: 3개 | 완료: 1개                   │
└─────────────────────────────────────────┘
```

## 📚 관련 학습 내용
- Lecture 01: State & Props
- Lecture 02: useState
- Lecture 18: Event Handling
- Lecture 19: Key Prop

## 💪 도전해보세요!
이 실습을 통해 React의 기본적인 상태 관리와 컴포넌트 간 데이터 흐름을 이해할 수 있습니다.

