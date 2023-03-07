import Head from 'next/head';
import Layout from '@/components/layout/layout';
import Hero from '@/components/hero/hero';
import { baseWebsiteTitle } from '@/lib/constants';

export default function Home() {
  return (
    <>
      <Layout>
        <Head>
          <title>{baseWebsiteTitle}</title>
        </Head>
        <Hero></Hero>
      </Layout>
    </>
  );
}
