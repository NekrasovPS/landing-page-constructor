import styles from "./HeroBlock.module.css";
import type { BlockProps } from "../../../type/blocks";

export default function HeroBlock({
  backgroundImage = "",
  title = "Добро пожаловать",
  description = "Создавайте лендинги легко и быстро",
  buttonText = "Начать",
}: BlockProps) {
  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>
          <button className={styles.button}>{buttonText}</button>
        </div>
      </div>
    </section>
  );
}
