import React from 'react';

import { type SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

// 경력 타입
interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

// 폼 데이터 타입
interface ProfileFormData {
  // 기본 정보
  name: string;
  email: string;
  phone: string;
  birthDate: string;

  // 주소
  address: string;
  detailAddress?: string;
  zipCode: string;

  // 직업 정보
  occupation: 'student' | 'employee' | 'freelancer' | 'unemployed';
  company?: string;
  experiences: Experience[];

  // 추가 정보
  bio: string;
  website?: string;
  github?: string;

  // 관심사
  interests: string[];

  // 동의
  agreeTerms: boolean;
  agreePrivacy: boolean;
  agreeMarketing: boolean;
}

/**
 * React Hook Form - 종합 예제
 *
 * 모든 기능 활용:
 * - 다양한 유효성 검사
 * - watch로 조건부 필드
 * - useFieldArray로 동적 필드
 * - 복잡한 폼 구조
 */
function ComplexFormExample() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
    // setValue,
  } = useForm<ProfileFormData>({
    defaultValues: {
      occupation: 'student',
      experiences: [],
      interests: [],
      agreeTerms: false,
      agreePrivacy: false,
      agreeMarketing: false,
    },
  });

  // 동적 필드 관리
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experiences',
  });

  // 값 감시
  const occupation = watch('occupation');
  const agreeTerms = watch('agreeTerms');
  const agreePrivacy = watch('agreePrivacy');

  const onSubmit: SubmitHandler<ProfileFormData> = async (data) => {
    // 제출 시뮬레이션 (2초 지연)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('프로필 데이터:', data);
    alert('프로필이 성공적으로 등록되었습니다!');
    reset();
  };

  // 경력 추가
  const addExperience = () => {
    append({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
    });
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">React Hook Form - 종합 예제</h1>
        <p className="text-gray-600">모든 기능을 활용한 복잡한 프로필 등록 폼입니다.</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 rounded-lg bg-white p-8 shadow-md"
      >
        {/* 1. 기본 정보 */}
        <section>
          <h2 className="mb-4 border-b-2 border-blue-500 pb-2 text-xl font-bold text-gray-800">
            📋 기본 정보
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
                이름 <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                {...register('name', {
                  required: '이름을 입력해주세요',
                  minLength: { value: 2, message: '최소 2자 이상' },
                })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                이메일 <span className="text-red-500">*</span>
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
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700">
                전화번호 <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                {...register('phone', {
                  required: '전화번호를 입력해주세요',
                  pattern: {
                    value: /^01[0-9]-\d{3,4}-\d{4}$/,
                    message: '010-1234-5678 형식',
                  },
                })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                placeholder="010-1234-5678"
              />
              {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
            </div>

            <div>
              <label htmlFor="birthDate" className="mb-1 block text-sm font-medium text-gray-700">
                생년월일 <span className="text-red-500">*</span>
              </label>
              <input
                id="birthDate"
                type="date"
                {...register('birthDate', { required: '생년월일을 입력해주세요' })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
              {errors.birthDate && (
                <p className="mt-1 text-xs text-red-600">{errors.birthDate.message}</p>
              )}
            </div>
          </div>
        </section>

        {/* 2. 주소 */}
        <section>
          <h2 className="mb-4 border-b-2 border-green-500 pb-2 text-xl font-bold text-gray-800">
            🏠 주소
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="zipCode" className="mb-1 block text-sm font-medium text-gray-700">
                우편번호 <span className="text-red-500">*</span>
              </label>
              <input
                id="zipCode"
                {...register('zipCode', {
                  required: '우편번호를 입력해주세요',
                  pattern: { value: /^\d{5}$/, message: '5자리 숫자로 입력' },
                })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
                placeholder="12345"
              />
              {errors.zipCode && (
                <p className="mt-1 text-xs text-red-600">{errors.zipCode.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="address" className="mb-1 block text-sm font-medium text-gray-700">
                주소 <span className="text-red-500">*</span>
              </label>
              <input
                id="address"
                {...register('address', { required: '주소를 입력해주세요' })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
              />
              {errors.address && (
                <p className="mt-1 text-xs text-red-600">{errors.address.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="detailAddress"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                상세 주소
              </label>
              <input
                id="detailAddress"
                {...register('detailAddress')}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
              />
            </div>
          </div>
        </section>

        {/* 3. 직업 정보 */}
        <section>
          <h2 className="mb-4 border-b-2 border-purple-500 pb-2 text-xl font-bold text-gray-800">
            💼 직업 정보
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="occupation" className="mb-1 block text-sm font-medium text-gray-700">
                직업 <span className="text-red-500">*</span>
              </label>
              <select
                id="occupation"
                {...register('occupation', { required: true })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
              >
                <option value="student">🎓 학생</option>
                <option value="employee">👔 직장인</option>
                <option value="freelancer">💻 프리랜서</option>
                <option value="unemployed">🏠 무직</option>
              </select>
            </div>

            {/* 조건부: 직장인이면 회사명 입력 */}
            {occupation === 'employee' && (
              <div className="rounded-lg bg-purple-50 p-4">
                <label htmlFor="company" className="mb-1 block text-sm font-medium text-purple-900">
                  회사명 <span className="text-red-500">*</span>
                </label>
                <input
                  id="company"
                  {...register('company', {
                    required: occupation === 'employee' ? '회사명을 입력해주세요' : false,
                  })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                />
                {errors.company && (
                  <p className="mt-1 text-xs text-red-600">{errors.company.message}</p>
                )}
              </div>
            )}

            {/* 경력 사항 (동적 필드) */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">경력 사항</label>
                <button
                  type="button"
                  onClick={addExperience}
                  className="rounded-lg bg-purple-600 px-3 py-1 text-sm text-white hover:bg-purple-700"
                >
                  ➕ 경력 추가
                </button>
              </div>

              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="mb-3 rounded-lg border-2 border-purple-200 bg-purple-50 p-4"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <h4 className="font-medium text-purple-900">경력 #{index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      🗑️ 삭제
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div>
                      <input
                        {...register(`experiences.${index}.company`, {
                          required: '회사명을 입력해주세요',
                        })}
                        className="w-full rounded-lg border px-3 py-2 text-sm"
                        placeholder="회사명"
                      />
                      {errors.experiences?.[index]?.company && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.experiences[index]?.company?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <input
                        {...register(`experiences.${index}.position`, {
                          required: '직책을 입력해주세요',
                        })}
                        className="w-full rounded-lg border px-3 py-2 text-sm"
                        placeholder="직책"
                      />
                    </div>

                    <div>
                      <input
                        type="date"
                        {...register(`experiences.${index}.startDate`, {
                          required: '시작일을 입력해주세요',
                        })}
                        className="w-full rounded-lg border px-3 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <input
                        type="date"
                        {...register(`experiences.${index}.endDate`)}
                        className="w-full rounded-lg border px-3 py-2 text-sm"
                        disabled={watch(`experiences.${index}.current`)}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" {...register(`experiences.${index}.current`)} />
                        <span>현재 재직 중</span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. 추가 정보 */}
        <section>
          <h2 className="mb-4 border-b-2 border-orange-500 pb-2 text-xl font-bold text-gray-800">
            ℹ️ 추가 정보
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="bio" className="mb-1 block text-sm font-medium text-gray-700">
                자기소개 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="bio"
                {...register('bio', {
                  required: '자기소개를 입력해주세요',
                  minLength: { value: 10, message: '최소 10자 이상' },
                  maxLength: { value: 500, message: '최대 500자까지' },
                })}
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                placeholder="자신을 소개해주세요 (10~500자)"
              />
              {errors.bio && <p className="mt-1 text-xs text-red-600">{errors.bio.message}</p>}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="website" className="mb-1 block text-sm font-medium text-gray-700">
                  웹사이트
                </label>
                <input
                  id="website"
                  type="url"
                  {...register('website', {
                    pattern: {
                      value: /^https?:\/\/.+/,
                      message: 'http:// 또는 https://로 시작',
                    },
                  })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                  placeholder="https://example.com"
                />
                {errors.website && (
                  <p className="mt-1 text-xs text-red-600">{errors.website.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="github" className="mb-1 block text-sm font-medium text-gray-700">
                  GitHub
                </label>
                <input
                  id="github"
                  {...register('github', {
                    pattern: {
                      value: /^https:\/\/github\.com\/.+/,
                      message: 'https://github.com/username 형식',
                    },
                  })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                  placeholder="https://github.com/username"
                />
                {errors.github && (
                  <p className="mt-1 text-xs text-red-600">{errors.github.message}</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 5. 동의 */}
        <section>
          <h2 className="mb-4 border-b-2 border-red-500 pb-2 text-xl font-bold text-gray-800">
            ✅ 약관 동의
          </h2>
          <div className="space-y-3">
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                {...register('agreeTerms', { required: '이용약관에 동의해야 합니다' })}
                className="mt-1"
              />
              <span className="text-sm">
                이용약관에 동의합니다 <span className="text-red-500">*</span>
              </span>
            </label>
            {errors.agreeTerms && (
              <p className="text-xs text-red-600">{errors.agreeTerms.message}</p>
            )}

            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                {...register('agreePrivacy', { required: '개인정보 처리방침에 동의해야 합니다' })}
                className="mt-1"
              />
              <span className="text-sm">
                개인정보 처리방침에 동의합니다 <span className="text-red-500">*</span>
              </span>
            </label>
            {errors.agreePrivacy && (
              <p className="text-xs text-red-600">{errors.agreePrivacy.message}</p>
            )}

            <label className="flex items-start gap-2">
              <input type="checkbox" {...register('agreeMarketing')} className="mt-1" />
              <span className="text-sm">마케팅 정보 수신에 동의합니다 (선택)</span>
            </label>
          </div>
        </section>

        {/* 제출 버튼 */}
        <div className="flex gap-4 border-t pt-6">
          <button
            type="submit"
            disabled={isSubmitting || !agreeTerms || !agreePrivacy}
            className="flex-1 rounded-lg bg-blue-600 px-6 py-4 text-lg font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? '제출 중...' : '프로필 등록'}
          </button>
          <button
            type="button"
            onClick={() => reset()}
            disabled={isSubmitting}
            className="rounded-lg bg-gray-200 px-6 py-4 text-lg font-medium text-gray-700 hover:bg-gray-300 disabled:opacity-50"
          >
            초기화
          </button>
        </div>
      </form>

      {/* 설명 */}
      <div className="mt-8 rounded-lg bg-blue-50 p-6">
        <h3 className="mb-3 font-bold text-blue-900">🎯 이 예제에서 사용된 기능</h3>
        <ul className="grid grid-cols-1 gap-2 text-sm text-blue-800 md:grid-cols-2">
          <li>✓ 다양한 유효성 검사 (required, pattern, minLength 등)</li>
          <li>✓ watch를 활용한 조건부 필드</li>
          <li>✓ useFieldArray로 동적 필드 (경력 사항)</li>
          <li>✓ 섹션별 폼 구조화</li>
          <li>✓ 비동기 제출 처리 (isSubmitting)</li>
          <li>✓ 복잡한 타입 정의</li>
          <li>✓ 반응형 그리드 레이아웃</li>
          <li>✓ 에러 메시지 표시</li>
        </ul>
      </div>
    </div>
  );
}

export default ComplexFormExample;
