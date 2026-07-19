import Link from "next/link";
import { PartnerStrip } from "../../components/PartnerStrip";

const propertyBands = [
  { price: "€400万–€600万", title: "成熟传统别墅", text: "通常为700平方米以上的安达卢西亚风格住宅，具有翻新和重新定位的潜力。" },
  { price: "€800万–€1,500万", title: "现代高端住宅", text: "当代建筑、大面积室内空间、无边泳池、康体设施与智能家居系统。" },
  { price: "€1,500万–€2,500万", title: "标志性庄园", text: "建筑师作品、更大土地、员工空间、多车位车库与完整休闲设施。" },
  { price: "€2,500万以上", title: "国际级稀缺资产", text: "在建筑、规模、土地与独特性方面达到国际豪宅收藏级别。" },
];

export default function ChineseZagaletaPage() {
  return <main className="zh-site zh-zagaleta-page" lang="zh-CN">
    <header className="zh-area-header"><div className="site-shell zh-header-inner"><Link className="brand" href="/zh"><span className="brand-lockup" aria-hidden="true"><img className="brand-symbol" src="/images/pf-gold-symbol.png" alt=""/><span className="brand-words"><b>Property</b><b>Facilitators</b></span><span className="brand-region">EuroAsia</span></span></Link><nav><Link href="/zh">中文首页</Link><a href="#numbers-cn">社区数据</a><a href="#property-cn">物业价格</a><Link className="language-link" href="/areas/la-zagaleta">EN</Link></nav></div></header>

    <section className="zh-zag-hero"><div className="area-overlay"/><div className="site-shell zh-zag-hero-copy"><p className="eyebrow light">Benahavís · Costa del Sol</p><h1>La Zagaleta</h1><p>在欧洲极具私密性的成熟庄园社区，真正体验与外界保持距离的生活。</p><a className="button button-gold" href="#explore-cn">深入了解 <span>↓</span></a></div></section>

    <section className="zh-zag-intro section-pad" id="explore-cn"><div className="site-shell zh-split"><p className="eyebrow">真实的 La Zagaleta</p><div><h2>这里的奢华，<em>首先是空间与隐私。</em></h2><p>La Zagaleta 不只是一个有门禁的住宅区，而是一个完整的私人世界。低密度规划、大片成熟自然景观与严格的访问管理，让住宅的环境、朝向和土地条件与建筑本身同样重要。</p></div></div></section>

    <section className="zh-zag-numbers section-pad" id="numbers-cn"><div className="site-shell"><div className="zh-section-heading"><div><p className="eyebrow light">核心数据</p><h2>规模决定体验。</h2></div><p>900公顷的山地庄园以极低密度开发，保留了居民真正需要的距离感与安静。</p></div><div className="zh-number-grid"><article><strong>900</strong><span>公顷私人山地</span></article><article><strong>约300</strong><span>栋已建成别墅</span></article><article><strong>3,000–12,000</strong><span>平方米常见地块面积</span></article><article><strong>50</strong><span>公里私人道路</span></article></div></div></section>

    <section className="zh-zag-life section-pad"><div className="site-shell zagaleta-life-grid"><div><p className="eyebrow">日常生活</p><h2>海岸并不远，<em>但是否前往由您决定。</em></h2></div><div className="zagaleta-life-list"><article><span>清晨</span><p>被软木橡树、松林和地中海植被包围，听不到城市与道路噪音。</p></article><article><span>庄园之内</span><p>两座私人18洞高尔夫球场、马术中心、会所餐饮、健身、网球和板式网球构成完整生活体系。</p></article><article><span>庄园之外</span><p>前往 San Pedro 约15分钟、Puerto Banús 约20分钟、Marbella 市中心约25分钟、Málaga 机场约50分钟。</p></article><article className="honest-note"><span>诚实的取舍</span><p>这里并不适合追求步行可达咖啡馆与城市社交的人。它属于希望回家、关上大门并真正远离公众视线的业主。</p></article></div></div></section>

    <section className="zagaleta-gallery section-pad" aria-labelledby="zagaleta-gallery-title-cn"><div className="site-shell"><div className="zagaleta-gallery-heading"><p className="eyebrow">走进 La Zagaleta</p><h2 id="zagaleta-gallery-title-cn">海岸之上的私享天地。</h2></div><div className="zagaleta-gallery-grid"><figure><img src="/images/zagaleta-golf-club.webp" alt="La Zagaleta 老球场高尔夫俱乐部" /><figcaption><span>01</span>私人高尔夫俱乐部</figcaption></figure><figure><img src="/images/zagaleta-view.webp" alt="La Zagaleta 别墅的地中海全景" /><figcaption><span>02</span>令人屏息的景观</figcaption></figure><figure><img src="/images/zagaleta-security-entrance.webp" alt="La Zagaleta 安保入口" /><figcaption><span>03</span>双重安保入口</figcaption></figure><figure><img src="/images/zagaleta-helipad.webp" alt="La Zagaleta 私人直升机停机坪" /><figcaption><span>04</span>私人直升机停机坪</figcaption></figure></div></div></section>

    <section className="zh-zag-property section-pad" id="property-cn"><div className="site-shell"><div className="zh-section-heading"><div><p className="eyebrow">2026年参考价格</p><h2>四个层级，<br />完全不同的机会。</h2></div><p>最终价值取决于位置、地块、景观、建筑年代和规格。以下区间仅用于建立市场概念。</p></div><div className="property-band-list">{propertyBands.map(item => <article key={item.price}><span>{item.price}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div></div></section>

    <section className="zh-zag-security section-pad"><div className="site-shell zagaleta-practical-grid"><div><p className="eyebrow light">安全与隐私</p><h2>隐私不是宣传语，<br />而是社区结构。</h2><p>访客必须提前获得授权。中介、出租车、送货人员和其他来访者均受到严格管理，私人道路没有过境车流。</p></div><div><h3>庄园设施</h3><ul><li>两座私人18洞高尔夫球场</li><li>会所及住户餐饮</li><li>马术中心与庄园骑行路线</li><li>私人直升机停机坪</li><li>网球、板式网球与健身设施</li><li>24小时门禁与安保</li></ul></div></div><div className="site-shell source-note">数据为参考信息，内容根据 <a href="https://luxoestates.com/benahavis/la-zagaleta-marbella-what-its-really-like-2026/" target="_blank" rel="noreferrer">Luxo Estates 2026 La Zagaleta 指南</a>整理。实际价格、费用和房源需单独核实。</div></section>

    <section className="mini-cta"><div className="site-shell"><p className="eyebrow light">私人置业咨询</p><h2>让我们为您开启正确的大门。</h2><Link className="button button-gold" href="/zh#contact-zh">联系中国与亚洲团队 <span>→</span></Link></div></section>
    <PartnerStrip />
    <footer className="zh-footer"><div className="site-shell"><Link className="brand" href="/zh"><span className="brand-lockup" aria-hidden="true"><img className="brand-symbol" src="/images/pf-gold-symbol.png" alt=""/><span className="brand-words"><b>Property</b><b>Facilitators</b></span><span className="brand-region">EuroAsia</span></span></Link><p>连接西班牙与亚洲的独立私人豪宅顾问。</p><Link className="language-link" href="/areas/la-zagaleta">English version →</Link></div></footer>
  </main>;
}
