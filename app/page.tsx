import { getProjects } from '@/lib/projects';
import Layout from '@/components/layout/layout';
import Hero from '@/components/hero/hero';
import Strip from '@/components/strip/strip';
import Projects from '@/components/projects/projects';

export default async function Page() {
  const projects = await getProjects();

  return (
    <Layout>
      <Hero></Hero>
      <Strip></Strip>
      <Projects projects={projects}></Projects>
    </Layout>
  );
}
