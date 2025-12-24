# Vite 기반 React 프로젝트 생성 및 GitHub 배포 가이드

이 문서는 Vite를 사용하여 React 프로젝트를 생성하고 GitHub Pages에 배포하는 과정을 안내합니다.

## 1. Vite 프로젝트 생성

Vite는 빠른 개발 서버와 빌드 속도를 제공하는 최신 프런트엔드 개발 도구입니다.

```bash
# npm 6.x
npm create vite@latest my-vite-app --template react

# npm 7+, '--'를 추가해야 합니다:
npm create vite@latest my-vite-app -- --template react
```

위 명령어를 실행하면 `my-vite-app`이라는 디렉터리가 생성되고 그 안에 React 프로젝트가 설정됩니다.

## 2. 프로젝트 설정 및 실행

생성된 프로젝트 디렉터리로 이동하여 의존성을 설치하고 개발 서버를 실행합니다.

```bash
cd my-vite-app
npm install
npm run dev
```

`npm run dev` 명령어를 실행하면 개발 서버가 시작되고, 브라우저에서 `http://localhost:5173` (또는 다른 포트)으로 접속하여 앱을 확인할 수 있습니다.

## 3. GitHub Pages 배포 설정

### 3.1. `vite.config.ts` 파일 수정

GitHub Pages에 배포하려면 `vite.config.ts` 파일에 `base` 옵션을 설정해야 합니다. 이 옵션은 프로젝트가 배포될 경로를 지정합니다.

GitHub 저장소 이름이 `my-vite-app`이라면 `base` 값은 `"/my-vite-app/"`이 됩니다.

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/my-vite-app/' // GitHub 저장소 이름을 여기에 입력합니다.
})
```

### 3.2. `package.json`에 `homepage` 추가 (선택 사항)

`package.json` 파일에 `homepage` 필드를 추가하여 배포 URL을 명시할 수 있습니다.

```json
{
  "name": "my-vite-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "homepage": "https://<YOUR_GITHUB_USERNAME>.github.io/my-vite-app",
  // ...
}
```

## 4. GitHub 저장소 생성 및 연동

### 4.1. 새로운 GitHub 저장소 생성

GitHub에서 `my-vite-app`이라는 이름으로 새로운 저장소를 생성합니다.

### 4.2. 로컬 프로젝트와 원격 저장소 연동

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/my-vite-app.git
git push -u origin main
```

## 5. GitHub Pages에 배포

### 5.1. 프로젝트 빌드

다음 명령어를 사용하여 프로젝트를 빌드합니다. 빌드 결과물은 `dist` 디렉터리에 생성됩니다.

```bash
npm run build
```

### 5.2. `gh-pages`를 이용한 배포

`gh-pages` 패키지를 사용하면 `dist` 디렉터리의 내용을 `gh-pages` 브랜치에 쉽게 푸시할 수 있습니다.

먼저 `gh-pages`를 개발 의존성으로 설치합니다.

```bash
npm install gh-pages --save-dev
```

`package.json`의 `scripts`에 `deploy` 스크립트를 추가합니다.

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
  "preview": "vite preview",
  "deploy": "gh-pages -d dist"
}
```

이제 다음 명령어로 배포를 실행할 수 있습니다.

```bash
npm run deploy
```

이 명령어는 `dist` 디렉터리의 내용을 `gh-pages` 브랜치로 푸시합니다.

### 5.3. GitHub Pages 설정 확인

GitHub 저장소의 **Settings > Pages** 탭으로 이동하여 `gh-pages` 브랜치가 소스로 설정되어 있는지 확인합니다.

배포가 완료되면 `https://<YOUR_GITHUB_USERNAME>.github.io/my-vite-app/` 주소에서 배포된 애플리케이션을 확인할 수 있습니다.

---

이제 Vite로 생성한 React 프로젝트를 GitHub Pages에 성공적으로 배포했습니다!
