import styles from "./AppDownloadBlock.module.css";
import type { BlockProps } from "../../../type/blocks";

export default function AppDownloadBlock({
  badge = "📱 Мобильное приложение",
  title = "Скачайте наше приложение",
  description = "Доступно в App Store и Google Play. Получите лучший опыт использования!",
  appStoreText = "Download on the",
  appStoreName = "App Store",
  googlePlayText = "GET IT ON",
  googlePlayName = "Google Play",
}: BlockProps) {
  return (
    <section className={styles.app}>
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.badge}>{badge}</span>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
          <div className={styles.stores}>
            <div className={styles.store}>
              <span className={styles.storeIcon}>🍎</span>
              <div className={styles.storeText}>
                <span>{appStoreText}</span>
                <span>{appStoreName}</span>
              </div>
            </div>
            <div className={styles.store}>
              <span className={styles.storeIcon}>▶️</span>
              <div className={styles.storeText}>
                <span>{googlePlayText}</span>
                <span>{googlePlayName}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.phone}>📱</div>
      </div>
    </section>
  );
}
