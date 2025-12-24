// --- 이미지에서 확인된 상품 데이터 ---
// 이미지 파일은 이전에 확인된 `src/assets` 디렉토리의 파일들을 사용합니다.
import product1 from '@/assets/product1.png';
import product2 from '@/assets/product2.png';
import product3 from '@/assets/product3.png';
import product4 from '@/assets/product4.png';
import product5 from '@/assets/product5.png';
import product6 from '@/assets/product6.png';
import product7 from '@/assets/product7.png';

import { type Product, ProductCard } from './ProductCard';
import { ShoppingCartButton } from './ShoppingCartButton';

const products: Product[] = [
  {
    id: crypto.randomUUID(),
    name: '버그를 Java라 버그잡는 개리씨 키링 개발...',
    imageUrl: product1,
    price: 12500,
  },
  {
    id: crypto.randomUUID(),
    name: '우당탕탕 라이캣의 실험실 스티커 팩',
    imageUrl: product2,
    price: 3500,
  },
  { id: crypto.randomUUID(), name: '딥러닝 개발자 무릎 담요', imageUrl: product3, price: 17500 },
  {
    id: crypto.randomUUID(),
    name: '네 개발잡니다 개발자키링 금속키링',
    imageUrl: product4,
    price: 13500,
  },
  {
    id: crypto.randomUUID(),
    name: 'Hack Your Life 개발자 노트북 파우치',
    imageUrl: product5,
    price: 36000,
  },
  {
    id: crypto.randomUUID(),
    name: '[NEW] 위니브 개발자, 캐릭터 스티커팩 2종',
    imageUrl: product6,
    price: 5500,
  },
  {
    id: crypto.randomUUID(),
    name: '제주코딩베이스캠프 코딩 연습장 세트',
    imageUrl: product7,
    price: 8000,
  },
];

// --- 메인 페이지 컴포넌트 ---
function ProductPage() {
  return (
    <div className="bg-white">
      <ShoppingCartButton />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
