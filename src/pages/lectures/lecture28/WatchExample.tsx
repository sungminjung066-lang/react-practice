import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

// 폼 데이터 타입
interface FormData {
  deliveryType: 'pickup' | 'delivery';
  address?: string;
  detailAddress?: string;
  paymentMethod: 'card' | 'cash' | 'transfer';
  cardNumber?: string;
  accountNumber?: string;
  agreeMarketing: boolean;
  marketingChannel?: string;
}

/**
 * React Hook Form - Watch 예제
 * 
 * watch 사용법:
 * 1. watch() - 모든 필드 감시
 * 2. watch('fieldName') - 특정 필드 감시
 * 3. watch(['field1', 'field2']) - 여러 필드 감시
 * 
 * 조건부 필드:
 * - watch로 특정 값을 감시하여 조건부로 다른 필드 표시
 */
function WatchExample() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      deliveryType: 'pickup',
      paymentMethod: 'card',
      agreeMarketing: false,
    },
  });

  // 특정 필드 값 감시
  const deliveryType = watch('deliveryType');
  const paymentMethod = watch('paymentMethod');
  const agreeMarketing = watch('agreeMarketing');

  // 모든 필드 감시 (디버깅용)
  const allValues = watch();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('주문 정보:', data);
    alert('주문이 완료되었습니다!');
    reset();
  };

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">React Hook Form - Watch</h1>
        <p className="text-gray-600">
          watch를 사용하여 특정 필드 값을 감시하고 조건부 필드를 표시합니다.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 폼 */}
        <div className="rounded-lg bg-white p-8 shadow-md">
          <h2 className="mb-6 text-xl font-bold text-gray-800">주문 정보 입력</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* 배송 방법 선택 */}
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                배송 방법 <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="pickup"
                    {...register('deliveryType', { required: true })}
                  />
                  <span>🏪 매장 픽업</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="delivery"
                    {...register('deliveryType', { required: true })}
                  />
                  <span>🚚 배송</span>
                </label>
              </div>
            </div>

            {/* 조건부 필드: 배송 선택 시에만 주소 입력 */}
            {deliveryType === 'delivery' && (
              <div className="rounded-lg bg-blue-50 p-4">
                <h3 className="mb-3 font-medium text-blue-900">📦 배송지 정보</h3>

                <div className="space-y-3">
                  <div>
                    <label htmlFor="address" className="mb-1 block text-sm font-medium text-gray-700">
                      주소 <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="address"
                      {...register('address', {
                        required: deliveryType === 'delivery' ? '주소를 입력해주세요' : false,
                      })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                      placeholder="서울시 강남구 테헤란로 123"
                    />
                    {errors.address && (
                      <p className="mt-1 text-xs text-red-600">{errors.address.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="detailAddress" className="mb-1 block text-sm font-medium text-gray-700">
                      상세 주소
                    </label>
                    <input
                      id="detailAddress"
                      {...register('detailAddress')}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                      placeholder="101동 1001호"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 결제 방법 선택 */}
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                결제 방법 <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="card"
                    {...register('paymentMethod', { required: true })}
                  />
                  <span>💳 신용카드</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="cash"
                    {...register('paymentMethod', { required: true })}
                  />
                  <span>💵 현금</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="transfer"
                    {...register('paymentMethod', { required: true })}
                  />
                  <span>🏦 계좌이체</span>
                </label>
              </div>
            </div>

            {/* 조건부 필드: 신용카드 선택 시 카드번호 입력 */}
            {paymentMethod === 'card' && (
              <div className="rounded-lg bg-green-50 p-4">
                <label htmlFor="cardNumber" className="mb-2 block text-sm font-medium text-green-900">
                  💳 카드 번호 <span className="text-red-500">*</span>
                </label>
                <input
                  id="cardNumber"
                  {...register('cardNumber', {
                    required: paymentMethod === 'card' ? '카드 번호를 입력해주세요' : false,
                    pattern: {
                      value: /^\d{4}-\d{4}-\d{4}-\d{4}$/,
                      message: '1234-5678-9012-3456 형식으로 입력해주세요',
                    },
                  })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
                  placeholder="1234-5678-9012-3456"
                />
                {errors.cardNumber && (
                  <p className="mt-1 text-xs text-red-600">{errors.cardNumber.message}</p>
                )}
              </div>
            )}

            {/* 조건부 필드: 계좌이체 선택 시 계좌번호 입력 */}
            {paymentMethod === 'transfer' && (
              <div className="rounded-lg bg-purple-50 p-4">
                <label htmlFor="accountNumber" className="mb-2 block text-sm font-medium text-purple-900">
                  🏦 계좌 번호 <span className="text-red-500">*</span>
                </label>
                <input
                  id="accountNumber"
                  {...register('accountNumber', {
                    required: paymentMethod === 'transfer' ? '계좌 번호를 입력해주세요' : false,
                  })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                  placeholder="123-456-789012"
                />
                {errors.accountNumber && (
                  <p className="mt-1 text-xs text-red-600">{errors.accountNumber.message}</p>
                )}
              </div>
            )}

            {/* 마케팅 동의 */}
            <div>
              <label className="flex items-start gap-2">
                <input type="checkbox" {...register('agreeMarketing')} className="mt-1" />
                <span className="text-sm text-gray-700">마케팅 정보 수신에 동의합니다</span>
              </label>
            </div>

            {/* 조건부 필드: 마케팅 동의 시 수신 채널 선택 */}
            {agreeMarketing && (
              <div className="rounded-lg bg-yellow-50 p-4">
                <label htmlFor="marketingChannel" className="mb-2 block text-sm font-medium text-yellow-900">
                  📢 수신 채널 선택 <span className="text-red-500">*</span>
                </label>
                <select
                  id="marketingChannel"
                  {...register('marketingChannel', {
                    required: agreeMarketing ? '수신 채널을 선택해주세요' : false,
                  })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-yellow-500 focus:outline-none"
                >
                  <option value="">선택하세요</option>
                  <option value="email">이메일</option>
                  <option value="sms">SMS</option>
                  <option value="both">이메일 + SMS</option>
                </select>
                {errors.marketingChannel && (
                  <p className="mt-1 text-xs text-red-600">{errors.marketingChannel.message}</p>
                )}
              </div>
            )}

            {/* 제출 버튼 */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
              >
                주문하기
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
        </div>

        {/* 실시간 데이터 표시 */}
        <div className="space-y-6">
          {/* 현재 선택값 */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-4 text-lg font-bold text-gray-800">📊 현재 선택값</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">배송 방법:</span>
                <span className="font-medium">
                  {deliveryType === 'pickup' ? '🏪 매장 픽업' : '🚚 배송'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">결제 방법:</span>
                <span className="font-medium">
                  {paymentMethod === 'card' && '💳 신용카드'}
                  {paymentMethod === 'cash' && '💵 현금'}
                  {paymentMethod === 'transfer' && '🏦 계좌이체'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">마케팅 동의:</span>
                <span className="font-medium">{agreeMarketing ? '✅ 동의' : '❌ 미동의'}</span>
              </div>
            </div>
          </div>

          {/* 전체 폼 데이터 (디버깅용) */}
          <div className="rounded-lg bg-gray-800 p-6 text-white shadow-md">
            <h3 className="mb-4 text-lg font-bold">🔍 전체 폼 데이터</h3>
            <pre className="overflow-x-auto text-xs">
              {JSON.stringify(allValues, null, 2)}
            </pre>
          </div>

          {/* 설명 */}
          <div className="rounded-lg bg-blue-50 p-6">
            <h3 className="mb-3 font-bold text-blue-900">💡 Watch 사용법</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>
                <code>watch('fieldName')</code> - 특정 필드 감시
              </li>
              <li>
                <code>watch()</code> - 모든 필드 감시
              </li>
              <li>조건부 렌더링으로 동적 폼 구성</li>
              <li>실시간으로 값 변경 감지</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WatchExample;

