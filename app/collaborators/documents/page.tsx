import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCollaboratorSession } from "../../lib/collaboratorSession";
import { readCollaboratorDocuments } from "../../lib/collaboratorDocumentStore";
import { LogoutButton } from "../dashboard/LogoutButton";
import { collaboratorDocumentMarkets, documentCategories } from "./documents";
import "../../vault/vault.css";
import "../portal.css";
import "./documents.css";

export const metadata: Metadata = {
  title: "Collaborator Document Centre | Property Facilitators EuroAsia",
  description: "Shared information and application documents for approved PF EuroAsia collaborators.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function CollaboratorDocumentsPage() {
  const collaborator = await getCollaboratorSession();
  if (!collaborator) redirect("/collaborators");

  const documentRecords = await readCollaboratorDocuments();
  const markets = collaboratorDocumentMarkets(documentRecords);
  const totalDocuments = markets.reduce(
    (total, market) => total + market.documents.length,
    0,
  );

  return (
    <main className="vault-dashboard-page collaborator-documents-page">
      <div className="vault-dashboard-shell">
        <header className="vault-dashboard-header collaborator-documents-header">
          <div>
            <p className="vault-kicker">Shared collaborator resources</p>
            <h1>Document Centre</h1>
            <p>
              Current information packs and forms available to every approved collaborator.
            </p>
          </div>
          <div className="vault-header-actions">
            <Link className="vault-secondary-button" href="/collaborators/dashboard">
              Back to Dashboard
            </Link>
            <LogoutButton />
          </div>
        </header>

        <section className="collaborator-documents-notice" aria-label="Document centre policy">
          <div>
            <strong>One shared source for non-property documents</strong>
            <p>
              Residency, company-formation and related application PDFs will be kept here.
              Property-specific brochures remain within the property system and are excluded.
            </p>
          </div>
          <span>{totalDocuments} documents currently published</span>
        </section>

        <nav className="collaborator-document-jump" aria-label="Document locations">
          {markets.map((market) => (
            <a key={market.id} href={`#${market.id}`}>
              {market.name}
            </a>
          ))}
        </nav>

        <div className="collaborator-market-list">
          {markets.map((market) => (
            <section className="vault-panel collaborator-market-panel" id={market.id} key={market.id}>
              <div className="collaborator-market-heading">
                <div>
                  <p className="vault-kicker">Country resource library</p>
                  <h2>{market.name}</h2>
                  <p>{market.introduction}</p>
                </div>
                <span>{market.documents.length} PDFs</span>
              </div>

              <div className="collaborator-category-grid" aria-label={`${market.name} document categories`}>
                {documentCategories.map((category) => {
                  const documents = market.documents.filter((document) => document.category === category);
                  return (
                    <article className="collaborator-category-card" key={category}>
                      <div className="collaborator-category-title">
                        <span aria-hidden="true">PDF</span>
                        <h3>{category}</h3>
                      </div>
                      {documents.length === 0 ? (
                        <p className="collaborator-category-empty">
                          Documents will appear here as soon as they are approved for collaborator use.
                        </p>
                      ) : (
                        <ul>
                          {documents.map((document) => (
                            <li key={document.id}>
                              <div>
                                <strong>{document.title}</strong>
                                <p>{document.description}</p>
                                <small>PDF · Updated {new Date(document.updatedAt).toLocaleDateString("en-GB")}</small>
                              </div>
                              <a href={document.url} target="_blank" rel="noreferrer">
                                Download
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
