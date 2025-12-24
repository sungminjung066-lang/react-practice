import { create } from 'zustand';

/**
 * Zustand Store 정의하기
 * 
 * Zustand는 상태(State)와 상태를 변경하는 함수(Actions)를 하나의 Store에 정의합니다.
 */

// 1. Store의 타입(Interface) 정의
// - 사용할 데이터(count)와 함수들(increment, decrement, reset)의 타입을 미리 지정합니다.
interface CountState {
  count: number;     // 관리할 상태 값
  increment: () => void; // 값을 증가시키는 함수
  decrement: () => void; // 값을 감소시키는 함수
  reset: () => void;     // 값을 초기화하는 함수
}

// 2. create 함수를 사용하여 Store 생성
// - create<타입>(): Store를 생성하는 Zustand의 핵심 함수입니다.
// - 이 함수는 리액트 컴포넌트에서 사용할 수 있는 Hook(useCountStore)을 반환합니다.
export const useCountStore = create<CountState>((set) => ({
  // 초기 상태 값 설정
  count: 0,

  // 상태 변경 함수(Action) 구현
  // set 함수: Zustand에서 상태를 업데이트할 때 사용하는 함수입니다.
  // set((state) => ({ ... })) 형태로 이전 상태를 가져와서 새로운 상태를 반환합니다.

  // 1 증가 (이전 상태의 count 값에 +1)
  increment: () => set((state) => ({ count: state.count + 1 })),

  // 1 감소 (이전 상태의 count 값에 -1)
  decrement: () => set((state) => ({ count: state.count - 1 })),

  // 초기화 (count를 0으로 설정)
  // 이전 상태가 필요 없을 경우, 바로 변경할 객체를 set에 전달하면 됩니다.
  reset: () => set({ count: 0 }),
}));
