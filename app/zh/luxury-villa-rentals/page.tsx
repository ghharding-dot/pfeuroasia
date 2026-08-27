import Link from "next/link";
import { PartnerStrip } from "../../components/PartnerStrip";
import { ZhRentalEnquiryForm } from "./ZhRentalEnquiryForm";
import "../../luxury-villa-rentals/luxury-villa-rentals.css";

const areas = [
  { name: "La Zagaleta", location: "Benahavís 私人庄园社区", image: "/images/luxury-villa-rentals/la-zagaleta.jpg" },
  { name: "El Madroñal", location: "Benahavís 山林别墅区", image: "/images/luxury-villa-rentals/el-madronal.jpg" },
  { name: "Marbella Golden Mile", location: "马贝拉黄金地段", image: "/images/luxury-villa-rentals/golden-mile.jpg" },
  { name: "Benahavís", location: "山景私人庄园", image: "https://images.unsplash.com/photo-1776761731066-c89caa8d25e6?auto=format&fit=crop&q=84&w=1600" },
  { name: "Puerto Banús", location: "码头与海滨生活", image: "https://images.unsplash.com/photo-1751054551120-1ccbe689d091?auto=format&fit=crop&q=84&w=1600" },
  { name: "Sierra Blanca", location: "马贝拉山麓", image: "/images/luxury-villa-rentals/sierra-blanca.jpg" },
];

const services = [
  ["✈", "私人机场接送"],
  ["◇", "豪华车辆租赁"],
  ["◉", "专职司机服务"],
  ["≈", "游艇包租"],
  ["✦", "私人航空"],
  ["♢", "私人厨师"],
  ["⚑", "高尔夫预订"],
  ["❧", "水疗与健康服务"],
  ["◇", "私人安保"],
];

export default function ChineseLuxuryVillaRentalsPage() {
  return (
    <main className="villa-rentals-page zh-site" lang="zh-CN">
      <header className="zh-header">
        <div className="site-shell zh-header-inner">
          <Link className="brand" href="/zh" aria-label="Property Facilitators EuroAsia 中文首页">
            <span className="brand-lockup" aria-hidden="true">
              <img className="brand-symbol" src="/images/pf-gold-symbol.png" alt="" />
              <span className="brand-words"><b>Property</b><b>Facilitators</b></span>
              <span className="brand-region">EuroAsia</span>
            </span>
          </Link>
          <nav aria-label="中文导航">
            <Link href="/zh">中文首页</Link>
            <a href="#villa-enquiry">查询档期</a>
          </nav>
        </div>
      </header>

      <section className="villa-rentals-hero">
        <div className="villa-rentals-overlay" />
        <div className="site-shell villa-rentals-hero-inner">
          <div className="villa-rentals-hero-copy">
            <p className="villa-rentals-eyebrow">马贝拉豪华别墅租赁</p>
            <h1>非凡居所，<br /><em>专属服务。</em></h1>
            <p className="villa-rentals-tagline">全程私密安排。</p>
            <p className="villa-rentals-collaboration">
              Property Facilitators EuroAsia <span>×</span> The Luxury Villa Collection
            </p>
            <a className="villa-rentals-button" href="#villa-enquiry">
              获取专属别墅推荐 <span>→</span>
            </a>
          </div>
        </div>
      </section>

      <section className="villa-rentals-intro">
        <div className="site-shell villa-rentals-intro-grid">
          <div>
            <p className="villa-rentals-eyebrow dark">严选豪华别墅系列</p>
            <h2>高端度假，由专人为您安排。</h2>
          </div>
          <div className="villa-rentals-body-copy">
            <p>通过与 The Luxury Villa Collection 的合作，Property Facilitators EuroAsia 为客户提供马贝拉及周边核心住宅区内、由团队亲自筛选与考察的豪华别墅资源。</p>
            <p>无论是家庭度假、长期居住、企业活动或私人庆典，每一项咨询都会由专人独立处理，并严格尊重客户隐私。</p>
          </div>
        </div>
      </section>

      <section className="villa-rentals-areas" aria-labelledby="zh-panoramic-heading">
        <div className="site-shell">
          <div className="villa-rentals-section-heading">
            <p className="villa-rentals-eyebrow">地中海全景生活</p>
            <h2 id="zh-panoramic-heading">景观本身，就是体验的一部分。</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 18 }}>
            <figure style={{ margin: 0 }}>
              <img src="/images/luxury-villa-rentals/panoramic-twilight.jpg" alt="马贝拉豪华别墅黄昏全景" style={{ display: "block", width: "100%", aspectRatio: "16 / 9", objectFit: "cover" }} />
              <figcaption style={{ marginTop: 14, color: "rgba(255,255,255,.62)", fontSize: 10, letterSpacing: ".14em" }}>地中海黄昏景致</figcaption>
            </figure>
            <figure style={{ margin: 0 }}>
              <img src="/images/luxury-villa-rentals/panoramic-day.jpg" alt="眺望直布罗陀与北非的全景" style={{ display: "block", width: "100%", aspectRatio: "16 / 9", objectFit: "cover" }} />
              <figcaption style={{ marginTop: 14, color: "rgba(255,255,255,.62)", fontSize: 10, letterSpacing: ".14em" }}>远眺直布罗陀与北非</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="villa-rentals-areas" style={{ paddingTop: 0 }}>
        <div className="site-shell">
          <div className="villa-rentals-section-heading">
            <p className="villa-rentals-eyebrow">精选豪华别墅</p>
            <h2>覆盖马贝拉最受欢迎的核心区域。</h2>
          </div>
          <div className="villa-rentals-area-grid">
            {areas.map((area, index) => (
              <a className="villa-rentals-area-card" href="#villa-enquiry" key={area.name}>
                <span className="villa-rentals-area-photo" style={{ backgroundImage: `url(${area.image})` }} aria-hidden="true" />
                <span className="villa-rentals-area-shade" aria-hidden="true" />
                <span className="villa-rentals-area-number">{String(index + 1).padStart(2, "0")}</span>
                <div className="villa-rentals-area-copy">
                  <p>{area.location}</p>
                  <h3>{area.name}</h3>
                  <small>查询别墅 <b>→</b></small>
                </div>
              </a>
            ))}
          </div>
          <p className="villa-rentals-image-note">以上为区域代表图片。具体别墅资料将根据每位客户的需求，以私人方式提供。</p>
        </div>
      </section>

      <section className="villa-rentals-concierge">
        <div className="site-shell villa-rentals-concierge-grid">
          <div>
            <p className="villa-rentals-eyebrow dark">礼宾服务</p>
            <h2>从入住到离开，每个细节都可安排。</h2>
            <p>别墅只是旅程的开始。我们的团队可协调所需服务，让您的住宿更加轻松、舒适并符合个人习惯。</p>
          </div>
          <div className="villa-rentals-service-list">
            {services.map(([icon, name]) => (
              <div key={name} style={{ minHeight: 150, paddingBlock: 24, flexDirection: "column", justifyContent: "center", gap: 13, color: "var(--gold)", textAlign: "center" }}>
                <span style={{ fontFamily: "var(--serif)", fontSize: 36, lineHeight: 1 }}>{icon}</span>
                <span style={{ color: "var(--ink)", fontSize: 12, letterSpacing: ".08em", lineHeight: 1.45 }}>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="villa-rentals-partnership">
        <div className="site-shell villa-rentals-partnership-inner">
          <div className="villa-rentals-branding">
            <div className="villa-rentals-euroasia-mark">
              <img src="/images/pf-gold-symbol.png" alt="" />
              <strong>Property Facilitators<br />EuroAsia</strong>
            </div>
            <span className="villa-rentals-cross">×</span>
            <div className="villa-rentals-lvc-placeholder" aria-label="The Luxury Villa Collection">
              <span>The</span><strong>Luxury Villa<br />Collection</strong>
            </div>
          </div>
          <p>每一项咨询均由 Property Facilitators EuroAsia 与 The Luxury Villa Collection 共同专人管理，为客户准备符合需求的别墅选择，并提供完整的礼宾支持。</p>
        </div>
      </section>

      <section className="villa-rentals-enquiry" id="villa-enquiry">
        <div className="site-shell villa-rentals-enquiry-layout">
          <div className="villa-rentals-enquiry-copy">
            <p className="villa-rentals-eyebrow">私人咨询</p>
            <h2>获取您的专属别墅推荐。</h2>
            <p>请提供预计日期、入住人数、卧室需求、首选区域及大致预算。我们会由专人回复，并提供经过筛选的适合选择。</p>
            <ul>
              <li>所有咨询均由专人私密处理</li>
              <li>可接触公开及私人渠道中的别墅</li>
              <li>入住前及住宿期间提供礼宾支持</li>
            </ul>
          </div>
          <ZhRentalEnquiryForm />
        </div>
      </section>

      <PartnerStrip />
      <footer className="zh-footer">
        <div className="site-shell">
          <Link className="brand" href="/zh"><span className="brand-lockup" aria-hidden="true"><img className="brand-symbol" src="/images/pf-gold-symbol.png" alt=""/><span className="brand-words"><b>Property</b><b>Facilitators</b></span><span className="brand-region">EuroAsia</span></span></Link>
          <p>连接西班牙与亚洲的私人豪宅与高端别墅租赁顾问。</p>
          <Link className="language-link" href="/luxury-villa-rentals">English version →</Link>
        </div>
      </footer>
    </main>
  );
}
