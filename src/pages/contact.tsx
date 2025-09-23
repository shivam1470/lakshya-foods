import React from 'react';
import { Layout } from '@/components/Layout';
import { ContactForm } from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <Layout title="Contact" description="Get in touch with Lakshya Foods team.">
      <section className="py-16">
        <div className="container-default max-w-3xl">
          <h1 className="h2 mb-6">Contact Us</h1>
          <p className="text-gray-700 mb-10">Let’s grow together! Whether you are a customer, distributor, or global partner, we would love to hear from you.</p>
          <ContactForm />
        </div>
      </section>
    </Layout>
  );
}
