import { Button } from './Button';
import { Card } from './Card';

// --- React 컴포넌트 합성(Composition) ---
// React는 상속(Inheritance) 대신 합성을 사용하여 컴포넌트 간에 코드를 재사용하고 관계를 설정합니다.
// 합성은 더 유연하고 강력한 컴포넌트 구조를 만들 수 있게 해줍니다.
// 주요 패턴으로는 'Containment (포함)'와 'Specialization (특수화)'가 있습니다.

// --- 합성된 컴포넌트 사용 예시 ---
function CompositionExample() {
  const handleButtonClick = (type: string) => {
    alert(`${type} 버튼 클릭됨!`);
  };

  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold">React 컴포넌트 합성 예제</h1>
      <p className="mb-8">
        React는 상속 대신 합성을 사용하여 컴포넌트 간에 코드를 재사용하고 구조화합니다.
      </p>

      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">1. Containment (포함) 예시: Card 컴포넌트</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card title="사용자 정보">
            <p>이름: 김철수</p>
            <p>이메일: chulsoo@example.com</p>
          </Card>

          <Card title="상품 상세">
            <p>상품명: React 티셔츠</p>
            <p>가격: 25,000원</p>
            <p>재고: 100개</p>
            <Button variant="primary" onClick={() => handleButtonClick('구매')}>
              구매하기
            </Button>
            <Button onClick={() => handleButtonClick('장바구니')}>장바구니 담기</Button>
          </Card>

          <Card>
            {/* title이 없는 카드 */}
            <p>제목 없이 내용만 있는 카드입니다.</p>
            <p>여기에 어떤 내용이든 자유롭게 넣을 수 있습니다.</p>
            <Button variant="danger" onClick={() => handleButtonClick('삭제')}>
              삭제
            </Button>
          </Card>

          <Card title="푸터가 있는 카드" footer="Copyright 2023. All rights reserved.">
            <p>이 카드는 푸터 영역을 가지고 있습니다.</p>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-bold">
          2. Specialization (특수화) 예시: Button 컴포넌트
        </h2>
        <div className="space-x-2">
          <Button onClick={() => handleButtonClick('Default')}>기본 버튼</Button>
          <Button variant="primary" onClick={() => handleButtonClick('Primary')}>
            주요 버튼
          </Button>
          <Button variant="danger" onClick={() => handleButtonClick('Danger')}>
            위험 버튼
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CompositionExample;
