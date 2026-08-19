import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { readCollaboratorDocuments } from "../../lib/collaboratorDocumentStore";
import { hasVaultAccess } from "../../lib/vaultSession";
import { DocumentManager } from "./DocumentManager";
import "../vault.css";
import "./documents.css";

export const metadata: Metadata = { title: "Document Manager | PF EuroAsia", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function VaultDocumentsPage() {
  if (!(await hasVaultAccess())) redirect("/vault?next=/vault/documents");
  const documents = await readCollaboratorDocuments();

  return <main className="vault-dashboard-page"><div className="vault-dashboard-shell">
    <header className="vault-dashboard-header"><div><p className="vault-kicker">PF EuroAsia administration</p><h1>Document Manager</h1><p>Upload and manage the shared Spain and Malaysia collaborator PDFs.</p></div><div className="vault-header-actions"><Link className="vault-secondary-button" href="/vault/dashboard">Back to The Vault</Link><Link className="vault-row-action" href="/collaborators/documents" target="_blank">View collaborator page</Link></div></header>
    <DocumentManager initialDocuments={documents} />
  </div></main>;
}
