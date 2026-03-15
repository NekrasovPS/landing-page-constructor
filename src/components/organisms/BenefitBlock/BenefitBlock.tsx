import styles from "./BenefitBlock.module.css";
import type { BlockProps } from "../../../type/blocks";

export default function BenefitBlock({
  title = "Почему выбирают нас",
  benefit1Icon = "⚡",
  benefit1Title = "Скорость",
  benefit1Description = "Быстрая загрузка и отклик",
  benefit2Icon = "🎨",
  benefit2Title = "Дизайн",
  benefit2Description = "Современный и адаптивный",
  benefit3Icon = "🔧",
  benefit3Title = "Гибкость",
  benefit3Description = "Легкая настройка под себя",
}: BlockProps) {
  return (
    <section className={styles.benefits}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.list}>
        <div className={styles.item}>
          <div className={styles.icon}>{benefit1Icon}</div>
          <div className={styles.text}>
            <h3 className={styles.itemTitle}>{benefit1Title}</h3>
            <p className={styles.itemDescription}>{benefit1Description}</p>
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.icon}>{benefit2Icon}</div>
          <div className={styles.text}>
            <h3 className={styles.itemTitle}>{benefit2Title}</h3>
            <p className={styles.itemDescription}>{benefit2Description}</p>
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.icon}>{benefit3Icon}</div>
          <div className={styles.text}>
            <h3 className={styles.itemTitle}>{benefit3Title}</h3>
            <p className={styles.itemDescription}>{benefit3Description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
