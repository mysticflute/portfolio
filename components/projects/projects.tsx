import Project from '@/components/project/project';
import styles from './projects.module.css';
import { type ProjectMetadata } from '@/lib/projects';

type Props = {
  /**
   * The metadata about all portfolio projects.
   */
  projectsMetadata: ProjectMetadata[];
};

export default function Projects({ projectsMetadata }: Props) {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={styles.heading}>
          <h1 id="portfolio" className="textHeadingMedium">
            Take a look at my{' '}
            <span className="textHighlight3">music portfolio</span>
          </h1>
        </div>
        <div className={styles.projectsList}>
          {projectsMetadata.map(project => (
            <Project projectMetadata={project} key={project.slug}></Project>
          ))}
        </div>
      </div>
    </section>
  );
}
