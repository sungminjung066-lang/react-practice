import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

// 폼 데이터 타입 정의
interface FormData {
  username: string;
  email: string;
  age: number;
}

/**
 * React Hook Form 기본 사용법
 * 
 * 핵심 개념:
 * 1. useForm() - 폼 관리 Hook
 * 2. register() - 입력 필드 등록
 * 3. handleSubmit() - 폼 제출 핸들러
 * 4. formState - 폼 상태 정보
 */
function BasicFormExample() {
  // useForm Hook 사용
  const {
    register,       // 입력 필드를 등록하는 함수
    handleSubmit,   // 폼 제출 핸들러를 만드는 함수
    formState: { errors, isSubmitting }, // 폼 상태
    reset,          // 폼 초기화 함수
  } = useForm<FormData>();

  // 제출 핸들러
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('제출된 데이터:', data);
    alert(`환영합니다, ${data.username}님!\n이메일: ${data.email}\n나이: ${data.age}`);
    
    // 폼 초기화 (선택사항)
    reset();
  };

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">
          React Hook Form - 기본 사용법
        </h1>
        <p className="text-gray-600">
          가장 간단한 폼 예제입니다. register를 사용하여 입력 필드를 등록합니다.
        </p>
      </div>

      {/* 폼 */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-lg bg-white p-8 shadow-md">
        {/* 사용자 이름 */}
        <div>
          <label htmlFor="username" className="mb-2 block font-medium text-gray-700">
            사용자 이름
          </label>
          <input
            id="username"
            type="text"
            {...register('username', {
              required: '사용자 이름을 입력해주세요',
              minLength: {
                value: 2,
                message: '최소 2자 이상 입력해주세요',
              },
            })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            placeholder="홍길동"
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
          )}
        </div>

        {/* 이메일 */}
        <div>
          <label htmlFor="email" className="mb-2 block font-medium text-gray-700">
            이메일
          </label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: '이메일을 입력해주세요',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '올바른 이메일 형식이 아닙니다',
              },
            })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            placeholder="example@email.com"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>

        {/* 나이 */}
        <div>
          <label htmlFor="age" className="mb-2 block font-medium text-gray-700">
            나이
          </label>
          <input
            id="age"
            type="number"
            {...register('age', {
              required: '나이를 입력해주세요',
              min: {
                value: 1,
                message: '나이는 1 이상이어야 합니다',
              },
              max: {
                value: 150,
                message: '나이는 150 이하여야 합니다',
              },
              valueAsNumber: true, // 문자열이 아닌 숫자로 변환
            })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            placeholder="25"
          />
          {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>}
        </div>

        {/* 제출 버튼 */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? '제출 중...' : '제출하기'}
          </button>

          <button
            type="button"
            onClick={() => reset()}
            className="rounded-lg bg-gray-200 px-6 py-3 font-medium text-gray-700 hover:bg-gray-300"
          >
            초기화
          </button>
        </div>
      </form>

      {/* 설명 */}
      <div className="mt-8 rounded-lg bg-blue-50 p-6">
        <h3 className="mb-3 font-bold text-blue-900">💡 핵심 포인트</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>
            <strong>register:</strong> <code>{`{...register('fieldName')}`}</code>로 입력 필드 등록
          </li>
          <li>
            <strong>validation:</strong> register의 두 번째 인자로 검증 규칙 전달
          </li>
          <li>
            <strong>errors:</strong> formState.errors로 에러 메시지 접근
          </li>
          <li>
            <strong>handleSubmit:</strong> 유효성 검사 통과 시에만 onSubmit 실행
          </li>
          <li>
            <strong>isSubmitting:</strong> 제출 중 상태 확인 (중복 제출 방지)
          </li>
          <li>
            <strong>reset:</strong> 폼을 초기 상태로 되돌림
          </li>
        </ul>
      </div>

      {/* 코드 예시 */}
      <div className="mt-8 rounded-lg bg-gray-50 p-6">
        <h3 className="mb-3 font-bold text-gray-900">📝 코드 예시</h3>
        <pre className="overflow-x-auto rounded bg-gray-800 p-4 text-sm text-white">
          {`const { register, handleSubmit, formState: { errors } } = useForm();

<input 
  {...register("username", { 
    required: "필수 항목입니다",
    minLength: { value: 2, message: "최소 2자" }
  })} 
/>
{errors.username && <span>{errors.username.message}</span>}`}
        </pre>
      </div>
    </div>
  );
}

export default BasicFormExample;

