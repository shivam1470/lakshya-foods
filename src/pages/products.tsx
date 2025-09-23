import React from 'react';
import { Layout } from '@/components/Layout';
import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/types/product';

const products: Product[] = [
  { id: 'makhana', name: 'Premium Makhana', description: 'Light, crunchy, nutrient-rich.', image: '/images/makhana.svg' },
  { id: 'turmeric', name: 'Turmeric Powder', description: 'Bright golden spice, pure aroma.', image: '/images/turmeric.svg' },
  { id: 'chili', name: 'Red Chili Powder', description: 'Bold flavor, authentic heat.', image: '/images/chili.svg' },
  { id: 'cardamom', name: 'Green Cardamom', description: 'Fragrant, perfect for sweets.', image: '/images/cardamom.svg' },
  { id: 'cumin', name: 'Cumin Seeds', description: 'Earthy flavor, premium-grade quality.', image: '/images/cumin.svg' }
];

export default function ProductsPage() {
  return (
    <Layout title="Products" description="Explore premium Makhana and authentic Indian spices.">
      <section className="py-16">
        <div className="container-default">
          <h1 className="h2 mb-10">Our Products</h1>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>
    </Layout>
  );
}
