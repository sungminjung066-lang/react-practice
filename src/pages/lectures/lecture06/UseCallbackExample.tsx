import React from 'react';

interface ButtonProps {
  onClick: () => void;
  text: string;
}

const Button = React.memo(({ onClick, text }: ButtonProps) => {
  console.log(`${text} rendered`);
  return (
    <button
      onClick={onClick}
      className="mr-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
    >
      {text}
    </button>
  );
});

function UseCallbackExample() {
  const [count, setCount] = React.useState(0);
  const [otherState, setOtherState] = React.useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const incrementWithCallback = React.useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  const incrementOtherState = () => {
    setOtherState(otherState + 1);
  };

  return (
    <div>
      <h2>useCallback Example</h2>
      <p>Count: {count}</p>
      <p>Other State: {otherState}</p>
      <Button onClick={increment} text="Increment (No useCallback)" />
      <Button onClick={incrementWithCallback} text="Increment (useCallback)" />
      <Button onClick={incrementOtherState} text="Increment Other State" />
      <p>
        "Increment (useCallback)" 버튼을 클릭해도 "Increment (No useCallback)" 버튼은 리렌더링
        되지만, "Increment Other State" 버튼을 클릭하면 "Increment (useCallback)" 버튼은
        리렌더링되지 않는 것을 확인하세요.
      </p>
    </div>
  );
}

export default UseCallbackExample;
