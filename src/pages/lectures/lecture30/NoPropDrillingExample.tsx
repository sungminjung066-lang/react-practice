import { useTextStore } from './store/useTextStore';

const GrandParent = () => {
  const { text, setText } = useTextStore();
  return (
    <div className="rounded-lg border-2 border-purple-500 bg-orange-50 p-6">
      <h3 className="mb-4 text-xl font-bold text-purple-700">GrandParent Component</h3>
      <p className="mb-4 text-gray-600">
        나는 자식(Parent)에게 아무런 props도 전달하지 않습니다.
        <br />
        (I pass no props to my child.)
      </p>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Zustand Store 값 입력
        </label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="mb-4 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
          placeholder="여기에 입력하세요..."
        />
      </div>
      <Parent />
    </div>
  );
};

const Parent = () => {
  return (
    <div className="ml-6 rounded-lg border-2 border-blue-500 bg-blue-50 p-6">
      <h3 className="mb-4 text-lg font-bold text-blue-700">Parent Component</h3>
      <p className="mb-4 text-gray-600">
        나 또한 자식(Child)에게 아무런 props도 전달하지 않습니다.
      </p>
      <Child />
    </div>
  );
};

const Child = () => {
  return (
    <div className="ml-6 rounded-lg border-2 border-green-500 bg-green-50 p-6">
      <h3 className="text-md mb-4 font-bold text-green-700">Child Component</h3>
      <p className="mb-4 text-gray-600">
        나도 자식(GrandChild)에게 아무런 props도 전달하지 않습니다.
      </p>
      <GrandChild />
    </div>
  );
};

const GrandChild = () => {
  // Zustand store에서 직접 상태를 가져옵니다.
  // 중간 컴포넌트들을 거치지 않고 바로 데이터에 접근할 수 있습니다.
  const { text } = useTextStore();

  return (
    <div className="ml-6 rounded-lg border-2 border-red-500 bg-red-50 p-6">
      <h3 className="mb-4 text-sm font-bold text-red-700">GrandChild Component</h3>
      <div className="space-y-4">
        <div className="rounded border border-gray-200 bg-white p-3">
          <p className="mb-1 text-xs text-gray-500">현재 Store 값:</p>
          <p className="text-lg font-bold text-red-600">{text || '(비어있음)'}</p>
        </div>
      </div>
    </div>
  );
};

const NoPropDrillingExample = () => {
  return (
    <div className="p-10">
      <h1 className="mb-6 text-3xl font-bold">Prop Drilling 없는 상태 관리</h1>

      <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">구조 설명</h2>
          <p className="leading-relaxed text-gray-700">
            아래 컴포넌트 구조는{' '}
            <strong>
              GrandParent {'->'} Parent {'->'} Child {'->'} GrandChild
            </strong>{' '}
            로 이루어져 있습니다.
            <br />
            일반적인 React 데이터 흐름이라면 최상위에서 최하위까지 props를 계속 전달해야 하지만(Prop
            Drilling),
            <br />
            Zustand를 사용하면 <strong>GrandChild</strong>가 Store에 직접 접근하여 데이터를 읽고 쓸
            수 있습니다.
          </p>
        </div>

        <GrandParent />
      </div>
    </div>
  );
};

export default NoPropDrillingExample;
