import React from 'react';

// Prop Drilling이란?
// Props를 여러 계층의 컴포넌트를 거쳐 하위 컴포넌트로 전달하는 과정을 말합니다.
// 중간에 있는 컴포넌트들은 해당 props를 사용하지 않더라도, 오직 하위 컴포넌트로 전달하기 위해 props를 받아야 합니다.
// 이는 코드의 복잡성을 증가시키고 유지보수를 어렵게 만듭니다.

// --- 해결책: useContext ---
// useContext는 React의 Context API와 함께 사용되어,
// 명시적으로 props를 전달하지 않고도 컴포넌트 트리 전체에서 데이터를 공유할 수 있게 해줍니다.

// 1. Context 생성
// createContext 함수를 사용하여 새로운 Context 객체를 생성합니다.
// 이 객체는 Provider와 Consumer 컴포넌트를 포함합니다.
// 기본값은 Provider가 없을 때 사용됩니다.
const ThemeContext = React.createContext({
  theme: 'light',
  toggleTheme: () => {},
});

// 2. 중간 컴포넌트
// 이 컴포넌트는 더 이상 theme이나 toggleTheme props를 받을 필요가 없습니다.
function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

// 3. 최종 소비자 컴포넌트
// useContext 훅을 사용하여 ThemeContext의 현재 값을 가져옵니다.
function ThemedButton() {
  const { theme, toggleTheme } = React.useContext(ThemeContext);

  const style = {
    background: theme === 'dark' ? '#333' : '#FFF',
    color: theme === 'dark' ? '#FFF' : '#333',
    border: `1px solid ${theme === 'dark' ? '#FFF' : '#333'}`,
    padding: '10px 20px',
    cursor: 'pointer',
  };

  return (
    <button style={style} onClick={toggleTheme}>
      현재 테마: {theme} (클릭하여 변경)
    </button>
  );
}

// 4. 최상위 컴포넌트 (Provider)
// Context Provider를 사용하여 하위 컴포넌트들에게 현재 값을 전달합니다.
// value prop이 변경되면, 이 Provider의 모든 하위 소비자 컴포넌트들이 다시 렌더링됩니다.
function UseContextExample() {
  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // `value` 객체는 theme 상태와 그 상태를 변경하는 함수를 포함합니다.
  const providerValue = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={providerValue}>
      <div style={{ padding: '20px' }}>
        <h1 className="mb-4 text-3xl font-bold">useContext 예제</h1>
        <p className="mb-4">
          이 예제는 `useContext`를 사용하여 여러 단계 아래의 컴포넌트에 "테마" 데이터를 전달하는
          방법을 보여줍니다. 중간에 있는 `Toolbar` 컴포넌트는 `theme` 관련 props를 전혀 받지
          않습니다.
        </p>
        <Toolbar />
      </div>
    </ThemeContext.Provider>
  );
}

export default UseContextExample;
