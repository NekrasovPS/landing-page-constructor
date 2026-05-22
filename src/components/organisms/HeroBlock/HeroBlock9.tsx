import styles from "./HeroBlock9.module.css";
import type { BlockProps } from "../../../type/blocks";

export default function HeroBlock9({
  titleLine1 = "Типографика",
  titleLine2 = "как <span>искусство</span>",
  description = "Крупный текст и минимализм. Акцент на заголовке и сообщении.",
  buttonText = "Узнать больше",
  button2Text = "Контакты",
}: BlockProps) {
  return (
    <section className={styles.hero9}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          <span className={styles.line}>{titleLine1}</span>
          <span className={styles.line} dangerouslySetInnerHTML={{ __html: titleLine2 }} />
        </h1>
        <p className={styles.description}>{description}</p>
        <div className={styles.buttons}>
          <button className={styles.btnPrimary}>{buttonText}</button>
          <button className={styles.btnSecondary}>{button2Text}</button>
        </div>
      </div>
    </section>
  );
}
