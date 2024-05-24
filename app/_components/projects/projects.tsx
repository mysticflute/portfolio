import { type ProjectMetadata } from '@/lib/projects';
import Project from '@/components/project/project';
import styles from './projects.module.css';

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
        {/*prettier-ignore */}
        <h2 id="portfolio" className="textHeadingMedium">
          Take a look at my <span className="textHighlight3">music portfolio</span>
        </h2>
      </div>
      <div className={styles.list}>
        {projects.map(project => (
          <Project project={project} key={project.slug}></Project>
        ))}
      </div>
    </section>
  );
}
