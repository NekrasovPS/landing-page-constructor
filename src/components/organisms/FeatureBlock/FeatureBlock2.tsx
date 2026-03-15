import styles from "./FeatureBlock2.module.css";
import type { BlockProps } from "../../../type/blocks";

export default function FeatureBlock2({
  title = "Наши преимущества",
  feature1Title = "Быстро",
  feature1Description = "Молниеносная скорость работы",
  feature2Title = "Качественно",
  feature2Description = "Внимание к каждой детали",
  feature3Title = "Надежно",
  feature3Description = "Гарантия стабильной работы",
}: BlockProps) {
  return (
    <section className={styles.features2}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.icon}>🚀</div>
          <h3 className={styles.cardTitle}>{feature1Title}</h3>
          <p className={styles.cardDescription}>{feature1Description}</p>
        </div>
        <div className={styles.card}>
          <div className={styles.icon}>✨</div>
          <h3 className={styles.cardTitle}>{feature2Title}</h3>
          <p className={styles.cardDescription}>{feature2Description}</p>
        </div>
        <div className={styles.card}>
          <div className={styles.icon}>🛡️</div>
          <h3 className={styles.cardTitle}>{feature3Title}</h3>
          <p className={styles.cardDescription}>{feature3Description}</p>
        </div>
      </div>
    </section>
  );
}
