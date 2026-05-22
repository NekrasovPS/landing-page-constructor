import styles from "./HeroBlock8.module.css";
import type { BlockProps } from "../../../type/blocks";

export default function HeroBlock8({
  badge = "🚀 ЗАПУСК",
  title = "С формой захвата",
  description = "Идеально для сбора лидов. Форма всегда на виду у пользователя.",
  feature1 = "Бесплатная консультация",
  feature2 = "Демо доступ",
  feature3 = "Поддержка 24/7",
  formTitle = "Получить доступ",
  formDescription = "Заполните форму и мы свяжемся с вами",
  input1Placeholder = "Ваше имя",
  input2Placeholder = "Email",
  buttonText = "Отправить",
}: BlockProps) {
  return (
    <section className={styles.hero8}>
      <div className={styles.content}>
        <span className={styles.badge}>{badge}</span>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        <div className={styles.features}>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>✓</span>
            <span>{feature1}</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>✓</span>
            <span>{feature2}</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>✓</span>
            <span>{feature3}</span>
          </div>
        </div>
      </div>
      <div className={styles.form}>
        <h3 className={styles.formTitle}>{formTitle}</h3>
        <p className={styles.formDescription}>{formDescription}</p>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className={styles.field}>
            <label className={styles.label}>Имя</label>
            <input
              type="text"
              className={styles.input}
              placeholder={input1Placeholder}
              required
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={styles.input}
              placeholder={input2Placeholder}
              required
            />
          </div>
          <button type="submit" className={styles.btn}>{buttonText}</button>
        </form>
      </div>
    </section>
  );
}
