# React Router v7: 주요 변경점 및 v6와의 비교

React Router v7은 v6에 비해 완전히 새로운 패러다임을 제시하기보다는, v6.4부터 도입된 데이터 API(`loader`, `action` 등)를 안정화하고, TypeScript 지원을 강화하며, 더 이상 사용되지 않는 오래된 API들을 제거하는 데 중점을 둔 업데이트입니다.

v7은 v6의 강력한 기능들을 더욱 다듬고 안정성을 높여, 개발자들이 더 깔끔하고 타입-안전한 코드를 작성할 수 있도록 돕습니다.

## 주요 변경 사항 요약

- **API 정리**: v6에서 deprecated(사용 비권장) 처리되었던 여러 API들이 v7에서 완전히 제거되었습니다.
- **타입 안정성 강화**: TypeScript와의 통합이 더욱 강화되어, `loader` 데이터, `action` 결과, URL 파라미터 등에 대한 자동완성 및 타입 추론이 매우 향상되었습니다.
- **`loader` 반환 값**: `loader` 함수는 이제 반드시 `Response` 객체를 반환해야 합니다. `json()` 유틸리티 함수를 사용하여 쉽게 생성할 수 있습니다.
- **Future Flags**: v6에서 점진적인 마이그레이션을 위해 제공되던 `future flags`가 v7의 기본 동작이 되었습니다.

---

## React Router v6 vs v7 비교표

| 구분 (Feature) | React Router v6 | React Router v7 | 변경 내용 요약 |
| :--- | :--- | :--- | :--- |
| **데이터 로딩 (`loader`)** | `loader`에서 일반 객체나 `Promise` 반환 가능 | `loader`는 반드시 `Response` 객체를 반환해야 함 (`json()` 헬퍼 사용) | `loader`의 반환 값 형식이 더 엄격해지고 웹 표준(Response)을 따르게 됨 |
| **`useNavigation`** | `navigation.state`가 `idle` \| `submitting` \| `loading` | `navigation.state`와 별도로 `navigation.location` 존재 여부로 전환 상태 판단 | 로딩 상태를 판단하는 방식이 더 명확해짐 |
| **`useFetcher`** | 데이터 로딩 및 액션 실행에 사용 | 동일하게 사용되나, 타입 추론이 크게 향상됨 | 기능은 동일, 개발 경험(DX) 향상 |
| **`Form` 컴포넌트** | `method` 기본값이 `get` | `method` 기본값이 `post`로 변경 | 웹 표준 `<form>`의 기본 동작과 달라 혼동을 주던 부분을 수정 |
| **`useBlocker`** | `unstable_useBlocker`로 제공 | `useBlocker`가 안정화되었으나, 사용 방식 변경 (`blocker.proceed()`, `blocker.reset()` 등) | 사용자가 페이지를 떠나는 것을 막는 기능이 안정화되고 API가 명확해짐 |
| **`usePrompt`** | `unstable_usePrompt`로 제공 | **제거됨**. `useBlocker`를 사용하여 직접 구현해야 함 | 간단한 프롬프트 기능이 제거되고, 더 강력한 `useBlocker`로 통합됨 |
| **TypeScript 지원** | 좋은 편이었으나, 일부 타입은 수동으로 지정 필요 | 매우 강력해짐. `loader` 데이터 등이 자동으로 타입 추론됨 | 거의 모든 부분에서 타입 안정성이 보장되어 생산성 및 안정성 향상 |
| **최소 요구사항** | React 16.8+ | **React 18+, Node 20+** | 최신 React 기능(Suspense 등)을 완전히 활용하기 위해 요구사항 상향 |

---

## v6에서 v7으로 마이그레이션 하는 방법

v7은 v6.4 이상의 버전을 사용하고 있었다면 마이그레이션이 비교적 간단합니다.

1.  **의존성 업데이트**:
    ```bash
    npm install react-router-dom@7
    ```

2.  **요구사항 확인**: 프로젝트가 React 18 및 Node 20 이상을 사용하고 있는지 확인합니다.

3.  **`loader` 함수 수정**: 모든 `loader` 함수가 `json()`을 사용하여 `Response` 객체를 반환하도록 수정합니다.
    ```tsx
    // v6
    export async function loader({ params }) {
      const product = await getProduct(params.productId);
      return { product };
    }

    // v7
    import { json } from "react-router-dom";

    export async function loader({ params }) {
      const product = await getProduct(params.productId);
      return json({ product });
    }
    ```

4.  **제거된 API 수정**: `usePrompt`와 같이 v7에서 제거된 API를 사용하고 있었다면, `useBlocker` 등을 사용하여 대체 구현합니다.

## 결론

React Router v7은 "혁명"보다는 "진화"에 가까운 업데이트입니다. v6에서 선보인 현대적인 라우팅 패러다임을 더욱 안정적이고 견고하게 만들어, 개발자가 더 나은 품질의 코드를 더 쉽게 작성할 수 있도록 지원하는 데 중점을 두고 있습니다. 특히 TypeScript를 사용하는 프로젝트라면 v7으로의 업그레이드를 통해 큰 이점을 얻을 수 있습니다.
