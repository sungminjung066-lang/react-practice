# React Developer Tools 설치 및 사용법

React Developer Tools는 React 애플리케이션을 디버깅하고 검사하기 위한 필수 브라우저 확장 프로그램입니다. 이를 통해 React 컴포넌트 계층 구조를 탐색하고, 각 컴포넌트의 `props`와 `state`를 확인하고 수정할 수 있으며, 성능 프로파일링까지 가능합니다.

---

### 1. 설치 방법

React Developer Tools는 주요 브라우저의 확장 프로그램 스토어에서 설치할 수 있습니다.

-   **Chrome**: [Chrome 웹 스토어에서 설치](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
-   **Firefox**: [Firefox Add-ons에서 설치](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)
-   **Edge**: [Microsoft Edge 추가 기능에서 설치](https://microsoftedge.microsoft.com/addons/detail/react-developer-tools/gpphkfbcpidddadnkolkpfckpihlkkil)

설치가 완료되면 브라우저의 툴바에 React 로고(⚛️) 아이콘이 나타납니다. React로 만들어진 웹사이트를 방문하면 아이콘이 활성화됩니다.

**주의**: 개발 모드(`development build`)에서 가장 유용하며, 프로덕션 모드(`production build`)에서는 일부 기능이 제한됩니다.

---

### 2. 기본 사용법

브라우저에서 개발자 도구(macOS: `Cmd+Opt+I`, Windows: `F12` 또는 `Ctrl+Shift+I`)를 열면 **Components**와 **Profiler**라는 두 개의 새로운 탭이 추가된 것을 볼 수 있습니다.

#### 🔷 Components 탭

`Components` 탭은 React 컴포넌트 트리를 보여주며, DOM 트리 대신 React 컴포넌트 구조를 확인할 수 있어 매우 유용합니다.

1.  **컴포넌트 트리 탐색**: 화면 왼쪽에 현재 페이지를 구성하는 컴포넌트들의 계층 구조가 표시됩니다. 특정 컴포넌트를 클릭하면 오른쪽에 해당 컴포넌트의 상세 정보가 나타납니다.

2.  **Props 및 State 확인 및 수정**:
    -   오른쪽 패널에서 선택된 컴포넌트가 가진 `props`와 `state`를 실시간으로 확인할 수 있습니다.
    -   값을 직접 클릭하여 수정하면, 애플리케이션에 즉시 반영됩니다. 이는 다양한 시나리오를 테스트할 때 매우 편리합니다.

3.  **컴포넌트 소스 코드 확인**: 컴포넌트를 우클릭하고 "Show [ComponentName] source"를 선택하면 해당 컴포넌트의 소스 코드로 바로 이동할 수 있습니다. (Source Maps가 활성화된 경우)

4.  **선택한 컴포넌트 정보**:
    -   `$r` 변수: 콘솔(Console) 탭에서 `$r`을 입력하면 `Components` 탭에서 현재 선택된 컴포넌트의 인스턴스에 접근할 수 있습니다. 이를 통해 컴포넌트의 내부 함수를 직접 호출해보는 등 다양한 테스트가 가능합니다.

#### 🔷 Profiler 탭

`Profiler` 탭은 애플리케이션의 렌더링 성능을 측정하고 병목 현상을 찾는 데 사용됩니다.

1.  **프로파일링 시작**: 파란색 녹화(▶️) 버튼을 누릅니다.
2.  **애플리케이션과 상호작용**: 성능을 측정하고 싶은 동작(예: 버튼 클릭, 데이터 로딩 등)을 수행합니다.
3.  **프로파일링 중지**: 빨간색 정지(⏹️) 버튼을 누릅니다.
4.  **결과 분석**:
    -   **Flamegraph**: 각 컴포넌트가 렌더링되는 데 걸린 시간을 시각적으로 보여줍니다. 그래프의 막대가 넓을수록 해당 컴포넌트와 그 자식들이 렌더링되는 데 오랜 시간이 걸렸다는 의미입니다.
    -   **Ranked chart**: 렌더링 시간이 길었던 컴포넌트 순서대로 목록을 보여줍니다.
    -   "Why did this render?" 섹션에서 불필요한 리렌더링의 원인을 파악할 수 있습니다.

---

### 3. 유용한 팁

-   **컴포넌트 업데이트 강조 (Highlight updates)**: `Components` 탭의 설정(⚙️) 아이콘을 클릭하고 "Highlight updates when components render." 옵션을 활성화하면, 리렌더링되는 컴포넌트 주위에 시각적인 테두리가 표시됩니다. 이를 통해 불필요한 렌더링을 쉽게 파악할 수 있습니다.
-   **Suspense 테스트**: `Components` 탭에서 특정 컴포넌트를 선택하고 상단의 눈(👁️) 모양 아이콘을 클릭하여 강제로 "Suspended" 상태로 만들 수 있습니다. 이는 로딩 UI(Fallback)를 테스트할 때 유용합니다.

React Developer Tools는 모든 React 개발자에게 필수적인 도구입니다. 컴포넌트의 동작을 이해하고, 버그를 해결하며, 성능을 최적화하는 데 큰 도움을 줍니다.
