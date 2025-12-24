import React from 'react';

import useDebounce from './hooks/useDebounce';
import useFetch from './hooks/useFetch';
import useLocalStorage from './hooks/useLocalStorage';
import useToggle from './hooks/useToggle';

// API 응답 타입
interface User {
  id: number;
  name: string;
  email: string;
}

// 모달 컴포넌트
function Modal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h3 className="mb-4 text-2xl font-bold">🎉 모달 창</h3>
        <p className="mb-6 text-gray-600">
          useToggle Hook을 사용하여 모달을 쉽게 관리할 수 있습니다.
        </p>
        <button
          onClick={onClose}
          className="w-full rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
        >
          닫기
        </button>
      </div>
    </div>
  );
}

function CustomHooksDemo() {
  // TODO: 1. useLocalStorage 사용 - 사용자 이름 저장
  const [name, setName] = useLocalStorage<string>('demo-name', '');

  // TODO: 2. useToggle 사용 - 모달 열기/닫기
  const modal = useToggle(false);

  // TODO: 3. useDebounce 사용 - 검색어 지연
  const [searchTerm, setSearchTerm] = React.useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // TODO: 4. useFetch 사용 - 사용자 데이터 가져오기
  const {
    data: users,
    loading,
    error,
    refetch,
  } = useFetch<User[]>('https://jsonplaceholder.typicode.com/users');

  // 검색 필터링
  const filteredUsers = React.useMemo(() => {
    if (!users) return [];
    if (!debouncedSearchTerm) return users;

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
    );
  }, [users, debouncedSearchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-800">🔧 Custom Hooks 데모</h1>

        {/* 1. useLocalStorage 데모 */}
        <section className="mb-8 rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">1️⃣ useLocalStorage</h2>
          <p className="mb-4 text-gray-600">
            localStorage에 데이터를 저장하고 불러옵니다. 페이지를 새로고침해도 데이터가 유지됩니다.
          </p>
          <div className="flex gap-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력하세요..."
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
            <button
              onClick={() => setName('')}
              className="rounded-lg bg-red-500 px-6 py-2 font-semibold text-white hover:bg-red-600"
            >
              초기화
            </button>
          </div>
          {name && (
            <p className="mt-4 text-lg">
              안녕하세요, <span className="font-bold text-blue-600">{name}</span>님! 👋
            </p>
          )}
        </section>

        {/* 2. useToggle 데모 */}
        <section className="mb-8 rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">2️⃣ useToggle</h2>
          <p className="mb-4 text-gray-600">
            boolean 상태를 쉽게 토글하고 명시적으로 설정할 수 있습니다.
          </p>
          <div className="flex gap-4">
            <button
              onClick={modal.toggle}
              className="rounded-lg bg-blue-500 px-6 py-2 font-semibold text-white hover:bg-blue-600"
            >
              모달 토글
            </button>
            <button
              onClick={modal.setTrue}
              className="rounded-lg bg-green-500 px-6 py-2 font-semibold text-white hover:bg-green-600"
            >
              모달 열기
            </button>
            <button
              onClick={modal.setFalse}
              className="rounded-lg bg-gray-500 px-6 py-2 font-semibold text-white hover:bg-gray-600"
            >
              모달 닫기
            </button>
          </div>
          <p className="mt-4">
            현재 모달 상태: <span className="font-bold">{modal.value ? '열림 ✅' : '닫힘 ❌'}</span>
          </p>
          <Modal isOpen={modal.value} onClose={modal.setFalse} />
        </section>

        {/* 3. useDebounce 데모 */}
        <section className="mb-8 rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">3️⃣ useDebounce</h2>
          <p className="mb-4 text-gray-600">
            입력값을 지연시켜 불필요한 API 호출이나 무거운 계산을 줄입니다.
          </p>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="검색어를 입력하세요..."
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
          />
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-red-50 p-4">
              <p className="mb-2 font-semibold text-red-700">즉시 업데이트:</p>
              <p className="text-lg">{searchTerm || '(입력 없음)'}</p>
            </div>
            <div className="rounded-lg bg-green-50 p-4">
              <p className="mb-2 font-semibold text-green-700">지연 업데이트 (500ms):</p>
              <p className="text-lg">{debouncedSearchTerm || '(입력 없음)'}</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            💡 빠르게 타이핑해보세요. 오른쪽 값은 500ms 후에 업데이트됩니다.
          </p>
        </section>

        {/* 4. useFetch 데모 */}
        <section className="rounded-lg bg-white p-6 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">4️⃣ useFetch</h2>
            <button
              onClick={refetch}
              className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
            >
              <span>🔄</span>
              <span>새로고침</span>
            </button>
          </div>
          <p className="mb-4 text-gray-600">
            API 호출을 쉽게 만들고 로딩, 에러, 데이터 상태를 자동으로 관리합니다.
            {debouncedSearchTerm && ' 위에서 입력한 검색어로 필터링됩니다.'}
          </p>

          {loading && (
            <div className="py-8 text-center">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
              <p className="mt-4 text-gray-600">데이터를 불러오는 중...</p>
            </div>
          )}

          {error && (
            <div className="rounded-lg bg-red-50 p-4 text-center text-red-600">❌ {error}</div>
          )}

          {!loading && !error && filteredUsers && (
            <>
              <p className="mb-4 text-sm text-gray-600">
                총 {filteredUsers.length}명의 사용자 {debouncedSearchTerm && '(필터링됨)'}
              </p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md"
                  >
                    <h3 className="mb-2 font-bold text-gray-800">{user.name}</h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default CustomHooksDemo;
