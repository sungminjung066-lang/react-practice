import React from 'react';
import { useFieldArray, useForm, type SubmitHandler } from 'react-hook-form';

// 취미 타입
interface Hobby {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

// 폼 데이터 타입
interface FormData {
  name: string;
  hobbies: Hobby[];
}

/**
 * React Hook Form - 동적 필드 예제 (useFieldArray)
 * 
 * useFieldArray:
 * - 필드를 동적으로 추가/제거할 수 있음
 * - append(): 필드 추가
 * - remove(): 필드 제거
 * - fields: 현재 필드 배열
 */
function DynamicFieldsExample() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      hobbies: [{ name: '', level: 'beginner' }], // 초기값으로 1개 필드
    },
  });

  // useFieldArray: 동적 필드 관리
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'hobbies',
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('제출된 데이터:', data);
    alert(`${data.name}님의 취미 ${data.hobbies.length}개가 등록되었습니다!`);
  };

  // 새 취미 추가
  const addHobby = () => {
    append({ name: '', level: 'beginner' });
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">
          React Hook Form - 동적 필드
        </h1>
        <p className="text-gray-600">
          useFieldArray를 사용하여 필드를 동적으로 추가/제거합니다.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* 폼 */}
        <div className="lg:col-span-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 rounded-lg bg-white p-8 shadow-md"
          >
            {/* 이름 */}
            <div>
              <label htmlFor="name" className="mb-2 block font-medium text-gray-700">
                이름 <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                {...register('name', { required: '이름을 입력해주세요' })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                placeholder="홍길동"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            {/* 취미 목록 */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <label className="font-medium text-gray-700">
                  취미 목록 <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={addHobby}
                  className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                >
                  ➕ 취미 추가
                </button>
              </div>

              {/* 동적 필드 목록 */}
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="rounded-lg border-2 border-gray-200 bg-gray-50 p-4"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <h4 className="font-medium text-gray-700">취미 #{index + 1}</h4>
                      {fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="rounded-lg bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                        >
                          🗑️ 삭제
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {/* 취미 이름 */}
                      <div>
                        <label
                          htmlFor={`hobbies.${index}.name`}
                          className="mb-1 block text-sm font-medium text-gray-700"
                        >
                          취미 이름 <span className="text-red-500">*</span>
                        </label>
                        <input
                          id={`hobbies.${index}.name`}
                          {...register(`hobbies.${index}.name`, {
                            required: '취미 이름을 입력해주세요',
                          })}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                          placeholder="예: 독서, 운동, 요리"
                        />
                        {errors.hobbies?.[index]?.name && (
                          <p className="mt-1 text-xs text-red-600">
                            {errors.hobbies[index]?.name?.message}
                          </p>
                        )}
                      </div>

                      {/* 숙련도 */}
                      <div>
                        <label
                          htmlFor={`hobbies.${index}.level`}
                          className="mb-1 block text-sm font-medium text-gray-700"
                        >
                          숙련도 <span className="text-red-500">*</span>
                        </label>
                        <select
                          id={`hobbies.${index}.level`}
                          {...register(`hobbies.${index}.level`, {
                            required: '숙련도를 선택해주세요',
                          })}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        >
                          <option value="beginner">🌱 초급</option>
                          <option value="intermediate">🌿 중급</option>
                          <option value="advanced">🌳 고급</option>
                        </select>
                        {errors.hobbies?.[index]?.level && (
                          <p className="mt-1 text-xs text-red-600">
                            {errors.hobbies[index]?.level?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {fields.length === 0 && (
                <div className="rounded-lg bg-gray-100 p-8 text-center">
                  <p className="text-gray-500">취미를 추가해주세요</p>
                  <button
                    type="button"
                    onClick={addHobby}
                    className="mt-4 rounded-lg bg-green-600 px-6 py-2 text-white hover:bg-green-700"
                  >
                    ➕ 첫 취미 추가하기
                  </button>
                </div>
              )}
            </div>

            {/* 제출 버튼 */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
              >
                등록하기
              </button>
              <button
                type="button"
                onClick={() =>
                  reset({
                    name: '',
                    hobbies: [{ name: '', level: 'beginner' }],
                  })
                }
                className="rounded-lg bg-gray-200 px-6 py-3 font-medium text-gray-700 hover:bg-gray-300"
              >
                초기화
              </button>
            </div>
          </form>
        </div>

        {/* 설명 및 미리보기 */}
        <div className="space-y-6">
          {/* 현재 상태 */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-4 text-lg font-bold text-gray-800">📋 현재 상태</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">취미 개수:</span>
                <span className="font-bold text-blue-600">{fields.length}개</span>
              </div>
            </div>
          </div>

          {/* useFieldArray 설명 */}
          <div className="rounded-lg bg-purple-50 p-6">
            <h3 className="mb-3 font-bold text-purple-900">💡 useFieldArray</h3>
            <ul className="space-y-2 text-sm text-purple-800">
              <li>
                <strong>append():</strong> 필드 추가
              </li>
              <li>
                <strong>remove(index):</strong> 필드 제거
              </li>
              <li>
                <strong>fields:</strong> 현재 필드 배열
              </li>
              <li>
                <strong>field.id:</strong> 고유 key (map에 사용)
              </li>
            </ul>
          </div>

          {/* 코드 예시 */}
          <div className="rounded-lg bg-gray-800 p-6 text-white">
            <h3 className="mb-3 font-bold">📝 코드 예시</h3>
            <pre className="overflow-x-auto text-xs">
              {`const { fields, append, remove } = 
  useFieldArray({
    control,
    name: 'hobbies'
  });

// 추가
append({ name: '', level: 'beginner' });

// 삭제
remove(index);

// 렌더링
fields.map((field, index) => (
  <input 
    key={field.id}
    {...register(\`hobbies.\${index}.name\`)}
  />
))`}
            </pre>
          </div>

          {/* 주의사항 */}
          <div className="rounded-lg bg-yellow-50 p-6">
            <h3 className="mb-3 font-bold text-yellow-900">⚠️ 주의사항</h3>
            <ul className="space-y-2 text-sm text-yellow-800">
              <li>✓ key에는 반드시 field.id 사용</li>
              <li>✓ register 이름은 `name.${'{index}'}.field` 형식</li>
              <li>✓ 최소 1개 필드는 유지하는 것이 좋음</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DynamicFieldsExample;

