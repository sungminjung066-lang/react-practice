# 🛍️ Mini 쇼핑몰 - React 종합 프로젝트

## 🚀 시작하기

### 1. 프로젝트 개요
외부 API 없이 현재 프로젝트의 리소스만으로 완성하는 실전 쇼핑몰 프로젝트입니다.

### 2. 제공되는 리소스
- ✅ 제품 이미지: `src/assets/product1-7.png`
- ✅ 제품 데이터: `data/products.ts`
- ✅ 기본 구조: `ShoppingApp.tsx`

### 3. 개발 서버 실행
```bash
npm run dev
```

## 📁 프로젝트 구조

```
assignment05/
├─ README-shopping.md      # 이 파일
├─ assignment-shopping.md  # 상세 과제 설명
├─ data/
│  └─ products.ts          # ✅ 제품 데이터 (제공)
├─ ShoppingApp.tsx         # ✅ 기본 구조 (제공)
│
└─ (아래는 구현 필요)
├─ contexts/
│  ├─ CartContext.tsx      # 장바구니 Context
│  ├─ ThemeContext.tsx     # 테마 Context
│  └─ ProductContext.tsx   # 제품 Context
├─ hooks/
│  ├─ useLocalStorage.ts
│  ├─ useDebounce.ts
│  ├─ useCart.ts
│  └─ useProducts.ts
├─ components/
│  ├─ Layout/
│  │  ├─ Header.tsx
│  │  ├─ Sidebar.tsx
│  │  └─ Footer.tsx
│  ├─ Product/
│  │  ├─ ProductCard.tsx
│  │  ├─ ProductGrid.tsx
│  │  ├─ ProductDetail.tsx
│  │  └─ ProductFilter.tsx
│  ├─ Cart/
│  │  ├─ CartIcon.tsx
│  │  ├─ CartItem.tsx
│  │  ├─ CartList.tsx
│  │  └─ CartSummary.tsx
│  └─ Common/
│     ├─ Button.tsx
│     ├─ Modal.tsx
│     └─ SearchBar.tsx
├─ types/
│  └─ index.ts
└─ utils/
   └─ helpers.ts
```

## ✅ 구현 체크리스트

### 1주차: 기본 구조 (20%)
- [ ] 프로젝트 폴더 구조 생성
- [ ] 타입 정의 (types/index.ts)
- [ ] 제품 목록 표시 (ProductGrid)
- [ ] 제품 카드 컴포넌트 (ProductCard)
- [ ] 기본 레이아웃 (Header, Footer)

### 2주차: 장바구니 (30%)
- [ ] CartContext 구현
- [ ] useLocalStorage Hook 구현
- [ ] 장바구니에 상품 추가
- [ ] 장바구니에서 상품 삭제
- [ ] 수량 조절 기능
- [ ] 총 금액 계산
- [ ] 장바구니 아이콘 (상품 개수 표시)

### 3주차: 필터 & 검색 (25%)
- [ ] ProductContext 구현
- [ ] useDebounce Hook 구현
- [ ] 검색 기능 (디바운스 적용)
- [ ] 카테고리 필터
- [ ] 가격대 필터
- [ ] 정렬 기능 (이름, 가격, 평점)

### 4주차: 추가 기능 (15%)
- [ ] 제품 상세 모달
- [ ] 테마 전환 (라이트/다크)
- [ ] 장바구니 페이지
- [ ] 주문하기 기능
- [ ] 반응형 디자인

### 5주차: 최적화 & 마무리 (10%)
- [ ] React.memo 적용
- [ ] useMemo로 필터링 최적화
- [ ] useCallback으로 함수 메모이제이션
- [ ] 코드 리팩토링
- [ ] 버그 수정
- [ ] README 작성

## 🎯 주요 기능 설명

### 1. 장바구니 기능
```typescript
// 장바구니에 상품 추가
const addToCart = (product: Product) => {
  // 이미 있으면 수량 증가
  // 없으면 새로 추가
};

// localStorage에 자동 저장
useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(items));
}, [items]);
```

### 2. 필터링 기능
```typescript
// 여러 필터 조건 적용
const filteredProducts = useMemo(() => {
  return products
    .filter(p => !searchTerm || p.name.includes(searchTerm))
    .filter(p => !category || p.category === category)
    .filter(p => p.price >= minPrice && p.price <= maxPrice)
    .sort((a, b) => {
      // 정렬 로직
    });
}, [products, searchTerm, category, minPrice, maxPrice, sortBy]);
```

### 3. 검색 최적화 (Debounce)
```typescript
const [searchTerm, setSearchTerm] = useState('');
const debouncedSearch = useDebounce(searchTerm, 500);

// debouncedSearch를 필터링에 사용
// -> 타이핑할 때마다 필터링하지 않음
```

## 📚 활용할 개념

### Lecture 01-03
- State & Props
- Context API 기초

### Lecture 09
- useEffect (데이터 로딩, localStorage)

### Lecture 15
- useContext (장바구니, 테마)

### Lecture 22
- Custom Hooks (useCart, useProducts)

### Lecture 23-26
- Lifecycle 이해
- Hook Flow
- 컴포넌트 합성
- 성능 최적화

## 💡 구현 팁

### 1. 작은 단위로 시작
```
1. 제품 목록 표시 (하드코딩)
2. 장바구니 추가 기능 (state만)
3. localStorage 연동
4. Context로 전역화
5. 필터링 추가
6. UI 개선
```

### 2. 데이터 흐름 이해
```
ProductContext → 제품 목록, 필터
    ↓
ProductGrid → 제품 카드들
    ↓
ProductCard → 장바구니 추가 버튼
    ↓
CartContext → 장바구니 상태 관리
    ↓
CartIcon/CartPage → 장바구니 표시
```

### 3. 디버깅 방법
- React DevTools로 Context 값 확인
- console.log로 state 변화 추적
- localStorage 내용 확인 (개발자 도구)

## 🎨 디자인 가이드

### 색상
- Primary: Blue (#3B82F6)
- Secondary: Green (#10B981)
- Danger: Red (#EF4444)
- Gray 계열 사용

### 컴포넌트
- 카드: border + shadow
- 버튼: rounded + hover 효과
- 모달: overlay + 중앙 정렬

## 📖 참고 자료

- [React 공식 문서](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- assignment-shopping.md (상세 가이드)

## 🚫 주의사항

### 하지 말 것
- ❌ 외부 API 사용 (제공된 데이터 사용)
- ❌ 라이브러리 과다 사용 (기본 React로 충분)
- ❌ 완벽주의 (동작하면 OK, 최적화는 나중에)

### 할 것
- ✅ 자주 커밋하기 (기능별로)
- ✅ 작은 단위로 구현하기
- ✅ 주석 달기 (나중에 볼 자신을 위해)

## 🎓 평가 기준

### 필수 기능 (70%)
- 제품 목록, 상세, 장바구니, 필터, 검색

### 코드 품질 (20%)
- Context 활용, Custom Hooks, 컴포넌트 구조

### 추가 기능 (10%)
- 주문, 테마, 애니메이션 등

## 💪 완성 후 해볼 것

1. **코드 리뷰**: 개선할 부분 찾기
2. **기능 추가**: 위시리스트, 리뷰 등
3. **배포**: Vercel/Netlify
4. **포트폴리오**: README 작성

---

**외부 API 없이도 충분히 멋진 프로젝트를 만들 수 있습니다! 화이팅! 🚀**

