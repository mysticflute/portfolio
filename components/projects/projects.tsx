import Project from '@/components/project/project';
import styles from './projects.module.css';

export default function Projects() {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={styles.heading}>
          <h1 className="textHeadingMedium">
            Take a look at my{' '}
            <span className="textHighlight3">music portfolio</span>
          </h1>
        </div>
        <Project></Project>
      </div>
    </section>
  );
}
