import React from 'react';
import { Layout } from '@/components/Layout';

export default function AboutPage() {
  return (
    <Layout title="About" description="Learn about Lakshya Foods story and mission.">
      <section className="py-16">
        <div className="container-default prose max-w-none">
          <h1>About Us</h1>
          <p>At <strong>Lakshya Foods</strong>, we are committed to delivering the purest Indian flavors. What started as a small initiative to bring quality Makhana and spices to local households is now growing into a trusted brand with a vision to expand globally. We believe in combining traditional Indian farming with modern hygienic packaging to give customers authentic taste, nutrition, and trust.</p>
          <p>Our focus is on transparency, sustainability, and value. Every product represents our promise: <em>Pure. Healthy. Global.</em></p>
        </div>
      </section>
    </Layout>
  );
}
