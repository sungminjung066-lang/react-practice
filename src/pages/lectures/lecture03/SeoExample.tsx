import React from 'react';

function SeoExample() {
  return (
    <>
      {/* 
        React 19부터는 컴포넌트 내에 <title>, <meta>, <link> 태그를 직접 작성할 수 있습니다.
        React는 이 태그들을 자동으로 문서의 <head> 섹션으로 이동시킵니다.
      */}

      {/* 1. <title> 태그 */}
      {/* 검색 결과의 제목이 되며, 브라우저 탭에도 표시됩니다. SEO에서 가장 중요한 요소 중 하나입니다. */}
      <title>SEO 최적화 예제 페이지</title>

      {/* 2. <meta> 태그 */}
      {/* name="description": 검색 결과 페이지에 표시되는 요약 설명입니다. 사용자의 클릭을 유도하는 중요한 문구를 작성합니다. */}
      <meta
        name="description"
        content="이 페이지는 React 19의 새로운 기능을 사용하여 SEO를 최적화하는 방법을 보여줍니다."
      />

      {/* name="keywords": 과거에 중요했지만 현재는 검색 엔진이 크게 고려하지 않는 경향이 있습니다. 그래도 페이지의 핵심 키워드를 나타내는 데 도움이 될 수 있습니다. */}
      <meta name="keywords" content="React, SEO, React 19, title, meta, link" />

      {/* 3. <link> 태그 */}
      {/* rel="canonical": 여러 URL이 동일한 콘텐츠를 가리킬 때, 대표 URL을 지정하여 중복 콘텐츠 문제를 방지합니다. 이는 SEO 점수를 통합하는 데 매우 중요합니다. */}
      <link rel="canonical" href="https://example.com/seo-example-page" />

      <div>
        <h2>3-1: React 19 SEO 최적화 예제</h2>
        <p>
          이 컴포넌트가 렌더링되면, 위의 title, meta, link 태그가 HTML의 head 부분에 자동으로
          적용됩니다.
        </p>
        <p>페이지 소스 보기 또는 브라우저 개발자 도구의 Elements 탭에서 확인해보세요.</p>
      </div>
    </>
  );
}

export default SeoExample;
