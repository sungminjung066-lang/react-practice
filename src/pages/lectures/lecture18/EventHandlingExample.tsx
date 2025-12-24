import React from 'react';

// React의 이벤트 처리는 DOM의 이벤트 처리 방식과 매우 유사하지만 몇 가지 차이점이 있습니다.
// 1. 이벤트 이름은 camelCase를 사용합니다. (예: onclick -> onClick)
// 2. 이벤트 핸들러에는 문자열이 아닌 함수를 전달합니다.
// 3. React는 모든 이벤트를 포괄하는 합성 이벤트(SyntheticEvent) 객체를 전달합니다.

function EventHandlingExample() {
  const [inputValue, setInputValue] = React.useState('');
  const [message, setMessage] = React.useState('');

  // 1. 기본적인 이벤트 핸들러
  // 버튼 클릭 시 호출될 함수입니다.
  const handleSimpleClick = () => {
    alert('기본 버튼이 클릭되었습니다!');
  };

  // 2. 인자(argument)를 전달하는 이벤트 핸들러
  // 이벤트 핸들러에 특정 값을 전달해야 할 경우, JSX에서 화살표 함수로 감싸서 호출합니다.
  const handleArgumentClick = (id: number, msg: string) => {
    alert(`ID: ${id}, 메시지: ${msg}`);
  };

  // 3. 이벤트 객체(SyntheticEvent) 사용하기
  // input의 내용이 변경될 때마다 호출됩니다.
  // React는 브라우저의 기본 이벤트를 한번 감싼 SyntheticEvent 객체를 전달합니다.
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // event.target.value를 통해 input의 현재 값을 가져올 수 있습니다.
    setInputValue(event.target.value);
  };

  // 4. 기본 동작 방지 (Preventing Default Behavior)
  // form 제출 시 페이지가 새로고침되는 기본 동작을 막습니다.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // form의 기본 제출 동작을 방지
    setMessage(`'${inputValue}'(이)가 제출되었습니다.`);
  };

  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold">React 이벤트 처리 예제</h1>

      {/* 예제 1: 간단한 onClick 이벤트 */}
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">1. 기본 이벤트 핸들러</h2>
        <button
          onClick={handleSimpleClick}
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          클릭하세요
        </button>
      </div>

      {/* 예제 2: 인자를 전달하는 onClick 이벤트 */}
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">2. 인자를 전달하는 핸들러</h2>
        <button
          // 이렇게 화살표 함수 안에서 호출해야 렌더링 시점이 아닌, 클릭 시점에 함수가 실행됩니다.
          onClick={() => handleArgumentClick(123, '안녕하세요!')}
          className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
        >
          인자와 함께 클릭
        </button>
      </div>

      {/* 예제 3 & 4: form 이벤트 (onChange, onSubmit) */}
      <div>
        <h2 className="mb-2 text-xl font-semibold">3. Form 이벤트 (onChange, onSubmit)</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="textInput" className="mr-2">
            텍스트 입력:
          </label>
          <input
            type="text"
            id="textInput"
            value={inputValue}
            onChange={handleInputChange}
            className="rounded border border-gray-400 p-2"
            placeholder="여기에 입력..."
          />
          <button
            type="submit"
            className="ml-2 rounded bg-purple-500 px-4 py-2 font-bold text-white hover:bg-purple-700"
          >
            제출
          </button>
        </form>
        {message && <p className="mt-4 text-lg text-gray-700">{message}</p>}
      </div>
    </div>
  );
}

export default EventHandlingExample;
