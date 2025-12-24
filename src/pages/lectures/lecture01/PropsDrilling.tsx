import React from 'react';

// 최종적으로 데이터를 사용할 손자 컴포넌트
function GrandChildComponent({ user }: { user: { name: string } }) {
  console.log('GrandChildComponent 렌더링');
  return (
    <div className="mt-2 rounded-lg border border-red-300 bg-red-100 p-4">
      <h4 className="font-semibold">손자 컴포넌트</h4>
      <p>'user' 데이터를 직접 사용합니다.</p>
      <p>안녕하세요, {user.name}님!</p>
    </div>
  );
}

// 중간에서 데이터를 전달만 하는 자식 컴포넌트
function ChildComponent({ user }: { user: { name: string } }) {
  console.log('ChildComponent 렌더링');
  return (
    <div className="mt-2 rounded-lg border border-yellow-300 bg-yellow-100 p-4">
      <h4 className="font-semibold">자식 컴포넌트</h4>
      <p>이 컴포넌트는 'user' 데이터를 직접 사용하지 않습니다.</p>
      <p>단지 손자 컴포넌트로 전달하기 위해 props를 받습니다. (Props Drilling!)</p>
      <GrandChildComponent user={user} />
    </div>
  );
}

// 최상위 부모 컴포넌트
function PropsDrilling() {
  const [user] = React.useState({ name: '김민준' });

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">1-2: Props Drilling의 문제점</h2>
      <div className="rounded-lg border border-blue-300 bg-blue-100 p-4">
        <h4 className="font-semibold">부모 컴포넌트</h4>
        <p>이곳에서 'user' state를 정의합니다.</p>
        <ChildComponent user={user} />
      </div>
      <div className="mt-4 rounded-lg bg-gray-100 p-4">
        <h3 className="text-lg font-bold">문제점 요약</h3>
        <p className="mt-2">
          - <b>불필요한 Props 전달:</b> `ChildComponent`는 `user` 데이터가 필요 없지만, 오직
          `GrandChildComponent`에 전달하기 위해 `user` prop을 받아야만 합니다.
        </p>
        <p className="mt-2">
          - <b>유지보수 어려움:</b> 만약 `user` 데이터의 구조가 변경되면, 이 데이터를 거쳐가는 모든
          컴포넌트의 코드를 수정해야 할 수 있습니다.
        </p>
        <p className="mt-2">
          - <b>재사용성 저하:</b> `ChildComponent`는 `user` prop에 의존하게 되어 다른 곳에서
          재사용하기 어려워집니다.
        </p>
        <p className="mt-4 text-gray-600">
          이러한 Props Drilling 문제를 해결하기 위해 `Context API`나 `상태 관리 라이브러리(Redux,
          Zustand 등)`를 사용할 수 있습니다.
        </p>
      </div>
    </div>
  );
}

export default PropsDrilling;
