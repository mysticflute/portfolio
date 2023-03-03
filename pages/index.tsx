import Head from 'next/head';
// import Image from 'next/image';
// import { Inter } from 'next/font/google';
// import styles from '@/styles/Home.module.css';
import Layout from '../components/layout/layout';
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
