import styles from "./HeroBlock10.module.css";
import type { BlockProps } from "../../../type/blocks";

export default function HeroBlock10({
  icon = "🌙",
  title = "Темная тема",
  description = "Стильный темный дизайн с неоновыми акцентами. Современно и эффектно.",
  card1Icon = "⚡",
  card1Title = "Быстро",
  card1Description = "Молниеносная работа",
  card2Icon = "🔒",
  card2Title = "Безопасно",
  card2Description = "Защита данных",
  card3Icon = "💎",
  card3Title = "Качественно",
  card3Description = "Премиум уровень",
  buttonText = "Начать работу",
}: BlockProps) {
  return (
    <section className={styles.hero10}>
      <div className={styles.container}>
        <div className={styles.glow} />
        <span className={styles.icon}>{icon}</span>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        
        <div className={styles.cards}>
          <div className={styles.card}>
            <span className={styles.cardIcon}>{card1Icon}</span>
            <h3 className={styles.cardTitle}>{card1Title}</h3>
            <p className={styles.cardDescription}>{card1Description}</p>
          </div>
          <div className={styles.card}>
            <span className={styles.cardIcon}>{card2Icon}</span>
            <h3 className={styles.cardTitle}>{card2Title}</h3>
            <p className={styles.cardDescription}>{card2Description}</p>
          </div>
          <div className={styles.card}>
            <span className={styles.cardIcon}>{card3Icon}</span>
            <h3 className={styles.cardTitle}>{card3Title}</h3>
            <p className={styles.cardDescription}>{card3Description}</p>
          </div>
        </div>

        <button className={styles.btn}>{buttonText}</button>
      </div>
    </section>
  );
}
