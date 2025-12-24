# 실습 03: 다크모드 테마 전환 앱 만들기

## 📝 학습 목표
- `Context API`를 사용한 전역 상태 관리 이해하기
- `useContext`로 깊은 컴포넌트 트리에서 데이터 공유하기
- Props Drilling 문제 해결 방법 익히기
- 테마 전환 UI/UX 구현하기

## 🎯 요구사항

### 기본 기능
1. **테마 Context 생성**: 라이트 모드와 다크 모드 관리
2. **테마 전환 버튼**: 버튼 클릭 시 테마 토글
3. **전역 테마 적용**: 모든 컴포넌트에서 현재 테마 사용
4. **localStorage 연동**: 테마 설정 저장 및 복원
5. **다양한 컴포넌트**: Header, Sidebar, Content 영역에 테마 적용

### UI 요구사항
- 라이트 모드: 밝은 배경, 어두운 텍스트
- 다크 모드: 어두운 배경, 밝은 텍스트
- 부드러운 테마 전환 애니메이션
- 테마 전환 아이콘 (☀️/🌙)
- Tailwind CSS를 사용하여 스타일링

## 🏗️ 컴포넌트 구조 예시

```
ThemeApp (메인 컴포넌트)
├─ ThemeProvider (Context Provider)
│  └─ Layout
│     ├─ Header
│     │  └─ ThemeToggleButton
│     ├─ Sidebar
│     │  └─ NavItem (여러 개)
│     └─ MainContent
│        ├─ Card (여러 개)
│        └─ Button (여러 개)
```

## 💡 힌트

### 1. Theme 타입 정의
```typescript
type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
```

### 2. Context 생성 및 Provider
```typescript
const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<Theme>('light');
  
  // localStorage에서 테마 불러오기
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);
  
  // 테마가 변경될 때 localStorage에 저장
  React.useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

### 3. Custom Hook으로 Context 사용하기
```typescript
function useTheme() {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

### 4. 컴포넌트에서 테마 사용하기
```typescript
function Header() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className={theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}>
      <button onClick={toggleTheme}>
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
    </header>
  );
}
```

### 5. Tailwind의 dark 모드 활용 (선택사항)
```typescript
// tailwind.config.js에 darkMode: 'class' 설정 후
<div className={theme === 'dark' ? 'dark' : ''}>
  <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
    {/* ... */}
  </div>
</div>
```

## 📋 체크리스트

기본 요구사항:
- [ ] ThemeContext가 생성되어 있다
- [ ] ThemeProvider가 앱 최상단을 감싸고 있다
- [ ] useTheme 커스텀 훅이 구현되어 있다
- [ ] 테마 전환 버튼이 있고, 클릭 시 테마가 변경된다
- [ ] 모든 컴포넌트에 테마가 적용된다 (배경, 텍스트 색상)
- [ ] localStorage에 테마가 저장되고 복원된다
- [ ] Props Drilling 없이 깊은 컴포넌트에서도 테마를 사용할 수 있다

추가 도전 과제:
- [ ] 시스템 테마 감지 (`prefers-color-scheme` 미디어 쿼리)
- [ ] 세 가지 이상의 테마 지원 (라이트, 다크, 오토)
- [ ] 테마별 커스텀 색상 팔레트 정의
- [ ] 부드러운 전환 애니메이션 (transition)
- [ ] 테마 설정 모달 또는 드롭다운

## 🎨 UI 참고 예시

**라이트 모드:**
```
┌──────────────────────────────────────────────┐
│  📝 My App                          ☀️       │  ← Header (흰색 배경)
├──────────────┬───────────────────────────────┤
│  📄 Home     │  Welcome to My App            │
│  📊 Dashboard│                                │
│  ⚙️ Settings │  ┌──────────────┐             │
│              │  │   Card 1     │             │  ← Content (흰색)
│              │  │  Light theme │             │
│              │  └──────────────┘             │
└──────────────┴───────────────────────────────┘
  ↑ Sidebar
```

**다크 모드:**
```
┌──────────────────────────────────────────────┐
│  📝 My App                          🌙       │  ← Header (어두운 배경)
├──────────────┬───────────────────────────────┤
│  📄 Home     │  Welcome to My App            │
│  📊 Dashboard│                                │
│  ⚙️ Settings │  ┌──────────────┐             │
│              │  │   Card 1     │             │  ← Content (어두운)
│              │  │  Dark theme  │             │
│              │  └──────────────┘             │
└──────────────┴───────────────────────────────┘
```

## 📚 관련 학습 내용
- Lecture 01: Props Drilling & Context API
- Lecture 15: useContext
- Lecture 22: Custom Hook

## 🎯 핵심 개념

### Props Drilling의 문제점
```typescript
// ❌ Props Drilling 방식
<App theme={theme}>
  <Layout theme={theme}>
    <Header theme={theme}>
      <Button theme={theme} />  // 깊은 곳까지 props 전달
    </Header>
  </Layout>
</App>

// ✅ Context API 방식
<ThemeProvider>
  <App>
    <Layout>
      <Header>
        <Button />  // useTheme()으로 직접 접근
      </Header>
    </Layout>
  </App>
</ThemeProvider>
```

## 💪 도전해보세요!
이 실습을 통해 Context API를 사용한 전역 상태 관리와 Props Drilling 해결 방법을 익힐 수 있습니다.

## 🔍 디버깅 팁
- React DevTools에서 Context Provider 구조 확인
- useTheme을 Provider 외부에서 사용하면 에러 발생 확인
- localStorage에 저장된 값 확인 (개발자 도구 → Application → Local Storage)

