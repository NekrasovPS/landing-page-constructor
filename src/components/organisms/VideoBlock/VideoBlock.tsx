import { useState } from "react";
import styles from "./VideoBlock.module.css";
import type { BlockProps } from "../../../type/blocks";

export default function VideoBlock({
  title = "Посмотрите наше видео",
  description = "Узнайте больше о нашем продукте за 2 минуты",
  videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ",
  thumbnail = "https://picsum.photos/1280/720",
}: BlockProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className={styles.video}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {!isPlaying ? (
            <>
              <img src={thumbnail} alt="Video thumbnail" className={styles.thumbnail} />
              <button className={styles.playButton} onClick={() => setIsPlaying(true)}>
                ▶️
              </button>
            </>
          ) : (
            <iframe
              src={videoUrl}
              title="Video"
              width="100%"
              height="100%"
              style={{ aspectRatio: "16/9", border: "none" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
    </section>
  );
}
