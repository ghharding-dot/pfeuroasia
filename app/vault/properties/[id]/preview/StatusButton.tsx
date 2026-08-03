"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function StatusButton({
  id,
  status,
}: {
  id: string;
  status: "draft" | "published";
}) {
  const router = useRouter();
  const [working, setWorking] = useState(false);
  const [message, setMessage] = useState("");
  const nextStatus = status === "published" ? "draft" : "published";

  async function updateStatus() {
    setWorking(true);
    setMessage("");

    try {
      const response = await fetch(`/api/vault/properties/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Status could not be updated.");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Status could not be updated.");
    } finally {
      setWorking(false);
    }
  }

  return (
    <div className="vault-status-action">
      <button
        className={status === "published" ? "vault-secondary-button" : "vault-primary-button"}
        type="button"
        onClick={updateStatus}
        disabled={working}
      >
        {working
          ? "Updating..."
          : status === "published"
            ? "Return to Draft"
            : "Publish Property"}
      </button>
      {message && <p className="vault-error" role="alert">{message}</p>}
    </div>
  );
}
