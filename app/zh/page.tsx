import Link from "next/link";
import { ZhEnquiry } from "../components/ZhEnquiry";
import { PartnerStrip } from "../components/PartnerStrip";

const services = [
  { number: "01", title: "西班牙置业顾问", text: "根据您的生活方式、投资目标与隐私要求，筛选公开及非公开的优质物业，并代表买方完成考察、谈判与交割。" },
  { number: "02", title: "国际私人销售", text: "为西班牙高端业主制定克制而精准的国际销售方案，通过欧洲与亚洲的可信网络接触合资格买家。" },
  { number: "03", title: "安家与礼宾服务", text: "从首次看房到入住后的物业管理、专业顾问与日常安排，由一个值得信赖的本地联系人持续协调。" },
];

export default function ChineseHome() {
  return <main className="zh-site" lang="zh-CN">
    <header className="zh-header">
      <div className="site-shell zh-header-inner">
        <Link className="brand" href="/zh" aria-label="Property Facilitators EuroAsia 中文首页"><span className="brand-lockup" aria-hidden="true"><img className="brand-symbol" src="/images/pf-gold-symbol.png" alt=""/><span className="brand-words"><b>Property</b><b>Facilitators</b></span><span className="brand-region">EuroAsia</span></span></Link>
        <nav aria-label="中文导航"><a href="#services-zh">服务</a><a href="#markets-zh">市场</a><a href="#private-zh">私人房源</a><a href="#contact-zh">联系我们</a><Link className="language-link" href="/">EN</Link></nav>
      </div>
    </header>

    <section className="zh-hero">
      <div className="zh-hero-shade" />
      <div className="site-shell zh-hero-copy">
        <p className="eyebrow light">西班牙 ↔ 亚洲 · 私人豪宅顾问</p>
        <h1>非凡居所，<em>跨境礼遇。</em></h1>
        <p>为亚洲高净值客户提供西班牙南部高端住宅的独立咨询、买方代表与私人销售服务。</p>
        <div><a className="button button-gold" href="#contact-zh">开启私人咨询 <span>→</span></a><a className="text-link light-link" href="#markets-zh">探索核心市场 ↓</a></div>
      </div>
      <p className="zh-hero-locations">Marbella · La Zagaleta · El Madroñal · Costa del Sol</p>
    </section>

    <section className="zh-intro section-pad">
      <div className="site-shell zh-split">
        <p className="eyebrow">真正的价值来自信任</p>
        <div><h2>找到房产只是第一步，<em>选对代表至关重要。</em></h2><p>我们结合二十五年以上的太阳海岸高端住宅经验与亚洲市场关系，为少数客户提供更深入、更直接、更具私密性的服务。</p></div>
      </div>
    </section>

    <section className="zh-services section-pad" id="services-zh">
      <div className="site-shell"><p className="eyebrow light">我们的服务</p><h2>私人服务，<br />国际视野。</h2><div className="zh-service-grid">{services.map(service => <article key={service.number}><span>{service.number}</span><h3>{service.title}</h3><p>{service.text}</p></article>)}</div></div>
    </section>

    <section className="zh-markets section-pad" id="markets-zh">
      <div className="site-shell"><div className="zh-section-heading"><div><p className="eyebrow">核心市场</p><h2>深耕马贝拉，<br /><em>连接亚洲。</em></h2></div><p>我们专注于真正了解的市场，并以西班牙本地执行力服务亚洲客户。</p></div>
        <div className="zh-market-grid">
          <article className="zh-market-card zh-marbella"><span>西班牙南部</span><div><h3>Marbella 马贝拉</h3><p>地中海沿岸的国际生活方式与多元高端住宅市场。</p></div></article>
          <Link className="zh-market-card zh-zagaleta" href="/zh/la-zagaleta"><span>Benahavís</span><div><h3>La Zagaleta</h3><p>欧洲极具私密性的成熟庄园社区，大面积土地与严格安保。</p><b>深入了解 →</b></div></Link>
          <Link className="zh-market-card zh-madronal" href="/zh/el-madronal"><span>Benahavís</span><div><h3>El Madroñal</h3><p>自然山林、开阔海景与低密度私人别墅社区。</p><b>深入了解 →</b></div></Link>
          <article className="zh-market-card zh-malaysia"><span>亚洲联络</span><div><h3>马来西亚</h3><p>连接亚洲客户、专业合作伙伴与西班牙优质物业的战略门户。</p></div></article>
        </div>
      </div>
    </section>

    <section className="zh-private section-pad" id="private-zh">
      <div className="site-shell">
        <div className="zh-private-intro">
          <div><p className="eyebrow light">私人精选房源</p><h2>真正稀缺的住宅，<br />未必公开出售。</h2></div>
          <p>我们精选西班牙太阳海岸最具代表性的豪宅与私人庄园。许多业主重视隐私与销售过程的控制，因此部分物业不会出现在普通房产平台或大众营销渠道，只会在确认客户需求与资质后，以私人方式介绍。</p>
        </div>

        <div className="zh-private-grid">
          <article className="zh-private-card zh-private-one">
            <span>精选图片</span>
            <div><small>Benahavís · 私人机会</small><h3>大型私人庄园</h3><p>宽阔土地、成熟园林、优越景观及完整生活配套。价格、面积、卧室数量及详细资料可在私人咨询后提供。</p></div>
          </article>
          <article className="zh-private-card zh-private-two">
            <span>精选图片</span>
            <div><small>Marbella · 私人机会</small><h3>现代海景别墅</h3><p>当代建筑、地中海景观与高品质娱乐空间。基本规格及英文销售资料可按要求提供。</p></div>
          </article>
        </div>

        <div className="zh-private-details">
          <div>
            <h3>中文基本资料</h3>
            <p>每套精选物业将以中文展示位置、价格、卧室与浴室数量、建筑面积、土地面积、主要特色及简要介绍，并配以两张代表性照片。</p>
          </div>
          <div>
            <h3>英文完整资料</h3>
            <p>完整销售手册、技术资料、户型图及开发商文件现阶段保留英文版本，并可在确认需求后单独提供。</p>
          </div>
        </div>

        <div className="zh-private-action">
          <p>部分物业因业主要求不会公开展示。欢迎联系我们，获取符合您需求的私人房源推荐。</p>
          <a className="button button-gold" href="#contact-zh">咨询私人房源 <span>→</span></a>
        </div>
      </div>
    </section>

    <section className="zh-contact section-pad" id="contact-zh">
      <div className="site-shell zh-contact-grid"><div><p className="eyebrow light">亚洲与中国客户</p><h2>从一次私人沟通开始。</h2><p>中国大陆客户可通过微信、电子邮件或下方安全表单联系我们。正式微信二维码将在账户启用后加入。</p><div className="channel-tags"><span>微信</span><span>电子邮件</span><span>安全表单</span></div></div><ZhEnquiry /></div>
    </section>

    <PartnerStrip />
    <footer className="zh-footer"><div className="site-shell"><Link className="brand" href="/zh"><span className="brand-lockup" aria-hidden="true"><img className="brand-symbol" src="/images/pf-gold-symbol.png" alt=""/><span className="brand-words"><b>Property</b><b>Facilitators</b></span><span className="brand-region">EuroAsia</span></span></Link><p>连接西班牙与亚洲的独立私人豪宅顾问。</p><Link className="language-link" href="/">English version →</Link></div></footer>
  </main>;
}
