import React from 'react';

// --- Custom Hook 이란? ---
// 이름이 'use'로 시작하는 JavaScript 함수입니다.
// 컴포넌트 간에 상태 관련 로직을 재사용하기 위해 사용됩니다.
// 커스텀 훅을 사용하면, 복잡한 로직을 컴포넌트로부터 분리하여 독립적으로 테스트하고 재사용할 수 있습니다.

// `useCounter` 훅의 반환 타입을 위한 인터페이스 정의
interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

// --- 1. `useCounter` 커스텀 훅 만들기 ---
// 카운터의 상태(count)와 그 상태를 변경하는 함수(increment, decrement, reset)를 포함하는 로직입니다.
//
// @param initialValue - 카운터의 초기값
// @returns {UseCounterReturn} - count, increment, decrement, reset을 포함하는 객체

function useCounter(initialValue: number = 0): UseCounterReturn {
  // 내부적으로 useState 훅을 사용하여 상태를 관리합니다.
  const [count, setCount] = React.useState(initialValue);

  const increment = () => setCount((prevCount) => prevCount + 1);
  const decrement = () => setCount((prevCount) => prevCount - 1);
  const reset = () => setCount(initialValue);

  // 훅은 상태 값과 그 상태를 조작하는 함수들을 배열이나 객체 형태로 반환합니다.
  return { count, increment, decrement, reset };
}

// --- 2. 커스텀 훅을 사용하는 컴포넌트 ---

function Counter1() {
  // `useCounter` 훅을 호출하여 카운터 로직을 가져옵니다.
  // 여기서 받은 count, increment 등은 이 Counter1 컴포넌트만의 독립적인 상태와 함수입니다.
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <div className="rounded border p-4">
      <h2 className="text-xl font-semibold">카운터 1</h2>
      <p className="my-2 text-3xl">{count}</p>
      <div className="space-x-2">
        <button
          onClick={increment}
          className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-700"
        >
          +
        </button>
        <button
          onClick={decrement}
          className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-700"
        >
          -
        </button>
        <button
          onClick={reset}
          className="rounded bg-gray-500 px-3 py-1 text-white hover:bg-gray-700"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

function Counter2() {
  // 다른 컴포넌트에서 동일한 훅을 호출합니다.
  // 이 카운터는 Counter1과 완전히 독립적인 상태를 가집니다.
  const { count, increment, decrement, reset } = useCounter(100);

  return (
    <div className="rounded border p-4">
      <h2 className="text-xl font-semibold">카운터 2 (초기값 100)</h2>
      <p className="my-2 text-3xl">{count}</p>
      <div className="space-x-2">
        <button
          onClick={increment}
          className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-700"
        >
          +
        </button>
        <button
          onClick={decrement}
          className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-700"
        >
          -
        </button>
        <button
          onClick={reset}
          className="rounded bg-gray-500 px-3 py-1 text-white hover:bg-gray-700"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

function CustomHookExample() {
  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold">React Custom Hook 예제</h1>
      <p className="mb-4">
        `useCounter`라는 커스텀 훅을 만들어 두 개의 다른 카운터 컴포넌트에서 재사용합니다.
      </p>
      <p className="mb-6">
        각 카운터는 `useCounter` 훅을 통해 동일한 로직을 공유하지만, 서로 완전히 독립적인 상태를
        가집니다. 이것이 커스텀 훅의 핵심입니다.
      </p>
      <div className="flex space-x-4">
        <Counter1 />
        <Counter2 />
      </div>
    </div>
  );
}

export default CustomHookExample;
