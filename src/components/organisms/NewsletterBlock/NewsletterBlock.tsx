import styles from "./NewsletterBlock.module.css";
import type { BlockProps } from "../../../type/blocks";

export default function NewsletterBlock({
  icon = "📧",
  title = "Подпишитесь на рассылку",
  description = "Получайте полезные материалы и новости прямо на почту. Никакого спама!",
  placeholder = "Введите ваш email",
  buttonText = "Подписаться",
}: BlockProps) {
  return (
    <section className={styles.newsletter}>
      <div className={styles.container}>
        <div className={styles.icon}>{icon}</div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            className={styles.input}
            placeholder={placeholder}
            required
          />
          <button type="submit" className={styles.button}>
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}
