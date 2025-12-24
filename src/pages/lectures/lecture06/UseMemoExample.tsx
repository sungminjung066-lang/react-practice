import React from 'react';

// Some expensive calculation
function expensiveCalculation(num: number): number {
  console.log('Performing expensive calculation...');
  for (let i = 0; i < 10; i++) {
    num += 1;
  }
  return num;
}

function UseMemoExample() {
  const [count, setCount] = React.useState(0);
  const [otherState, setOtherState] = React.useState(0);

  // Without useMemo, this would re-run on every render
  const calculatedValue = expensiveCalculation(count);

  // With useMemo, this only re-runs when 'count' changes
  const memoizedCalculatedValue = React.useMemo(() => expensiveCalculation(count), [count]);

  const increment = () => {
    setCount(count + 1);
  };

  const incrementOtherState = () => {
    setOtherState(otherState + 1);
  };

  return (
    <div>
      <h2>useMemo Example</h2>
      <p>Count: {count}</p>
      <p>Other State: {otherState}</p>
      <p>Calculated Value (without useMemo): {calculatedValue}</p>
      <p>Calculated Value (with useMemo): {memoizedCalculatedValue}</p>
      <button
        onClick={increment}
        className="mr-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Increment Count
      </button>
      <button
        onClick={incrementOtherState}
        className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
      >
        Increment Other State
      </button>
      <p className="mt-4">
        "Increment Count" 버튼을 클릭하면 두 계산 값이 모두 업데이트됩니다. "Increment Other State"
        버튼을 클릭하면 컴포넌트가 리렌더링되지만, "Calculated Value (with useMemo)"는 `count` 값이
        변경되지 않았으므로 다시 계산되지 않습니다. 콘솔을 확인하여 "Performing expensive
        calculation..." 메시지가 언제 출력되는지 확인하세요.
      </p>
    </div>
  );
}

export default UseMemoExample;
