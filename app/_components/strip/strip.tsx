import styles from './strip.module.css';

// TODO:
// take the array as a prop
// displayCount as a int prop (number of times to duplicate)
// animate as a boolean prop?
// animation time as a boolean prop?

// create "featured"" component and extra these values:
const featured = [
  'Turning (Game - In Dev)',
  'Recidivia (Game - In Dev)',
  'Vulgaria (Game - In Dev)',
  'D&D Commissions (Various)',
  'Unity Asset Packs',
  'Unreal Engine Asset Packs',
];

export default function Strip() {
  return (
    <section className={styles.container}>
      <div className={styles.strip}>
        {[...Array(4)].map((_, i) => (
          <ul key={i} className={styles.stripContent} aria-hidden={i > 0}>
            {featured.map(highlight => (
              <li
                key={highlight}
                className={`textHeadingXSmall ${styles.text}`}
              >
                {highlight}
              </li>
            ))}
          </ul>
        ))}

        {/* <ul className={styles.stripContent} aria-hidden="true">
          {highlights.map(highlight => (
            <li key={highlight} className={`textHeadingXSmall ${styles.text}`}>
              {highlight}
            </li>
          ))}
        </ul> */}
        {/* <ul className={styles.stripContent} aria-hidden="true">
          {highlights.map(highlight => (
            <li key={highlight} className={`textHeadingXSmall ${styles.text}`}>
              {highlight}
            </li>
          ))}
        </ul> */}
      </div>
    </section>
  );
}
