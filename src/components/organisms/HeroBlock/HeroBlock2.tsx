import styles from "./HeroBlock2.module.css";
import type { BlockProps } from "../../../type/blocks";

export default function HeroBlock2({
  title = "Создавайте красиво",
  description = "Конструктор лендингов для современных разработчиков",
  buttonText = "Попробовать",
}: BlockProps) {
  return (
    <section className={styles.hero2}>
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        <button className={styles.button}>{buttonText}</button>
      </div>
    </section>
  );
}
