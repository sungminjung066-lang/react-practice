# React 컴포넌트의 재사용과 분리의 중요성

React의 핵심 철학은 **"UI를 작고 독립적인 컴포넌트로 나누어 생각하는 것"**입니다. 우리가 `lecture20`에서 구현한 `ProductPage.tsx`는 이러한 철학이 어떻게 적용되는지 보여주는 좋은 예시입니다.

이 문서는 `ProductPage`, `ProductCard`, `ShoppingCartButton` 컴포넌트를 통해 왜 컴포넌트를 분리하고 재사용하는 것이 중요한지 설명합니다.

---

### 1. 가독성과 유지보수성 향상

하나의 거대한 컴포넌트에 모든 UI와 로직이 담겨 있다면, 코드를 읽고 이해하는 데 오랜 시간이 걸립니다. 작은 버그 하나를 수정하기 위해 수백, 수천 줄의 코드를 헤매야 할 수도 있습니다.

컴포넌트를 분리하면 각자의 역할이 명확해져 코드를 이해하기 쉬워지고, 유지보수가 용이해집니다.

**`ProductPage.tsx`의 예시:**

```tsx
// ProductPage.tsx

function ProductPage() {
  return (
    <div className="bg-white">
      <ShoppingCartButton />
      <div>
        <div className="grid ...">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
```

- `ProductPage` 컴포넌트의 코드는 매우 간결하고 직관적입니다. "장바구니 버튼이 있고, 상품 목록을 그리드 형태로 보여준다"는 전체적인 구조를 한눈에 파악할 수 있습니다.
- 개별 상품 카드의 복잡한 스타일링이나 장바구니 버튼의 상세 로직은 각각 `ProductCard`와 `ShoppingCartButton` 컴포넌트 내부에 감춰져 있습니다.
- 만약 상품 카드의 디자인을 수정해야 한다면, 우리는 `ProductPage` 전체를 볼 필요 없이 `ProductCard` 컴포넌트 파일만 열어보면 됩니다.

---

### 2. 재사용성: DRY (Don't Repeat Yourself) 원칙

UI를 만들다 보면 비슷한 패턴의 요소가 반복되는 경우가 많습니다. 이때 컴포넌트 재사용은 코드의 중복을 제거하고 효율성을 극대화합니다.

**`ProductCard` 컴포넌트의 예시:**

우리 페이지에는 7개의 상품 카드가 있습니다. 만약 `ProductCard` 컴포넌트를 만들지 않았다면, 우리는 7번의 카드 UI 코드를 복사-붙여넣기 해야 했을 것입니다.

```tsx
// 재사용하지 않은 경우 (나쁜 예)
<div>
  {/* 상품 1 카드 코드... */}
  {/* 상품 2 카드 코드... */}
  {/* 상품 3 카드 코드... */}
  {/* ... */}
</div>
```

하지만 우리는 `ProductCard`라는 재사용 가능한 컴포넌트를 만들고, `map` 함수를 통해 이를 효율적으로 렌더링했습니다.

```tsx
// 재사용한 경우 (좋은 예)
{
  products.map((product) => <ProductCard key={product.id} product={product} />);
}
```

**장점:**

- **코드의 간결함**: 중복 코드가 사라져 전체 코드 양이 줄어듭니다.
- **수정의 용이함**: 모든 상품 카드의 가격 표시 방식을 변경해야 할 경우, `ProductCard` 컴포넌트 단 한 곳만 수정하면 모든 카드에 일괄적으로 반영됩니다.

---

### 3. 독립적인 상태 관리

컴포넌트를 분리하면 상태(state) 관리의 범위가 명확해집니다. 각 컴포넌트는 자신에게 필요한 상태만 관리하면 되므로, 불필요한 복잡성을 줄일 수 있습니다.

**`LikeButton`의 '좋아요' 버튼 예시 (가상):**

만약 `LikeButton` '좋아요' 버튼이 있고, 이 버튼의 클릭 여부를 상태로 관리해야 한다고 가정해봅시다.

```tsx
// LikeButton.tsx

function LikeButton() {
  const [isLiked, setIsLiked] = useState(false); // '좋아요' 상태는 LikeButton 내에서만 관리

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div>
      {/* ... 상품 정보 ... */}
      <button onClick={handleLikeClick}>{isLiked ? '❤️' : '🤍'}</button>
    </div>
  );
}
```

- `isLiked`라는 상태는 `LikeButton` 컴포넌트와 직접적인 관련이 있습니다. 따라서 이 상태를 `LikeButton` 내부에 두는 것이 가장 이상적입니다.
- `ProductPage` 부모 컴포넌트는 어떤 카드가 '좋아요'를 받았는지 알 필요가 없습니다. 이로 인해 부모 컴포넌트는 자신의 역할(전체 레이아웃 관리)에만 집중할 수 있게 됩니다.

---

### 4. Props를 통한 단방향 데이터 흐름

React의 가장 중요한 원칙 중 하나는 **단방향 데이터 흐름(One-way data flow)**입니다. 데이터는 항상 부모 컴포넌트에서 자식 컴포넌트로, 즉 위에서 아래로 흐릅니다. 이 데이터는 `props`를 통해 전달됩니다.

**`ProductPage` -> `ProductCard` -> `ProductName` 예시**

1.  **`ProductPage` (부모)**: 모든 `products` 데이터(상태)를 소유하고 있습니다. `map` 함수를 통해 각 `ProductCard` 자식에게 `product` 객체 하나를 `prop`으로 내려줍니다.

    ```tsx
    // ProductPage.tsx
    function ProductPage() {
      const [products, setProducts] = useState([...]); // 상품 데이터 상태

      return (
        <div>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      );
    }
    ```

2.  **`ProductCard` (중간 자식)**: 부모로부터 `product` 객체를 `prop`으로 받습니다. 그리고 자신의 역할에 맞게 더 작은 컴포넌트(예: `ThumbnailImg`, `ProductName`)로 데이터를 재가공하여 전달합니다.

    ```tsx
    // ProductCard.tsx
    function ProductCard({ product }) {
      return (
        <div>
          <ThumbnailImg imageUrl={product.imageUrl} />
          <ProductName product={product} />
          {/* ... */}
        </div>
      );
    }
    ```

3.  **`ProductName` (최하위 자식)**: `ProductCard`로부터 `name` 문자열을 `prop`으로 받아 화면에 표시하는 역할만 수행합니다. 이 컴포넌트는 `product` 객체 전체에 대해 알 필요가 없으며, 오직 자신의 임무(이름 표시)에만 집중합니다.

    ```tsx
    // ProductName.tsx
    function ProductName({ product }) {
      return <h3 className="text-sm text-gray-700">{product.name}</h3>;
    }
    ```

이처럼 데이터가 부모 -> 자식 -> 손자 관계로 순차적으로 흐르는 것을 **단방향 데이터 흐름**이라고 합니다. `ProductName`과 같이 스스로 상태를 갖지 않고 부모로부터 받은 `props`에 의해서만 모습이 결정되는 컴포넌트를 **제어 컴포넌트(Controlled Component)**라고 부르기도 합니다.

**자식에서 부모로 데이터 전달하기**

만약 자식 컴포넌트에서 발생한 이벤트(예: 버튼 클릭)가 부모의 상태를 변경해야 한다면, 부모는 **상태를 변경하는 함수**를 자식에게 `prop`으로 내려줍니다. 자식은 그 함수를 호출하여 부모에게 "상태를 변경해달라"고 요청합니다. 이 패턴이 바로 **상태 끌어올리기(Lifting State Up)**입니다.

데이터는 위에서 아래로(`props`), 이벤트에 대한 요청은 아래에서 위로(`callback function`) 흐르면서 애플리케이션의 데이터 흐름을 예측 가능하고 안정적으로 만듭니다.

---

### 5. 결론

React에서 컴포넌트를 작고 재사용 가능하게 분리하는 것은 선택이 아닌 필수입니다. 이는 다음과 같은 핵심적인 이점을 제공합니다.

- **가독성 및 유지보수성 향상**
- **코드 중복 제거 및 재사용성 극대화**
- **독립적이고 예측 가능한 상태 관리**
- **팀원 간의 협업 용이성**

이러한 원칙을 잘 따르면 확장 가능하고 안정적인 대규모 React 애플리케이션을 구축할 수 있습니다.
