import Head from 'next/head';
import Layout from '@/components/layout/layout';
import { baseWebsiteTitle } from '@/lib/constants';

export default function Home() {
  return (
    <>
      <Layout>
        <Head>
          <title>{baseWebsiteTitle}</title>
        </Head>
        <h1>This is the home page</h1>
      </Layout>
    </>
  );
}
