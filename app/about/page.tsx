import { type Metadata } from 'next';
import Layout from '@/components/layout/layout';
import MyStory from '@/components/myStory/myStory';
import MyValues from '@/components/myValues/myValues';

export const metadata: Metadata = {
  title: 'About Me',
  description: 'About Nathan David McWilliams.',
};

export default function AboutPage() {
  return (
    <Layout>
      <MyStory></MyStory>
      <MyValues></MyValues>
    </Layout>
  );
}
