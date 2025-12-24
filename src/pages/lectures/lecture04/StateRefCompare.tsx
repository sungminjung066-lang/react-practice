import React from 'react';

function StateRefCompare() {
  // useState: 값이 변경되면 리렌더링을 유발합니다.
  const [stateCount, setStateCount] = React.useState(0);

  // useRef: 값이 변경되어도 리렌더링을 유발하지 않습니다.
  const refCount = React.useRef(0);

  // 컴포넌트가 몇 번 렌더링되었는지 추적하기 위한 ref
  const renderCount = React.useRef(0);
  renderCount.current += 1;

  const handleStateIncrement = () => {
    setStateCount((prevCount) => prevCount + 1);
  };

  const handleRefIncrement = () => {
    refCount.current += 1;
    console.log('ref 카운트 값 (리렌더링 없음):', refCount.current);
  };

  return (
    <div className="rounded-lg border p-4 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">useState vs useRef 비교</h2>
      <p className="mb-4 text-lg">
        이 컴포넌트는 <span className="font-bold text-red-500">{renderCount.current}</span>번
        렌더링되었습니다.
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* useState 섹션 */}
        <div className="rounded border p-4">
          <h3 className="mb-2 text-xl font-semibold">useState</h3>
          <p className="mb-3">
            상태 값: <span className="font-mono text-xl text-blue-600">{stateCount}</span>
          </p>
          <button
            onClick={handleStateIncrement}
            className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            State 카운트 증가
          </button>
          <p className="mt-2 text-sm text-gray-600">
            버튼을 클릭하면 state가 변경되고, 컴포넌트가 리렌더링되어 화면의 값이 즉시
            업데이트됩니다.
          </p>
        </div>

        {/* useRef 섹션 */}
        <div className="rounded border p-4">
          <h3 className="mb-2 text-xl font-semibold">useRef</h3>
          <p className="mb-3">
            Ref 값: <span className="font-mono text-xl text-green-600">{refCount.current}</span>
          </p>
          <button
            onClick={handleRefIncrement}
            className="w-full rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            Ref 카운트 증가
          </button>
          <p className="mt-2 text-sm text-gray-600">
            버튼을 클릭해도 화면의 값은 바뀌지 않습니다. 하지만 값은 내부적으로 변경됩니다 (콘솔
            확인).
            <span className="font-bold">State 카운트</span>를 증가시켜 리렌더링을 유발하면 화면에
            반영된 것을 볼 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}

export default StateRefCompare;
