import styles from "./GalleryBlock.module.css";
import type { BlockProps } from "../../../type/blocks";

export default function GalleryBlock({
  title = "Наши работы",
  subtitle = "Посмотрите примеры наших проектов",
  image1 = "https://picsum.photos/800/600?random=1",
  image2 = "https://picsum.photos/800/600?random=2",
  image3 = "https://picsum.photos/800/600?random=3",
  image4 = "https://picsum.photos/800/600?random=4",
  image5 = "https://picsum.photos/800/600?random=5",
  image6 = "https://picsum.photos/800/600?random=6",
  caption1 = "Проект 1",
  caption2 = "Проект 2",
  caption3 = "Проект 3",
  caption4 = "Проект 4",
  caption5 = "Проект 5",
  caption6 = "Проект 6",
}: BlockProps) {
  const images = [
    { src: image1, caption: caption1 },
    { src: image2, caption: caption2 },
    { src: image3, caption: caption3 },
    { src: image4, caption: caption4 },
    { src: image5, caption: caption5 },
    { src: image6, caption: caption6 },
  ];

  return (
    <section className={styles.gallery}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        <div className={styles.grid}>
          {images.map((img, i) => (
            <div key={i} className={styles.item}>
              <img src={img.src} alt={img.caption} className={styles.image} />
              <div className={styles.overlay}>
                <span className={styles.caption}>{img.caption}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
