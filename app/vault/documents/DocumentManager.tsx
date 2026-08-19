"use client";

import { upload } from "@vercel/blob/client";
import { FormEvent, useState } from "react";
import {
  COLLABORATOR_DOCUMENT_CATEGORIES,
  type CollaboratorDocumentRecord,
} from "../../lib/collaboratorDocumentStore";

const MAX_PDF_SIZE = 60 * 1024 * 1024;

function safeFilename(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9.]+/g, "-").replace(/^-+|-+$/g, "") || "document.pdf";
}

export function DocumentManager({ initialDocuments }: { initialDocuments: CollaboratorDocumentRecord[] }) {
  const [documents, setDocuments] = useState(initialDocuments);
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [working, setWorking] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) return setMessage("Choose a PDF first.");
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) return setMessage("Only PDF files are accepted.");
    if (file.size > MAX_PDF_SIZE) return setMessage("The PDF must be 60 MB or smaller.");

    const form = new FormData(event.currentTarget);
    const market = String(form.get("market") || "spain");
    const category = String(form.get("category") || "Guidance");
    const title = String(form.get("title") || "").trim();
    const description = String(form.get("description") || "").trim();
    if (!title) return setMessage("Add a document title.");

    setWorking(true);
    setMessage("Preparing upload…");
    try {
      const pathname = `collaborator-documents/${market}/${Date.now()}-${safeFilename(file.name)}`;
      const blob = await upload(pathname, file, {
        access: "public",
        handleUploadUrl: "/api/vault/upload",
        clientPayload: JSON.stringify({ reference: market, kind: "collaboratorDocument" }),
        contentType: "application/pdf",
        multipart: file.size > 10 * 1024 * 1024,
        onUploadProgress: ({ percentage }) => setMessage(`Uploading PDF · ${Math.round(percentage)}%`),
      });

      const response = await fetch("/api/vault/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ market, category, title, description, url: blob.url, fileName: file.name }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "The document could not be published.");

      setDocuments((current) => [result, ...current]);
      setFile(null);
      event.currentTarget.reset();
      setMessage("Published. The PDF is now available to every collaborator.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setWorking(false);
    }
  }

  async function remove(document: CollaboratorDocumentRecord) {
    if (!window.confirm(`Remove “${document.title}” from the collaborator document centre?`)) return;
    setWorking(true);
    setMessage("Removing document…");
    try {
      const response = await fetch(`/api/vault/documents/${document.id}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "The document could not be removed.");
      setDocuments((current) => current.filter((item) => item.id !== document.id));
      setMessage("Document removed.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Removal failed.");
    } finally {
      setWorking(false);
    }
  }

  return (
    <div className="document-manager-grid">
      <form className="vault-panel vault-form-section document-upload-form" onSubmit={submit}>
        <div className="vault-section-heading">
          <div><p className="vault-kicker">New shared PDF</p><h2>Upload document</h2></div>
          <p>Choose the country and category. Publishing makes the PDF visible to all approved collaborators immediately.</p>
        </div>
        <div className="vault-form-grid">
          <label><span>Country</span><select name="market" defaultValue="spain"><option value="spain">Spain</option><option value="malaysia">Malaysia</option></select></label>
          <label><span>Category</span><select name="category" defaultValue="Guidance">{COLLABORATOR_DOCUMENT_CATEGORIES.map((category) => <option key={category}>{category}</option>)}</select></label>
          <label><span>Document title</span><input name="title" placeholder="e.g. Labuan company application guide" required /></label>
        </div>
        <label className="vault-full-field"><span>Short description</span><textarea name="description" placeholder="Explain what this PDF contains and who should use it." /></label>
        <label className={`document-pdf-picker ${file ? "has-file" : ""}`}>
          <input type="file" accept="application/pdf,.pdf" onChange={(event) => setFile(event.target.files?.[0] || null)} />
          <span>PDF</span>
          <strong>{file ? file.name : "Choose PDF document"}</strong>
          <small>Maximum 60 MB</small>
        </label>
        <button className="vault-primary-button" type="submit" disabled={working}>{working ? "Working…" : "Upload and Publish"}</button>
        {message && <p className="vault-form-message" role="status">{message}</p>}
      </form>

      <section className="vault-panel document-current-panel">
        <div className="vault-panel-header"><div><h2>Published documents</h2><p className="vault-panel-note">{documents.length} PDFs available to collaborators</p></div></div>
        {documents.length === 0 ? <div className="vault-empty">No documents have been uploaded yet.</div> : (
          <div className="document-admin-list">{documents.map((document) => (
            <article key={document.id}>
              <div><span>{document.market} · {document.category}</span><h3>{document.title}</h3><p>{document.fileName}</p></div>
              <div className="document-admin-actions"><a href={document.url} target="_blank" rel="noreferrer">Open</a><button type="button" onClick={() => remove(document)} disabled={working}>Remove</button></div>
            </article>
          ))}</div>
        )}
      </section>
    </div>
  );
}
