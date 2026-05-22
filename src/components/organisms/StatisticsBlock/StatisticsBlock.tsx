import styles from "./StatisticsBlock.module.css";
import type { BlockProps } from "../../../type/blocks";

export default function StatisticsBlock({
  stat1Icon = "👥",
  stat1Number = "10,000+",
  stat1Label = "Клиентов",
  stat1Description = "По всему миру",
  stat2Icon = "🎯",
  stat2Number = "99%",
  stat2Label = "Довольных",
  stat2Description = "Положительных отзывов",
  stat3Icon = "🏆",
  stat3Number = "15+",
  stat3Label = "Наград",
  stat3Description = "В индустрии",
  stat4Icon = "📦",
  stat4Number = "500+",
  stat4Label = "Проектов",
  stat4Description = "Успешно завершено",
}: BlockProps) {
  const stats = [
    { icon: stat1Icon, number: stat1Number, label: stat1Label, description: stat1Description },
    { icon: stat2Icon, number: stat2Number, label: stat2Label, description: stat2Description },
    { icon: stat3Icon, number: stat3Number, label: stat3Label, description: stat3Description },
    { icon: stat4Icon, number: stat4Number, label: stat4Label, description: stat4Description },
  ];

  return (
    <section className={styles.statistics}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {stats.map((stat, i) => (
            <div key={i} className={styles.stat}>
              <span className={styles.icon}>{stat.icon}</span>
              <div className={styles.number}>{stat.number}</div>
              <div className={styles.label}>{stat.label}</div>
              <div className={styles.description}>{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
