import React from 'react';
import { products } from './data/products';

// TODO: 필요한 Context, Hook, Component를 import 하세요
// import { CartProvider } from './contexts/CartContext';
// import { ThemeProvider } from './contexts/ThemeContext';
// import { ProductProvider } from './contexts/ProductContext';
// 등등...

/**
 * ShoppingApp - Mini 쇼핑몰 메인 컴포넌트
 * 
 * 이 프로젝트는 지금까지 배운 모든 React 개념을 활용합니다:
 * - State & Props
 * - useEffect
 * - Context API (CartContext, ThemeContext, ProductContext)
 * - Custom Hooks (useLocalStorage, useDebounce, useCart)
 * - 컴포넌트 합성
 * - 성능 최적화 (React.memo, useMemo, useCallback)
 */

function ShoppingApp() {
  // TODO: 상태 관리
  // - 현재 페이지 ('shop' | 'cart' | 'order')
  // - 선택된 제품 (상세 모달용)
  // - 검색어
  // - 필터 옵션
  
  // TODO: Context 사용
  // - useCart() - 장바구니
  // - useTheme() - 테마
  // - useProducts() - 제품 목록 및 필터
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto p-4">
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-800 dark:text-white">
          🛍️ Mini Shopping Mall
        </h1>
        
        <div className="mb-6">
          <p className="text-center text-gray-600 dark:text-gray-400">
            assignment-shopping.md 파일을 참고하여 쇼핑몰을 구현하세요.
          </p>
          <p className="mt-2 text-center text-sm text-gray-500">
            💡 Tip: data/products.ts에 제품 데이터가 준비되어 있습니다!
          </p>
        </div>
        
        {/* 여기에 컴포넌트들을 추가하세요 */}
        <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-bold">제품 목록 미리보기</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md dark:border-gray-700"
              >
                <div className="mb-3 flex h-48 items-center justify-center bg-gray-100 dark:bg-gray-700">
                  <span className="text-4xl">🖼️</span>
                </div>
                <h3 className="mb-2 font-bold text-gray-800 dark:text-white">{product.name}</h3>
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-600">
                    {product.price.toLocaleString()}원
                  </span>
                  <span className="text-sm text-gray-500">⭐ {product.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// TODO: Provider로 감싸기
function App() {
  return (
    // <ThemeProvider>
    //   <CartProvider>
    //     <ProductProvider>
    //       <ShoppingApp />
    //     </ProductProvider>
    //   </CartProvider>
    // </ThemeProvider>
    <ShoppingApp />
  );
}

export default App;

