"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [working, setWorking] = useState(false);

  async function logout() {
    setWorking(true);
    await fetch("/api/collaborators/logout", { method: "POST" });
    router.push("/collaborators");
    router.refresh();
  }

  return (
    <button className="vault-secondary-button" type="button" onClick={logout} disabled={working}>
      {working ? "Signing out…" : "Sign out"}
    </button>
  );
}
