import React from 'react';

function StateManagement() {
  // 1. useState 호출하여 count 상태와 setCount 함수를 초기화합니다.
  // 'count'는 현재 상태 값(초기값: 0)을 저장하는 변수입니다.
  // 'setCount'는 'count' 값을 변경하는 함수입니다.
  const [count, setCount] = React.useState<number>(0);

  // 2. 버튼 클릭 시 호출될 함수입니다.
  const handleIncrement = () => {
    // 3. setCount 함수를 호출하여 'count' 상태를 업데이트합니다.
    // 이전 상태 값(prevCount)을 받아 1을 더한 새로운 값으로 상태를 변경합니다.
    setCount((prevCount) => prevCount + 1);
    // 상태가 변경되면 React는 Counter 컴포넌트를 리렌더링합니다.
  };

  const handleDecrement = () => {
    setCount((prevCount) => prevCount - 1);
  };

  // 4. 리렌더링된 컴포넌트는 새로운 'count' 값을 화면에 표시합니다.
  return (
    <div>
      <h2>2-1: useState 예제</h2>
      <p>현재 카운트: {count}</p>
      <button onClick={handleIncrement}>증가</button>
      <button onClick={handleDecrement}>감소</button>
    </div>
  );
}

export default StateManagement;
