"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { submitEnquiry } from "../lib/submitEnquiry";
import styles from "./EuroAsiaConcierge.module.css";
import { ConciergeVoice } from "./ConciergeVoice";

type Source = {label:string;url:string};
type Message = {role:"user"|"assistant";text:string;sources?:Source[]};
const suggestions = ["Find a villa in Spain", "Rent a Marbella villa", "Malaysia residency options", "International money transfers"];
function safeLink(url:string) {
  return (url.startsWith("/") && !url.startsWith("//")) || url.startsWith("https://www.pfiberia.com/");
}
export function EuroAsiaConcierge() {
  const pathname=usePathname() || "/";
  const [open,setOpen]=useState(false);
  const [messages,setMessages]=useState<Message[]>([]);
  const [question,setQuestion]=useState("");
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState("");
  const [enquiry,setEnquiry]=useState(false);
  const [sending,setSending]=useState(false);
  const [reference,setReference]=useState("");
  const [requirements,setRequirements]=useState("");
  const input=useRef<HTMLTextAreaElement>(null);
  const launcher=useRef<HTMLButtonElement>(null);
  const bottom=useRef<HTMLDivElement>(null);
  const requesting=useRef(false);
  const hidden=/^\/(vault|collaborators)(\/|$)/.test(pathname);
  function close() {setOpen(false);launcher.current?.focus();}
  useEffect(()=> {if (open && !enquiry) input.current?.focus();},[open,enquiry]);
  useEffect(()=> {bottom.current?.scrollIntoView({block:"nearest"});},[messages,busy,enquiry]);
  useEffect(()=> {
    if (!open) return;
    const escape=(event:KeyboardEvent)=> {if(event.key === "Escape") {setOpen(false);launcher.current?.focus();}};
    document.addEventListener("keydown",escape);
    return ()=>document.removeEventListener("keydown",escape);
  },[open]);
  async function ask(text:string) {
    const next=text.trim();if (!next || requesting.current) return;
    requesting.current=true;
    setQuestion("");setError("");setBusy(true);
    const history=messages.slice(-6);
    setMessages(previous=>[...previous,{role:"user",text:next}]);
    try {
      const response=await fetch("/api/concierge",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:next,history:history.map(({role,text})=>({role,text}))}),signal:AbortSignal.timeout(35000)});
      const result=await response.json();
      if (!response.ok || !result.answer) throw new Error(result.error || "Please try again or send your question to our team.");
      setMessages(previous=>[...previous,{role:"assistant",text:result.answer,sources:Array.isArray(result.sources)?result.sources.filter((s:Source)=>s && typeof s.url === "string" && safeLink(s.url)):[]}]);
      return {answer:result.answer as string};
    } catch(cause) {
      setError(cause instanceof Error && cause.name !== "TimeoutError" ? cause.message : "The assistant took too long to respond. Please try again or contact our team.");
      setQuestion(next);
    } finally {requesting.current=false;setBusy(false);input.current?.focus();}
  }
  function startEnquiry() {
    setRequirements(messages.map(m=>`${m.role === "user" ? "Visitor" : "AI concierge"}: ${m.text}`).join("\n\n").slice(-4500));
    setError("");setEnquiry(true);
  }
  async function sendEnquiry(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();if(sending) return;
    const form=new FormData(event.currentTarget);setSending(true);setError("");
    try {
      const result=await submitEnquiry({enquiry_type:form.get("topic"),full_name:form.get("name"),email:form.get("email"),telephone_or_whatsapp:form.get("phone"),requirements,contact_desk:"EuroAsia AI Concierge",preferred_channel:"Email",website_region:"International",website_journey:form.get("topic") === "asia-residency-company" ? "asia" : "spain",company_website:form.get("company_website")});
      setReference(result.reference);
    } catch(cause) {setError(cause instanceof Error?cause.message:"Your enquiry could not be delivered. Please try again.");}
    finally {setSending(false);}
  }
  if(hidden) return null;
  return <div className={styles.root}>
    {open && <section className={styles.panel} role="dialog" aria-labelledby="euroasia-concierge-title">
      <header className={styles.header}>
        <div><h2 id="euroasia-concierge-title">Ask EuroAsia</h2><p>Your online AI advisor</p></div>
        <button type="button" onClick={close} aria-label="Close AI concierge" className={styles.close}>×</button>
      </header>
      <div className={styles.content}>
        {enquiry ? reference ? <div className={styles.success} role="status"><h3>Your enquiry has been sent.</h3><p>Reference: {reference}</p><p>The EuroAsia team will contact you using the details you provided.</p><button type="button" onClick={()=>{setEnquiry(false);setReference("");}}>Back to conversation</button></div> : <form onSubmit={sendEnquiry} className={styles.form}>
          <button type="button" className={styles.back} onClick={()=>{setEnquiry(false);setError("");}}>Back to conversation</button>
          <h3>Speak with our team</h3><p>Review your message and share your contact details.</p>
          <label>Interested in<select name="topic" required defaultValue="buy"><option value="buy">Buying property</option><option value="luxury-rental">Luxury villa rentals</option><option value="asia-residency-company">Malaysia residency or company setup</option><option value="international-payments">Currency transfers</option><option value="partner">Another enquiry</option></select></label>
          <label>Name<input name="name" autoComplete="name" required maxLength={160}/></label>
          <label>Email<input name="email" type="email" autoComplete="email" required maxLength={320}/></label>
          <label>Telephone / WhatsApp (optional)<input name="phone" type="tel" autoComplete="tel" maxLength={80}/></label>
          <label>Your message<textarea value={requirements} onChange={e=>setRequirements(e.target.value)} required maxLength={5000} rows={5}/></label>
          <div className={styles.trap} aria-hidden="true"><input name="company_website" tabIndex={-1} autoComplete="off"/></div>
          <label className={styles.consent}><input type="checkbox" required/><span>I agree to be contacted about this enquiry and understand relevant partners may receive my details. <Link href="/privacy">Privacy notice</Link>.</span></label>
          <button type="submit" className={styles.primary} disabled={sending}>{sending?"Sending…":"Send enquiry"}</button>
        </form> : <>
          <div className={styles.welcome}><p>Welcome to Ask EuroAsia, our online AI advisor. Please ask anything you like.</p><p>I can help you explore property sales and purchases, luxury rentals, relocation, residency, company formation and international money transfers, and guide you to the relevant pages.</p></div>
          {!messages.length && <div className={styles.suggestions}>{suggestions.map(text=><button type="button" key={text} onClick={()=>void ask(text)} disabled={busy}>{text}</button>)}</div>}
          <div role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions">
            {messages.map((message,index)=><div key={index} className={`${styles.message} ${message.role === "user" ? styles.user : styles.assistant}`}><span className={styles.speaker}>{message.role === "user" ? "You" : "EuroAsia AI"}</span><p>{message.text}</p>{Boolean(message.sources?.length) && <div className={styles.links}>{message.sources?.map(source=><Link href={source.url} key={source.url} onClick={()=>setOpen(false)}>{source.label}</Link>)}</div>}</div>)}
          </div>
          {busy && <p className={styles.thinking} role="status">Checking our website information…</p>}
          <div ref={bottom}/>
        </>}
        {error && <p className={styles.error} role="alert">{error}</p>}
      </div>
      {!enquiry && <footer className={styles.footer}>
        <ConciergeVoice history={messages} onQuestion={ask}/>
        <form onSubmit={e=>{e.preventDefault();void ask(question);}} className={styles.composer}>
          <label className={styles.srOnly} htmlFor="euroasia-question">Your question</label>
          <textarea ref={input} id="euroasia-question" value={question} onChange={e=>setQuestion(e.target.value)} placeholder="Please ask anything you like…" maxLength={2000} rows={2} disabled={busy} onKeyDown={e=>{if(e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing){e.preventDefault();void ask(question);}}}/>
          <button type="submit" disabled={busy || !question.trim()} aria-label="Send question">Send</button>
        </form>
        <button type="button" className={styles.team} disabled={busy} onClick={startEnquiry}>Speak with the EuroAsia team</button>
        <p className={styles.note}>AI guidance. Availability and individual tax or residency advice require confirmation. Avoid sharing sensitive documents here.</p>
      </footer>}
    </section>}
    {!open && <button ref={launcher} type="button" className={styles.launcher} onClick={()=>setOpen(true)} aria-expanded={open} aria-label="Ask EuroAsia — Your online AI advisor. Please ask anything you like."><svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-8 8H4l-2 2v-10a9 9 0 0 1 18 0Z"/><path d="M7 10h8M7 14h5"/></svg><span className={styles.launcherCopy}><strong>Ask EuroAsia</strong><span>Your online AI advisor</span><span>Please ask anything you like.</span></span></button>}
  </div>;
}
