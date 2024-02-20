import { Metadata } from 'next';
import Layout from '@/components/layout/layout';
import ContactInfo from '@/components/contactInfo/contactInfo';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Nathan David McWilliams.',
};

export default function ContactPage() {
  return (
    <Layout>
      <ContactInfo></ContactInfo>
    </Layout>
  );
}
