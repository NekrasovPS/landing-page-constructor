import styles from "./HeroBlock5.module.css";
import type { BlockProps } from "../../../type/blocks";

export default function HeroBlock5({
  badge = "✨ Добро пожаловать",
  title = "Центрированный <span>контент</span>",
  description = "Классический вариант с контентом по центру. Идеально для главных страниц и промо-сайтов.",
  buttonText = "Начать бесплатно",
  button2Text = "Демо",
  trustText = "Нам доверяют более 1000 компаний:",
  logos = "🏢,🏭,🏪,🏨,🏦",
}: BlockProps) {
  const logoList = logos?.split(",").map((l) => l.trim()) || [];

  return (
    <section className={styles.hero5}>
      <div className={styles.container}>
        <span className={styles.badge}>{badge}</span>
        <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />
        <p className={styles.description}>{description}</p>
        <div className={styles.buttons}>
          <button className={styles.btnPrimary}>{buttonText}</button>
          <button className={styles.btnSecondary}>{button2Text}</button>
        </div>
        <div className={styles.trust}>
          <p className={styles.trustText}>{trustText}</p>
          <div className={styles.logos}>
            {logoList.map((logo, i) => (
              <span key={i}>{logo}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
