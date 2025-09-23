import React from 'react';
import { Layout } from '@/components/Layout';
import Link from 'next/link';

export default function ExportPage() {
  return (
    <Layout title="Export" description="Global export capabilities for premium Makhana & spices.">
      <section className="py-16">
        <div className="container-default max-w-3xl">
          <h1 className="h2">From India to the World.</h1>
          <p className="mt-6 text-gray-700 text-lg">We are preparing to export our premium products to Europe and beyond. Lakshya Foods ensures every product meets international quality standards, ready to serve the global market.</p>
          <div className="mt-10">
            <Link href="/contact" className="btn-primary">Partner With Us</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
