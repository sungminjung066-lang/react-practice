import React from 'react';

// Props를 위한 타입 정의
interface GreetingProps {
  message: string;
  count: number;
}

// Props를 받는 자식 컴포넌트
function Greeting({ message, count }: GreetingProps) {
  return (
    <div className="mt-4 rounded-lg bg-green-100 p-4">
      <h3 className="text-lg font-semibold">자식 컴포넌트 (Greeting)</h3>
      <p>{message}</p>
      <p>부모로부터 전달된 현재 카운트: {count}</p>
    </div>
  );
}

// 메인 강의 페이지 컴포넌트
function StateProps() {
  // --- State --- //
  // useState를 사용하여 컴포넌트의 상태(state)를 관리합니다.
  // count: 현재 상태 값
  // setCount: 상태를 업데이트하는 함수
  const [count, setCount] = React.useState<number>(0);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">1-1: React Props 와 State</h2>

      {/* State 예제 */}
      <div className="rounded-lg bg-blue-100 p-4">
        <h3 className="text-lg font-semibold">State 예제 (부모 컴포넌트)</h3>
        <p>현재 카운트: {count}</p>
        <button
          className="mt-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={increment}
        >
          카운트 증가
        </button>
      </div>

      {/* Props 예제 */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Props 예제</h3>
        <p>부모 컴포넌트의 'state'(현재 카운트)를 자식 컴포넌트의 'props'로 전달합니다.</p>
        <Greeting message="안녕하세요! 이것은 부모 컴포넌트에서 온 메시지입니다." count={count} />
      </div>
    </div>
  );
}

export default StateProps;
