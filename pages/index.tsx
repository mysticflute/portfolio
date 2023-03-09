import Head from 'next/head';
import Layout from '@/components/layout/layout';
import Hero from '@/components/hero/hero';
import Strip from '@/components/strip/strip';
import Projects from '@/components/projects/projects';
import { baseWebsiteTitle } from '@/lib/constants';

export default function Home() {
  return (
    <>
      <Layout>
        <Head>
          <title>{baseWebsiteTitle}</title>
        </Head>
        <Hero></Hero>
        <Strip></Strip>
        <Projects></Projects>
      </Layout>
    </>
  );
}
