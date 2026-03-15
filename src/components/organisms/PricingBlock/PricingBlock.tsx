import styles from "./PricingBlock.module.css";
import type { BlockProps } from "../../../type/blocks";

export default function PricingBlock({
  title = "Тарифные планы",
  subtitle = "Выберите план, который подходит именно вам",
  plan1Name = "Старт",
  plan1Price = "0",
  plan1Features = "1 проект,Базовые функции,Email поддержка",
  plan1ButtonText = "Начать бесплатно",
  plan2Name = "Профи",
  plan2Price = "990",
  plan2Features = "10 проектов,Все функции,Приоритетная поддержка,Аналитика",
  plan2ButtonText = "Выбрать план",
  plan3Name = "Бизнес",
  plan3Price = "2990",
  plan3Features = "Безлимитно,Все функции,Персональный менеджер,API доступ,SLA",
  plan3ButtonText = "Связаться с нами",
}: BlockProps) {
  const parseFeatures = (str: string) => str.split(",").map((s) => s.trim());

  return (
    <section className={styles.pricing}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        <div className={styles.grid}>
          {/* Plan 1 */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.planName}>{plan1Name}</h3>
              <div className={styles.planPrice}>
                {plan1Price === "0" ? "Бесплатно" : `${plan1Price} ₽`}
              </div>
              <span className={styles.planPeriod}>в месяц</span>
            </div>
            <div className={styles.features}>
              {parseFeatures(plan1Features).map((feature, idx) => (
                <div key={idx} className={styles.feature}>
                  <span className={styles.featureIcon}>✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <button className={`${styles.button} ${styles.buttonSecondary}`}>
              {plan1ButtonText}
            </button>
          </div>

          {/* Plan 2 - Featured */}
          <div className={`${styles.card} ${styles.cardFeatured}`}>
            <div className={styles.cardHeader}>
              <h3 className={styles.planName}>{plan2Name}</h3>
              <div className={styles.planPrice}>{plan2Price} ₽</div>
              <span className={styles.planPeriod}>в месяц</span>
            </div>
            <div className={styles.features}>
              {parseFeatures(plan2Features).map((feature, idx) => (
                <div key={idx} className={styles.feature}>
                  <span className={styles.featureIcon}>✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <button className={`${styles.button} ${styles.buttonPrimary}`}>
              {plan2ButtonText}
            </button>
          </div>

          {/* Plan 3 */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.planName}>{plan3Name}</h3>
              <div className={styles.planPrice}>{plan3Price} ₽</div>
              <span className={styles.planPeriod}>в месяц</span>
            </div>
            <div className={styles.features}>
              {parseFeatures(plan3Features).map((feature, idx) => (
                <div key={idx} className={styles.feature}>
                  <span className={styles.featureIcon}>✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <button className={`${styles.button} ${styles.buttonSecondary}`}>
              {plan3ButtonText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
