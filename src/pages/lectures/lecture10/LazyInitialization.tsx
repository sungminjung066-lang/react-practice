import { useState } from 'react';

// 시연을 위한 무거운 계산 함수입니다.
function heavyComputation() {
  console.log('무거운 계산 실행 중...');
  // 실제 시나리오에서는 복잡한 계산, 데이터 처리 또는
  // 눈에 띄는 시간이 걸리는 작업이 될 수 있습니다.
  let sum = 0;
  for (let i = 0; i < 1_000_000_000; i++) {
    sum += 1;
  }
  return sum;
}

// 이 함수는 상태를 초기화하는 일반적인 방법을 보여줍니다.
// heavyComputation 함수는 모든 렌더링에서 호출됩니다.
function NormalInitialization() {
  console.log('NormalInitialization 컴포넌트 렌더링 중...');
  const [value] = useState(heavyComputation());

  return (
    <div>
      <h3>일반적인 초기화</h3>
      <p>초기 상태는 `heavyComputation()`을 직접 호출하여 계산됩니다.</p>
      <p>
        콘솔을 확인하세요. 이 컴포넌트가 다시 렌더링될 때마다 "무거운 계산 실행 중..."이 표시됩니다.
      </p>
      <p>값: {value}</p>
    </div>
  );
}

// 이 함수는 지연 초기화를 보여줍니다.
// heavyComputation 함수는 useState에 인수로 전달되므로
// 초기 렌더링에서만 호출됩니다.
function LazyInitializationComponent() {
  console.log('LazyInitializationComponent 컴포넌트 렌더링 중...');
  const [value] = useState(heavyComputation);

  return (
    <div>
      <h3>지연 초기화 (Lazy Initialization)</h3>
      <p>초기 상태는 `heavyComputation` 함수를 `useState`에 전달하여 계산됩니다.</p>
      <p>
        콘솔을 확인하세요. 이 컴포넌트의 초기 렌더링 시에만 "무거운 계산 실행 중..."이 한 번
        표시됩니다.
      </p>
      <p>값: {value}</p>
    </div>
  );
}

function LazyInitializationExample() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>지연 초기화 예제</h2>
      <p>이 예제는 `useState`의 일반적인 초기화와 지연 초기화의 차이점을 보여줍니다.</p>
      <p>
        버튼을 클릭하면 부모 컴포넌트가 다시 렌더링되고, 이는 자식 컴포넌트들을 다시 렌더링합니다.
      </p>
      <button
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={() => setCount(count + 1)}
      >
        컴포넌트 다시 렌더링 ({count})
      </button>
      <hr />
      <NormalInitialization />
      <hr />
      <LazyInitializationComponent />
    </div>
  );
}

export default LazyInitializationExample;

/**
 * 지연 초기화(lazy initialization)

   - 일반적인 초기화: useState(heavyComputation())
       - heavyComputation() 함수가 실행되고, 그 반환값이 초기 상태가 됩니다.
       - 컴포넌트가 리렌더링될 때마다 heavyComputation() 함수가 매번 다시 호출됩니다. 상태값은 첫 렌더링시의 값으로 유지되지만, 함수
         호출 자체는 계속 발생하여 비효율적일 수 있습니다.

   - 지연 초기화: useState(heavyComputation)
       - heavyComputation 함수 자체가 useState에 전달됩니다.
       - React는 컴포넌트가 처음 렌더링될 때만 이 함수를 호출하여 초기 상태값을 계산합니다.
       - 이후의 리렌더링에서는 이 함수가 다시 호출되지 않으므로, 무거운 계산이나 복잡한 로직이 초기 상태를 결정하는 경우에 매우
         유용합니다.

  따라서 초기 상태를 계산하는 비용이 큰 경우에는 함수를 직접 전달하는 지연 초기화 방식을 사용하는 것이 성능상 이점을 가집니다.
 */
