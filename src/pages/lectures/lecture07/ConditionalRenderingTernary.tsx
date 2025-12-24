import React from 'react';

interface GreetingProps {
  isLoggedIn: boolean;
}

const UserGreeting: React.FC = () => <h1>Welcome back!</h1>;
const GuestGreeting: React.FC = () => <h1>Please sign up.</h1>;

function Greeting(props: GreetingProps) {
  return props.isLoggedIn ? <UserGreeting /> : <GuestGreeting />;
}

function ConditionalRenderingTernary() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const handleLoginClick = () => {
    setIsLoggedIn(true);
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      <h2>Conditional Rendering (Ternary Operator) Example</h2>
      <Greeting isLoggedIn={isLoggedIn} />
      {isLoggedIn ? (
        <button
          onClick={handleLogoutClick}
          className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={handleLoginClick}
          className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
        >
          Login
        </button>
      )}
      <p className="mt-4">
        위 버튼을 클릭하여 로그인 상태를 토글하고, 삼항 연산자를 사용하여 조건부로 다른 컴포넌트가 렌더링되는 것을 확인하세요.
      </p>
    </div>
  );
}

export default ConditionalRenderingTernary;
