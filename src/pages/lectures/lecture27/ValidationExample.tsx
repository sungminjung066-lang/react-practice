import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

// 폼 데이터 타입
interface FormData {
  username: string;
  password: string;
  passwordConfirm: string;
  email: string;
  phone: string;
  website: string;
  age: number;
  terms: boolean;
}

/**
 * React Hook Form - 유효성 검사 예제
 * 
 * 다양한 검증 규칙:
 * - required: 필수 입력
 * - minLength/maxLength: 길이 제한
 * - pattern: 정규식 패턴
 * - validate: 커스텀 검증 함수
 * - min/max: 숫자 범위
 */
function ValidationExample() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormData>({
    mode: 'onChange', // 입력할 때마다 검증 (기본값은 'onSubmit')
  });

  // password 값을 감시 (passwordConfirm 검증에 사용)
  const password = watch('password');

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('✅ 유효성 검사 통과:', data);
    alert('회원가입이 완료되었습니다!');
    reset();
  };

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">
          React Hook Form - 유효성 검사
        </h1>
        <p className="text-gray-600">다양한 검증 규칙을 적용한 회원가입 폼입니다.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-lg bg-white p-8 shadow-md">
        {/* 사용자 이름 */}
        <div>
          <label htmlFor="username" className="mb-2 block font-medium text-gray-700">
            사용자 이름 <span className="text-red-500">*</span>
          </label>
          <input
            id="username"
            {...register('username', {
              required: '사용자 이름은 필수입니다',
              minLength: {
                value: 3,
                message: '최소 3자 이상이어야 합니다',
              },
              maxLength: {
                value: 20,
                message: '최대 20자까지 가능합니다',
              },
              pattern: {
                value: /^[a-zA-Z0-9_]+$/,
                message: '영문, 숫자, 언더스코어만 사용 가능합니다',
              },
              validate: (value) => {
                // 커스텀 검증: 금지된 단어 체크
                const forbidden = ['admin', 'root', 'test'];
                if (forbidden.includes(value.toLowerCase())) {
                  return '사용할 수 없는 이름입니다';
                }
                return true;
              },
            })}
            className={`w-full rounded-lg border px-4 py-2 focus:outline-none ${
              errors.username ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
            }`}
            placeholder="user123"
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-600">❌ {errors.username.message}</p>
          )}
        </div>

        {/* 이메일 */}
        <div>
          <label htmlFor="email" className="mb-2 block font-medium text-gray-700">
            이메일 <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: '이메일은 필수입니다',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '올바른 이메일 형식이 아닙니다',
              },
            })}
            className={`w-full rounded-lg border px-4 py-2 focus:outline-none ${
              errors.email ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
            }`}
            placeholder="user@example.com"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">❌ {errors.email.message}</p>}
        </div>

        {/* 비밀번호 */}
        <div>
          <label htmlFor="password" className="mb-2 block font-medium text-gray-700">
            비밀번호 <span className="text-red-500">*</span>
          </label>
          <input
            id="password"
            type="password"
            {...register('password', {
              required: '비밀번호는 필수입니다',
              minLength: {
                value: 8,
                message: '최소 8자 이상이어야 합니다',
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                message: '대문자, 소문자, 숫자, 특수문자를 포함해야 합니다',
              },
            })}
            className={`w-full rounded-lg border px-4 py-2 focus:outline-none ${
              errors.password ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
            }`}
            placeholder="8자 이상, 대소문자+숫자+특수문자"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">❌ {errors.password.message}</p>
          )}
        </div>

        {/* 비밀번호 확인 */}
        <div>
          <label htmlFor="passwordConfirm" className="mb-2 block font-medium text-gray-700">
            비밀번호 확인 <span className="text-red-500">*</span>
          </label>
          <input
            id="passwordConfirm"
            type="password"
            {...register('passwordConfirm', {
              required: '비밀번호 확인은 필수입니다',
              validate: (value) => value === password || '비밀번호가 일치하지 않습니다',
            })}
            className={`w-full rounded-lg border px-4 py-2 focus:outline-none ${
              errors.passwordConfirm
                ? 'border-red-500'
                : 'border-gray-300 focus:border-blue-500'
            }`}
            placeholder="비밀번호를 다시 입력하세요"
          />
          {errors.passwordConfirm && (
            <p className="mt-1 text-sm text-red-600">❌ {errors.passwordConfirm.message}</p>
          )}
        </div>

        {/* 전화번호 */}
        <div>
          <label htmlFor="phone" className="mb-2 block font-medium text-gray-700">
            전화번호
          </label>
          <input
            id="phone"
            type="tel"
            {...register('phone', {
              pattern: {
                value: /^01[0-9]-\d{3,4}-\d{4}$/,
                message: '010-1234-5678 형식으로 입력해주세요',
              },
            })}
            className={`w-full rounded-lg border px-4 py-2 focus:outline-none ${
              errors.phone ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
            }`}
            placeholder="010-1234-5678"
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">❌ {errors.phone.message}</p>}
        </div>

        {/* 웹사이트 */}
        <div>
          <label htmlFor="website" className="mb-2 block font-medium text-gray-700">
            웹사이트
          </label>
          <input
            id="website"
            type="url"
            {...register('website', {
              pattern: {
                value: /^https?:\/\/.+/,
                message: 'http:// 또는 https://로 시작해야 합니다',
              },
            })}
            className={`w-full rounded-lg border px-4 py-2 focus:outline-none ${
              errors.website ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
            }`}
            placeholder="https://example.com"
          />
          {errors.website && (
            <p className="mt-1 text-sm text-red-600">❌ {errors.website.message}</p>
          )}
        </div>

        {/* 나이 */}
        <div>
          <label htmlFor="age" className="mb-2 block font-medium text-gray-700">
            나이 <span className="text-red-500">*</span>
          </label>
          <input
            id="age"
            type="number"
            {...register('age', {
              required: '나이는 필수입니다',
              min: { value: 19, message: '19세 이상만 가입 가능합니다' },
              max: { value: 100, message: '100세 이하만 가입 가능합니다' },
              valueAsNumber: true,
            })}
            className={`w-full rounded-lg border px-4 py-2 focus:outline-none ${
              errors.age ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
            }`}
            placeholder="19"
          />
          {errors.age && <p className="mt-1 text-sm text-red-600">❌ {errors.age.message}</p>}
        </div>

        {/* 약관 동의 (체크박스) */}
        <div>
          <label className="flex items-start gap-2">
            <input
              type="checkbox"
              {...register('terms', {
                required: '약관에 동의해야 합니다',
              })}
              className="mt-1"
            />
            <span className="text-sm text-gray-700">
              이용약관 및 개인정보 처리방침에 동의합니다 <span className="text-red-500">*</span>
            </span>
          </label>
          {errors.terms && <p className="mt-1 text-sm text-red-600">❌ {errors.terms.message}</p>}
        </div>

        {/* 제출 버튼 */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
          >
            회원가입
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

      {/* 검증 규칙 설명 */}
      <div className="mt-8 rounded-lg bg-yellow-50 p-6">
        <h3 className="mb-3 font-bold text-yellow-900">📋 적용된 검증 규칙</h3>
        <ul className="space-y-2 text-sm text-yellow-800">
          <li>✓ <strong>required:</strong> 필수 입력 검사</li>
          <li>✓ <strong>minLength/maxLength:</strong> 문자열 길이 검사</li>
          <li>✓ <strong>pattern:</strong> 정규식 패턴 매칭</li>
          <li>✓ <strong>validate:</strong> 커스텀 검증 함수 (금지어, 비밀번호 일치)</li>
          <li>✓ <strong>min/max:</strong> 숫자 범위 검사</li>
          <li>✓ <strong>mode: onChange:</strong> 입력할 때마다 실시간 검증</li>
        </ul>
      </div>
    </div>
  );
}

export default ValidationExample;

