import React from 'react';

// 1. 서버 액션을 시뮬레이션하는 비동기 함수입니다.
// 실제 애플리케이션에서는 이 함수가 서버 API를 호출합니다.
// 이 함수는 이전 상태(previousState)와 폼 데이터(formData)를 인자로 받습니다.
async function updateUsername(previousState: string | null, formData: FormData): Promise<string> {
  console.log('previousState', previousState);
  const username = formData.get('username') as string;

  // 입력값 유효성 검사
  if (username.length < 3) {
    return '사용자 이름은 3자 이상이어야 합니다.';
  }

  // 서버 호출 시뮬레이션
  await new Promise((res) => setTimeout(res, 1000));

  // 특정 이름에 대한 에러 시뮬레이션
  if (username.toLowerCase() === 'error') {
    return '이 사용자 이름은 사용할 수 없습니다.';
  }

  // 성공 시
  return `사용자 이름 '${username}' (으)로 성공적으로 변경되었습니다.`;
}

function ActionStateExample() {
  // 2. useActionState 훅 사용
  // 첫 번째 인자: 실행할 액션 함수 (updateUsername)
  // 두 번째 인자: 초기 상태 (null)
  //
  // 반환값:
  // - state: 액션의 결과 상태. 초기값은 null이며, 액션이 실행된 후에는 액션 함수의 반환값이 됩니다.
  // - formAction: form의 action 속성에 전달할 함수입니다.
  // - isPending: 액션이 현재 실행 중인지(pending 상태)를 나타내는 boolean 값입니다.
  const [state, formAction, isPending] = React.useActionState(updateUsername, null);

  return (
    <div>
      <h2>3-2: useActionState 예제</h2>
      <p>사용자 이름을 변경하세요. (서버 제출 시뮬레이션)</p>

      {/* 3. formAction을 form의 action 속성에 바인딩합니다. */}
      <form action={formAction}>
        <input type="text" name="username" placeholder="새 사용자 이름 입력" />
        {/* 4. isPending 상태를 사용하여 제출 버튼을 비활성화할 수 있습니다. */}
        <button type="submit" disabled={isPending}>
          {isPending ? '처리 중...' : '변경'}
        </button>
      </form>

      {/* 5. 액션의 결과(state)를 화면에 표시합니다. */}
      {state && <p style={{ color: state.includes('성공') ? 'green' : 'red' }}>{state}</p>}
    </div>
  );
}

export default ActionStateExample;

/**
 * useActionState 동작 흐름

   1. 사용자 입력: 사용자가 폼에 사용자 이름을 입력하고 '변경' 버튼을 클릭합니다.
   2. 액션 실행: form의 action에 연결된 formAction이 호출됩니다.
   3. 상태 변경 (Pending): useActionState는 updateUsername 함수의 실행이 시작되었음을 인지하고, isPending 상태를 true로
      변경합니다. 이로 인해 버튼이 "처리 중..."으로 바뀌고 비활성화됩니다.
   4. 비동기 처리: updateUsername 함수가 실행됩니다. 이 예제에서는 setTimeout을 사용하여 1초의 지연을 시뮬레이션합니다.
   5. 결과 반환: updateUsername 함수가 성공 또는 실패 메시지(문자열)를 반환합니다.
   6. 상태 변경 (Result): useActionState는 함수 실행이 완료되면 isPending을 false로 되돌리고, updateUsername이 반환한
      결과 메시지로 state를 업데이트합니다.
   7. UI 업데이트: state가 업데이트되었으므로 컴포넌트가 리렌더링되고, 화면에 성공 또는 에러 메시지가 표시됩니다.

  이처럼 useActionState를 사용하면 폼 제출과 관련된 로딩 및 결과 상태를 매우 선언적이고 간편하게 관리할 수 있습니다.
 */
