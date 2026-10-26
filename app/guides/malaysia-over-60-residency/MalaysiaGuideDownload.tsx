"use client";
import { useState } from "react";
import Link from "next/link";

export function MalaysiaGuideDownload() {
  const [email,setEmail]=useState("");
  const [consent,setConsent]=useState(false);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  async function download(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();setLoading(true);setError("");
    try {
      const response=await fetch("/api/malaysia-50plus-guide",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,consent,company_website:""})});
      if(!response.ok){const result=await response.json().catch(()=>({}));throw new Error(result.error||"Unable to prepare the guide.");}
      const blob=await response.blob();const url=URL.createObjectURL(blob);
      const a=document.createElement("a");a.href=url;a.download="PF-EuroAsia-Malaysia-Residency-50-Plus-Guide.pdf";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);
    }catch(err){setError(err instanceof Error?err.message:"Please try again.");}finally{setLoading(false);}
  }
  return <section style={{background:"#f3eee6",padding:"30px",borderRadius:12,margin:"30px 0"}} aria-label="Download Malaysia residency guide">
    <p style={{letterSpacing:2,fontSize:12,textTransform:"uppercase"}}>Complimentary two-page PDF</p>
    <h2>Malaysia residency for over-50s and over-60s</h2>
    <p>Compare MM2H, Johor, Sarawak and Sabah, plus the key financial, family, healthcare and tax questions. Register your email for immediate download.</p>
    <form onSubmit={download} style={{display:"grid",gap:12,maxWidth:480}}>
      <label htmlFor="malaysia-guide-email">Email address</label>
      <input id="malaysia-guide-email" type="email" autoComplete="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" style={{padding:12,border:"1px solid #bcb4a7",borderRadius:5}}/>
      <label style={{display:"flex",gap:9,alignItems:"flex-start",fontSize:13}}>
        <input type="checkbox" required checked={consent} onChange={e=>setConsent(e.target.checked)}/>
        <span>I agree that PF EuroAsia may store my email to provide this guide and follow up about Malaysia residency enquiries. See the <Link href="/privacy" style={{textDecoration:"underline"}}>privacy notice</Link>.</span>
      </label>
      {error&&<p role="alert" style={{color:"#9d2b21"}}>{error}</p>}
      <button className="button button-gold" type="submit" disabled={loading}>{loading?"Preparing your PDF…":"Register email & download PDF →"}</button>
    </form>
    <p style={{fontSize:12,marginTop:12}}>No third-party contact details are included in the PDF. Your email is registered with PF EuroAsia.</p>
  </section>;
}
