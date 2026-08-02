import Link from "next/link";
import { ArEnquiry } from "../components/ArEnquiry";
import styles from "./ArabicHome.module.css";

const services = [
  {
    number: "01",
    title: "تمثيل المشتري",
    text: "بحث خاص ومنهجي عن العقار المناسب، مع تقييم الخيارات والتفاوض والتنسيق الكامل حتى إتمام الصفقة.",
  },
  {
    number: "02",
    title: "العقارات غير المعلنة",
    text: "وصول انتقائي إلى منازل وعقارات لا تظهر في المنصات العامة، وتُعرض فقط على عملاء مؤهلين وبسرية تامة.",
  },
  {
    number: "03",
    title: "الانتقال والخدمات الخاصة",
    text: "دعم عملي قبل الشراء وبعده، يشمل التنسيق القانوني والإداري، إدارة العقار، والخدمات اليومية حسب الحاجة.",
  },
];

const marketCards = [
  {
    className: styles.marbella,
    location: "كوستا ديل سول",
    title: "ماربيا",
    text: "أسلوب حياة دولي، شواطئ مميزة، مدارس خاصة، مطاعم راقية ومجموعة واسعة من الفلل والشقق الفاخرة.",
    href: "/markets/marbella",
  },
  {
    className: styles.zagaleta,
    location: "بيناهافيس",
    title: "لا زاغاليتا",
    text: "مجتمع سكني خاص للغاية، يتميز بالأمن المشدد والمساحات الكبيرة وناديي غولف ومنازل استثنائية.",
    href: "/areas/la-zagaleta",
  },
  {
    className: styles.madronal,
    location: "بيناهافيس",
    title: "إل مادرونيال",
    text: "فلل خاصة وسط الطبيعة، بإطلالات مفتوحة ومساحات واسعة وقرب مباشر من ماربيا وبويرتو بانوس.",
    href: "/areas/el-madronal",
  },
];

export default function ArabicHome() {
  return (
    <main className={styles.site} lang="ar" dir="rtl">
      <header className={styles.header}>
        <div className={`site-shell ${styles.headerInner}`}>
          <Link className="brand" href="/ar" aria-label="الصفحة العربية لبروبرتي فاسيليتيترز يورو آسيا">
            <span className="brand-lockup" aria-hidden="true">
              <img className="brand-symbol" src="/images/pf-gold-symbol.png" alt="" />
              <span className="brand-words"><b>Property</b><b>Facilitators</b></span>
              <span className="brand-region">EuroAsia</span>
            </span>
          </Link>

          <nav className={styles.nav} aria-label="التنقل الرئيسي">
            <a href="#services-ar">خدماتنا</a>
            <a href="#markets-ar">إسبانيا</a>
            <a href="#private-ar">العقارات الخاصة</a>
            <a href="#contact-ar">تواصل معنا</a>
            <Link className={styles.languageLink} href="/">EN</Link>
          </nav>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroShade} />
        <div className={`site-shell ${styles.heroContent}`}>
          <p className="eyebrow light">إسبانيا · المملكة العربية السعودية · خدمات عقارية خاصة</p>
          <h1>
            عقارات استثنائية في إسبانيا.
            <em>تمثيل شخصي بلا حدود.</em>
          </h1>
          <p className={styles.heroIntro}>
            مستشارون مستقلون للعقارات الفاخرة، نربط العملاء في المملكة العربية السعودية ودول الخليج بأفضل الفرص السكنية والاستثمارية في ماربيا وجنوب إسبانيا.
          </p>
          <div className={styles.heroActions}>
            <a className="button button-gold" href="#contact-ar">ابدأ استشارة سرية <span>←</span></a>
            <a className={styles.heroTextLink} href="#markets-ar">استكشف الأسواق ↓</a>
          </div>
        </div>
        <div className={`site-shell ${styles.heroFooter}`}>
          <span>Marbella</span>
          <span>La Zagaleta</span>
          <span>El Madroñal</span>
          <span>Costa del Sol</span>
        </div>
      </section>

      <section className={styles.intro}>
        <div className={`site-shell ${styles.introGrid}`}>
          <p className="eyebrow">جسر موثوق بين الخليج وإسبانيا</p>
          <div>
            <h2>
              اختيار العقار هو نصف المهمة فقط.
              <em>أما التمثيل الصحيح فهو الأساس.</em>
            </h2>
            <p>
              نجمع بين أكثر من خمسة وعشرين عاماً من الخبرة المباشرة في سوق العقارات الفاخرة في ماربيا، وشبكة مهنية موثوقة في أوروبا وآسيا والشرق الأوسط. نعمل مع عدد محدود من العملاء لنقدم خدمة شخصية، واضحة وسرية من أول اتصال حتى ما بعد إتمام الشراء.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.services} id="services-ar">
        <div className="site-shell">
          <p className="eyebrow light">ما الذي نقدمه</p>
          <div className={styles.sectionHeadingDark}>
            <h2>خدمة خاصة.<br />رؤية دولية.</h2>
            <p>
              نقطة اتصال واحدة في إسبانيا، مع تنسيق كامل لجميع الأطراف وبما يحافظ على وقت العميل وخصوصيته.
            </p>
          </div>

          <div className={styles.serviceGrid}>
            {services.map((service) => (
              <article key={service.number}>
                <span>{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.markets} id="markets-ar">
        <div className="site-shell">
          <div className={styles.sectionHeading}>
            <div>
              <p className="eyebrow">أسواقنا الأساسية</p>
              <h2>خبرة محلية في إسبانيا،<em>وصول دولي موثوق.</em></h2>
            </div>
            <p>
              نركز على المناطق التي نعرفها بشكل مباشر، ونقدم تقييماً صريحاً للسعر والموقع والخصوصية وإمكانات إعادة البيع.
            </p>
          </div>

          <div className={styles.marketGrid}>
            {marketCards.map((market) => (
              <Link className={`${styles.marketCard} ${market.className}`} href={market.href} key={market.title}>
                <span>{market.location}</span>
                <div>
                  <h3>{market.title}</h3>
                  <p>{market.text}</p>
                  <b>اعرف المزيد ←</b>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.saudiSection}>
        <div className={`site-shell ${styles.saudiGrid}`}>
          <div className={styles.saudiImage} role="img" aria-label="مجلس فاخر بإطلالة متوسطية" />
          <div className={styles.saudiCopy}>
            <p className="eyebrow light">خدمة مخصصة لعملاء المملكة</p>
            <h2>من أول زيارة إلى استقرار الأسرة في إسبانيا.</h2>
            <p>
              نساعد العملاء السعوديين في فهم السوق الإسباني بعيداً عن المبالغة التسويقية، ونرتب المعاينات الخاصة، التحقق من الملكية، التنسيق مع المحامين والبنوك، إضافة إلى الخدمات العملية بعد الشراء.
            </p>
            <ul>
              <li><span>01</span> جولات معاينة خاصة ومخططة مسبقاً</li>
              <li><span>02</span> تنسيق قانوني ومالي مستقل</li>
              <li><span>03</span> إدارة وتجهيز العقار بعد الشراء</li>
              <li><span>04</span> دعم الإقامة والانتقال والخدمات العائلية</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.privateSection} id="private-ar">
        <div className="site-shell">
          <div className={styles.privateIntro}>
            <div>
              <p className="eyebrow light">المجموعة الخاصة</p>
              <h2>ليست كل العقارات الاستثنائية معروضة للعامة.</h2>
            </div>
            <p>
              كثير من الملاك الذين نتعامل معهم يفضلون الخصوصية على الانتشار. لذلك لا تظهر بعض العقارات على المواقع العامة، ويتم تقديمها فقط بعد فهم احتياجات العميل والتحقق من جديته.
            </p>
          </div>

          <div className={styles.privateGrid}>
            <article className={`${styles.privateCard} ${styles.privateEstate}`}>
              <span>صورة توضيحية</span>
              <div>
                <small>بيناهافيس · فرصة خاصة</small>
                <h3>عقار ريفي واسع</h3>
                <p>أراضٍ كبيرة، حدائق ناضجة، خصوصية عالية ومرافق متكاملة. التفاصيل الكاملة متاحة بعد التواصل الخاص.</p>
              </div>
            </article>

            <article className={`${styles.privateCard} ${styles.privateVilla}`}>
              <span>صورة توضيحية</span>
              <div>
                <small>ماربيا · فرصة خاصة</small>
                <h3>فيلا عصرية بإطلالة بحرية</h3>
                <p>تصميم معماري حديث، مساحات ترفيهية واسعة وموقع مميز على البحر المتوسط. المعلومات متاحة للعملاء المؤهلين.</p>
              </div>
            </article>
          </div>

          <div className={styles.privateAction}>
            <p>للحصول على خيارات غير معلنة تتناسب مع متطلباتكم، يرجى بدء محادثة خاصة معنا.</p>
            <a className="button button-gold" href="#contact-ar">طلب مجموعة خاصة <span>←</span></a>
          </div>
        </div>
      </section>

      <section className={styles.collaboration}>
        <div className={`site-shell ${styles.collaborationGrid}`}>
          <div>
            <p className="eyebrow">شبكة مهنية موثوقة</p>
            <h2>خبراء محليون،<br />بتنسيق واحد.</h2>
          </div>
          <p>
            نتعاون مع شركاء مختارين في الوساطة العقارية والقانون والخدمات الخاصة، مع بقاء مسؤولية التنسيق والمتابعة معنا طوال العملية.
          </p>
          <div className={styles.partnerNames} aria-label="شركاء التعاون">
            <span>Property Facilitators Iberia</span>
            <span>Aylesford Spain</span>
            <span>Legal 10 Abogados</span>
            <span>Lawbird Legal Services</span>
            <span>Martínez-Echevarría</span>
          </div>
        </div>
      </section>

      <section className={styles.contact} id="contact-ar">
        <div className={`site-shell ${styles.contactGrid}`}>
          <div className={styles.contactCopy}>
            <p className="eyebrow light">محادثة خاصة</p>
            <h2>أخبرونا بما تبحثون عنه.</h2>
            <p>
              سواء كان الهدف شراء منزل للعائلة، عقار استثماري، بيع ملكية في إسبانيا أو بناء شراكة مهنية، سنرد عليكم شخصياً وبسرية.
            </p>
            <div className={styles.channelTags}>
              <span>واتساب</span>
              <span>البريد الإلكتروني</span>
              <span>اتصال خاص</span>
            </div>
            <a className={styles.emailLink} href="mailto:enquiry@pfeuroasia.com" dir="ltr">enquiry@pfeuroasia.com</a>
          </div>
          <ArEnquiry />
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={`site-shell ${styles.footerInner}`}>
          <Link className="brand" href="/ar">
            <span className="brand-lockup" aria-hidden="true">
              <img className="brand-symbol" src="/images/pf-gold-symbol.png" alt="" />
              <span className="brand-words"><b>Property</b><b>Facilitators</b></span>
              <span className="brand-region">EuroAsia</span>
            </span>
          </Link>
          <p>استشارات عقارية خاصة تربط إسبانيا بالمملكة العربية السعودية وآسيا.</p>
          <Link className={styles.languageLink} href="/">English version →</Link>
        </div>
      </footer>
    </main>
  );
}
