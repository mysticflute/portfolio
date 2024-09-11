import { getProjects } from '@/lib/projects';
import Layout from '@/components/layout/layout';
import Hero from '@/components/hero/hero';
import FeaturedWork from '@/components/featuredWork/featuredWork';
import Projects from '@/components/projects/projects';
import MyServices from '@/components/myServices/myServices';

export default async function Page() {
  const projects = await getProjects();

  return (
    <Layout>
      <Hero />
      <FeaturedWork />
      <Projects projects={projects} />
      <MyServices></MyServices>
    </Layout>
  );
}
