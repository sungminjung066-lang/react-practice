# styled-components 예제

`styled-components`는 JavaScript 파일 내에서 CSS를 작성할 수 있게 해주는 'CSS-in-JS' 라이브러리입니다. 컴포넌트 기반으로 스타일을 관리하며, JavaScript의 변수나 함수를 스타일에 동적으로 활용할 수 있습니다.

---

### 1. 기본 스타일 컴포넌트 생성

`styled.html태그` 구문을 사용하여 스타일이 적용된 컴포넌트를 만듭니다. 이 컴포넌트는 일반 React 컴포넌트처럼 JSX 내에서 사용할 수 있습니다.

```tsx
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 2em;
  background: papayawhip;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;
```

---

### 2. Props에 따른 동적 스타일링

컴포넌트에 전달되는 `props` 값에 따라 스타일을 동적으로 변경할 수 있습니다. 템플릿 리터럴 안에서 함수를 사용하여 `props`에 접근하고, 조건에 따라 다른 CSS 값을 반환합니다.

```tsx
const Button = styled.button<{ primary?: boolean }>`
  /* primary prop이 있으면 palevioletred, 없으면 white 배경색 적용 */
  background: ${props => (props.primary ? 'palevioletred' : 'white')};
  color: ${props => (props.primary ? 'white' : 'palevioletred')};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;
```

---

### 3. 스타일 확장 (Extending Styles)

`styled()` 생성자에 기존에 만든 스타일 컴포넌트를 전달하여 스타일을 상속받고, 새로운 스타일을 추가하거나 덮어쓸 수 있습니다.

```tsx
// 위에서 만든 Button 컴포넌트의 스타일을 상속받습니다.
const TomatoButton = styled(Button)`
  color: tomato;
  border-color: tomato;
`;
```

---

### 4. `attrs` 메소드로 속성 추가하기

`.attrs()` 메소드를 사용하면 컴포넌트가 렌더링될 때 특정 HTML 속성을 자동으로 추가할 수 있습니다. 정적 속성뿐만 아니라, `props`를 기반으로 동적 속성을 설정하는 것도 가능합니다.

```tsx
const Input = styled.input.attrs(props => ({
  // 정적 속성
  type: 'text',

  // 동적 속성: props에 따라 placeholder 값 변경
  placeholder: props.placeholder || 'Enter text...',
}))`
  color: palevioletred;
  font-size: 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  padding: 0.5em;
  margin: 0.5em;

  &:focus {
    outline: none;
    border-color: tomato;
  }
`;
```

---

### 5. 전체 사용 예시

위에서 만든 모든 스타일 컴포넌트를 실제 React 컴포넌트에서 사용하는 방법입니다.

```tsx
import React from 'react';
// (위에 정의된 모든 styled-components... Wrapper, Title, Button, etc.)

function StyledComponentsExample() {
  return (
    // Wrapper 컴포넌트는 내부에 있는 모든 요소를 감쌉니다.
    <Wrapper>
      <Title>Styled-Components 예제</Title>
      <p style={{ textAlign: 'center' }}>
        이 컴포넌트들은 모두 `styled-components`로 만들어졌습니다.
      </p>

      <div>
        <Button>Normal Button</Button>
        <Button primary>Primary Button</Button>
      </div>

      <div>
        <TomatoButton>Tomato Button (Extended)</TomatoButton>
      </div>

      <div>
        <Input />
        <Input placeholder="Custom placeholder" />
      </div>
    </Wrapper>
  );
}

export default StyledComponentsExample;
```
