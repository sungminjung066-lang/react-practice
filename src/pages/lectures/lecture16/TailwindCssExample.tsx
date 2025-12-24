import React from 'react';

// Tailwind CSS는 '유틸리티 우선(Utility-First)'을 지향하는 CSS 프레임워크입니다.
// 미리 정의된 수많은 클래스(유틸리티)를 HTML(JSX)에 직접 추가하여 스타일을 적용합니다.
// 이를 통해 CSS 파일을 거의 작성하지 않고도 빠르고 일관된 UI를 구축할 수 있습니다.

function TailwindCssExample() {
  return (
    <div className="p-8 font-sans">
      <h1 className="mb-6 text-4xl font-bold text-blue-600">Tailwind CSS 예제</h1>
      <p className="mb-8 text-lg text-gray-700">
        이 예제는 Tailwind CSS의 주요 유틸리티 클래스를 보여줍니다.
      </p>

      {/* --- 기본 카드 컴포넌트 --- */}
      <div
        // 1. 크기(Sizing) & 여백(Spacing)
        // w- (width), h- (height), p- (padding), m- (margin)
        // 예: w-full (width: 100%), max-w-sm (max-width: 24rem), p-6 (padding: 1.5rem), m-4 (margin: 1rem)
        //
        // 2. 배경(Background) & 색상(Color)
        // bg- (background-color), text- (color)
        // 예: bg-white, text-gray-900
        //
        // 3. 테두리(Borders) & 그림자(Shadows)
        // border, border-{color}, rounded-{size}, shadow-{size}
        // 예: border, border-gray-200, rounded-xl, shadow-lg
        className="mx-auto max-w-sm rounded-xl border border-gray-200 bg-white p-6 shadow-lg"
      >
        <div
          // 4. Flexbox
          // flex, items-center, justify-between, space-x-{size}
          // 예: flex (display: flex), items-center (align-items: center), space-x-4 (자식 요소 간의 가로 간격)
          className="flex items-center space-x-4"
        >
          <div className="shrink-0">
            {/* 이미지 크기: w-12 h-12 */}
            <img className="h-12 w-12" src="/vite.svg" alt="Vite Logo" />
          </div>
          <div>
            <div
              // 5. 타이포그래피(Typography)
              // text-{size}, font-{weight}, text-{color}
              // 예: text-xl (font-size: 1.25rem), font-medium (font-weight: 500), text-black
              className="text-xl font-medium text-black"
            >
              Card Title
            </div>
            <p className="text-gray-500">A simple card component.</p>
          </div>
        </div>
      </div>

      {/* --- 반응형 디자인 & 상태(State) --- */}
      <div className="mt-10 text-center">
        <button
          // 6. 상태(States) - hover, focus 등
          // hover:{utility}, focus:{utility}
          // 예: hover:bg-blue-700 (마우스를 올렸을 때 배경색 변경)
          //
          // 7. 반응형 디자인(Responsive Design)
          // {breakpoint}:{utility} - sm, md, lg, xl, 2xl
          // 예: md:w-auto (중간 크기 화면 이상에서 width: auto)
          //
          // 아래 버튼은 기본적으로 파란색 배경, 마우스를 올리면 더 진한 파란색이 됩니다.
          // 화면이 md(768px) 이상으로 커지면 패딩이 더 커집니다.
          className="rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white shadow-md transition duration-200 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 md:px-8 md:py-3"
        >
          Responsive Button
        </button>
      </div>

      {/* --- Grid --- */}
      <div className="mt-10">
        <h2 className="mb-4 text-2xl font-bold">Grid Layout</h2>
        <div
          // 8. Grid
          // grid, grid-cols-{number}, gap-{size}
          // 예: grid (display: grid), grid-cols-3 (3개의 열), gap-4 (그리드 간격)
          // 반응형: md:grid-cols-3 (md 화면 이상에서 3열), 기본은 1열
          className="grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          <div className="rounded-lg bg-gray-200 p-4 text-center">Item 1</div>
          <div className="rounded-lg bg-gray-200 p-4 text-center">Item 2</div>
          <div className="rounded-lg bg-gray-200 p-4 text-center">Item 3</div>
          <div className="rounded-lg bg-gray-200 p-4 text-center">Item 4</div>
          <div className="rounded-lg bg-gray-200 p-4 text-center">Item 5</div>
          <div className="rounded-lg bg-gray-200 p-4 text-center">Item 6</div>
        </div>
      </div>
    </div>
  );
}

export default TailwindCssExample;
