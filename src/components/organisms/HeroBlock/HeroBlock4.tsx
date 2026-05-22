import styles from "./HeroBlock4.module.css";
import type { BlockProps } from "../../../type/blocks";

export default function HeroBlock4({
  badge = "🔥 Новинка",
  title = "Разделенный экран",
  description = "Современный дизайн с разделением на две части. Слева контент, справа изображение.",
  buttonText = "Начать",
  button2Text = "Узнать больше",
  backgroundImage = "https://picsum.photos/800/1000",
}: BlockProps) {
  return (
    <section className={styles.hero4}>
      <div className={styles.content}>
        <span className={styles.badge}>{badge}</span>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        <div className={styles.buttons}>
          <button className={styles.btnPrimary}>{buttonText}</button>
          <button className={styles.btnSecondary}>{button2Text}</button>
        </div>
      </div>
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
    </section>
  );
}
