import React from 'react';

// TODO: Theme 타입 정의
type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// TODO: ThemeContext 생성
const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

// TODO: useTheme 커스텀 훅
function useTheme() {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// TODO: ThemeProvider 컴포넌트
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<Theme>('light');
  
  // TODO: localStorage에서 테마 불러오기
  React.useEffect(() => {
    // 여기에 코드를 작성하세요
  }, []);
  
  // TODO: 테마 변경 시 localStorage에 저장
  React.useEffect(() => {
    // 여기에 코드를 작성하세요
  }, [theme]);
  
  // TODO: 테마 토글 함수
  const toggleTheme = () => {
    // 여기에 코드를 작성하세요
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 테마 전환 버튼 컴포넌트
function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className={`rounded-lg px-4 py-2 font-semibold transition-all ${
        theme === 'dark'
          ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300'
          : 'bg-gray-700 text-white hover:bg-gray-600'
      }`}
    >
      {theme === 'dark' ? '☀️ 라이트 모드' : '🌙 다크 모드'}
    </button>
  );
}

// Header 컴포넌트
function Header() {
  const { theme } = useTheme();
  
  return (
    <header
      className={`border-b p-4 transition-colors ${
        theme === 'dark'
          ? 'border-gray-700 bg-gray-800 text-white'
          : 'border-gray-200 bg-white text-gray-900'
      }`}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">📝 My App</h1>
        <ThemeToggleButton />
      </div>
    </header>
  );
}

// Sidebar 컴포넌트
function Sidebar() {
  const { theme } = useTheme();
  
  const navItems = [
    { icon: '🏠', label: 'Home' },
    { icon: '📊', label: 'Dashboard' },
    { icon: '👥', label: 'Users' },
    { icon: '⚙️', label: 'Settings' },
    { icon: '📧', label: 'Messages' },
  ];
  
  return (
    <aside
      className={`w-64 border-r p-4 transition-colors ${
        theme === 'dark'
          ? 'border-gray-700 bg-gray-800 text-white'
          : 'border-gray-200 bg-gray-50 text-gray-900'
      }`}
    >
      <nav className="space-y-2">
        {navItems.map((item, index) => (
          <button
            key={index}
            className={`w-full rounded-lg p-3 text-left transition-colors ${
              theme === 'dark'
                ? 'hover:bg-gray-700'
                : 'hover:bg-gray-200'
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

// Card 컴포넌트
function Card({ title, content }: { title: string; content: string }) {
  const { theme } = useTheme();
  
  return (
    <div
      className={`rounded-lg border p-6 shadow-md transition-colors ${
        theme === 'dark'
          ? 'border-gray-700 bg-gray-800 text-white'
          : 'border-gray-200 bg-white text-gray-900'
      }`}
    >
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
        {content}
      </p>
    </div>
  );
}

// MainContent 컴포넌트
function MainContent() {
  const { theme } = useTheme();
  
  const cards = [
    {
      title: '카드 1',
      content: 'Context API를 사용하면 Props Drilling 없이 전역 상태를 관리할 수 있습니다.',
    },
    {
      title: '카드 2',
      content: 'useContext 훅으로 어떤 깊이의 컴포넌트에서도 데이터에 접근할 수 있습니다.',
    },
    {
      title: '카드 3',
      content: '테마가 변경되면 모든 컴포넌트가 자동으로 업데이트됩니다.',
    },
    {
      title: '카드 4',
      content: 'localStorage를 활용하여 사용자의 테마 선택을 저장할 수 있습니다.',
    },
  ];
  
  return (
    <main className="flex-1 p-6">
      <div className="mb-6">
        <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Welcome to My App
        </h2>
        <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          현재 테마: <span className="font-semibold">{theme === 'dark' ? '다크 모드 🌙' : '라이트 모드 ☀️'}</span>
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {cards.map((card, index) => (
          <Card key={index} title={card.title} content={card.content} />
        ))}
      </div>
      
      <div className="mt-8">
        <h3 className={`mb-4 text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          버튼 예시
        </h3>
        <div className="flex gap-4">
          <button
            className={`rounded-lg px-6 py-3 font-semibold transition-colors ${
              theme === 'dark'
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Primary Button
          </button>
          <button
            className={`rounded-lg border-2 px-6 py-3 font-semibold transition-colors ${
              theme === 'dark'
                ? 'border-gray-600 text-white hover:bg-gray-700'
                : 'border-gray-300 text-gray-900 hover:bg-gray-100'
            }`}
          >
            Secondary Button
          </button>
        </div>
      </div>
    </main>
  );
}

// Layout 컴포넌트
function Layout() {
  const { theme } = useTheme();
  
  return (
    <div
      className={`min-h-screen transition-colors ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
      }`}
    >
      <Header />
      <div className="flex">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
}

// 메인 앱 컴포넌트
function ThemeApp() {
  return (
    <ThemeProvider>
      <Layout />
    </ThemeProvider>
  );
}

export default ThemeApp;

