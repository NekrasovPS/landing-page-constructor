import styles from "./LogosBlock.module.css";
import type { BlockProps } from "../../../type/blocks";

export default function LogosBlock({
  title = "Нам доверяют",
  logo1 = "🏢",
  logo2 = "🏭",
  logo3 = "🏪",
  logo4 = "🏨",
  logo5 = "🏦",
  logo6 = "🏛️",
  logo7 = "🏗️",
  logo8 = "🏘️",
  logo9 = "🏙️",
  logo10 = "🏜️",
  logo11 = "🏝️",
  logo12 = "🏞️",
}: BlockProps) {
  const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9, logo10, logo11, logo12];

  return (
    <section className={styles.logos}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.grid}>
          {logos.map((logo, i) => (
            <div key={i} className={styles.logo}>
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
