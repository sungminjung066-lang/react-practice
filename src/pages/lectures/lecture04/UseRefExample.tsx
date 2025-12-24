import React from 'react';

function UseRefExample() {
  // 1. DOM 요소에 접근하기 위한 ref
  const inputRef = React.useRef<HTMLInputElement>(null);

  // 2. 리렌더링을 유발하지 않는 값을 저장하기 위한 ref
  const countRef = React.useRef(0);

  React.useEffect(() => {
    // 컴포넌트가 마운트될 때 input 요소에 포커스를 줍니다.
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleFocusClick = () => {
    // 버튼 클릭 시 input 요소에 포커스를 줍니다.
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleIncrementClick = () => {
    // ref 값을 변경해도 컴포넌트는 리렌더링되지 않습니다.
    countRef.current += 1;
    console.log('카운트 (ref):', countRef.current);
  };

  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-bold">useRef 예제 2</h2>

      <div className="mb-6">
        <h3 className="mb-2 text-xl font-semibold">1. DOM 요소 접근</h3>
        <input
          ref={inputRef}
          type="text"
          className="mr-2 rounded border p-2"
          placeholder="여기에 포커스를 맞춰보세요"
        />
        <button onClick={handleFocusClick} className="rounded bg-blue-500 px-4 py-2 text-white">
          포커스 주기
        </button>
      </div>

      <div>
        <h3 className="mb-2 text-xl font-semibold">2. 리렌더링 없는 값 저장</h3>
        <p className="mb-2">
          카운트 (ref 값): {countRef.current} (이 값은 리렌더링 전까지 업데이트되지 않습니다)
        </p>
        <button
          onClick={handleIncrementClick}
          className="rounded bg-green-500 px-4 py-2 text-white"
        >
          카운트 증가 (콘솔 확인)
        </button>
        <p className="mt-2 text-sm text-gray-600">
          버튼을 클릭해도 화면의 카운트 값은 변하지 않지만, 콘솔에는 증가된 값이 기록됩니다.
        </p>
      </div>
    </div>
  );
}

export default UseRefExample;
