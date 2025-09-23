import React from 'react';
import { Layout } from '@/components/Layout';
import { Hero } from '@/components/Hero';

export default function HomePage() {
  return (
    <Layout title="Home" description="Premium-quality Makhana & Indian spices.">
      <Hero />
      <section className="py-20">
        <div className="container-default grid md:grid-cols-3 gap-10">
          <div className="space-y-3">
            <h2 className="h3">Our Vision</h2>
            <p className="text-sm text-gray-600">To make authentic Indian superfoods and spices accessible globally with unwavering commitment to purity and quality.</p>
          </div>
          <div className="space-y-3">
            <h2 className="h3">Quality First</h2>
            <p className="text-sm text-gray-600">Every batch is carefully sourced, processed, and packed to preserve natural nutrition and aroma.</p>
          </div>
          <div className="space-y-3">
            <h2 className="h3">Global Outlook</h2>
            <p className="text-sm text-gray-600">We are scaling our export capabilities to deliver trusted Indian flavors overseas.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
