"use client";
import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import { submitEnquiry } from "../../lib/submitEnquiry";
import { trackEvent } from "../../lib/analytics";

export function ArabicRentalEnquiryForm({selectedVilla=""}: {selectedVilla?:string}) {
  const [sending,setSending]=useState(false);
  const [reference,setReference]=useState("");
  const [error,setError]=useState("");
  const started=useRef(false);
  const submitting=useRef(false);
  async function handleSubmit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    if(submitting.current)return;
    const form=new FormData(event.currentTarget);
    const arrival=String(form.get("arrival")||"");
    const departure=String(form.get("departure")||"");
    if(arrival && departure && departure<=arrival){setError("يرجى اختيار تاريخ مغادرة بعد تاريخ الوصول.");return;}
    submitting.current=true;setSending(true);setError("");
    try{
      const result=await submitEnquiry({
        enquiry_type:"luxury-rental",preferred_area_or_property:form.get("location")||"Flexible",
        indicative_budget_or_value:form.get("budget")||"To discuss",
        requirements:[
          `Arrival: ${arrival||"Flexible / to confirm"}`,
          `Departure: ${departure||"Flexible / to confirm"}`,
          `Guests: ${form.get("guests")||"To confirm"}`,
          `Bedrooms: ${form.get("bedrooms")||"To confirm"}`,
          `Additional requirements (Arabic): ${form.get("requirements")||"Not provided"}`
        ].join(" · "),
        full_name:form.get("name"),email:form.get("email"),contact_desk:"Spain rental desk",
        preferred_channel:form.get("phone")?"telephone_or_whatsapp":"Email",
        telephone_or_whatsapp:form.get("phone"),partner_slug:"",language:"ar",
        website_region:"Marbella Villa Collection",website_journey:"spain",company_website:form.get("company_website")
      });
      trackEvent("rental_enquiry_submitted",{source:"marbella_villa_collection_ar",form_variant:"short"});
      setReference(result.reference);
    }catch{
      trackEvent("enquiry_failed",{source:"marbella_villa_collection_ar"});
      setError("تعذّر إرسال طلبك. يرجى المحاولة مرة أخرى أو التواصل عبر enquiry@pfeuroasia.com.");
    }finally{submitting.current=false;setSending(false);}
  }
  if(reference)return <div className="rental-form-success" role="status"><span>✓</span><h3>تم إرسال طلبك بنجاح.</h3><p>رقم الطلب: <bdi>{reference}</bdi></p><p>سيراجع فريقنا متطلباتك ويتواصل معك شخصياً بشأن الخيارات المتاحة.</p><button type="button" onClick={()=>{setReference("");started.current=false;}}>إرسال استفسار آخر</button></div>;
  return <form className="rental-form" dir="rtl" lang="ar" onSubmit={handleSubmit} onFocusCapture={()=>{if(!started.current){started.current=true;trackEvent("enquiry_started",{source:"marbella_villa_collection_ar",form_variant:"short"});}}}>
    <h2>ابحث عن الفيلا المناسبة</h2>
    <p>ابدأ بالاسم والبريد الإلكتروني، ثم أضف تفاصيل إقامتك المتاحة. لا مشكلة إن كانت المواعيد مرنة.</p>
    <div className="rental-form-grid">
      <label>الاسم الكامل<input name="name" required autoComplete="name" maxLength={160}/></label>
      <label>البريد الإلكتروني<input name="email" required type="email" autoComplete="email" maxLength={320} dir="ltr"/></label>
      <label>تاريخ الوصول (اختياري)<input name="arrival" type="date"/></label>
      <label>تاريخ المغادرة (اختياري)<input name="departure" type="date"/></label>
      <label>عدد الضيوف (اختياري)<input name="guests" min="1" type="number"/></label>
      <label>الميزانية الأسبوعية<select name="budget" defaultValue="To discuss"><option value="To discuss">للمناقشة</option><option value="Under €20,000 per week">أقل من 20,000 يورو أسبوعياً</option><option value="€20,000–€50,000 per week">20,000–50,000 يورو أسبوعياً</option><option value="€50,000–€100,000 per week">50,000–100,000 يورو أسبوعياً</option><option value="€100,000+ per week">أكثر من 100,000 يورو أسبوعياً</option></select></label>
    </div>
    <details className="rental-form-details" open={Boolean(selectedVilla)}><summary>أضف الفيلا أو المنطقة أو طلبات أخرى (اختياري)</summary><div className="rental-form-grid">
      <label className="wide">الهاتف / واتساب<input name="phone" type="tel" autoComplete="tel" maxLength={120} dir="ltr"/></label>
      <label>عدد غرف النوم<input name="bedrooms" min="1" type="number"/></label>
      <label>المنطقة أو الفيلا المفضلة<select name="location" defaultValue={selectedVilla||"Flexible"}>{selectedVilla&&<option value={selectedVilla}>{selectedVilla}</option>}<option value="Flexible">مرن</option><option value="La Zagaleta">لا ثاغاليتا</option><option value="El Madroñal">إل مادرونيال</option><option value="Marbella Golden Mile">الميل الذهبي في ماربيا</option><option value="Sierra Blanca">سييرا بلانكا</option><option value="Benahavís">بيناهافيس</option><option value="Puerto Banús">بويرتو بانوس</option></select></label>
      <label className="wide">هل لديك متطلبات إضافية؟<textarea name="requirements" rows={3} maxLength={4000} placeholder="الأطفال، سهولة الوصول، طاهٍ خاص، تدفئة المسبح…"/></label>
    </div></details>
    <div className="rental-form-trap" aria-hidden="true"><input name="company_website" tabIndex={-1} autoComplete="off"/></div>
    <label className="rental-form-consent"><input type="checkbox" required/><span>أوافق على التواصل معي بخصوص هذا الطلب من قبل PF EuroAsia وThe Luxury Villa Collection. <Link href="https://www.pfeuroasia.com/privacy">سياسة الخصوصية</Link>.</span></label>
    {error&&<p className="rental-form-error" role="alert">{error}</p>}
    <button className="rental-form-submit" type="submit" disabled={sending}>{sending?"جارٍ الإرسال…":"إرسال طلب الفيلا ←"}</button>
    <small>دون التزام بالحجز. نتعامل مع طلبك بسرية بالتعاون مع PF EuroAsia وThe Luxury Villa Collection (المملكة المتحدة).</small>
  </form>;
}
