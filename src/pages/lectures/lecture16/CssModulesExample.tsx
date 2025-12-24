import React from 'react';

// 1. CSS Module 파일 임포트
// `[name].module.css` 형식의 파일을 임포트하면,
// 빌드 도구(Vite, Webpack 등)가 CSS 클래스들을 담고 있는 객체를 반환합니다.
import styles from './Button.module.css';

// `styles` 객체의 내용 예시:
// {
//   button: "Button_button__1a2b3c",
//   primary: "Button_primary__4d5e6f",
//   secondary: "Button_secondary__7g8h9i"
// }

function CssModulesExample() {
  return (
    <div style={{ padding: '20px' }}>
      <h1 className="mb-4 text-3xl font-bold">CSS Modules 예제</h1>
      <p className="mb-4">
        이 버튼들은 CSS Modules를 사용하여 스타일이 적용되었습니다. <br />각 컴포넌트는 자신만의
        고유한 클래스 이름을 가지므로, 다른 컴포넌트의 스타일에 영향을 주지 않습니다.
      </p>

      {/* 2. 클래스 이름 적용 */}
      {/* 
        `className` prop에 임포트한 `styles` 객체의 속성을 전달합니다.
        여러 클래스를 적용하려면 템플릿 리터럴을 사용합니다.
      */}
      <button className={`${styles.button} ${styles.primary}`}>Primary Button</button>

      <button className={`${styles.button} ${styles.secondary}`}>Secondary Button</button>

      <div className="mt-4">
        <p>적용된 클래스 이름 확인:</p>
        <ul className="list-disc pl-5">
          <li>
            Primary Button Class: <code>{`${styles.button} ${styles.primary}`}</code>
          </li>
          <li>
            Secondary Button Class: <code>{`${styles.button} ${styles.secondary}`}</code>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default CssModulesExample;
