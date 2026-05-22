import styles from "./HeroBlock6.module.css";
import type { BlockProps } from "../../../type/blocks";

export default function HeroBlock6({
  subtitle = "🎬 Видео презентация",
  title = "Видео на фоне",
  description = "Эффектный вариант с видео на заднем плане. Привлекает внимание и создает атмосферу.",
  buttonText = "Смотреть видео",
  videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1&playlist=dQw4w9WgXcQ",
}: BlockProps) {
  return (
    <section className={styles.hero6}>
      <iframe
        className={styles.videoBg}
        src={videoUrl}
        title="Background video"
        style={{ border: "none", pointerEvents: "none" }}
        allow="autoplay; muted; loop"
      />
      <div className={styles.overlay} />
      <div className={styles.container}>
        <span className={styles.subtitle}>{subtitle}</span>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        <button className={styles.btn}>{buttonText}</button>
      </div>
      <div className={styles.scroll}>
        <span>Листайте вниз</span>
        <span>↓</span>
      </div>
    </section>
  );
}
