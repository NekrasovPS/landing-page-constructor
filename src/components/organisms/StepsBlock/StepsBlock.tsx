import styles from "./StepsBlock.module.css";
import type { BlockProps } from "../../../type/blocks";

export default function StepsBlock({
  title = "Как мы работаем",
  subtitle = "Простой процесс из 4 шагов",
  step1Title = "Заявка",
  step1Description = "Оставьте заявку на сайте или свяжитесь с нами любым удобным способом",
  step2Title = "Консультация",
  step2Description = "Обсудим ваш проект, определим требования и сроки выполнения",
  step3Title = "Реализация",
  step3Description = "Создадим продукт в соответствии с техническим заданием",
  step4Title = "Запуск",
  step4Description = "Протестируем, запустим и предоставим гарантию на работу",
}: BlockProps) {
  const steps = [
    { number: "01", title: step1Title, description: step1Description },
    { number: "02", title: step2Title, description: step2Description },
    { number: "03", title: step3Title, description: step3Description },
    { number: "04", title: step4Title, description: step4Description },
  ];

  return (
    <section className={styles.steps}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        <div className={styles.timeline}>
          {steps.map((step, i) => (
            <div key={i} className={styles.item}>
              <div className={styles.number}>{step.number}</div>
              <div className={styles.content}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
