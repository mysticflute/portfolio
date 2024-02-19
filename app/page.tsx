import { getProjects } from '@/lib/projects';
import Hero from '@/components/hero/hero';
import Strip from '@/components/strip/strip';
import Projects from '@/components/projects/projects';
import Layout from '@/components/layout/layout';

export default async function Page() {
  const projects = await getProjects();

  return (
    <Layout>
      <Hero></Hero>
      <Strip></Strip>
      <Projects projectsMetadata={projects}></Projects>
    </Layout>
  );
}
