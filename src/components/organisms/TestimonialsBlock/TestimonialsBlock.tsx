import styles from "./TestimonialsBlock.module.css";
import type { BlockProps } from "../../../type/blocks";

interface TestimonialData {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  rating: string;
}

export default function TestimonialsBlock({
  title = "Отзывы клиентов",
  subtitle = "Что говорят о нас наши клиенты",
  testimonial1Quote = "Отличный сервис! Команда превзошла все наши ожидания.",
  testimonial1Name = "Александр Петров",
  testimonial1Role = "CEO, TechCorp",
  testimonial1Avatar = "👨‍💼",
  testimonial1Rating = "5",
  testimonial2Quote = "Лучшее решение на рынке. Рекомендую всем!",
  testimonial2Name = "Мария Иванова",
  testimonial2Role = "Маркетолог, StartupX",
  testimonial2Avatar = "👩‍💼",
  testimonial2Rating = "5",
  testimonial3Quote = "Профессиональный подход и отличная поддержка.",
  testimonial3Name = "Дмитрий Сидоров",
  testimonial3Role = "Разработчик, WebStudio",
  testimonial3Avatar = "👨‍💻",
  testimonial3Rating = "5",
}: BlockProps) {
  const testimonials: TestimonialData[] = [
    {
      quote: testimonial1Quote,
      name: testimonial1Name,
      role: testimonial1Role,
      avatar: testimonial1Avatar,
      rating: testimonial1Rating,
    },
    {
      quote: testimonial2Quote,
      name: testimonial2Name,
      role: testimonial2Role,
      avatar: testimonial2Avatar,
      rating: testimonial2Rating,
    },
    {
      quote: testimonial3Quote,
      name: testimonial3Name,
      role: testimonial3Role,
      avatar: testimonial3Avatar,
      rating: testimonial3Rating,
    },
  ];

  const renderStars = (count: string) => {
    const rating = parseInt(count) || 5;
    return "⭐".repeat(rating);
  };

  return (
    <section className={styles.testimonials}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        <div className={styles.grid}>
          {testimonials.map((testimonial, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.rating}>
                {renderStars(testimonial.rating)}
              </div>
              <p className={styles.quote}>"{testimonial.quote}"</p>
              <div className={styles.author}>
                <div className={styles.avatar}>{testimonial.avatar}</div>
                <div className={styles.authorInfo}>
                  <div className={styles.authorName}>{testimonial.name}</div>
                  <div className={styles.authorRole}>{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
