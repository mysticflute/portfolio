import { Metadata } from 'next';
import Layout from '@/components/layout/layout';
import NotFound from '@/components/notFound/notFound';

export const metadata: Metadata = {
  title: 'Page Not Found',
};

export default function NotFoundPage() {
  return (
    <Layout>
      <NotFound></NotFound>
    </Layout>
  );
}
