import styles from "./CtaBlock.module.css";
import type { BlockProps } from "../../../type/blocks";

export default function CtaBlock({
  title = "Готовы начать?",
  description = "Присоединяйтесь к тысячам довольных клиентов уже сегодня",
  buttonText = "Начать сейчас",
}: BlockProps) {
  return (
    <section className={styles.cta}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      <button className={styles.button}>{buttonText}</button>
    </section>
  );
}
