type EnquiryResult = {
  ok?: boolean;
  reference?: string;
  delivery?: string;
  error?: string;
};

export async function submitEnquiry(payload: object): Promise<{ reference: string }> {
  const response = await fetch("/api/enquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  const result = (await response.json()) as EnquiryResult;
  if (!response.ok || result.ok !== true || result.delivery !== "sent" ||
      !result.reference || result.reference === "PFE-RECEIVED") {
    throw new Error(result.error || "Your enquiry could not be delivered.");
  }
  return { reference: result.reference };
}
