# VS Code에서 React 컴포넌트 스니펫 만들기

VS Code에서는 자주 사용하는 코드 패턴을 `스니펫(Snippet)`으로 만들어 생산성을 크게 향상할 수 있습니다. React 컴포넌트도 스니펫으로 등록하여 `rfc`, `rafce`처럼 간단한 명령어로 생성할 수 있습니다.

이 문서에서는 `.tsx` 파일용 스니펫을 만드는 방법을 설명합니다.

---

### 1. 스니펫 설정 파일 열기

1.  **Command Palette 열기**:
    - macOS: `Cmd + Shift + P`
    - Windows/Linux: `Ctrl + Shift + P`

2.  **`snippets` 입력**: 검색창에 `snippets`를 입력하고 **"Preferences: Configure User Snippets"**를 선택합니다.

3.  **언어 선택**: 스니펫을 적용할 언어를 선택합니다. React/TypeScript 프로젝트의 `.tsx` 파일용 스니펫을 만들려면 `typescriptreact`를 검색하고 `typescriptreact.json` 파일을 선택합니다.
    - 만약 `.jsx`용으로 만들고 싶다면 `javascriptreact.json`을 선택하면 됩니다.

---

### 2. 스니펫 작성하기

`typescriptreact.json` 파일이 열리면 중괄호(`{}`) 안에 아래와 같은 형식으로 스니펫을 추가합니다.

```json
{
  "스니펫 이름": {
    "prefix": "스니펫을 실행할 접두사(명령어)",
    "body": ["실제 생성될 코드 라인 1", "실제 생성될 코드 라인 2", "..."],
    "description": "스니펫에 대한 간단한 설명"
  }
}
```

- **`prefix`**: 에디터에서 입력할 축약어입니다. (예: `!comp`)
- **`body`**: `prefix`를 입력했을 때 실제로 생성될 코드입니다. 각 라인은 배열의 문자열 요소로 작성합니다.
- **`$1`, `$2`, ...**: 코드 생성 후 커서(탭)가 이동할 위치입니다. `Tab` 키를 눌러 순서대로 이동할 수 있습니다.
- **`${1:placeholder}`**: 커서 위치에 기본으로 표시될 텍스트(placeholder)를 지정할 수 있습니다.

---

### 3. React 컴포넌트 스니펫 예시

#### 예시 1: 간단한 TypeScript 함수형 컴포넌트 (`!comp`)

가장 기본적인 형태의 함수형 컴포넌트를 만듭니다.

```json
{
  "Customized React Functional Component": {
    "prefix": "!comp",
    "body": [
      "import React from 'react';",
      "",
      "export interface Props {",
      "  name?: string;",
      "}",
      "",
      "export default function ${TM_FILENAME_BASE}(props: Props): React.JSX.Element {",
      "  const { name } = props;",
      "",
      "  return <div>{name}</div>;",
      "}"
    ],
    "description": "Customized React Functional Component"
  }
}
```

- `prefix`를 `!comp`로 지정했으므로 `.tsx` 파일에서 `!comp`를 입력하고 `Enter`나 `Tab`을 누르면 위 `body` 코드가 생성됩니다.

#### 예시 2: Nextjs Page TypeScript 함수형 컴포넌트 (`!page`)

Nextjs Page 컴포넌트를 만듭니다.

```json
{
  "Customized React Functional Nextjs Page": {
    "prefix": "!page",
    "body": [
      "import type { Metadata } from 'next';",
      "",
      "export const metadata: Metadata = {",
      "  title: '제목',",
      "};",
      "",
      "export default function Page(): React.JSX.Element {",
      "  return <></>;",
      "}"
    ],
    "description": "Customized React Functional Nextjs Page"
  }
}
```

- `prefix`를 `!page`로 지정했으므로 `.tsx` 파일에서 `!page`를 입력하고 `Enter`나 `Tab`을 누르면 위 `body` 코드가 생성됩니다.

---

### 4. 스니펫 사용하기

1.  `.tsx` 또는 `.jsx` 파일을 엽니다.
2.  위에서 설정한 `prefix` (예: `!comp`)를 입력합니다.
3.  자동완성 목록에 나타나는 스니펫을 선택하고 `Enter` 또는 `Tab` 키를 누릅니다.
4.  스니펫 코드가 자동으로 생성되면 `Tab` 키를 눌러 `$1`, `$2` 등으로 지정한 위치로 이동하며 코드를 마저 작성합니다.

이제 자신만의 스니펫으로 React 개발을 더 빠르고 편리하게 할 수 있습니다!
