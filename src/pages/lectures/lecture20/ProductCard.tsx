import { LikeButton } from './LikeButton';
import { ProductName } from './ProductName';
import { ThumbnailImg } from './ThumbnailImg';

export type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
};

export interface ProductCardProps {
  product?: Product;
}

// --- 개별 상품 카드를 위한 컴포넌트 ---
export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group cursor-pointer">
      <ThumbnailImg product={product} />
      <div className="mt-4 flex items-start justify-between">
        <ProductName product={product} />
        <LikeButton />
      </div>
    </div>
  );
}
