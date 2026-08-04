"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { PrivateClientStatus } from "../lib/privateClientStore";

export function VaultClientActions({
  clientId,
  status,
}: {
  clientId: string;
  status: PrivateClientStatus;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function updateStatus(nextStatus: PrivateClientStatus) {
    setSaving(true);
    setError("");

    try {
      const response = await fetch(`/api/vault/clients/${encodeURIComponent(clientId)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "The client status could not be updated.");
      }
      if (result.emailSent === false && (nextStatus === "approved" || nextStatus === "revoked")) {
        window.alert(
          "The access status was updated, but the client email could not be sent. Please contact the client manually.",
        );
      }
      router.refresh();
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "The client status could not be updated.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="vault-client-actions">
      {status !== "approved" && (
        <button
          className="vault-client-approve"
          type="button"
          disabled={saving}
          onClick={() => updateStatus("approved")}
        >
          {saving ? "Updating…" : "Approve access"}
        </button>
      )}
      {status === "approved" && (
        <button
          className="vault-client-revoke"
          type="button"
          disabled={saving}
          onClick={() => updateStatus("revoked")}
        >
          {saving ? "Updating…" : "Revoke access"}
        </button>
      )}
      {status === "revoked" && (
        <button
          className="vault-client-pending"
          type="button"
          disabled={saving}
          onClick={() => updateStatus("pending")}
        >
          Return to pending
        </button>
      )}
      {error && <p className="vault-client-error" role="alert">{error}</p>}
    </div>
  );
}
