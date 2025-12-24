import React from 'react';

import type { Product } from './ProductCard';

export interface ThumbnailImgProps {
  product?: Product;
}

export function ThumbnailImg({ product }: ThumbnailImgProps): React.JSX.Element {
  return (
    <div className="overflow-hidden rounded-lg bg-gray-100">
      <img
        src={product?.imageUrl}
        alt={product?.name}
        className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
}
