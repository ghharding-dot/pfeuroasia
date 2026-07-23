"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export function PrivatePortfolioRegistration() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setError