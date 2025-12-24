import React from 'react';

const UseEffectExample = () => {
  const [count, setCount] = React.useState(0);
  const [text, setText] = React.useState('');

  // [1] 매 렌더링 시 실행
  // 의존성 배열(dependency array)이 없는 useEffect는
  // 컴포넌트가 렌더링될 때마다(state, props가 변경될 때마다) 실행됩니다.
  React.useEffect(() => {
    console.log('[1] 컴포넌트가 렌더링될 때마다 실행됩니다.');
  });

  // [2] 마운트될 때 한 번만 실행
  // 의존성 배열이 빈 배열([])인 useEffect는
  // 컴포넌트가 처음 화면에 나타날 때(마운트될 때) 한 번만 실행됩니다.
  // 주로 초기 데이터 로딩, 이벤트 리스너 등록 등에 사용됩니다.
  React.useEffect(() => {
    console.log('[2] 컴포넌트가 처음 마운트될 때만 실행됩니다.');
  }, []);

  // [3] 특정 종속성(count)이 변경될 때 실행
  // 의존성 배열에 특정 값([count])이 있는 useEffect는
  // 해당 값이 변경될 때만 실행됩니다.
  React.useEffect(() => {
    console.log(`[3] count가 변경되었습니다: ${count}`);
  }, [count]);

  // [4] 정리(cleanup) 함수 사용
  // useEffect는 함수를 반환할 수 있는데, 이 함수를 '정리(cleanup) 함수'라고 합니다.
  // 이 함수는 컴포넌트가 사라질 때(언마운트될 때) 또는
  // 다음 effect가 실행되기 직전에 호출됩니다.
  // 메모리 누수를 방지하기 위해 사용됩니다. (예: 타이머 해제, 이벤트 리스너 해제)
  React.useEffect(() => {
    console.log('[4] 타이머를 설정했습니다.');

    const timerId = setInterval(() => {
      console.log('타이머가 실행 중입니다...');
    }, 2000);

    // 컴포넌트가 언마운트되거나, 다음 effect가 실행되기 전에 정리 함수가 실행됩니다.
    return () => {
      console.log('[4] 타이머를 정리합니다.');
      clearInterval(timerId);
    };
  }, []); // 빈 배열이므로 컴포넌트가 언마운트될 때 한 번만 정리됩니다.

  return (
    <div>
      <h2>useEffect 예제</h2>
      <p>Count: {count}</p>
      <button
        onClick={() => setCount(count + 1)}
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        카운트 증가
      </button>
      <br />
      <br />
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="아무거나 입력해보세요"
        className="rounded-md border-2 border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
      />
      <p>Text: {text}</p>
      <p>콘솔을 열어 useEffect 로그를 확인하세요.</p>
    </div>
  );
};

export default UseEffectExample;
