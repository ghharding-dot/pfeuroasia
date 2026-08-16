import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { createMetadata } from "../lib/seo";

export const metadata = createMetadata("privacyEn");

export default function PrivacyPage() {
  return (
    <main>
      <Header />
      <section className="about-hero">
        <div className="site-shell about-grid">
          <div>
            <p className="eyebrow">Privacy</p>
            <h1>Privacy notice.</h1>
          </div>
          <p>
            This notice explains how Property Facilitators EuroAsia handles
            information submitted through this website, confidential enquiry
            forms and verified document-access services.
          </p>
        </div>
      </section>

      <section className="about-story section-pad">
        <div className="site-shell about-story-grid">
          <div>
            <p className="eyebrow">Last updated</p>
            <h2>3 August 2026</h2>
          </div>
          <div>
            <h2>Information we collect</h2>
            <p>
              When you submit an enquiry, we may collect your name, email
              address, telephone or messaging details, location supplied by
              you, property interests, budget indication, requirements and any
              other information you choose to provide.
            </p>
            <p>
              For enquiry security, routing and fraud prevention, the website
              may also record approximate network-location information supplied
              by our hosting provider, such as country, city, region and time
              zone. We record only a masked version of the originating IP
              address rather than displaying or emailing the complete address.
              Network-location information is approximate and may be affected
              by VPNs, mobile networks and corporate routing.
            </p>

            <h2>Verified brochure access</h2>
            <p>
              Before releasing certain confidential property brochures, we may
              ask you to verify your email address using a short-lived security
              code. We record the property reference, your verified identity and
              contact details, the date and time of access, your consent, an
              approximate network location and a masked IP address.
            </p>
            <p>
              The brochure supplied to you may be personalised with a visible
              watermark containing your name, email address, property reference
              and download time. This is used to protect confidential property
              information, preserve document attribution and discourage
              unauthorised onward circulation.
            </p>

            <h2>How we use enquiry information</h2>
            <p>
              We use this information to respond to your enquiry, identify the
              appropriate regional desk, maintain a record of the conversation,
              protect the enquiry and document systems and coordinate relevant
              property or professional services.
            </p>

            <h2>Collaboration partners</h2>
            <p>
              Where an enquiry or brochure relates to a named collaboration or
              listing partner, your contact details, property interest and the
              verified document-access record may be shared with that partner
              after you have confirmed the relevant consent. This enables the
              property enquiry to be handled jointly and provides an auditable
              record of the introduction. We do not sell enquiry information to
              third parties.
            </p>

            <h2>Service providers</h2>
            <p>
              The website uses service providers for hosting, private document
              storage, email delivery, website performance and security. These
              providers process data only as necessary to deliver their services
              to us.
            </p>

            <h2>Retention and your rights</h2>
            <p>
              Enquiry and verified document-access information is retained only
              for as long as reasonably necessary for the enquiry, related
              professional obligations, security, attribution and legitimate
              business records. You may request access, correction or deletion
              of your information, subject to applicable legal and record-keeping
              requirements.
            </p>

            <h2>Contact</h2>
            <p>
              Privacy requests may be sent to{" "}
              <a href="mailto:enquiry@pfeuroasia.com">enquiry@pfeuroasia.com</a>.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
