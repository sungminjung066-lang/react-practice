import React from 'react';

function ConditionalRenderingLogical() {
  const [showMessage, setShowMessage] = React.useState(false);
  const [userName, setUserName] = React.useState('');

  const toggleMessage = () => {
    setShowMessage(!showMessage);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  return (
    <div>
      <h2>Conditional Rendering (&&, ||) Example</h2>

      <h3>Logical && Operator</h3>
      <button
        onClick={toggleMessage}
        className="mb-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Toggle Message
      </button>
      {showMessage && <p>This message appears when showMessage is true!</p>}

      <h3 className="mt-8">Logical || Operator</h3>
      <p>Enter your name:</p>
      <input
        type="text"
        value={userName}
        onChange={handleNameChange}
        placeholder="Your name"
        className="mb-4 rounded border px-3 py-2 shadow-sm focus:border-blue-300 focus:ring focus:outline-none"
      />
      <p>Hello, {userName || 'Guest'}!</p>

      <p className="mt-4">
        `&&` 연산자는 조건이 참일 때만 요소를 렌더링합니다. `||` 연산자는 첫 번째 값이 falsy일 때
        대체 값을 렌더링합니다.
      </p>
    </div>
  );
}

export default ConditionalRenderingLogical;
