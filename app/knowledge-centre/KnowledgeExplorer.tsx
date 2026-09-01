"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  knowledgeArticles,
  knowledgeCategories,
  type KnowledgeCategory,
} from "../lib/knowledgeArticles";
import styles from "./KnowledgeCentre.module.css";

type Filter = "All" | KnowledgeCategory;

export function KnowledgeExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Filter>("All");

  const filteredArticles = useMemo(() => {
    const search = query.trim().toLocaleLowerCase("en-GB");
    return knowledgeArticles.filter((article) => {
      const inCategory = category === "All" || article.category === category;
      const searchable = `${article.title} ${article.summary} ${article.region} ${article.category}`.toLocaleLowerCase("en-GB");
      return inCategory && (!search || searchable.includes(search));
    });
  }, [category, query]);

  return (
    <div className={styles.explorer}>
      <div className={styles.searchRow}>
        <label className={styles.searchBox}>
          <span>Search the Knowledge Centre</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try residency, Labuan, property or Spain"
          />
        </label>
        <p aria-live="polite">{filteredArticles.length} {filteredArticles.length === 1 ? "guide" : "guides"}</p>
      </div>

      <div className={styles.filters} aria-label="Filter guides by topic">
        {knowledgeCategories.map((item) => (
          <button
            type="button"
            key={item}
            className={category === item ? styles.activeFilter : undefined}
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {filteredArticles.length > 0 ? (
        <div className={styles.articleGrid}>
          {filteredArticles.map((article, index) => (
            <article className={`${styles.articleCard} ${article.featured ? styles.featuredCard : ""}`} key={article.href}>
              <div className={styles.cardMeta}>
                <span>{article.region}</span>
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <p>{article.category}</p>
              <h2>{article.title}</h2>
              <div className={styles.cardBottom}>
                <p>{article.summary}</p>
                <Link href={article.href} aria-label={`Read ${article.title}`}>
                  Read guide <span>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <h2>No guide matches that search.</h2>
          <p>Try a broader term or return to all topics.</p>
          <button type="button" onClick={() => { setQuery(""); setCategory("All"); }}>Show all guides</button>
        </div>
      )}
    </div>
  );
}
