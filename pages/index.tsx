import Head from 'next/head';
import Layout from '@/components/layout/layout';
import Hero from '@/components/hero/hero';
import Strip from '@/components/strip/strip';
import Projects from '@/components/projects/projects';
import { baseWebsiteTitle } from '@/lib/constants';
import { getProjects } from '@/lib/projects';
import type { InferGetStaticPropsType } from 'next';

export async function getStaticProps() {
  const projects = await getProjects();
  return {
    props: {
      projects,
    },
  };
}

export default function Home({
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Layout>
        <Head>
          <title>{baseWebsiteTitle}</title>
        </Head>
        <Hero></Hero>
        <Strip></Strip>
        <Projects projectsMetadata={projects}></Projects>
      </Layout>
    </>
  );
}
