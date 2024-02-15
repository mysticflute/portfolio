import { getProjects } from '@/lib/projects';
import Hero from '@/components/hero/hero';
import Strip from '@/components/strip/strip';
import Projects from '@/components/projects/projects';

export default async function Page() {
  const projects = await getProjects();

  return (
    <>
      <Hero></Hero>
      <Strip></Strip>
      <Projects projectsMetadata={projects}></Projects>
    </>
  );
}
