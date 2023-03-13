import Head from 'next/head';
import Layout from '@/components/layout/layout';
import ContactInfo from '@/components/contactInfo/contactInfo';
import { baseWebsiteTitle } from '@/lib/constants';

export default function Contact() {
  return (
    <>
      <Layout>
        <Head>
          <title>Contact - {baseWebsiteTitle}</title>
        </Head>
        <ContactInfo></ContactInfo>
      </Layout>
    </>
  );
}
