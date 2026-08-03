import type { Metadata } from "next";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "How Property Facilitators EuroAsia handles website and enquiry information.",
};

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
            information submitted through this website and its confidential
            enquiry forms.
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

            <h2>How we use enquiry information</h2>
            <p>
              We use this information to respond to your enquiry, identify the
              appropriate regional desk, maintain a record of the conversation,
              protect the enquiry system and coordinate relevant property or
              professional services.
            </p>

            <h2>Collaboration partners</h2>
            <p>
              Where an enquiry is made through a named collaboration partner,
              the enquiry details and approximate detected location may be
              shared with that partner so the enquiry can be handled jointly.
              We do not sell enquiry information to third parties.
            </p>

            <h2>Service providers</h2>
            <p>
              The website uses service providers for hosting, email delivery,
              website performance and security. These providers process data
              only as necessary to deliver their services to us.
            </p>

            <h2>Retention and your rights</h2>
            <p>
              Enquiry information is retained only for as long as reasonably
              necessary for the enquiry, related professional obligations,
              security and legitimate business records. You may request access,
              correction or deletion of your information, subject to applicable
              legal and record-keeping requirements.
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
