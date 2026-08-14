import Link from "next/link";
import styles from "../HomePhase2.module.css";

const expertise = [
  { number:"01", title:"Ejendomskøb", text:"Personlig søgning og diskret repræsentation ved køb af særlige boliger og udvalgte investeringer.", href:"/da/services/acquisition" },
  { number:"02", title:"Internationalt salg", text:"Målrettet præsentation af spanske kvalitetsejendomme for købere i Europa, Mellemøsten og Asien.", href:"/da/services/international-sales" },
  { number:"03", title:"Relocation og ophold", text:"Praktisk vejledning og betroet lokal støtte til kunder, der etablerer et nyt internationalt liv.", href:"/da/asia-gateway" },
  { number:"04", title:"Investeringsmuligheder", text:"Udvalgte bolig-, erhvervs-, udviklings- og ejendomsbaserede muligheder gennem offentlige eller private introduktioner.", href:"/da/commercial" },
  { number:"05", title:"Professionelle partnere", text:"Koordineret adgang til betroede juridiske, finansielle, skattemæssige og øvrige specialister.", href:"/da/about" },
  { number:"06", title:"Grænseoverskridende repræsentation", text:"Én betroet relation, der koordinerer ejendomsinteresser mellem Spanien, Mellemøsten og Asien.", href:"/da/about" },
];

const trustPoints = [
  ["Mere end 25 års erfaring", "Viden om Costa del Sol opbygget gennem årtiers direkte arbejde på markedet."],
  ["Uafhængig rådgivning", "Klar og kommercielt funderet vejledning med kunden – ikke transaktionen – i centrum."],
  ["Betroet netværk", "Etablerede relationer til juridiske, finansielle og ejendomsprofessionelle på vores markeder."],
  ["Ekspertise i Spanien og Asien", "Lokal tilstedeværelse og grænseoverskridende forståelse mellem forskellige markeder og kulturer."],
  ["Personlig kundeservice", "Færre opgaver, tættere opmærksomhed og én fast kontaktperson."],
  ["Diskret repræsentation", "Fortrolig håndtering af behov, introduktioner og udvalgte off-market muligheder."],
];

export function DanishHomePhase2() {
  return <>
    <section className={styles.gatewayHero} aria-labelledby="danish-gateway-heading">
      <div className={styles.gatewayOverlay}/>
      <div className={`site-shell ${styles.gatewayInner}`}>
        <div className={styles.gatewayIntro}><div><p className="eyebrow light">Europa og Asien forbundet</p><h1 id="danish-gateway-heading">Vælg din retning.<em>Vi guider rejsen.</em></h1></div><p>To forskellige tilbud i ét betroet internationalt netværk. Vælg Spanien for ejendom, villaudlejning og concierge – eller gå gennem vores Asia Gateway til investering, relocation, ophold og virksomhed.</p></div>
        <div className={styles.gatewayCards}>
          <Link className={`${styles.gatewayCard} ${styles.spainPath}`} href="#regions"><div className={styles.cardOverlay}/><div className={styles.gatewayCardCopy}><span className={styles.pathLabel}>Ejendomme i Spanien</span><h2>Ønsker du at købe ejendom i Spanien?</h2><p>Oplev luksusboliger, private muligheder, køberrådgivning, villaudlejning og concierge i Marbella og på Costa del Sol.</p><div className={styles.pathTags}><span>Køb</span><span>Salg</span><span>Leje</span><span>Concierge</span></div><strong>Fortsæt til Spanien <span aria-hidden="true">↓</span></strong></div></Link>
          <Link className={`${styles.gatewayCard} ${styles.asiaPath}`} href="/da/asia-gateway"><div className={styles.cardOverlay}/><div className={styles.gatewayCardCopy}><span className={styles.pathLabel}>Asia Gateway</span><h2>Overvejer du Dubai til ophold eller skatteplanlægning? Har du overvejet Malaysia og Asien?</h2><p>Før du vælger den traditionelle vej til Dubai, kan du sammenligne mulighederne i Malaysia og udvalgte asiatiske markeder – fra ophold og relocation til ejendomsinvestering, selskabsstiftelse og virksomhedsudvidelse.</p><div className={styles.pathTags}><span>Investering</span><span>Relocation</span><span>Ophold</span><span>Virksomhed</span></div><strong>Sammenlign Malaysia og Asien <span aria-hidden="true">→</span></strong></div></Link>
        </div>
      </div>
    </section>
    <section className={styles.expertiseSection} id="expertise-da"><div className="site-shell"><div className={styles.expertiseIntro}><div><p className="eyebrow">Vores ekspertise</p><h2>Personlig ejendomsrådgivning.<em>Internationalt perspektiv.</em></h2></div><p>Uafhængig repræsentation af købere, sælgere, investorer og familier på tværs af Spanien, Mellemøsten og Asien.</p></div><div className={styles.expertiseGrid}>{expertise.map(item=><Link className={styles.expertiseCard} href={item.href} key={item.title}><span className={styles.cardNumber}>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p><span className={styles.cardArrow}>→</span></Link>)}</div></div></section>
    <section className={styles.trustSection}><div className="site-shell"><div className={styles.trustHeading}><div><p className="eyebrow">Hvorfor EuroAsia?</p><h2>Den rigtige ejendom er kun halvdelen.<em>Den rigtige repræsentation er afgørende.</em></h2></div><p>Mere end 25 års markedserfaring kombineret med betroede internationale relationer og en meget personlig rådgivningsmodel.</p></div><div className={styles.trustGrid}>{trustPoints.map(([title,text],index)=><div className={styles.trustItem} key={title}><span>{String(index+1).padStart(2,"0")}</span><div><strong>{title}</strong><p>{text}</p></div></div>)}</div></div></section>
  </>;
}
