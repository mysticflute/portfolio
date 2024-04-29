import Project from '@/components/project/project';
import styles from './projects.module.css';
import { type ProjectMetadata } from '@/lib/projects';

type Props = {
  /**
   * The metadata about all portfolio projects.
   */
  projects: ProjectMetadata[];
};

export default function Projects({ projects }: Props) {
  return (
    <section className={styles.container}>
      <div className={styles.heading}>
        <h1 id="portfolio" className="textHeadingMedium">
          Take a look at my{' '}
          <span className="textHighlight3">music portfolio</span>
        </h1>
      </div>
      <div className={styles.list}>
        {projects.map(project => (
          <Project project={project} key={project.slug}></Project>
        ))}
      </div>
    </section>
  );
}
