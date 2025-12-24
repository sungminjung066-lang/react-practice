import React from 'react';

// --- React.useEffect 훅 ---
// `useEffect`는 함수형 컴포넌트 내에서 부수 효과(Side Effect)를 수행할 수 있게 해주는 React Hook입니다.
// 부수 효과는 데이터 가져오기, 구독 설정, DOM 직접 조작 등 컴포넌트의 렌더링 결과에 직접적으로 영향을 주지 않지만,
// 컴포넌트 외부의 시스템과 상호작용하는 모든 작업을 의미합니다.
// `useEffect`는 컴포넌트가 렌더링된 후에 실행됩니다.

function UseEffectComponent() {
  const [count, setCount] = React.useState(0);
  const [name, setName] = React.useState('');
  const [timer, setTimer] = React.useState(0);
  const timerRef = React.useRef<number | undefined>(undefined);
  const isFirstRender = React.useRef(true); // 초기 실행 방지를 위한 ref

  // 1. 의존성 배열이 없는 useEffect (모든 렌더링 후 실행)
  // ----------------------------------------------------
  // 이펙트가 모든 렌더링 후에 실행됩니다. (state나 props가 변경될 때마다)
  // 이는 성능 문제나 무한 루프를 유발할 수 있으므로 일반적으로 피해야 합니다.
  React.useEffect(() => {
    console.log('1. [의존성 배열 없음] 모든 렌더링 후 실행됩니다. (주의!)');
  });

  // 2. 의존성 배열이 빈 배열인 useEffect (마운트 시 한 번만 실행)
  // ----------------------------------------------------
  // 컴포넌트가 DOM에 마운트된 직후에 한 번만 실행됩니다.
  // 클래스 컴포넌트의 `componentDidMount`와 유사합니다.
  // 주로 초기 데이터 로딩, 이벤트 리스너 등록 등에 사용됩니다.
  React.useEffect(() => {
    console.log('2. [의존성 배열: []] 컴포넌트 마운트 시 한 번만 실행됩니다.');

    // 클린업 함수: 컴포넌트 언마운트 시 실행
    // ----------------------------------------------------
    // `useEffect`에서 함수를 반환하면, 이 함수는 컴포넌트가 언마운트되기 직전에 호출됩니다.
    // (클래스 컴포넌트의 `componentWillUnmount`와 유사)
    // 또한, 다음 이펙트가 실행되기 전(의존성 변경 시)에도 이전 이펙트의 클린업 함수가 먼저 호출됩니다.
    timerRef.current = window.setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    return () => {
      console.log('2. [클린업] 컴포넌트 언마운트 시 타이머를 정리합니다.');
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []); // 빈 배열: 마운트 시 한 번만 실행

  // 3. 의존성 배열에 값이 있는 useEffect (의존성 변경 시 실행)
  // ----------------------------------------------------
  // 컴포넌트 마운트 시 한 번 실행되고, 이후 의존성 배열 내의 값(`count` 또는 `name`)이 변경될 때마다 실행됩니다.
  // 클래스 컴포넌트의 `componentDidMount` + `componentDidUpdate`와 유사합니다.
  React.useEffect(() => {
    console.log(
      `3. [의존성 배열: [count, name]] count 또는 name이 변경되었습니다. (count: ${count}, name: ${name})`,
    );
    // 특정 상태나 props가 변경될 때마다 특정 로직을 실행할 때 사용합니다.

    // 클린업 함수: 의존성 변경으로 인해 이펙트가 재실행되기 전에 호출됩니다.
    return () => {
      console.log(`3. [클린업] 의존성 ([count, name]) 변경으로 인한 이전 이펙트 정리`);
    };
  }, [count, name]); // count 또는 name이 변경될 때마다 실행

  // 4. useEffect를 사용한 초기 실행 방지
  // ----------------------------------------------------
  // 특정 이펙트를 마운트 시에는 실행하지 않고, 오직 업데이트 시에만 실행하고 싶을 때 사용합니다.
  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // 첫 렌더링 시에는 아무것도 하지 않음
    }
    console.log(
      '4. [초기 실행 방지] 첫 렌더링 이후 count가 변경될 때만 실행됩니다. 현재 count:',
      count,
    );
  }, [count]); // count가 변경될 때마다 실행되지만, 첫 렌더링은 건너뜀

  return (
    <div className="rounded-lg border-2 border-blue-500 p-4">
      <h2 className="text-xl font-bold">useEffect Hook 예제</h2>
      <p>브라우저 콘솔을 열어 실행 흐름을 확인하세요.</p>

      <div className="my-4">
        <p>카운트: {count}</p>
        <button
          onClick={() => setCount((prev) => prev + 1)}
          className="mr-2 rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-700"
        >
          카운트 증가
        </button>
      </div>

      <div className="my-4">
        <p>이름: {name === '' ? '(입력 없음)' : name}</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름 입력"
          className="rounded border border-gray-400 p-1"
        />
      </div>

      <div className="my-4">
        <p>타이머: {timer}초</p>
      </div>
    </div>
  );
}

// --- 부모 컴포넌트 ---
// UseEffectComponent를 마운트/언마운트 시키는 역할을 합니다.
function UseEffectExample() {
  const [showComponent, setShowComponent] = React.useState(true);

  const toggleComponent = () => {
    setShowComponent((prev) => !prev);
  };

  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold">React `useEffect` 종합 예제</h1>
      <p className="mb-4">`useEffect`의 다양한 사용법과 동작 방식을 콘솔을 통해 확인하세요.</p>
      <button
        onClick={toggleComponent}
        className="mb-4 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
      >
        컴포넌트 {showComponent ? '언마운트' : '마운트'}
      </button>
      {showComponent && <UseEffectComponent />}
    </div>
  );
}

export default UseEffectExample;
