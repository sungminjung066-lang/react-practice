import React, { useEffect, useLayoutEffect, useState } from 'react';

// --- 함수형 컴포넌트의 Hook Flow ---
// 함수형 컴포넌트는 클래스 컴포넌트처럼 명시적인 라이프사이클 메소드를 가지지 않습니다.
// 대신 `useEffect` 훅을 사용하여 마운트, 업데이트, 언마운트 시점의 부수 효과(Side Effect)를 관리합니다。
// `useLayoutEffect`는 DOM 변경 후 브라우저 페인트 전에 동기적으로 실행됩니다。

function HookFlowComponent() {
  const [count, setCount] = useState(0);
  const [date, setDate] = useState(new Date());
  const timerID = React.useRef<number | undefined>(undefined); // 타이머 ID를 저장할 변수

  // 1. Mounting (마운팅): 컴포넌트가 처음 렌더링될 때
  // ----------------------------------------------------
  // `useEffect`의 두 번째 인자로 빈 배열(`[]`)을 전달하면,
  // 컴포넌트가 DOM에 마운트된 직후에 한 번만 실행됩니다. (클래스 컴포넌트의 componentDidMount와 유사)
  useEffect(() => {
    console.log('1. useEffect (Mount): 컴포넌트가 마운트되었습니다.');
    // 타이머 설정
    timerID.current = window.setInterval(() => {
      setDate(new Date());
    }, 1000);

    // 3. Unmounting (언마운팅): 컴포넌트가 DOM에서 제거될 때
    // ----------------------------------------------------
    // `useEffect`에서 함수를 반환하면, 이 함수는 컴포넌트가 언마운트되기 직전에 호출됩니다。
    // (클래스 컴포넌트의 componentWillUnmount와 유사)
    // 또한, 다음 이펙트가 실행되기 전(업데이트 시)에도 이전 이펙트의 클린업 함수가 먼저 호출됩니다.
    return () => {
      console.log(
        '3. useEffect (Unmount/Cleanup): 컴포넌트가 언마운트되거나 다음 이펙트 실행 전 정리됩니다.',
      );
      if (timerID.current) {
        clearInterval(timerID.current as number);
        console.log('  - 타이머 정리 완료');
      }
    };
  }, []); // 빈 배열: 마운트 시 한 번만 실행, 언마운트 시 정리

  // 1.5. useLayoutEffect: DOM 업데이트 후, 브라우저 페인트 전
  // ----------------------------------------------------
  // `useLayoutEffect`는 모든 DOM 변경이 적용된 직후, 브라우저가 화면을 실제로 그리기 전에 동기적으로 실행됩니다.
  // DOM의 레이아웃을 측정하거나, DOM을 동기적으로 조작하여 브라우저가 깜빡이는 것을 방지할 때 유용합니다.
  useLayoutEffect(() => {
    console.log('1.5. useLayoutEffect: DOM 업데이트 후, 브라우저 페인트 전');
    // 여기에 DOM 측정이나 동기적인 DOM 조작 로직을 넣습니다.
    // 예를 들어, 스크롤 위치 조정, 요소 크기 측정 등
    return () => {
      console.log(
        '3.5. useLayoutEffect (Cleanup): 다음 useLayoutEffect 실행 전 또는 언마운트 시 정리',
      );
    };
  }, [count]); // count가 변경될 때마다 실행되도록 의존성 추가

  // 2. Updating (업데이트): state나 props가 변경될 때
  // ----------------------------------------------------
  // `useEffect`의 두 번째 인자로 의존성 배열(`[count]`)을 전달하면,
  // `count` 값이 변경될 때마다 이 이펙트가 실행됩니다. (클래스 컴포넌트의 componentDidUpdate와 유사)
  useEffect(() => {
    console.log('2. useEffect (Update): count가 변경되었습니다. 현재 count:', count);
    // 이펙트 내부에서 count 값을 사용하여 부수 효과를 수행할 수 있습니다.
  }, [count]); // count가 변경될 때마다 실행

  // 참고: 의존성 배열을 생략하면 (useEffect(() => { ... }))
  // 컴포넌트가 렌더링될 때마다 (모든 state나 props 변경 시) 이펙트가 실행됩니다.
  // 이는 일반적으로 피해야 할 패턴입니다.

  console.log('0. 컴포넌트 함수 실행 (렌더링)'); // 컴포넌트 함수는 매 렌더링마다 실행됩니다.

  return (
    <div className="rounded-lg border-2 border-blue-500 p-4">
      <h2 className="text-xl font-bold">Hook Flow Component</h2>
      <p>현재 시간: {date.toLocaleTimeString()}</p>
      <p>카운트: {count}</p>
      <button
        onClick={() => setCount((prevCount) => prevCount + 1)}
        className="mt-2 rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-700"
      >
        카운트 증가
      </button>
    </div>
  );
}

// --- 부모 컴포넌트 ---
// HookFlowComponent를 마운트/언마운트 시키는 역할을 합니다.
function HookFlowExample() {
  const [showComponent, setShowComponent] = useState(true);

  const toggleComponent = () => {
    setShowComponent((prev) => !prev);
  };

  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold">
        함수형 컴포넌트 Hook Flow 예제 (useEffect & useLayoutEffect)
      </h1>
      <p className="mb-4">
        브라우저의 콘솔을 열어 `useState`, `useEffect`, `useLayoutEffect`의 실행 흐름을 확인하세요.
      </p>
      <button
        onClick={toggleComponent}
        className="mb-4 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
      >
        컴포넌트 {showComponent ? '언마운트' : '마운트'}
      </button>
      {showComponent && <HookFlowComponent />}
    </div>
  );
}

export default HookFlowExample;
