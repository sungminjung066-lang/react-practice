import React from 'react';

// TODO: useToggle Hook 구현
// boolean 상태를 토글하고 명시적으로 설정할 수 있는 기능 제공
function useToggle(initialValue: boolean = false) {
  const [value, setValue] = React.useState(initialValue);
  
  // TODO: toggle 함수 - 현재 값을 반전
  const toggle = () => {
    // 여기에 코드를 작성하세요
  };
  
  // TODO: setTrue 함수 - 명시적으로 true로 설정
  const setTrue = () => {
    // 여기에 코드를 작성하세요
  };
  
  // TODO: setFalse 함수 - 명시적으로 false로 설정
  const setFalse = () => {
    // 여기에 코드를 작성하세요
  };
  
  return {
    value,
    toggle,
    setTrue,
    setFalse,
  };
}

export default useToggle;

