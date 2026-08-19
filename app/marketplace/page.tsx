'use client';

import { Marketplace } from '@/src/components/Marketplace';
import { ProductModal } from '@/src/components/ProductModal';
import { useState } from 'react';
import { ProductItem } from '@/src/types';

export default function MarketplacePage() {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  return (
    <>
      <Marketplace onSelectProduct={setSelectedProduct} />
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}
