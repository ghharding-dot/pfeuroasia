"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function RentalStatusButton({
  id,
  status,
}: {
  id: string;
  status: "draft" | "published";
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function updateStatus() {
    setSaving(true);
    setError("");
    try {
      const response = await fetch("/api/rental-villas/" + id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ status: status === "published" ? "draft" : "published" }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "The status could not be updated.");
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The status could not be updated.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="vault-status-action">
      <button className={status === "published" ? "vault-secondary-button" : "vault-primary-button"} type="button" disabled={saving} onClick={updateStatus}>
        {saving ? "Saving…" : status === "published" ? "Unpublish" : "Approve & Publish"}
      </button>
      {error && <p className="vault-error" role="alert">{error}</p>}
    </div>
  );
}
