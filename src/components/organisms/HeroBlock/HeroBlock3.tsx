import styles from "./HeroBlock3.module.css";
import type { BlockProps } from "../../../type/blocks";

export default function HeroBlock3({
  title = "Инновационный подход",
  description = "Мы используем передовые технологии для создания лучших решений",
  buttonText = "Узнать больше",
  backgroundImage = "https://picsum.photos/800/600",
}: BlockProps) {
  return (
    <section className={styles.hero3}>
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        <button className={styles.button}>{buttonText}</button>
      </div>
      <div className={styles.imageWrapper}>
        <img src={backgroundImage} alt="Hero" className={styles.image} />
      </div>
    </section>
  );
}
