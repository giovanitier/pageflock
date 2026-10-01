import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon, ChartLineData01Icon, InboxIcon, Rocket01Icon } from "@hugeicons/core-free-icons";

const items = [
  ["Attention, not noise", "Pageflock watches every project and surfaces the changes that actually deserve a look.", InboxIcon],
  ["Release receipts", "Record what you shipped and keep the baseline, evidence and outcome attached to the release.", ChartLineData01Icon],
  ["Launch mode", "Follow the intense first hour, day and week without living inside five analytics tabs.", Rocket01Icon],
] as const;

export default function Home() {
  return (
    <main className="marketing-shell">
      <nav className="marketing-nav"><Link className="marketing-brand" href="/"><span className="brand-mark"><span /><span /><span /></span><strong>Pageflock</strong></Link><div className="marketing-links"><a href="#product">Product</a><a href="#principles">Principles</a><Link href="/app">Open demo</Link></div><Link className="primary-button compact" href="/app">Track my projects</Link></nav>
      <section className="hero"><div className="hero-copy"><span className="eyebrow">Analytics for people building more than one thing</span><h1>You shipped it.<br />See what happened.</h1><p>One calm place for your products, sites and launches. Pageflock finds what changed, keeps the evidence attached and tells you what deserves attention.</p><div className="hero-actions"><Link className="primary-button" href="/app">Open Pageflock <HugeiconsIcon icon={ArrowUpRight01Icon} size={17} strokeWidth={1.7} /></Link><a className="secondary-button" href="#product">See how it works</a></div></div><div className="hero-product"><div className="mini-window"><div className="mini-window-top"><div className="brand-mark"><span /><span /><span /></div><span>Everything you build</span><em>7d</em></div><div className="mini-signal"><small>ATTENTION</small><strong>Signup conversion increased after the pricing rewrite.</strong><p>+17% compared with the previous 7-day baseline.</p><div><span>Pricing rewrite · Sep 29</span><span>+38% /signup visits</span><span>54 signups</span></div></div><div className="mini-chart"><div className="mini-chart-line" /></div></div></div></section>
      <section className="marketing-section" id="product"><div className="section-intro"><span className="eyebrow">From dashboards to decisions</span><h2>Five websites should not mean five analytics tabs.</h2><p>Pageflock uses traditional analytics as the evidence layer, then organizes the product around projects, shipping and outcomes.</p></div><div className="feature-grid">{items.map(([title, description, icon]) => <article key={title}><span className="feature-icon"><HugeiconsIcon icon={icon} size={22} strokeWidth={1.6} /></span><h3>{title}</h3><p>{description}</p></article>)}</div></section>
      <section className="marketing-section principle-section" id="principles"><div className="section-intro"><span className="eyebrow">Built differently</span><h2>Quiet is okay.</h2><p>If there is nothing meaningful to report, Pageflock should say so. No fabricated AI insight. No urgency theater.</p></div><div className="principle-list"><span>Attention over information</span><span>Evidence over opinion</span><span>Outcomes over pageviews</span><span>Change over static numbers</span><span>Projects over properties</span><span>Never fake intelligence</span></div></section>
      <section className="closing-cta"><span className="eyebrow">Keep building</span><h2>Pageflock will watch the rest.</h2><Link className="primary-button" href="/app">Open the product <HugeiconsIcon icon={ArrowUpRight01Icon} size={17} strokeWidth={1.7} /></Link></section>
      <footer className="marketing-footer"><span>Pageflock</span><span>Analytics for everything you build.</span><span>2026</span></footer>
    </main>
  );
}
