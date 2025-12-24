// JSX (JavaScript XML)는 JavaScript를 확장한 문법입니다.
// React에서는 UI가 어떻게 생겨야 하는지를 설명하기 위해 JSX 사용을 권장합니다.
// JSX는 브라우저가 이해할 수 있는 JavaScript 코드로 변환됩니다.

type User = { firstName: string; lastName: string };

function JsxSyntaxExample() {
  // 1. JavaScript 표현식 포함하기
  // 중괄호 `{}`를 사용하여 JSX 내부에 유효한 모든 JavaScript 표현식을 포함할 수 있습니다.
  const name = 'React';
  const user = {
    firstName: 'John',
    lastName: 'Doe',
  };
  const formatName = (user: User) => {
    return user.firstName + ' ' + user.lastName;
  };

  // 2. JSX도 표현식입니다.
  // 컴파일이 끝나면 JSX 표현식은 일반 JavaScript 함수 호출이 되며 JavaScript 객체로 인식됩니다.
  // 따라서 if 구문 및 for loop 안에 JSX를 사용하고, 변수에 할당하고, 인자로서 받아들이고, 함수로부터 반환할 수 있습니다.
  const getGreeting = (user: User) => {
    if (user) {
      return <h1>Hello, {formatName(user)}!</h1>; // 함수에서 JSX 반환
    }
    return <h1>Hello, Stranger.</h1>;
  };
  const greetingElement = getGreeting(user); // 변수에 JSX 할당

  // 3. 속성(Attribute) 지정
  // HTML 속성과 유사하지만, JavaScript 예약어와 충돌을 피하기 위해 camelCase를 사용합니다.
  // 예를 들어, HTML의 `class`는 JSX에서 `className`이 됩니다.
  const elementWithClass = <div className="greeting">Hello, world!</div>;
  const imageUrl = 'https://via.placeholder.com/150'; // 변수를 속성 값으로 사용

  // 4. 빈 태그는 반드시 스스로 닫아야 합니다.
  // `<br>`과 같은 태그는 JSX에서 `<br />`처럼 작성해야 합니다.
  const selfClosingTag = <img src={imageUrl} alt="placeholder" />;

  // 5. 주석 사용
  // JSX 내에서 주석을 사용할 때는 중괄호로 감싸야 합니다.
  const elementWithComment = (
    <div>
      {/* 이것은 JSX 주석입니다. */}
      Hello, world!
    </div>
  );

  // 6. 조건부 렌더링
  const isLoggedIn = true;

  // 7. 배열 렌더링 (map 사용)
  const numbers = [1, 2, 3, 4, 5];
  const listItems = numbers.map((number) => (
    // 배열을 렌더링할 때는 각 항목에 고유한 `key` 속성을 제공해야 합니다.
    <li key={number.toString()}>{number}</li>
  ));

  return (
    <div style={{ padding: '20px' }}>
      <h1 className="mb-4 text-3xl font-bold">JSX 문법 예제</h1>

      <h2 className="mt-6 mb-2 text-2xl font-bold">1. JavaScript 표현식 사용</h2>
      <p>Hello, {name}!</p>
      <p>Full Name: {formatName(user)}</p>

      <h2 className="mt-6 mb-2 text-2xl font-bold">2. JSX를 표현식으로 사용</h2>
      {greetingElement}

      <h2 className="mt-6 mb-2 text-2xl font-bold">3. 속성(Attribute) 지정</h2>
      {elementWithClass}

      <h2 className="mt-6 mb-2 text-2xl font-bold">4. 빈 태그는 반드시 스스로 닫아야 함</h2>
      {selfClosingTag}

      <h2 className="mt-6 mb-2 text-2xl font-bold">5. 주석</h2>
      {elementWithComment}

      <h2 className="mt-6 mb-2 text-2xl font-bold">6. 조건부 렌더링</h2>
      <div>
        {isLoggedIn ? <p>Welcome back!</p> : <p>Please log in.</p>}
        {isLoggedIn && <p>You are logged in.</p>}
      </div>

      <h2 className="mt-6 mb-2 text-2xl font-bold">7. 배열 렌더링</h2>
      <ul>{listItems}</ul>
    </div>
  );
}

export default JsxSyntaxExample;
