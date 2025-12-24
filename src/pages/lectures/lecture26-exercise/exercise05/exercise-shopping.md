# 실습 05: Mini 쇼핑몰 만들기 (종합 프로젝트)

## 📝 학습 목표

이 프로젝트는 지금까지 배운 모든 React 개념을 종합적으로 활용합니다:

- ✅ **State & Props**: 컴포넌트 간 데이터 전달
- ✅ **useEffect**: 생명주기 관리 및 데이터 로딩
- ✅ **Context API**: 전역 상태 관리 (장바구니, 테마, 사용자)
- ✅ **Custom Hooks**: 재사용 가능한 로직 (useCart, useProducts, useLocalStorage)
- ✅ **컴포넌트 합성**: 재사용 가능한 컴포넌트 구조
- ✅ **성능 최적화**: useMemo, useCallback, React.memo
- ✅ **localStorage**: 데이터 영속성

## 🎯 프로젝트 요구사항

### 핵심 기능

1. **제품 목록**: 여러 제품을 카드 형태로 표시
2. **제품 상세**: 제품 클릭 시 상세 정보 모달
3. **장바구니**: 제품 추가/제거, 수량 조절
4. **필터링**: 카테고리, 가격대별 필터
5. **정렬**: 이름, 가격, 인기도순 정렬
6. **검색**: 제품명으로 검색 (디바운스 적용)
7. **테마 전환**: 라이트/다크 모드
8. **주문하기**: 장바구니 -> 주문 정보 입력 -> 완료

### UI 요구사항

- 반응형 디자인 (모바일, 태블릿, 데스크톱)
- 헤더: 로고, 검색바, 장바구니 아이콘, 테마 토글
- 사이드바: 카테고리 필터, 가격 필터
- 메인: 제품 그리드, 정렬 옵션
- 장바구니 페이지: 제품 목록, 수량 조절, 합계
- 주문 페이지: 배송 정보 입력
- Tailwind CSS 사용

## 🗂️ 프로젝트 구조

```
assignment05/
├─ data/
│  └─ products.ts           # 제품 데이터
├─ contexts/
│  ├─ CartContext.tsx       # 장바구니 Context
│  ├─ ThemeContext.tsx      # 테마 Context
│  └─ ProductContext.tsx    # 제품 Context
├─ hooks/
│  ├─ useLocalStorage.ts    # localStorage Hook
│  ├─ useDebounce.ts        # 디바운스 Hook
│  ├─ useCart.ts            # 장바구니 Hook
│  └─ useProducts.ts        # 제품 Hook
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
│  ├─ Order/
│  │  ├─ OrderForm.tsx
│  │  └─ OrderComplete.tsx
│  └─ Common/
│     ├─ Button.tsx
│     ├─ Modal.tsx
│     ├─ Badge.tsx
│     └─ SearchBar.tsx
├─ types/
│  └─ index.ts              # 타입 정의
├─ utils/
│  └─ helpers.ts            # 유틸 함수
└─ ShoppingApp.tsx          # 메인 컴포넌트
```

## 💡 제품 데이터 구조

```typescript
// data/products.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  category: 'electronics' | 'fashion' | 'food' | 'home';
  description: string;
  image: string; // '/src/assets/product1.png'
  stock: number;
  rating: number;
  reviews: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: '무선 이어폰',
    price: 89000,
    category: 'electronics',
    description: '고품질 노이즈 캔슬링 무선 이어폰',
    image: '/src/assets/product1.png',
    stock: 15,
    rating: 4.5,
    reviews: 128,
  },
  {
    id: 2,
    name: '스마트 워치',
    price: 299000,
    category: 'electronics',
    description: '건강 추적 및 알림 기능',
    image: '/src/assets/product2.png',
    stock: 8,
    rating: 4.8,
    reviews: 256,
  },
  {
    id: 3,
    name: '캐주얼 티셔츠',
    price: 35000,
    category: 'fashion',
    description: '편안한 면 소재',
    image: '/src/assets/product3.png',
    stock: 50,
    rating: 4.2,
    reviews: 89,
  },
  {
    id: 4,
    name: '유기농 스낵',
    price: 8900,
    category: 'food',
    description: '건강한 간식',
    image: '/src/assets/product4.png',
    stock: 100,
    rating: 4.6,
    reviews: 342,
  },
  {
    id: 5,
    name: '아로마 캔들',
    price: 25000,
    category: 'home',
    description: '은은한 향기',
    image: '/src/assets/product5.png',
    stock: 30,
    rating: 4.7,
    reviews: 156,
  },
  {
    id: 6,
    name: '블루투스 스피커',
    price: 129000,
    category: 'electronics',
    description: '강력한 사운드',
    image: '/src/assets/product6.png',
    stock: 12,
    rating: 4.4,
    reviews: 203,
  },
  {
    id: 7,
    name: '디자이너 백팩',
    price: 89000,
    category: 'fashion',
    description: '스타일리시한 디자인',
    image: '/src/assets/product7.png',
    stock: 20,
    rating: 4.9,
    reviews: 412,
  },
];
```

## 🔧 단계별 구현 가이드

### Step 1: 타입 정의 (types/index.ts)

가장 먼저 필요한 타입들을 정의합니다.

```typescript
// 제품 타입
export interface Product {
  id: number;
  name: string;
  price: number;
  category: 'electronics' | 'fashion' | 'food' | 'home';
  description: string;
  image: string;
  stock: number;
  rating: number;
  reviews: number;
}

// 장바구니 아이템 타입 (제품 + 수량)
export interface CartItem extends Product {
  quantity: number;
}

// 카테고리 타입
export type Category = 'electronics' | 'fashion' | 'food' | 'home';

// 정렬 옵션 타입
export type SortOption = 'name' | 'price-asc' | 'price-desc' | 'rating';

// 주문 정보 타입
export interface OrderInfo {
  name: string;
  phone: string;
  address: string;
  message?: string;
}

// 주문 타입
export interface Order {
  id: string;
  items: CartItem[];
  orderInfo: OrderInfo;
  totalPrice: number;
  createdAt: Date;
}

// 테마 타입
export type Theme = 'light' | 'dark';

// 페이지 타입
export type Page = 'shop' | 'cart' | 'order' | 'complete';
```

### Step 2: Custom Hooks 구현

#### 2-1. useLocalStorage Hook (hooks/useLocalStorage.ts)

localStorage와 React state를 동기화하는 Hook입니다.

```typescript
import React from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  // localStorage에서 초기값 불러오기
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return initialValue;
    }
  });

  // 값을 설정하는 함수
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // 함수형 업데이트 지원
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  };

  return [storedValue, setValue] as const;
}

export default useLocalStorage;
```

**핵심 포인트:**

- 초기값을 lazy initialization으로 설정 (함수 형태의 useState)
- localStorage 읽기/쓰기 에러 처리
- 함수형 업데이트 지원 (setState와 동일한 API)
- `as const`로 튜플 타입 반환

#### 2-2. useDebounce Hook (hooks/useDebounce.ts)

검색어 입력 시 성능 최적화를 위한 디바운스 Hook입니다.

```typescript
import React from 'react';

function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    // delay 후에 값 업데이트
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // cleanup: 새로운 값이 들어오면 이전 타이머 취소
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
```

**핵심 포인트:**

- 입력이 멈춘 후 delay만큼 기다렸다가 값 업데이트
- cleanup 함수로 이전 타이머 취소
- 제네릭 타입으로 모든 타입 지원

### Step 3: Context 구현

#### 3-1. ThemeContext (contexts/ThemeContext.tsx)

가장 간단한 Context부터 시작합니다.

```typescript
import React from 'react';
import { type Theme } from '../types';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // localStorage에서 초기값 불러오기
  const [theme, setTheme] = React.useState<Theme>(() => {
    const saved = localStorage.getItem('shopping-theme');
    return (saved as Theme) || 'light';
  });

  // theme 변경 시 localStorage에 저장
  React.useEffect(() => {
    localStorage.setItem('shopping-theme', theme);
  }, [theme]);

  const toggleTheme = React.useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const value = React.useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

**핵심 포인트:**

- Context 타입을 `undefined`로 설정하여 Provider 밖에서 사용 방지
- lazy initialization으로 localStorage에서 초기값 불러오기
- useCallback으로 toggleTheme 함수 메모이제이션
- useMemo로 Context value 메모이제이션
- Custom Hook(useTheme)으로 Context 사용 편의성 제공

#### 3-2. CartContext (contexts/CartContext.tsx)

장바구니 로직을 관리하는 Context입니다.

```typescript
import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { type CartItem, type Product } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = React.createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useLocalStorage<CartItem[]>('shopping-cart', []);

  // 장바구니에 제품 추가
  const addToCart = React.useCallback(
    (product: Product) => {
      setItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === product.id);

        if (existingItem) {
          // 이미 있으면 수량 증가
          return prevItems.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
          );
        }

        // 없으면 새로 추가
        return [...prevItems, { ...product, quantity: 1 }];
      });
    },
    [setItems],
  );

  // 장바구니에서 제품 제거
  const removeFromCart = React.useCallback(
    (productId: number) => {
      setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    },
    [setItems],
  );

  // 수량 변경
  const updateQuantity = React.useCallback(
    (productId: number, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }

      setItems((prevItems) =>
        prevItems.map((item) => (item.id === productId ? { ...item, quantity } : item)),
      );
    },
    [setItems, removeFromCart],
  );

  // 장바구니 비우기
  const clearCart = React.useCallback(() => {
    setItems([]);
  }, [setItems]);

  // 총 가격 계산
  const getTotalPrice = React.useCallback(() => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [items]);

  // 총 상품 개수 계산
  const getTotalItems = React.useCallback(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const value = React.useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems,
    }),
    [items, addToCart, removeFromCart, updateQuantity, clearCart, getTotalPrice, getTotalItems],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = React.useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
```

**핵심 포인트:**

- useLocalStorage Hook으로 자동으로 localStorage와 동기화
- 모든 함수를 useCallback으로 메모이제이션
- 중복 제품 추가 시 수량만 증가
- 수량이 0 이하면 자동으로 제거

#### 3-3. ProductContext (contexts/ProductContext.tsx)

제품 필터링, 검색, 정렬을 관리하는 Context입니다.

```typescript
import React from 'react';
import { products as initialProducts } from '../data/products';
import useDebounce from '../hooks/useDebounce';
import { type Category, type Product, type SortOption } from '../types';

interface ProductContextType {
  products: Product[];
  filteredProducts: Product[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: Category | null;
  setSelectedCategory: (category: Category | null) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
}

const ProductContext = React.createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products] = React.useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<Category | null>(null);
  const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 300000]);
  const [sortBy, setSortBy] = React.useState<SortOption>('name');

  // 검색어 디바운스 (300ms)
  const debouncedSearch = useDebounce(searchTerm, 300);

  // 필터링 + 정렬된 제품 목록
  const filteredProducts = React.useMemo(() => {
    let result = [...products];

    // 1. 검색 필터
    if (debouncedSearch) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          product.description.toLowerCase().includes(debouncedSearch.toLowerCase()),
      );
    }

    // 2. 카테고리 필터
    if (selectedCategory) {
      result = result.filter((product) => product.category === selectedCategory);
    }

    // 3. 가격 필터
    result = result.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1],
    );

    // 4. 정렬
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return result;
  }, [products, debouncedSearch, selectedCategory, priceRange, sortBy]);

  const value = React.useMemo(
    () => ({
      products,
      filteredProducts,
      searchTerm,
      setSearchTerm,
      selectedCategory,
      setSelectedCategory,
      priceRange,
      setPriceRange,
      sortBy,
      setSortBy,
    }),
    [products, filteredProducts, searchTerm, selectedCategory, priceRange, sortBy],
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export function useProducts() {
  const context = React.useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
```

**핵심 포인트:**

- useDebounce로 검색 성능 최적화
- useMemo로 필터링 결과 메모이제이션
- 여러 필터를 순차적으로 적용 (검색 → 카테고리 → 가격 → 정렬)
- 원본 배열을 복사(`[...products]`)하여 정렬

### Step 4: 유틸리티 함수 (utils/helpers.ts)

재사용 가능한 유틸리티 함수들입니다.

```typescript
// 가격 포맷팅 (₩89,000)
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(price);
};

// 간단한 가격 포맷 (89,000원)
export const formatSimplePrice = (price: number): string => {
  return `${price.toLocaleString()}원`;
};

// 평점 별 표시 (⭐⭐⭐⭐½)
export const formatRating = (rating: number): string => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  return '⭐'.repeat(fullStars) + (hasHalfStar ? '½' : '');
};

// 카테고리 한글 변환
export const getCategoryName = (category: string): string => {
  const categoryMap: Record<string, string> = {
    electronics: '전자제품',
    fashion: '패션',
    food: '식품',
    home: '홈/리빙',
  };
  return categoryMap[category] || category;
};

// 카테고리 아이콘
export const getCategoryIcon = (category: string): string => {
  const iconMap: Record<string, string> = {
    electronics: '💻',
    fashion: '👕',
    food: '🍎',
    home: '🏠',
  };
  return iconMap[category] || '📦';
};

// UUID 생성 (간단 버전)
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// 날짜 포맷팅
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};
```

### Step 5: 공통 컴포넌트 구현

#### 5-1. Button 컴포넌트 (components/Common/Button.tsx)

```typescript
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
}

const Button = React.memo(function Button({
  variant = 'primary',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseClass = 'rounded-lg px-4 py-2 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  return (
    <button
      className={`${baseClass} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;
```

#### 5-2. Modal 컴포넌트 (components/Common/Modal.tsx)

```typescript
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal = React.memo(function Modal({ isOpen, onClose, title, children }: ModalProps) {
  // ESC 키로 닫기 & body 스크롤 방지
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // 스크롤 방지
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset'; // 스크롤 복원
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않도록
      >
        {title && (
          <div className="mb-4 flex items-center justify-between border-b pb-4 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400"
            >
              ✕
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
});

export default Modal;
```

**핵심 포인트:**

- ESC 키로 닫기 기능
- 모달 열릴 때 body 스크롤 방지
- 백드롭 클릭으로 닫기 (모달 내부는 stopPropagation)
- useEffect cleanup으로 리스너 제거

#### 5-3. SearchBar 컴포넌트 (components/Common/SearchBar.tsx)

```typescript
import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar = React.memo(function SearchBar({
  value,
  onChange,
  placeholder = '검색...',
}: SearchBarProps) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      />
      <span className="absolute left-3 top-1/2 -translate-y-1/2">🔍</span>
    </div>
  );
});

export default SearchBar;
```

### Step 6: 핵심 컴포넌트 구현

#### 6-1. ProductCard 컴포넌트 (components/Product/ProductCard.tsx)

```typescript
import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { type Product } from '../../types';
import { formatSimplePrice } from '../../utils/helpers';
import Button from '../Common/Button';

interface ProductCardProps {
  product: Product;
  onDetailClick: (product: Product) => void;
}

const ProductCard = React.memo(function ProductCard({ product, onDetailClick }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 클릭 이벤트 전파 방지
    addToCart(product);
  };

  return (
    <div
      className="group cursor-pointer rounded-lg border bg-white p-4 shadow-sm transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
      onClick={() => onDetailClick(product)}
    >
      {/* 제품 이미지 */}
      <div className="mb-3 flex h-48 items-center justify-center overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
        <span className="text-6xl">🖼️</span>
      </div>

      {/* 제품 정보 */}
      <div className="space-y-2">
        <h3 className="font-bold text-gray-800 dark:text-white">{product.name}</h3>

        <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {formatSimplePrice(product.price)}
            </p>
            <p className="text-xs text-gray-500">
              ⭐ {product.rating} ({product.reviews})
            </p>
          </div>

          <div className="text-right">
            {product.stock > 0 ? (
              <p className="text-xs text-gray-500">재고: {product.stock}개</p>
            ) : (
              <p className="text-xs text-red-500">품절</p>
            )}
          </div>
        </div>

        {/* 장바구니 추가 버튼 */}
        <Button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="w-full"
        >
          🛒 장바구니 담기
        </Button>
      </div>
    </div>
  );
});

export default ProductCard;
```

**핵심 포인트:**

- React.memo로 불필요한 리렌더링 방지
- stopPropagation으로 버튼 클릭 시 카드 클릭 방지
- 재고 없으면 버튼 비활성화
- Tailwind의 `line-clamp-2`로 설명 2줄 제한

#### 6-2. Header 컴포넌트 (components/Layout/Header.tsx)

```typescript
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useProducts } from '../../contexts/ProductContext';
import SearchBar from '../Common/SearchBar';
import CartIcon from '../Cart/CartIcon';

interface HeaderProps {
  onCartClick: () => void;
}

const Header = React.memo(function Header({ onCartClick }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { searchTerm, setSearchTerm } = useProducts();

  return (
    <header className="sticky top-0 z-40 border-b bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* 로고 */}
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              🛍️ Mini Shop
            </h1>
          </div>

          {/* 검색바 (데스크톱) */}
          <div className="hidden flex-1 md:block md:max-w-md">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="제품 검색..."
            />
          </div>

          {/* 우측 메뉴 */}
          <div className="flex items-center gap-3">
            {/* 테마 토글 */}
            <button
              onClick={toggleTheme}
              className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="테마 전환"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {/* 장바구니 아이콘 */}
            <CartIcon onClick={onCartClick} />
          </div>
        </div>

        {/* 검색바 (모바일) */}
        <div className="mt-4 md:hidden">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="제품 검색..."
          />
        </div>
      </div>
    </header>
  );
});

export default Header;
```

**핵심 포인트:**

- sticky header로 스크롤해도 상단 고정
- 반응형 디자인 (모바일/데스크톱 검색바 분리)
- Context에서 searchTerm 직접 관리

#### 6-3. Sidebar 컴포넌트 (components/Layout/Sidebar.tsx)

```typescript
import React from 'react';
import { useProducts } from '../../contexts/ProductContext';
import { type Category, type SortOption } from '../../types';
import { getCategoryIcon, getCategoryName } from '../../utils/helpers';

const categories: Category[] = ['electronics', 'fashion', 'food', 'home'];

const Sidebar = React.memo(function Sidebar() {
  const { selectedCategory, setSelectedCategory, priceRange, setPriceRange, sortBy, setSortBy } =
    useProducts();

  return (
    <aside className="w-64 space-y-6 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
      {/* 카테고리 필터 */}
      <div>
        <h3 className="mb-3 font-bold text-gray-800 dark:text-white">카테고리</h3>
        <div className="space-y-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`w-full rounded-lg p-2 text-left transition-colors ${
              selectedCategory === null
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            📦 전체
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`w-full rounded-lg p-2 text-left transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                  : 'hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {getCategoryIcon(category)} {getCategoryName(category)}
            </button>
          ))}
        </div>
      </div>

      {/* 가격 필터 */}
      <div>
        <h3 className="mb-3 font-bold text-gray-800 dark:text-white">가격대</h3>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400">
              최소: {priceRange[0].toLocaleString()}원
            </label>
            <input
              type="range"
              min="0"
              max="300000"
              step="10000"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
              className="w-full"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400">
              최대: {priceRange[1].toLocaleString()}원
            </label>
            <input
              type="range"
              min="0"
              max="300000"
              step="10000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full"
            />
          </div>
          <button
            onClick={() => setPriceRange([0, 300000])}
            className="w-full rounded-lg bg-gray-200 p-2 text-sm hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            초기화
          </button>
        </div>
      </div>

      {/* 정렬 */}
      <div>
        <h3 className="mb-3 font-bold text-gray-800 dark:text-white">정렬</h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="w-full rounded-lg border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
          <option value="name">이름순</option>
          <option value="price-asc">가격 낮은순</option>
          <option value="price-desc">가격 높은순</option>
          <option value="rating">평점순</option>
        </select>
      </div>
    </aside>
  );
});

export default Sidebar;
```

### Step 7: 메인 앱 구조 (ShoppingApp.tsx)

```typescript
import React from 'react';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Footer from './components/Layout/Footer';
import ProductGrid from './components/Product/ProductGrid';
import ProductDetail from './components/Product/ProductDetail';
import CartList from './components/Cart/CartList';
import OrderForm from './components/Order/OrderForm';
import OrderComplete from './components/Order/OrderComplete';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { CartProvider, useCart } from './contexts/CartContext';
import { ProductProvider, useProducts } from './contexts/ProductContext';
import { type Page, type Product, type Order, type OrderInfo } from './types';
import { generateId } from './utils/helpers';

// 메인 쇼핑 앱 컴포넌트
function ShoppingAppContent() {
  const { theme } = useTheme();
  const { filteredProducts } = useProducts();
  const { items, getTotalPrice, clearCart } = useCart();

  const [currentPage, setCurrentPage] = React.useState<Page>('shop');
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [completedOrder, setCompletedOrder] = React.useState<Order | null>(null);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // 제품 상세 모달 열기
  const handleProductClick = React.useCallback((product: Product) => {
    setSelectedProduct(product);
  }, []);

  // 제품 상세 모달 닫기
  const handleCloseDetail = React.useCallback(() => {
    setSelectedProduct(null);
  }, []);

  // 장바구니 페이지로 이동
  const handleGoToCart = React.useCallback(() => {
    setCurrentPage('cart');
  }, []);

  // 주문 완료 처리
  const handleCompleteOrder = React.useCallback(
    (orderInfo: OrderInfo) => {
      const order: Order = {
        id: generateId(),
        items: [...items],
        orderInfo,
        totalPrice: getTotalPrice(),
        createdAt: new Date(),
      };

      setCompletedOrder(order);
      clearCart();
      setCurrentPage('complete');
    },
    [items, getTotalPrice, clearCart],
  );

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <Header onCartClick={handleGoToCart} />

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {currentPage === 'shop' && (
            <div className="flex gap-6">
              {/* Sidebar (데스크톱) */}
              <div className="hidden lg:block">
                <Sidebar />
              </div>

              {/* Product Grid */}
              <div className="flex-1">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    전체 상품 ({filteredProducts.length})
                  </h2>

                  {/* 모바일 필터 버튼 */}
                  <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="rounded-lg bg-blue-500 px-4 py-2 text-white lg:hidden"
                  >
                    필터 {sidebarOpen ? '닫기' : '열기'}
                  </button>
                </div>

                {/* 모바일 사이드바 */}
                {sidebarOpen && (
                  <div className="mb-6 lg:hidden">
                    <Sidebar />
                  </div>
                )}

                <ProductGrid products={filteredProducts} onDetailClick={handleProductClick} />
              </div>
            </div>
          )}

          {currentPage === 'cart' && (
            <CartList
              onCheckout={() => setCurrentPage('order')}
              onContinueShopping={() => setCurrentPage('shop')}
            />
          )}

          {currentPage === 'order' && (
            <OrderForm
              onSubmit={handleCompleteOrder}
              onCancel={() => setCurrentPage('cart')}
            />
          )}

          {currentPage === 'complete' && completedOrder && (
            <OrderComplete
              order={completedOrder}
              onGoHome={() => setCurrentPage('shop')}
            />
          )}
        </main>

        {/* Footer */}
        <Footer />

        {/* Product Detail Modal */}
        <ProductDetail
          product={selectedProduct}
          isOpen={selectedProduct !== null}
          onClose={handleCloseDetail}
        />
      </div>
    </div>
  );
}

// Provider로 감싼 최종 앱
function ShoppingApp() {
  return (
    <ThemeProvider>
      <CartProvider>
        <ProductProvider>
          <ShoppingAppContent />
        </ProductProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default ShoppingApp;
```

**핵심 포인트:**

- Provider 중첩 순서: Theme → Cart → Product
- 페이지 상태를 useState로 관리 ('shop' | 'cart' | 'order' | 'complete')
- useCallback으로 핸들러 함수 메모이제이션
- 모바일/데스크톱 반응형 레이아웃
- 조건부 렌더링으로 페이지 전환

## 🎯 성능 최적화 패턴

### 1. React.memo 활용

```typescript
// 제품 카드 - props가 변경되지 않으면 리렌더링 안 함
const ProductCard = React.memo(function ProductCard({ product, onDetailClick }: ProductCardProps) {
  // ...
});
```

### 2. useCallback 활용

```typescript
// 함수를 메모이제이션하여 자식 컴포넌트 리렌더링 방지
const handleProductClick = React.useCallback((product: Product) => {
  setSelectedProduct(product);
}, []); // 의존성 배열이 비어있으면 함수는 한 번만 생성됨
```

### 3. useMemo 활용

```typescript
// 필터링 결과를 메모이제이션
const filteredProducts = React.useMemo(() => {
  // 복잡한 필터링 로직
  return result;
}, [products, debouncedSearch, selectedCategory, priceRange, sortBy]);
```

### 4. Context Value 최적화

```typescript
// Context value를 useMemo로 메모이제이션
const value = React.useMemo(
  () => ({ items, addToCart, removeFromCart /* ... */ }),
  [items, addToCart, removeFromCart],
);
```

## 📋 체크리스트

### 필수 기능 (70점)

- [ ] 제품 목록이 그리드로 표시된다
- [ ] 제품 카드에 이미지, 이름, 가격, 평점이 표시된다
- [ ] 제품 클릭 시 상세 정보 모달이 열린다
- [ ] 장바구니에 제품을 추가할 수 있다
- [ ] 장바구니에서 수량을 조절할 수 있다
- [ ] 장바구니에서 제품을 삭제할 수 있다
- [ ] 총 금액이 정확히 계산된다
- [ ] 카테고리별 필터링이 작동한다
- [ ] 가격순 정렬이 작동한다
- [ ] 검색 기능이 작동한다 (디바운스 적용)
- [ ] 테마 전환(라이트/다크)이 작동한다
- [ ] 장바구니 데이터가 localStorage에 저장된다

### Context & Hooks (20점)

- [ ] CartContext가 구현되어 있다
- [ ] ThemeContext가 구현되어 있다
- [ ] ProductContext가 구현되어 있다
- [ ] useLocalStorage Hook이 구현되어 있다
- [ ] useDebounce Hook이 구현되어 있다

### 추가 기능 (10점)

- [ ] 주문하기 플로우 (배송 정보 입력)
- [ ] 주문 내역 저장
- [ ] 재고 관리 (품절 표시)
- [ ] 좋아요/찜 기능
- [ ] 리뷰 시스템

### 보너스 (10점)

- [ ] 뛰어난 UI/UX 디자인
- [ ] 애니메이션 효과 (장바구니 추가 시 등)
- [ ] 성능 최적화 (React.memo, useMemo, useCallback)
- [ ] 반응형 디자인 완벽 구현

## 🎨 화면 구성 예시

### 메인 페이지

```
┌─────────────────────────────────────────────────────┐
│ 🛍️ Mini Shop    [검색...]     🌙 🛒(3)             │
├──────────┬──────────────────────────────────────────┤
│ 카테고리  │  정렬: 가격순 ▼                          │
│ □ 전체   │  ┌────┐ ┌────┐ ┌────┐ ┌────┐            │
│ □ 전자   │  │img │ │img │ │img │ │img │            │
│ □ 패션   │  │무선│ │스마│ │티셔│ │스낵│            │
│ □ 식품   │  │이어│ │트워│ │츠  │ │    │            │
│ □ 홈     │  │89K │ │299K│ │35K │ │8.9K│            │
│          │  │⭐4.5│ │⭐4.8│ │⭐4.2│ │⭐4.6│            │
│ 가격     │  │🛒  │ │🛒  │ │🛒  │ │🛒  │            │
│ 0 ━━━ 300K│ └────┘ └────┘ └────┘ └────┘            │
│ [적용]   │  ┌────┐ ┌────┐ ┌────┐                   │
│          │  │img │ │img │ │img │                   │
│          │  │...  │ │...  │ │...  │                   │
└──────────┴──────────────────────────────────────────┘
```

### 장바구니 페이지

```
┌─────────────────────────────────────────────────────┐
│ 🛒 장바구니                                          │
├─────────────────────────────────────────────────────┤
│ [img] 무선 이어폰         [-][2][+]      178,000원  │
│ [img] 스마트 워치         [-][1][+]      299,000원  │
│                                                      │
│                                          ───────────│
│                            총 상품금액    477,000원 │
│                            배송비              0원 │
│                            ───────────────────────  │
│                            총 결제금액    477,000원 │
│                                                      │
│                    [계속 쇼핑하기]  [주문하기]      │
└─────────────────────────────────────────────────────┘
```

## 💡 구현 순서 가이드

### 추천 구현 순서

```
📅 1단계 (Day 1-2): 기초 설정
  ✓ 타입 정의 (types/index.ts)
  ✓ 제품 데이터 작성 (data/products.ts)
  ✓ 유틸리티 함수 (utils/helpers.ts)

📅 2단계 (Day 3-4): Custom Hooks
  ✓ useLocalStorage 구현
  ✓ useDebounce 구현
  ✓ 테스트해보기

📅 3단계 (Day 5-7): Context 구현
  ✓ ThemeContext (가장 간단)
  ✓ CartContext (중요!)
  ✓ ProductContext (복잡한 필터링)

📅 4단계 (Day 8-10): 공통 컴포넌트
  ✓ Button 컴포넌트
  ✓ Modal 컴포넌트
  ✓ SearchBar 컴포넌트

📅 5단계 (Day 11-14): 레이아웃 컴포넌트
  ✓ Header (검색바, 테마 토글, 장바구니 아이콘)
  ✓ Sidebar (필터링 UI)
  ✓ Footer

📅 6단계 (Day 15-18): 제품 관련 컴포넌트
  ✓ ProductCard (제품 카드)
  ✓ ProductGrid (그리드 레이아웃)
  ✓ ProductDetail (모달)

📅 7단계 (Day 19-21): 장바구니 컴포넌트
  ✓ CartIcon (헤더용)
  ✓ CartItem (장바구니 항목)
  ✓ CartList (장바구니 페이지)

📅 8단계 (Day 22-24): 주문 컴포넌트
  ✓ OrderForm (배송 정보 입력)
  ✓ OrderComplete (주문 완료 화면)

📅 9단계 (Day 25-27): 메인 앱 통합
  ✓ ShoppingApp 컴포넌트
  ✓ Provider 설정
  ✓ 페이지 전환 로직

📅 10단계 (Day 28-30): 최적화 & 마무리
  ✓ React.memo 적용
  ✓ useCallback/useMemo 최적화
  ✓ 반응형 디자인 점검
  ✓ 다크 모드 스타일 점검
```

## ⚠️ 주의사항 및 자주 하는 실수

### 1. Context 사용 시

```typescript
// ❌ 잘못된 예: Context를 Provider 밖에서 사용
function MyComponent() {
  const { theme } = useTheme(); // Error!
  return <div>...</div>;
}

// ✅ 올바른 예: Provider 안에서 사용
function App() {
  return (
    <ThemeProvider>
      <MyComponent />
    </ThemeProvider>
  );
}
```

### 2. useCallback 의존성 배열

```typescript
// ❌ 잘못된 예: 의존성 누락
const handleClick = React.useCallback(() => {
  console.log(items.length); // items를 사용하지만 의존성에 없음
}, []);

// ✅ 올바른 예: 모든 의존성 포함
const handleClick = React.useCallback(() => {
  console.log(items.length);
}, [items]);
```

### 3. 배열 정렬 시 원본 보존

```typescript
// ❌ 잘못된 예: 원본 배열 변경
const sortedProducts = products.sort((a, b) => a.price - b.price);

// ✅ 올바른 예: 복사본 정렬
const sortedProducts = [...products].sort((a, b) => a.price - b.price);
```

### 4. localStorage 사용 시 에러 처리

```typescript
// ❌ 잘못된 예: 에러 처리 없음
const data = JSON.parse(localStorage.getItem('key'));

// ✅ 올바른 예: try-catch로 에러 처리
try {
  const item = localStorage.getItem('key');
  const data = item ? JSON.parse(item) : defaultValue;
} catch (error) {
  console.error('localStorage error:', error);
  return defaultValue;
}
```

### 5. 이벤트 전파 제어

```typescript
// ❌ 잘못된 예: 버튼 클릭 시 카드도 클릭됨
<div onClick={handleCardClick}>
  <button onClick={handleButtonClick}>추가</button>
</div>

// ✅ 올바른 예: stopPropagation 사용
<div onClick={handleCardClick}>
  <button onClick={(e) => {
    e.stopPropagation();
    handleButtonClick();
  }}>추가</button>
</div>
```

### 6. 다크 모드 클래스 적용

```typescript
// ❌ 잘못된 예: 조건부로 클래스 추가
<div className="bg-white">

// ✅ 올바른 예: dark: prefix 사용
<div className="bg-white dark:bg-gray-800">
```

## 🔍 디버깅 팁

### 1. Context 값 확인

```typescript
function DebugComponent() {
  const cart = useCart();
  console.log('Cart state:', cart);
  return null;
}
```

### 2. useMemo/useCallback 재계산 확인

```typescript
const filteredProducts = React.useMemo(() => {
  console.log('Filtering products...'); // 언제 재계산되는지 확인
  return result;
}, [deps]);
```

### 3. 렌더링 횟수 확인

```typescript
function ProductCard({ product }: Props) {
  const renderCount = React.useRef(0);
  console.log(`ProductCard ${product.id} rendered ${++renderCount.current} times`);
  // ...
}
```

## 🎨 반응형 디자인 가이드

### Tailwind CSS Breakpoints

```typescript
// 모바일 우선 디자인
<div className="
  grid-cols-1        // 모바일: 1열
  md:grid-cols-2     // 태블릿(768px+): 2열
  lg:grid-cols-3     // 데스크톱(1024px+): 3열
  xl:grid-cols-4     // 큰 화면(1280px+): 4열
">

// 조건부 표시
<div className="
  block              // 모바일: 표시
  lg:hidden          // 데스크톱: 숨김
">

<div className="
  hidden             // 모바일: 숨김
  lg:block           // 데스크톱: 표시
">
```

## 🚀 추가 기능 구현 가이드

### 1. 토스트 알림 추가

```typescript
// contexts/ToastContext.tsx
export function useToast() {
  const showToast = (message: string) => {
    // 토스트 표시 로직
  };
  return { showToast };
}

// 장바구니에 추가할 때
const handleAddToCart = () => {
  addToCart(product);
  showToast('장바구니에 추가되었습니다! 🛒');
};
```

### 2. 애니메이션 추가

```typescript
// 장바구니 아이콘 뱃지 애니메이션
<span className="
  absolute -top-1 -right-1
  animate-bounce          // 새 항목 추가 시
">
  {getTotalItems()}
</span>
```

### 3. 로딩 상태 추가

```typescript
const [loading, setLoading] = React.useState(false);

// 주문 제출 시
const handleSubmit = async () => {
  setLoading(true);
  try {
    await submitOrder();
  } finally {
    setLoading(false);
  }
};
```

## 📂 컴포넌트 파일 구조 및 역할

### 핵심 파일 및 역할 설명

```
📦 assignment05/
│
├── 📁 types/
│   └── index.ts                     # 모든 타입 정의 (Product, CartItem, Order 등)
│
├── 📁 data/
│   └── products.ts                  # 제품 더미 데이터 (7개 제품)
│
├── 📁 utils/
│   └── helpers.ts                   # 유틸 함수 (formatPrice, getCategoryName 등)
│
├── 📁 hooks/
│   ├── useLocalStorage.ts           # localStorage 동기화 Hook
│   └── useDebounce.ts               # 검색 최적화 Hook
│
├── 📁 contexts/
│   ├── ThemeContext.tsx             # 라이트/다크 테마 관리
│   ├── CartContext.tsx              # 장바구니 상태 관리 (핵심!)
│   └── ProductContext.tsx           # 제품 필터링/검색/정렬 관리
│
├── 📁 components/
│   │
│   ├── 📁 Common/                   # 재사용 가능한 공통 컴포넌트
│   │   ├── Button.tsx               # 버튼 컴포넌트 (variant: primary/secondary/danger)
│   │   ├── Modal.tsx                # 모달 컴포넌트 (ESC, 백드롭 클릭)
│   │   └── SearchBar.tsx            # 검색 입력 컴포넌트
│   │
│   ├── 📁 Layout/                   # 레이아웃 컴포넌트
│   │   ├── Header.tsx               # 헤더 (로고, 검색, 장바구니, 테마 토글)
│   │   ├── Sidebar.tsx              # 사이드바 (카테고리, 가격 필터, 정렬)
│   │   └── Footer.tsx               # 푸터
│   │
│   ├── 📁 Product/                  # 제품 관련 컴포넌트
│   │   ├── ProductCard.tsx          # 제품 카드 (React.memo 적용)
│   │   ├── ProductGrid.tsx          # 제품 그리드 레이아웃
│   │   └── ProductDetail.tsx        # 제품 상세 모달
│   │
│   ├── 📁 Cart/                     # 장바구니 관련 컴포넌트
│   │   ├── CartIcon.tsx             # 헤더용 장바구니 아이콘 (뱃지 포함)
│   │   ├── CartItem.tsx             # 장바구니 개별 항목
│   │   └── CartList.tsx             # 장바구니 페이지
│   │
│   └── 📁 Order/                    # 주문 관련 컴포넌트
│       ├── OrderForm.tsx            # 주문 정보 입력 폼
│       └── OrderComplete.tsx        # 주문 완료 화면
│
└── ShoppingApp.tsx                  # 메인 앱 컴포넌트 (페이지 전환 로직)
```

### 각 Context의 역할

| Context            | 관리 대상         | 주요 기능                                                                                            |
| ------------------ | ----------------- | ---------------------------------------------------------------------------------------------------- |
| **ThemeContext**   | 테마 (light/dark) | - toggleTheme()                                                                                      |
| **CartContext**    | 장바구니          | - addToCart()<br>- removeFromCart()<br>- updateQuantity()<br>- getTotalPrice()<br>- getTotalItems()  |
| **ProductContext** | 제품 필터링/검색  | - 검색어 관리 (디바운스)<br>- 카테고리 필터<br>- 가격 필터<br>- 정렬 옵션<br>- filteredProducts 계산 |

### 데이터 흐름

```
사용자 입력
    ↓
Context (State 변경)
    ↓
useMemo (필터링/정렬)
    ↓
컴포넌트 리렌더링
    ↓
화면 업데이트
```

## ❓ FAQ (자주 묻는 질문)

### Q1: Context를 여러 개 만드는 이유는?

**A:** 관심사의 분리(Separation of Concerns)입니다.

- ThemeContext: 테마만 관리
- CartContext: 장바구니만 관리
- ProductContext: 제품 필터링만 관리

이렇게 분리하면:

- 코드 유지보수가 쉬워집니다
- 각 Context를 독립적으로 테스트할 수 있습니다
- 불필요한 리렌더링을 방지할 수 있습니다

### Q2: useLocalStorage vs useState의 차이는?

**A:**

- `useState`: 메모리에만 저장 (새로고침하면 사라짐)
- `useLocalStorage`: localStorage에 저장 (새로고침해도 유지)

```typescript
// useState: 새로고침하면 장바구니 비워짐
const [cart, setCart] = React.useState([]);

// useLocalStorage: 새로고침해도 장바구니 유지
const [cart, setCart] = useLocalStorage('cart', []);
```

### Q3: useDebounce를 사용하는 이유는?

**A:** 검색 성능 최적화를 위해서입니다.

```typescript
// ❌ useDebounce 없이: 타이핑할 때마다 필터링 실행
onChange={(e) => setSearchTerm(e.target.value)} // "iPhone" 입력 시 6번 실행

// ✅ useDebounce 사용: 입력 멈춘 후 한 번만 실행
const debouncedSearch = useDebounce(searchTerm, 300); // 1번만 실행
```

### Q4: React.memo는 언제 사용하나요?

**A:** 리렌더링이 비싼(expensive) 컴포넌트에 사용합니다.

```typescript
// ProductCard: 부모가 리렌더링될 때 props가 변경되지 않았다면 리렌더링 안 함
const ProductCard = React.memo(function ProductCard({ product }) {
  // ...
});
```

**사용 기준:**

- 리스트 항목 컴포넌트 (ProductCard, CartItem 등)
- 자주 리렌더링되는 부모의 자식 컴포넌트
- props가 자주 변경되지 않는 컴포넌트

### Q5: useMemo vs useCallback의 차이는?

**A:**

- `useMemo`: **값**을 메모이제이션
- `useCallback`: **함수**를 메모이제이션

```typescript
// useMemo: 계산 결과를 메모이제이션
const filteredProducts = React.useMemo(() => {
  return products.filter(/* ... */);
}, [products]);

// useCallback: 함수를 메모이제이션
const handleClick = React.useCallback(() => {
  console.log('clicked');
}, []);
```

### Q6: Provider 순서가 중요한가요?

**A:** 네, 안쪽 Provider는 바깥쪽 Provider의 Context를 사용할 수 있습니다.

```typescript
// ✅ 올바른 순서
<ThemeProvider>           // 가장 바깥 (다른 Provider에 영향 없음)
  <CartProvider>          // Cart는 Theme를 사용할 수 있음
    <ProductProvider>     // Product는 Theme, Cart를 사용할 수 있음
      <App />
    </ProductProvider>
  </CartProvider>
</ThemeProvider>
```

### Q7: 장바구니에 같은 제품을 추가하면?

**A:** 수량만 증가합니다.

```typescript
const addToCart = (product) => {
  setItems((prevItems) => {
    const existingItem = prevItems.find((item) => item.id === product.id);

    if (existingItem) {
      // 이미 있으면 수량 +1
      return prevItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
      );
    }

    // 없으면 새로 추가 (quantity: 1)
    return [...prevItems, { ...product, quantity: 1 }];
  });
};
```

### Q8: Dark 모드는 어떻게 구현하나요?

**A:** Tailwind CSS의 `dark:` prefix를 사용합니다.

```typescript
// 1. 최상위 div에 'dark' 클래스 추가
<div className={theme === 'dark' ? 'dark' : ''}>

  // 2. 각 요소에 dark: prefix 사용
  <div className="bg-white dark:bg-gray-800">
    <p className="text-gray-900 dark:text-white">
      Hello
    </p>
  </div>
</div>
```

### Q9: 페이지 전환은 어떻게 하나요?

**A:** useState로 현재 페이지를 관리합니다.

```typescript
const [currentPage, setCurrentPage] = React.useState<Page>('shop');

// 페이지별 렌더링
{currentPage === 'shop' && <ProductGrid />}
{currentPage === 'cart' && <CartList />}
{currentPage === 'order' && <OrderForm />}
{currentPage === 'complete' && <OrderComplete />}
```

**참고:** 실제 프로젝트에서는 React Router를 사용하는 것이 좋지만, 이 실습에서는 간단하게 useState로 구현합니다.

### Q10: 제품 데이터는 어디서 가져오나요?

**A:** 로컬 파일에서 import합니다 (API 없음).

```typescript
// ProductContext.tsx
import { products as initialProducts } from '../data/products';

// data/products.ts
export const products: Product[] = [
  { id: 1, name: '무선 이어폰', price: 89000 /* ... */ },
  // ...
];
```

## 📚 관련 학습 내용

| 강의              | 학습 내용                         | 실습에서 사용하는 부분                    |
| ----------------- | --------------------------------- | ----------------------------------------- |
| **Lecture 01-03** | State, Props, Context API         | CartContext, ThemeContext, ProductContext |
| **Lecture 06**    | useMemo, useCallback              | 필터링 최적화, 함수 메모이제이션          |
| **Lecture 09**    | useEffect                         | localStorage 동기화, Modal 이벤트 리스너  |
| **Lecture 10**    | Lazy Initialization               | useLocalStorage 초기값 로딩               |
| **Lecture 15**    | useContext                        | useCart, useTheme, useProducts            |
| **Lecture 22**    | Custom Hooks                      | useLocalStorage, useDebounce              |
| **Lecture 23-26** | Lifecycle, Hook Flow, Composition | 컴포넌트 구조, React.memo                 |

## 🎯 학습 목표 달성 체크

이 프로젝트를 완성하면:

- ✅ React의 전체 개념을 통합적으로 사용할 수 있다
- ✅ 실전 프로젝트 구조를 설계할 수 있다
- ✅ Context API로 복잡한 상태를 관리할 수 있다
- ✅ Custom Hook으로 로직을 재사용할 수 있다
- ✅ 성능 최적화를 적용할 수 있다
- ✅ 사용자 경험을 고려한 개발을 할 수 있다
- ✅ localStorage로 데이터를 영속화할 수 있다

## 🎁 추가 도전 과제

### 레벨 1 (기본)

- 위시리스트 기능
- 제품 비교 기능
- 최근 본 상품

### 레벨 2 (중급)

- 쿠폰/할인 시스템
- 회원 등급별 할인
- 리뷰 작성 및 수정

### 레벨 3 (고급)

- 장바구니 공유 (URL로)
- 결제 시뮬레이션
- 주문 상태 추적
- 관리자 페이지 (제품 추가/수정/삭제)

## ✅ 테스트 시나리오

### 기본 기능 테스트

구현이 완료되면 아래 시나리오대로 테스트해보세요:

#### 1️⃣ 제품 목록 및 필터링

- [ ] 페이지 로드 시 7개 제품이 모두 표시되는가?
- [ ] 카테고리 "전자제품" 클릭 → 3개 제품만 표시
- [ ] 카테고리 "전체" 클릭 → 다시 7개 제품 표시
- [ ] 가격 필터를 0~100,000원으로 조정 → 해당 범위 제품만 표시
- [ ] 정렬을 "가격 낮은순"으로 변경 → 가격 오름차순 정렬 확인

#### 2️⃣ 검색 기능

- [ ] 검색창에 "무선" 입력 → "무선 이어폰" 제품만 표시
- [ ] 검색창에 "스마트" 입력 → "스마트 워치" 제품만 표시
- [ ] 검색창 비우기 → 모든 제품 다시 표시
- [ ] 검색어 입력 중 딜레이 확인 (디바운스 작동)

#### 3️⃣ 장바구니 기능

- [ ] "무선 이어폰" 장바구니 추가 → 헤더 장바구니 아이콘에 숫자 1 표시
- [ ] 같은 제품 다시 추가 → 숫자 2로 증가
- [ ] 다른 제품 추가 → 숫자 3으로 증가
- [ ] 장바구니 아이콘 클릭 → 장바구니 페이지 이동
- [ ] 장바구니에서 수량 조절 (+/-) → 총 금액 변경 확인
- [ ] 제품 삭제 → 목록에서 제거 확인

#### 4️⃣ 제품 상세 모달

- [ ] 제품 카드 클릭 → 모달 열림
- [ ] 모달에 제품 정보 표시 확인
- [ ] ESC 키 → 모달 닫힘
- [ ] 백드롭 클릭 → 모달 닫힘
- [ ] 모달 내부 클릭 → 모달 유지

#### 5️⃣ 테마 전환

- [ ] 헤더에서 테마 버튼 클릭 → 다크 모드 전환
- [ ] 모든 요소의 색상이 어두운 색으로 변경되는지 확인
- [ ] 다시 클릭 → 라이트 모드로 복귀
- [ ] 페이지 새로고침 → 테마 유지 확인 (localStorage)

#### 6️⃣ 주문 플로우

- [ ] 장바구니에 제품 추가 후 "주문하기" 클릭
- [ ] 주문 정보 입력 폼 표시 확인
- [ ] 필수 필드 누락 시 제출 불가
- [ ] 모든 정보 입력 후 "주문하기" → 주문 완료 페이지 이동
- [ ] 주문 완료 페이지에 주문 정보 표시
- [ ] 장바구니 비워진 것 확인
- [ ] "홈으로" 클릭 → 메인 페이지 이동

#### 7️⃣ localStorage 영속성

- [ ] 장바구니에 제품 추가
- [ ] 페이지 새로고침
- [ ] 장바구니에 제품이 여전히 있는지 확인
- [ ] 테마를 다크 모드로 변경
- [ ] 페이지 새로고침
- [ ] 다크 모드 유지 확인

#### 8️⃣ 반응형 디자인

- [ ] 브라우저 창 크기를 모바일 크기로 축소
- [ ] 제품 그리드가 1열로 표시
- [ ] 사이드바가 숨겨지고 "필터" 버튼 표시
- [ ] "필터" 버튼 클릭 → 모바일용 사이드바 표시
- [ ] 검색바가 헤더 아래로 이동
- [ ] 브라우저 창 크기를 데스크톱 크기로 확대
- [ ] 제품 그리드가 3-4열로 표시
- [ ] 사이드바가 왼쪽에 고정 표시

### 성능 테스트

#### 9️⃣ 리렌더링 최적화 확인

```typescript
// ProductCard에 console.log 추가
const ProductCard = React.memo(function ProductCard({ product }: Props) {
  console.log(`Rendering ProductCard ${product.id}`);
  // ...
});
```

- [ ] 검색어 입력 시 모든 ProductCard가 리렌더링되지 않는지 확인
- [ ] 장바구니에 추가 시 다른 ProductCard가 리렌더링되지 않는지 확인
- [ ] 테마 전환 시만 모든 컴포넌트가 리렌더링되는지 확인

### 엣지 케이스 테스트

#### 🔟 예외 상황 처리

- [ ] 빈 장바구니에서 "주문하기" 클릭 → 알림 표시
- [ ] 검색 결과 없을 때 → "검색 결과가 없습니다" 메시지 표시
- [ ] 품절 제품 → "장바구니 담기" 버튼 비활성화
- [ ] 가격 필터 최소값 > 최대값 → 제품 없음 표시

## 🎓 학습 효과 체크

이 프로젝트를 완성하면 다음을 할 수 있게 됩니다:

### ✅ React 핵심 개념

- [x] useState, useEffect, useContext 활용
- [x] Custom Hook 제작 (useLocalStorage, useDebounce)
- [x] Context API로 전역 상태 관리
- [x] Props drilling 문제 해결

### ✅ 성능 최적화

- [x] React.memo로 컴포넌트 메모이제이션
- [x] useCallback으로 함수 메모이제이션
- [x] useMemo로 계산 결과 메모이제이션
- [x] 디바운스로 검색 최적화

### ✅ 실전 개발 능력

- [x] 컴포넌트 설계 및 구조화
- [x] 재사용 가능한 컴포넌트 작성
- [x] 상태 관리 전략 수립
- [x] 반응형 UI 구현
- [x] 다크 모드 구현
- [x] localStorage 활용

### ✅ TypeScript

- [x] 인터페이스 및 타입 정의
- [x] 제네릭 활용 (useLocalStorage<T>)
- [x] 타입 안전성 보장

---

**외부 API 없이 충분히 복잡하고 실용적인 프로젝트입니다. 화이팅! 🚀**

## 💬 피드백 및 질문

구현 중 어려운 부분이 있다면:

1. 각 단계별로 천천히 진행하세요
2. console.log로 데이터 흐름을 확인하세요
3. React DevTools로 컴포넌트 구조를 확인하세요
4. 강의 자료를 다시 복습하세요

**중요:** 한 번에 모든 기능을 구현하려 하지 말고, 단계별로 작은 기능부터 완성해가세요!
