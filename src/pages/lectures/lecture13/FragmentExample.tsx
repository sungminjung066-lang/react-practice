import React from 'react';

// 1. Fragment가 필요한 이유: 여러 요소를 반환할 수 없음
// 아래 코드는 JSX 표현식에 부모 요소가 하나만 있어야 한다는 규칙을 위반하므로 오류를 발생시킵니다.
/*
function InvalidComponent() {
  return (
    <h2>제목</h2>
    <p>내용</p>
  );
}
*/

// 2. div로 감싸는 해결 방법
// 가장 일반적인 해결책이지만, 불필요한 div 태그가 DOM에 추가됩니다.
function DivWrapper() {
  return (
    <div>
      <h2 className="mt-6 mb-2 text-2xl font-bold">div로 감싼 컴포넌트</h2>
      <p>이 방법은 DOM에 불필요한 div를 추가합니다.</p>
    </div>
  );
}

// 3. React.Fragment 사용
// 불필요한 DOM 노드를 추가하지 않고 여러 요소를 그룹화할 수 있습니다.
function ReactFragmentWrapper() {
  return (
    <React.Fragment>
      <h2 className="mt-6 mb-2 text-2xl font-bold">React.Fragment로 감싼 컴포넌트</h2>
      <p>이 방법은 DOM에 추가 노드를 만들지 않습니다.</p>
    </React.Fragment>
  );
}

// 4. Fragment의 축약 문법 (<>) 사용
// React.Fragment와 동일하게 작동하지만 더 간결한 문법입니다.
// 단, key 속성을 전달해야 하는 경우에는 사용할 수 없습니다.
function ShortSyntaxWrapper() {
  return (
    <>
      <h2 className="mt-6 mb-2 text-2xl font-bold">
        Fragment 축약 문법(&lt;&gt;)으로 감싼 컴포넌트
      </h2>
      <p>가장 간결하고 일반적인 방법입니다.</p>
    </>
  );
}

type GlossaryItemProps = {
  id: number;
  term: string;
  description: string;
};

type GlossaryProps = {
  items: GlossaryItemProps[];
};

// 5. 배열을 렌더링할 때 key 속성과 함께 Fragment 사용
// 배열의 각 항목을 그룹화해야 하지만 추가 DOM 노드를 원하지 않을 때 유용합니다.
// 이 경우에는 축약 문법(<>)을 사용할 수 없고, 명시적으로 React.Fragment를 사용해야 합니다.
function Glossary({ items }: GlossaryProps) {
  return (
    <dl>
      {items.map((item) => (
        // `key`는 Fragment에 전달할 수 있는 유일한 속성입니다.
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}

function FragmentExample() {
  const glossaryItems: GlossaryItemProps[] = [
    { id: 1, term: 'React', description: '사용자 인터페이스를 만들기 위한 JavaScript 라이브러리' },
    {
      id: 2,
      term: 'Fragment',
      description: 'DOM에 추가 노드를 생성하지 않고 자식 목록을 그룹화하는 기능',
    },
  ];

  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold">React Fragment 예제</h1>
      <p>
        React 컴포넌트는 반드시 하나의 부모 요소로 감싸진 JSX를 반환해야 합니다. 이때 불필요한 DOM
        노드를 추가하지 않기 위해 Fragment를 사용합니다.
      </p>

      <hr />
      <DivWrapper />

      <hr />
      <ReactFragmentWrapper />

      <hr />
      <ShortSyntaxWrapper />

      <hr />
      <h2 className="mt-6 mb-2 text-2xl font-bold">key와 함께 Fragment 사용하기</h2>
      <Glossary items={glossaryItems} />
    </div>
  );
}

export default FragmentExample;
