import React from 'react';

import { Link } from 'react-router-dom';

// 강의 데이터 배열
const lectures = [
  {
    id: '1-1',
    title: 'State & Props 소개',
    path: '/lecture/1-1',
    category: '1. ContextAPI: Props 대체와 전역 데이터 관리',
  },
  {
    id: '1-2',
    title: 'Props Drilling 문제점',
    path: '/lecture/1-2',
    category: '1. ContextAPI: Props 대체와 전역 데이터 관리',
  },
  {
    id: '1-3',
    title: 'ContextAPI 기초',
    path: '/lecture/1-3',
    category: '1. ContextAPI: Props 대체와 전역 데이터 관리',
  },
  {
    id: '2',
    title: '상태(State) 사용법',
    path: '/lecture/2',
    category: '2. Hook Basic - useState로 컴포넌트 상태 관리',
  },
  {
    id: '3-1',
    title: 'Document Metadata 지원(SEO 최적화 예제)',
    path: '/lecture/3-1',
    category: '3. React 19 업데이트 가이드',
  },
  {
    id: '3-2',
    title: 'useActionState 소개',
    path: '/lecture/3-2',
    category: '3. React 19 업데이트 가이드',
  },
  {
    id: '3-3',
    title: 'use 소개',
    path: '/lecture/3-3',
    category: '3. React 19 업데이트 가이드',
  },
  {
    id: '3-3',
    title: 'Go exercising',
    path: '/lecture/3-exercise/exercise01',
    category: '[실습문제] Todo List',
  },
  {
    id: '4-1',
    title: 'useRef의 역할과 기본 사용법',
    path: '/lecture/4-1',
    category: '4. React Hooks: useRef 심층 탐구',
  },
  {
    id: '4-2',
    title: 'useRef과 useState 비교',
    path: '/lecture/4-2',
    category: '4. React Hooks: useRef 심층 탐구',
  },
  {
    id: '5',
    title: 'React Router 예제',
    path: '/lecture/5',
    category: '5. React Router: 동적 라우팅과 중첩 라우팅',
  },
  {
    id: '6-1',
    title: 'useCallback 사용법',
    path: '/lecture/6-1',
    category: '6. React useCallback 완벽 이해',
  },
  {
    id: '6-2',
    title: 'useMemo 사용법',
    path: '/lecture/6-2',
    category: '6. React useCallback 완벽 이해',
  },
  {
    id: '7-1',
    title: '조건부 렌더링 - if/else',
    path: '/lecture/7-1',
    category: '7. React 조건부 렌더링',
  },
  {
    id: '7-2',
    title: '조건부 렌더링 - 삼항연산자',
    path: '/lecture/7-2',
    category: '7. React 조건부 렌더링',
  },
  {
    id: '7-3',
    title: '조건부 렌더링 - && || 연산자',
    path: '/lecture/7-3',
    category: '7. React 조건부 렌더링',
  },
  {
    id: '9-1',
    title: 'React Hooks: useEffect 사용법',
    path: '/lecture/9-1',
    category: '9. useMemo 훅과 성능 최적화',
  },
  {
    id: '9-2',
    title: 'useMemo와 useEffect의 차이',
    path: '/lecture/9-2',
    category: '9. useMemo 훅과 성능 최적화',
  },
  {
    id: '9-3',
    title: 'Go exercising',
    path: '/lecture/9-exercise/exercise02',
    category: '[실습문제] User List',
  },
  {
    id: '10',
    title: 'lazy initialization',
    path: '/lecture/10',
    category: '10. useState 게으른 초기화: 효율적인 상태 관리',
  },
  {
    id: '13',
    title: '<React.Fragment />',
    path: '/lecture/13',
    category: '13. 리액트 Fragment 활용',
  },
  {
    id: '14',
    title: 'JSX란?',
    path: '/lecture/14',
    category: '14. 리액트 JSX 문법과 활용',
  },
  {
    id: '15-1',
    title: 'React.useContext',
    path: '/lecture/15',
    category: '15. 리액트 useContext 훅 완벽 활용 가이드',
  },
  {
    id: '15-2',
    title: 'Go exercising',
    path: '/lecture/15-exercise/exercise03',
    category: '[실습문제] Theme App',
  },
  {
    id: '16-1',
    title: 'CSS Modules',
    path: '/lecture/16-1',
    category: '16. 리액트 스타일링',
  },
  {
    id: '16-2',
    title: 'Tailwind CSS',
    path: '/lecture/16-2',
    category: '16. 리액트 스타일링',
  },
  {
    id: '18',
    title: '이벤트 처리',
    path: '/lecture/18',
    category: '18. 리액트 이벤트 처리 가이드',
  },
  {
    id: '19',
    title: 'key prop',
    path: '/lecture/19',
    category: '19. 리액트 컴포넌트 리스트와 Key 활용',
  },
  {
    id: '20',
    title: '쇼핑몰 UI',
    path: '/lecture/20',
    category: '20. 리액트 컴포넌트 실용 예제',
  },
  {
    id: '22-1',
    title: 'Custom Hook',
    path: '/lecture/22',
    category: '22. 커스텀 훅: 재사용 가능한 로직 분리',
  },
  {
    id: '22-2',
    title: 'Go exercising',
    path: '/lecture/22-exercise/exercise04',
    category: '[실습문제] Custom Hooks',
  },
  {
    id: '23',
    title: 'Lifecycle',
    path: '/lecture/23',
    category: '23. 클래스 컴포넌트 라이프사이클',
  },
  {
    id: '24',
    title: 'React Hook Flow',
    path: '/lecture/24',
    category: '24. 함수형 컴포넌트의 React Hook Flow',
  },
  {
    id: '25',
    title: '합성 컴포넌트',
    path: '/lecture/25',
    category: '25. 합성 컴포넌트: 재사용과 구조화',
  },
  {
    id: '26-1',
    title: 'useEffect',
    path: '/lecture/26',
    category: '26. 훅 useEffect 활용',
  },
  {
    id: '26-2',
    title: 'Go exercising',
    path: '/lecture/26-exercise/exercise05',
    category: '[실습문제] Shopping App',
  },
  {
    id: '27-1',
    title: 'React Hook Form - 기본 사용법',
    path: '/lecture/27-1',
    category: '[부록] 27. React Hook Form: 효율적인 폼 관리',
  },
  {
    id: '27-2',
    title: 'React Hook Form - 유효성 검사',
    path: '/lecture/27-2',
    category: '[부록] 27. React Hook Form: 효율적인 폼 관리',
  },
  {
    id: '27-3',
    title: 'React Hook Form - Watch & 조건부 필드',
    path: '/lecture/27-3',
    category: '[부록] 27. React Hook Form: 효율적인 폼 관리',
  },
  {
    id: '27-4',
    title: 'React Hook Form - 동적 필드',
    path: '/lecture/27-4',
    category: '[부록] 27. React Hook Form: 효율적인 폼 관리',
  },
  {
    id: '27-5',
    title: 'React Hook Form - 종합 예제',
    path: '/lecture/27-5',
    category: '[부록] 27. React Hook Form: 효율적인 폼 관리',
  },
  {
    id: '28-1',
    title: 'TanStack Query - 기본 사용법',
    path: '/lecture/28-1',
    category: '[부록] 28. TanStack Query: 서버 상태 관리',
  },
  {
    id: '28-2',
    title: 'TanStack Query - useMutation',
    path: '/lecture/28-2',
    category: '[부록] 28. TanStack Query: 서버 상태 관리',
  },
  {
    id: '28-3',
    title: 'TanStack Query - Pagination',
    path: '/lecture/28-3',
    category: '[부록] 28. TanStack Query: 서버 상태 관리',
  },
  {
    id: '28-4',
    title: 'TanStack Query - Query Keys & Cache',
    path: '/lecture/28-4',
    category: '[부록] 28. TanStack Query: 서버 상태 관리',
  },
  {
    id: '28-5',
    title: 'TanStack Query - Optimistic Updates',
    path: '/lecture/28-5',
    category: '[부록] 28. TanStack Query: 서버 상태 관리',
  },
  {
    id: '29',
    title: 'Zustand: 상태 관리 라이브러리',
    path: '/lecture/29',
    category: '[부록] 29. Zustand: 상태 관리 라이브러리',
  },
];

// 카테고리별로 강의 그룹화
const groupedLectures = lectures.reduce(
  (acc, lecture) => {
    const { category } = lecture;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(lecture);
    return acc;
  },
  {} as Record<string, typeof lectures>,
);

const Home: React.FC = () => {
  return (
    <div className="rounded-lg bg-white p-8 shadow-md">
      <h2 className="mb-4 border-b border-gray-200 pb-2 text-2xl font-bold">React 강의 목록</h2>
      {Object.entries(groupedLectures).map(([category, lecturesInCategory]) => (
        <div key={category} className="mb-4">
          <h3 className="text-xl font-semibold">{category}</h3>
          <ul className="ml-4 list-disc">
            {lecturesInCategory.map((lecture) => (
              <li key={lecture.id} className="mt-2">
                <Link to={lecture.path} className="text-blue-500 hover:underline">
                  {lecture.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Home;
