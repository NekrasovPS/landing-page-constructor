import styles from "./HeroBlock7.module.css";
import type { BlockProps } from "../../../type/blocks";

export default function HeroBlock7({
  logo = "🎯",
  title = "Минимализм <strong>в простоте</strong>",
  description = "Чистый дизайн без лишних элементов. Только самое важное.",
  placeholder = "Ваш email",
  buttonText = "Поехали",
  note = "Бесплатно. Никакого спама.",
}: BlockProps) {
  return (
    <section className={styles.hero7}>
      <div className={styles.container}>
        <span className={styles.logo}>{logo}</span>
        <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />
        <p className={styles.description}>{description}</p>
        <form className={styles.emailForm} onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            className={styles.input}
            placeholder={placeholder}
            required
          />
          <button type="submit" className={styles.btn}>{buttonText}</button>
        </form>
        <p className={styles.note}>{note}</p>
      </div>
    </section>
  );
}
