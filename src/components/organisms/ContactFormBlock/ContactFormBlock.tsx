import styles from "./ContactFormBlock.module.css";
import type { BlockProps } from "../../../type/blocks";

export default function ContactFormBlock({
  title = "Свяжитесь с нами",
  description = "Заполните форму и мы ответим вам в течение 24 часов",
  namePlaceholder = "Ваше имя",
  emailPlaceholder = "Email",
  messagePlaceholder = "Сообщение",
  buttonText = "Отправить",
}: BlockProps) {
  return (
    <section className={styles.contact}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.field}>
            <label className={styles.label}>Имя</label>
            <input
              type="text"
              className={styles.input}
              placeholder={namePlaceholder}
              required
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={styles.input}
              placeholder={emailPlaceholder}
              required
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Сообщение</label>
            <textarea
              className={styles.textarea}
              placeholder={messagePlaceholder}
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}
