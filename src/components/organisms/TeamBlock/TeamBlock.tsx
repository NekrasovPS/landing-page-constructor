import styles from "./TeamBlock.module.css";
import type { BlockProps } from "../../../type/blocks";

export default function TeamBlock({
  title = "Наша команда",
  subtitle = "Люди, которые делают нас лучше",
  member1Name = "Александр Иванов",
  member1Role = "CEO & Founder",
  member1Bio = "10 лет опыта в бизнесе. Любит инновации и кофе.",
  member1Avatar = "👨‍💼",
  member1Socials = "twitter,linkedin",
  member2Name = "Мария Петрова",
  member2Role = "Главный дизайнер",
  member2Bio = "Создает красоту в каждом пикселе. Фанат минимализма.",
  member2Avatar = "👩‍🎨",
  member2Socials = "instagram,dribbble",
  member3Name = "Дмитрий Сидоров",
  member3Role = "Технический директор",
  member3Bio = "Кодит на 10 языках. Знает всё о технологиях.",
  member3Avatar = "👨‍💻",
  member3Socials = "github,linkedin",
  member4Name = "Елена Козлова",
  member4Role = "Маркетолог",
  member4Bio = "Продвигает продукты с душой. Эксперт по соцсетям.",
  member4Avatar = "👩‍💼",
  member4Socials = "facebook,instagram",
}: BlockProps) {
  const socialIcons: Record<string, string> = {
    twitter: "🐦",
    facebook: "📘",
    instagram: "📷",
    linkedin: "💼",
    github: "🐙",
    dribbble: "🏀",
  };

  const members = [
    { name: member1Name, role: member1Role, bio: member1Bio, avatar: member1Avatar, socials: member1Socials },
    { name: member2Name, role: member2Role, bio: member2Bio, avatar: member2Avatar, socials: member2Socials },
    { name: member3Name, role: member3Role, bio: member3Bio, avatar: member3Avatar, socials: member3Socials },
    { name: member4Name, role: member4Role, bio: member4Bio, avatar: member4Avatar, socials: member4Socials },
  ];

  return (
    <section className={styles.team}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        <div className={styles.grid}>
          {members.map((member, i) => {
            const socialList = member.socials?.split(",").map((s) => s.trim()) || [];
            return (
              <div key={i} className={styles.card}>
                <div className={styles.avatar}>{member.avatar}</div>
                <h3 className={styles.name}>{member.name}</h3>
                <p className={styles.role}>{member.role}</p>
                <p className={styles.bio}>{member.bio}</p>
                <div className={styles.socials}>
                  {socialList.map((social, j) => (
                    <a key={j} href="#" className={styles.socialLink}>
                      {socialIcons[social] || "🔗"}
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
