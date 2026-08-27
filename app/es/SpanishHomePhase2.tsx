import Link from "next/link";
import styles from "../HomePhase2.module.css";

const expertise = [
  { number: "01", title: "Adquisición inmobiliaria", text: "Búsqueda personal y representación discreta para viviendas especiales e inversiones seleccionadas.", href: "/es/services/acquisition" },
  { number: "02", title: "Venta internacional", text: "Presentación estratégica de propiedades españolas a compradores cualificados de Europa, Oriente Medio y Asia.", href: "/es/services/international-sales" },
  { number: "03", title: "Relocation y residencia", text: "Orientación práctica y apoyo local para clientes que desean establecer una nueva vida internacional.", href: "/es/asia-gateway" },
  { number: "04", title: "Oportunidades de inversión", text: "Acceso seleccionado a oportunidades residenciales, comerciales y de desarrollo.", href: "/es/commercial" },
  { number: "05", title: "Socios profesionales", text: "Acceso coordinado a especialistas jurídicos, fiscales, financieros y de residencia.", href: "/es/about" },
  { number: "06", title: "Representación internacional", text: "Una relación de confianza para coordinar intereses entre España, Oriente Medio y Asia.", href: "/es/about" },
];

const trustPoints = [
  ["Más de 25 años de experiencia", "Conocimiento directo del mercado de la Costa del Sol construido durante décadas."],
  ["Asesoramiento independiente", "Criterio claro y comercial con el cliente, no la operación, en el centro."],
  ["Red de confianza", "Relaciones consolidadas con profesionales jurídicos, financieros e inmobiliarios."],
  ["Experiencia en España y Asia", "Conocimiento local y comprensión de mercados y culturas diferentes."],
  ["Atención personal", "Menos encargos, mayor dedicación y un contacto principal durante todo el proceso."],
  ["Representación discreta", "Gestión confidencial de necesidades, presentaciones y oportunidades off-market."],
];

export function SpanishHomePhase2() {
  return (
    <>
      <section className={styles.gatewayHero} aria-labelledby="spanish-gateway-heading">
        <div className={styles.gatewayOverlay} />
        <div className={`site-shell ${styles.gatewayInner}`}>
          <div className={styles.gatewayIntro}>
            <div><p className="eyebrow light">Europa y Asia conectadas</p><h1 id="spanish-gateway-heading">Elija su dirección.<em>Nosotros guiamos el camino.</em></h1></div>
            <p>Dos propuestas distintas dentro de una sola red internacional de confianza: España para propiedades y servicios personales, o Asia para inversión, residencia y empresa.</p>
          </div>
          <div className={styles.gatewayCards}>
            <Link className={`${styles.gatewayCard} ${styles.spainPath}`} href="#mercados-es">
              <div className={styles.cardOverlay} />
              <div className={styles.gatewayCardCopy}><span className={styles.pathLabel}>Propiedades en España</span><h2>¿Desea comprar una propiedad en España?</h2><p>Villas de lujo, oportunidades privadas, asesoramiento al comprador, alquiler y concierge en Marbella y la Costa del Sol.</p><div className={styles.pathTags}><span>Compra</span><span>Venta</span><span>Alquiler</span><span>Concierge</span></div><strong>Continuar a España <span aria-hidden="true">↓</span></strong></div>
            </Link>
            <Link className={`${styles.gatewayCard} ${styles.asiaPath}`} href="/es/asia-gateway">
              <div className={styles.cardOverlay} />
              <div className={styles.gatewayCardCopy}><span className={styles.pathLabel}>Asia Gateway</span><h2>¿Está considerando Dubái por residencia o fiscalidad? Compare primero con Malasia.</h2><p>Explore residencia, relocation, inversión inmobiliaria, constitución de sociedades y expansión empresarial en Malasia y mercados asiáticos seleccionados.</p><div className={styles.pathTags}><span>Inversión</span><span>Relocation</span><span>Residencia</span><span>Empresa</span></div><strong>Comparar Malasia y Asia <span aria-hidden="true">→</span></strong></div>
            </Link>
          </div>
        </div>
      </section>
      <section className={styles.expertiseSection} id="servicios-es">
        <div className="site-shell">
          <div className={styles.expertiseIntro}><div><p className="eyebrow">Nuestra experiencia</p><h2>Asesoramiento personal.<em>Perspectiva internacional.</em></h2></div><p>Representación independiente para compradores, vendedores, inversores y familias entre España y Asia.</p></div>
          <div className={styles.expertiseGrid}>{expertise.map((item) => <Link className={styles.expertiseCard} href={item.href} key={item.title}><span className={styles.cardNumber}>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p><span className={styles.cardArrow}>→</span></Link>)}</div>
        </div>
      </section>
      <section className={styles.trustSection}>
        <div className="site-shell">
          <div className={styles.trustHeading}><div><p className="eyebrow">¿Por qué EuroAsia?</p><h2>La propiedad adecuada es solo la mitad.<em>La representación adecuada es esencial.</em></h2></div><p>Experiencia local, relaciones internacionales y un servicio verdaderamente personal.</p></div>
          <div className={styles.trustGrid}>{trustPoints.map(([title, text], index) => <div className={styles.trustItem} key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{title}</strong><p>{text}</p></div></div>)}</div>
        </div>
      </section>
    </>
  );
}
