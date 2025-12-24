import React from 'react';

// 복잡한 계산을 흉내 내는 함수
const expensiveCalculation = (num: number) => {
  console.log('🔄 복잡한 계산 중...');
  // 실제로는 더 복잡한 계산이 될 수 있습니다.
  // eslint-disable-next-line no-empty
  for (let i = 0; i < 10; i++) {}
  return num * 2;
};

const MemoVsEffect = () => {
  const [count, setCount] = React.useState(0);
  const [text, setText] = React.useState('');

  // --- useMemo 사용 ---
  // '값'을 메모이제이션(기억)합니다.
  // 의존성 배열 [count]의 값이 변경될 때만 expensiveCalculation 함수를 실행하고
  // 그 '결과값'을 memoizedValue에 저장합니다.
  // 텍스트만 변경되는 리렌더링에서는 함수를 다시 실행하지 않고 이전에 저장된 값을 재사용합니다.
  const memoizedValue = React.useMemo(() => {
    return expensiveCalculation(count);
  }, [count]);

  // --- useEffect 사용 ---
  // '사이드 이펙트'(부수 효과)를 실행합니다.
  // 의존성 배열 [count]의 값이 변경된 '후에' 콜백 함수 안의 로직을 실행합니다.
  // 렌더링 자체에 직접적인 영향을 주지 않습니다. (예: API 호출, 로깅, DOM 조작 등)
  React.useEffect(() => {
    console.log(`✨ useEffect 실행: count 값이 ${count}(으)로 변경되었습니다.`);
    // 이 곳에서 API를 호출하거나, 다른 부수적인 작업을 수행할 수 있습니다.
  }, [count]);

  console.log('Rendering');
  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-bold">useMemo vs useEffect</h2>

      <div className="rounded-lg border p-4">
        <h3 className="text-xl font-semibold">useMemo 예제</h3>
        <p className="mt-2">
          복잡한 계산 결과 (count * 2):{' '}
          <span className="font-bold text-blue-600">{memoizedValue}</span>
        </p>
        <p className="mt-1 text-sm text-gray-600">
          '카운트 증가' 버튼을 누를 때만 콘솔에 '복잡한 계산 중...' 로그가 나타납니다.
        </p>
      </div>

      <div className="mt-4 rounded-lg border p-4">
        <h3 className="text-xl font-semibold">useEffect 예제</h3>
        <p className="mt-2 text-sm text-gray-600">
          '카운트 증가' 버튼을 누를 때만 콘솔에 'useEffect 실행...' 로그가 나타납니다.
        </p>
      </div>

      <div className="mt-6">
        <button
          onClick={() => setCount(count + 1)}
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          카운트 증가
        </button>
        <p className="mt-2">Current Count: {count}</p>
      </div>

      <div className="mt-6">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="텍스트를 입력하세요"
          className="w-full rounded-md border-2 border-gray-300 p-2"
        />
        <p className="mt-2">Current Text: {text}</p>
        <p className="mt-1 text-sm text-gray-600">
          텍스트를 입력해도 '복잡한 계산'이나 'useEffect'는 다시 실행되지 않습니다.
        </p>
      </div>

      <div className="mt-6 rounded-lg border border-yellow-300 bg-yellow-100 p-4">
        <h3 className="font-bold">핵심 차이점:</h3>
        <ul className="mt-2 list-inside list-disc">
          <li>
            <b>useMemo:</b> 렌더링 중 실행, 계산 비용이 큰 함수의 '결과값'을 재사용하기 위해 사용.
            (메모이제이션)
          </li>
          <li>
            <b>useEffect:</b> 렌더링 후 실행, 컴포넌트의 상태와 관련 없는 '부수 효과'(Side Effect)를
            수행하기 위해 사용.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MemoVsEffect;
