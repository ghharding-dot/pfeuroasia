"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export function ZhEnquiry() {
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent) {
    event.preventDefault();
    setSent(true);
  }

  if (sent) {
    return <div className="zh-enquiry-success">
      <span>✓</span>
      <h3>感谢您的咨询</h3>
      <p>目前为网站展示版本，您的资料尚未发送。接通正式邮箱或客户管理系统后，即可直接提交。</p>
      <Link className="text-link light-link" href="/zh">返回中文首页 →</Link>
    </div>;
  }

  return <form className="zh-form" onSubmit={submit}>
    <div className="zh-form-grid">
      <label><span>咨询类型</span><select name="purpose" defaultValue="buy"><option value="buy">购买西班牙物业</option><option value="sell">出售西班牙物业</option><option value="partner">商务合作</option></select></label>
      <label><span>意向区域</span><input name="area" placeholder="例如：Marbella、La Zagaleta" /></label>
      <label><span>预算范围</span><select name="budget" defaultValue=""><option value="" disabled>请选择</option><option>€200万–€500万</option><option>€500万–€1,000万</option><option>€1,000万–€2,000万</option><option>€2,000万以上</option><option>希望私下沟通</option></select></label>
      <label><span>首选联系方式</span><select name="channel" defaultValue="wechat"><option value="wechat">微信</option><option value="email">电子邮件</option><option value="phone">电话</option></select></label>
      <label><span>姓名 *</span><input name="name" required autoComplete="name" /></label>
      <label><span>电子邮件 *</span><input name="email" required type="email" autoComplete="email" /></label>
      <label><span>微信号</span><input name="wechat" /></label>
      <label><span>联系电话</span><input name="phone" type="tel" autoComplete="tel" /></label>
      <label className="full"><span>您的具体需求</span><textarea name="message" rows={4} placeholder="请简要说明物业类型、时间安排、隐私要求或其他重点…" /></label>
    </div>
    <label className="zh-consent"><input type="checkbox" required /><span>我同意就本次咨询与我联系。</span></label>
    <button className="button button-gold" type="submit">提交私人咨询 <span>→</span></button>
  </form>;
}
