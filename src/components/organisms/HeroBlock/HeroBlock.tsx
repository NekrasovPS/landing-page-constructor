import styles from "./HeroBlock.module.css";

interface HeroBlockProps {
  backgroundImage?: string;
  title?: string;
  description?: string;
  buttonText?: string;
}

export default function HeroBlock({
  backgroundImage = "https://img.freepik.com/free-photo/grunge-black-concrete-textured-background_53876-124541.jpg?semt=ais_hybrid&w=740",
  title = "Добро пожаловать",
  description = "Создавайте лендинги легко и быстро",
  buttonText = "Начать",
}: HeroBlockProps) {
  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>
          <button className={styles.button}>{buttonText}</button>
        </div>
      </div>
    </section>
  );
}
