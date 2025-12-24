import React from 'react';

// TODO: User 타입 정의
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  address: {
    city: string;
  };
  company: {
    name: string;
  };
}

// 로딩 스피너 컴포넌트
function LoadingSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        <p className="mt-4 text-lg text-gray-600">사용자 정보를 불러오는 중...</p>
      </div>
    </div>
  );
}

// TODO: ErrorMessage 컴포넌트
// Props: message (string), onRetry (함수)
function ErrorMessage({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="max-w-md rounded-lg bg-red-50 p-6 text-center">
        <div className="mb-4 text-5xl">❌</div>
        <h2 className="mb-2 text-xl font-bold text-red-700">오류가 발생했습니다</h2>
        <p className="mb-4 text-red-600">{message}</p>
        <button
          onClick={onRetry}
          className="rounded-lg bg-red-500 px-6 py-2 font-semibold text-white hover:bg-red-600"
        >
          다시 시도
        </button>
      </div>
    </div>
  );
}

// TODO: UserCard 컴포넌트
// Props: user (User 타입)
function UserCard({ user }: { user: User }) {
  return (
    <div className="transform rounded-lg bg-white p-6 shadow-md transition-all hover:scale-105 hover:shadow-xl">
      {/* 프로필 아이콘 */}
      <div className="mb-4 flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-3xl text-white">
          👤
        </div>
      </div>
      
      {/* 사용자 정보 */}
      <h3 className="mb-3 text-center text-xl font-bold text-gray-800">{user.name}</h3>
      
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-start">
          <span className="mr-2">📧</span>
          <span className="break-all">{user.email}</span>
        </div>
        <div className="flex items-start">
          <span className="mr-2">📞</span>
          <span>{user.phone}</span>
        </div>
        <div className="flex items-start">
          <span className="mr-2">🌐</span>
          <span className="break-all">{user.website}</span>
        </div>
        <div className="flex items-start">
          <span className="mr-2">🏙️</span>
          <span>{user.address.city}</span>
        </div>
        <div className="flex items-start">
          <span className="mr-2">🏢</span>
          <span>{user.company.name}</span>
        </div>
      </div>
    </div>
  );
}

// 메인 컴포넌트
function UserListApp() {
  // TODO: 상태 관리
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>('');
  
  // TODO: 사용자 데이터 가져오기 함수
  const fetchUsers = async () => {
    // 여기에 코드를 작성하세요
    // 1. 로딩 상태를 true로 설정
    // 2. 에러 상태를 초기화
    // 3. try-catch로 API 호출
    // 4. 성공 시 users 상태 업데이트
    // 5. 실패 시 error 상태 업데이트
    // 6. finally에서 로딩 상태를 false로 설정
    
    try {
      setLoading(true);
      setError('');
      
      // API 호출
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      
      if (!response.ok) {
        throw new Error('데이터를 불러오는데 실패했습니다.');
      }
      
      const data: User[] = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };
  
  // TODO: useEffect로 컴포넌트 마운트 시 데이터 가져오기
  React.useEffect(() => {
    fetchUsers();
  }, []); // 빈 배열: 마운트 시 한 번만 실행
  
  // TODO: 조건부 렌더링
  // 로딩 중일 때
  if (loading) {
    return <LoadingSpinner />;
  }
  
  // 에러가 있을 때
  if (error) {
    return <ErrorMessage message={error} onRetry={fetchUsers} />;
  }
  
  // 정상적으로 데이터를 불러왔을 때
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
      <div className="mx-auto max-w-7xl">
        {/* 헤더 */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">👥 User Directory</h1>
            <p className="mt-2 text-gray-600">총 {users.length}명의 사용자</p>
          </div>
          <button
            onClick={fetchUsers}
            className="flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:bg-blue-600 hover:shadow-xl"
          >
            <span>🔄</span>
            <span>새로고침</span>
          </button>
        </div>
        
        {/* 사용자 카드 그리드 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserListApp;

