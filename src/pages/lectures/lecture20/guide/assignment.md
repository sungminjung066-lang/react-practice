# 과제: 이미지 보고 React로 구현하기

아래 이미지를 보고 React 컴포넌트로 동일하게 구현하시오.

![과제 이미지](project.png)

**주의**: 위 이미지가 표시되지 않는 경우, `project.png` 파일을 현재 이 `assignment.md` 파일과 동일한 `lecture20` 디렉토리 안에 넣어주세요.

---

## React 개발 환경 구축 가이드 (Vite + TypeScript + Tailwind CSS)

이 가이드는 Vite를 사용하여 React, TypeScript, Tailwind CSS 기반의 개발 환경을 빠르게 구축하는 방법을 안내합니다.

### 1. Vite 프로젝트 생성

터미널을 열고 다음 명령어를 실행하여 React와 TypeScript가 설정된 Vite 프로젝트를 생성합니다.

```bash
# npm 7+
npm create vite@latest my-react-app -- --template react-ts

# yarn
yarn create vite my-react-app --template react-ts

# pnpm
pnpm create vite my-react-app --template react-ts
```

프로젝트가 생성되면 해당 디렉토리로 이동합니다.

```bash
cd my-react-app
```

### 2. Tailwind CSS 및 관련 패키지 설치

Tailwind CSS와 그 의존성인 `postcss`, `autoprefixer`를 개발 의존성(`-D`)으로 설치합니다.

```bash
npm install -D tailwindcss postcss autoprefixer
```

### 3. Tailwind CSS 설정 파일 생성

다음 명령어를 실행하여 `tailwind.config.js`와 `postcss.config.js` 두 개의 설정 파일을 생성합니다.

```bash
npx tailwindcss init -p
```

### 4. Tailwind CSS 템플릿 경로 설정

`tailwind.config.js` 파일을 열고, `content` 배열에 Tailwind가 스캔할 파일 경로를 지정합니다. 이렇게 해야 사용된 Tailwind 클래스를 감지하여 최종 CSS 파일에 포함시킬 수 있습니다.

```javascript
// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // src 폴더 내의 모든 관련 파일
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 5. 메인 CSS 파일에 Tailwind 지시어 추가

`src` 폴더 안에 있는 메인 CSS 파일(보통 `index.css` 또는 `App.css`)의 내용을 모두 지우고, 아래의 Tailwind 지시어를 추가합니다.

```css
/* src/index.css */

@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 6. 개발 서버 실행

이제 모든 설정이 완료되었습니다. 프로젝트의 의존성을 설치하고 개발 서버를 시작합니다.

```bash
# 의존성 설치 (아직 안 했다면)
npm install

# 개발 서버 실행
npm run dev
```

서버가 시작되면 터미널에 표시된 주소(보통 `http://localhost:5173`)로 접속하여 React 애플리케이션을 확인할 수 있습니다. 이제 Tailwind CSS 클래스를 사용하여 스타일링을 시작할 수 있습니다.

### 7. (선택) Prettier 플러그인으로 클래스 자동 정렬

코드 포맷터인 Prettier와 함께 공식 Tailwind CSS 플러그인을 사용하면 클래스 이름을 추천 순서에 따라 자동으로 정렬해주어 코드의 일관성을 높일 수 있습니다.

```bash
# 플러그인 설치
npm install -D prettier prettier-plugin-tailwindcss
```

프로젝트 루트에 `.prettierrc.json` 파일을 생성하고 아래 내용을 추가합니다.

```json
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

이제 파일을 저장할 때마다 VS Code의 Prettier 확장 프로그램 등이 클래스 순서를 자동으로 정리해줍니다.
