import { type Metadata } from 'next';
import Layout from '@/components/layout/layout';
import Contact from '@/components/contact/contact';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Nathan David McWilliams.',
};

export default function ContactPage() {
  return (
    <Layout>
      <Contact></Contact>
    </Layout>
  );
}
