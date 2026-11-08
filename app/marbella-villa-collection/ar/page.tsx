import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { readRentalVillas, selectRentalCarouselVillas } from "../../lib/rentalVillaStore";
import { ArabicRentalEnquiryForm } from "./ArabicRentalEnquiryForm";
import "../../luxury-villa-rentals/luxury-villa-rentals.css";
import styles from "../collection.module.css";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "مجموعة فلل ماربيا | فلل فاخرة للإيجار",
  description: "اكتشف مجموعة مختارة من أكثر من 100 فيلا فاخرة للإيجار في ماربيا ولا ثاغاليتا وبيناهافيس وكوستا ديل سول. اطلب خيارات مخصصة وخدمة كونسيرج خاصة.",
  robots: { index: false, follow: false },
};

const areas = ["لا ثاغاليتا","إل مادرونيال","الميل الذهبي في ماربيا","سييرا بلانكا","بويرتو بانوس","بيناهافيس"];

export default async function MarbellaArabic({ searchParams }: { searchParams: Promise<{villa?: string}> }) {
  const [params, records] = await Promise.all([searchParams, readRentalVillas()]);
  const villas = selectRentalCarouselVillas(records);
  const chosen = villas.find((villa) => villa.reference === params.villa);
  return <main className={styles.site} dir="rtl" lang="ar" style={{fontFamily:'Tahoma, Arial, sans-serif', textAlign:"right"}}>
    <header className={styles.header}>
      <Link href="/marbella-villa-collection/ar" className={styles.brand} dir="ltr"><span>MARBELLA</span><strong>VILLA COLLECTION</strong></Link>
      <nav aria-label="القائمة الرئيسية"><a href="#collection">مجموعة الفلل</a><a href="#locations">المناطق</a><a href="#concierge">خدمة الكونسيرج</a><a href="#enquire" className={styles.navAction}>استفسار خاص</a><Link href="/marbella-villa-collection" lang="en" dir="ltr">English</Link></nav>
    </header>
    <section className={styles.hero}>
      <Image src="/images/hero-villa.webp" fill priority sizes="100vw" alt="فيلا فاخرة مطلة على البحر الأبيض المتوسط في ماربيا" className={styles.heroImage}/>
      <div className={styles.heroShade}/>
      <div className={styles.heroInner}><p className={styles.eyebrow}>ماربيا · لا ثاغاليتا · كوستا ديل سول</p><h1>فلل استثنائية<br/>للإيجار.<em>وخدمة شخصية تليق بكم.</em></h1><p>إقامات راقية في فلل فاخرة تُنظَّم بخصوصية تامة، مع خيارات تناسب متطلباتكم وخدمة كونسيرج متميزة من أول استفسار وحتى الوصول.</p><a href="#enquire" className={styles.goldButton}>ابحث عن فيلتي <span>↗</span></a><a href="#collection" className={styles.secondaryButton}>استكشف مجموعة الفلل ↓</a></div>
    </section>
    <section className={styles.intro} id="collection"><div><p className={styles.eyebrow}>مجموعة فلل خاصة</p><h2>مجموعة مختارة من أكثر من <em>100 فيلا فاخرة.</em></h2></div><p>الفلل المعروضة هنا ليست سوى نماذج من مجموعتنا الأوسع. تتغير الإتاحة باستمرار، وبعض العقارات تُعرض حصرياً بشكل خاص. أخبرونا بمواعيد السفر والموقع المفضل وعدد الضيوف والميزانية الأسبوعية، وسنعدّ لكم قائمة مختارة تناسب احتياجاتكم.</p></section>
    <section className={styles.villas} aria-label="الفلل الفاخرة المعتمدة">
      {villas.length ? <div className={styles.grid}>{villas.map(villa => <article className={styles.card} key={villa.id}>
        <div className={styles.cardImage}>{villa.image && <Image src={villa.image} alt={villa.title} fill unoptimized sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"/>}</div>
        <div className={styles.cardBody}><p>{villa.location}</p><h3>{villa.title}</h3><div className={styles.facts}>{villa.bedrooms ? `${villa.bedrooms} غرف نوم` : "عدد غرف النوم عند الطلب"} <span>·</span> {villa.guests ? `تتسع لـ ${villa.guests} ضيوف` : "إقامة خاصة"}</div><a href={"/marbella-villa-collection/ar?villa=" + encodeURIComponent(villa.reference) + "#enquire"}>استفسر عن هذه الفيلا ↗</a></div>
      </article>)}</div> : <div className={styles.empty}><h3>دعنا نساعدك في اختيار الفيلا المناسبة.</h3><p>نشارك خيارات الفلل المتاحة مع عملائنا بشكل شخصي. أرسل متطلباتك وسنعدّ لك قائمة محدّثة.</p><a href="#enquire" className={styles.goldButton}>اطلب مجموعة مختارة ↗</a></div>}
    </section>
    <section id="locations" className={styles.dark}><div className={styles.sectionWrap}><p className={styles.eyebrow}>أرقى المواقع</p><h2>أكثر مناطق ماربيا تميزاً.</h2><div className={styles.locationGrid}>{areas.map(x=><a href="#enquire" key={x}>{x}<span>↗</span></a>)}</div></div></section>
    <section id="concierge" className={styles.concierge}><p className={styles.eyebrow}>أكثر من مجرد فيلا</p><h2>نهتم <em>بكل التفاصيل.</em></h2><p>يمكننا التنسيق مع شركائنا الموثوقين لخدمات النقل من المطار والسائق الخاص والطهاة وترتيبات العائلات واليخوت والغولف والعافية، بحسب التوافر والتأكيد.</p><a href="#enquire">ناقش متطلبات الكونسيرج ↗</a></section>
    <section id="enquire" className={styles.enquiry}><div><p className={styles.eyebrow}>استفسارات خاصة</p><h2>حدثنا عن <em>إقامتك.</em></h2><p>شارك معنا المواعيد وعدد الضيوف والمنطقة المفضلة. سنرد عليك شخصياً بخيارات مناسبة، بما فيها فلل لا تُعرض علناً.</p><p className={styles.discreet}>متابعة شخصية · دون التزام بالحجز · خصوصية تامة</p></div><div className={styles.form}><ArabicRentalEnquiryForm selectedVilla={chosen ? chosen.reference + " — " + chosen.title : ""}/></div></section>
    <footer className={styles.footer}><div><strong dir="ltr">MARBELLA VILLA COLLECTION</strong><p>فلل استثنائية للإيجار، مع خدمة شخصية تليق بكم.</p></div><div><p>تنسيق شخصي من Property Facilitators EuroAsia بالتعاون مع The Luxury Villa Collection.</p><a href="https://www.pfeuroasia.com/privacy">سياسة الخصوصية</a></div></footer>
    <style>{`
      main[dir="rtl"] .${styles.heroInner}{margin-left:0;margin-right:clamp(25px,8vw,150px);padding:45px 0 45px 20px}
      main[dir="rtl"] .${styles.heroShade}{background:linear-gradient(270deg,rgba(5,16,22,.87),rgba(9,22,29,.5) 58%,rgba(9,22,29,.08))}
      main[dir="rtl"] .${styles.hero} h1,main[dir="rtl"] .${styles.intro} h2,main[dir="rtl"] .${styles.dark} h2,main[dir="rtl"] .${styles.concierge} h2,main[dir="rtl"] .${styles.enquiry} h2,main[dir="rtl"] .${styles.cardBody} h3{font-family:Tahoma,Arial,sans-serif;letter-spacing:0;line-height:1.4}
      main[dir="rtl"] .${styles.hero} h1{font-size:clamp(40px,5.7vw,80px)}
      main[dir="rtl"] .${styles.hero} h1 em{font-style:normal;font-size:.62em}
      main[dir="rtl"] .${styles.eyebrow}{letter-spacing:0}
      main[dir="rtl"] .${styles.secondaryButton}{margin-left:0;margin-right:24px}
      main[dir="rtl"] .${styles.concierge}{text-align:center}
      main[dir="rtl"] .rental-form input,main[dir="rtl"] .rental-form textarea,main[dir="rtl"] .rental-form select{direction:auto}
      @media(max-width:700px){main[dir="rtl"] .${styles.heroInner}{margin-right:26px}main[dir="rtl"] .${styles.secondaryButton}{margin-right:0}main[dir="rtl"] .${styles.header} nav{gap:12px}}
    `}</style>
  </main>;
}
