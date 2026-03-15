import { useState } from "react";
import styles from "./FaqBlock.module.css";
import type { BlockProps } from "../../../type/blocks";

export default function FaqBlock({
  title = "Часто задаваемые вопросы",
  subtitle = "Найдите ответы на популярные вопросы",
  faq1Question = "Как начать работу?",
  faq1Answer = "Просто зарегистрируйтесь и выберите подходящий тарифный план. После этого вы получите доступ ко всем функциям платформы.",
  faq2Question = "Есть ли бесплатная версия?",
  faq2Answer = "Да, у нас есть бесплатный тариф с базовым функционалом. Вы можете начать с него и перейти на платный в любой момент.",
  faq3Question = "Как оплатить подписку?",
  faq3Answer = "Мы принимаем банковские карты, PayPal и криптовалюты. Оплата происходит безопасно через наш платежный шлюз.",
  faq4Question = "Можно ли отменить подписку?",
  faq4Answer = "Да, вы можете отменить подписку в любой момент в личном кабинете. Доступ сохранится до конца оплаченного периода.",
}: BlockProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { question: faq1Question, answer: faq1Answer },
    { question: faq2Question, answer: faq2Answer },
    { question: faq3Question, answer: faq3Answer },
    { question: faq4Question, answer: faq4Answer },
  ];

  return (
    <section className={styles.faq}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        <div className={styles.list}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`${styles.item} ${openIndex === i ? styles.open : ""}`}
            >
              <button
                className={styles.question}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className={styles.questionText}>{faq.question}</span>
                <span className={styles.icon}>+</span>
              </button>
              <div className={styles.answer}>
                <div className={styles.answerContent}>{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
