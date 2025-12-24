import { useState } from 'react';
import NoPropDrillingExample from './NoPropDrillingExample';
import { useCountStore } from './store/useCountStore';

const ZustandExample = () => {
  const [activeTab, setActiveTab] = useState<'basic' | 'propDrilling'>('basic');
  const { count, increment, decrement, reset } = useCountStore();

  return (
    <div className="p-10">
      <div className="mb-6 flex space-x-4 border-b border-gray-200">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'basic'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('basic')}
        >
          기본 카운터
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'propDrilling'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('propDrilling')}
        >
          Prop Drilling 방지 예제
        </button>
      </div>

      {activeTab === 'basic' ? (
        <>
          <h1 className="text-3xl font-bold mb-6">Zustand 카운터 예제</h1>
      
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-md border border-gray-200">
            <div className="text-center mb-8">
              <p className="text-gray-500 mb-2">현재 카운트</p>
              <span className="text-6xl font-bold text-blue-600">{count}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <button
                onClick={increment}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded transition-colors"
              >
                + 증가
              </button>
              <button
                onClick={decrement}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded transition-colors"
              >
                - 감소
              </button>
            </div>
        
            <button
              onClick={reset}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded transition-colors"
            >
              초기화
            </button>
          </div>

          <div className="mt-8 max-w-md">
            <h2 className="text-xl font-semibold mb-3">왜 Zustand인가?</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>단순하고 비독단적인 상태 관리</li>
              <li>Redux보다 적은 보일러플레이트</li>
              <li>Provider 래퍼 불필요 (대부분의 경우)</li>
              <li>Hooks를 통한 간편한 사용</li>
            </ul>
          </div>
        </>
      ) : (
        <NoPropDrillingExample />
      )}
    </div>
  );
};

export default ZustandExample;
