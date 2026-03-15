import styles from "./FooterBlock.module.css";
import type { BlockProps } from "../../../type/blocks";

export default function FooterBlock({
  brandName = "Company",
  brandDescription = "Создаем лучшие решения для вашего бизнеса с 2020 года.",
  brandLogo = "🚀",
  socialLinks = "twitter,facebook,instagram,linkedin",
  column1Title = "Продукт",
  column1Links = "Функции,Цены,Интеграции",
  column2Title = "Компания",
  column2Links = "О нас,Карьера,Блог",
  column3Title = "Поддержка",
  column3Links = "Помощь,Контакты,API",
  copyright = "© 2024 Company. Все права защищены.",
}: BlockProps) {
  const socials = socialLinks.split(",").map((s) => s.trim());
  const links1 = column1Links.split(",").map((l) => l.trim());
  const links2 = column2Links.split(",").map((l) => l.trim());
  const links3 = column3Links.split(",").map((l) => l.trim());

  const socialIcons: Record<string, string> = {
    twitter: "🐦",
    facebook: "📘",
    instagram: "📷",
    linkedin: "💼",
    youtube: "📺",
    telegram: "✈️",
    github: "🐙",
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.brandLogo}>
              <span>{brandLogo}</span>
              <span>{brandName}</span>
            </div>
            <p className={styles.brandDescription}>{brandDescription}</p>
            <div className={styles.socialLinks}>
              {socials.map((social, idx) => (
                <a
                  key={idx}
                  href="#"
                  className={styles.socialLink}
                >
                  {socialIcons[social] || "🔗"}
                </a>
              ))}
            </div>
          </div>

          <div className={styles.column}>
            <h4>{column1Title}</h4>
            <div className={styles.links}>
              {links1.map((link, idx) => (
                <a key={idx} href="#" className={styles.link}>{link}</a>
              ))}
            </div>
          </div>

          <div className={styles.column}>
            <h4>{column2Title}</h4>
            <div className={styles.links}>
              {links2.map((link, idx) => (
                <a key={idx} href="#" className={styles.link}>{link}</a>
              ))}
            </div>
          </div>

          <div className={styles.column}>
            <h4>{column3Title}</h4>
            <div className={styles.links}>
              {links3.map((link, idx) => (
                <a key={idx} href="#" className={styles.link}>{link}</a>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>{copyright}</p>
          <div className={styles.legal}>
            <a href="#">Политика конфиденциальности</a>
            <a href="#">Условия использования</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
