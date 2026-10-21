import Link from "next/link";
import styles from "../Podcast.module.css";

const videos = [
  {
    id: "Ih-xLTY8yMQ",
    title: "Considering Malaysia? An American perspective.",
    description: "Exploring a move from the United States? Watch this selected video, then speak with us about your own plans for life in Malaysia.",
  },
];

export function MalaysiaVideos() {
  return (
    <section id="malaysia-videos" className={`section-pad ${styles.section}`} aria-labelledby="malaysia-videos-heading">
      <div className="site-shell">
        <p className="eyebrow">PF EuroAsia · Video collection</p>
        <h2 id="malaysia-videos-heading" className={styles.heading}>Discover life in Malaysia</h2>
        <div className={styles.episodes}>
          {videos.map((video) => (
            <article key={video.id} className={styles.episode}>
              <div className={styles.player}>
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <div className={styles.copy}>
                <p className="eyebrow">An American perspective</p>
                <h3>{video.title}</h3>
                <p>{video.description}</p>
                <Link className="button button-gold" href="/asia-gateway/enquire">Discuss your move to Malaysia <span>→</span></Link>
                <p><small>Video: Wanderlust Ventures · Selected by PF EuroAsia.</small></p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
