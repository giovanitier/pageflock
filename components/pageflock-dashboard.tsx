"use client";

import { useMemo, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Activity01Icon,
  ArrowUpRight01Icon,
  Calendar03Icon,
  ChartLineData01Icon,
  Home01Icon,
  InboxIcon,
  Notification03Icon,
  Rocket01Icon,
  SearchIcon,
  Settings01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { AreaChart, Sparkline } from "@/components/sparkline";
import { activity, attention, projects, releases, type Release } from "@/lib/data";

type View = "Overview" | "Attention" | "Activity" | "Releases" | "Launches" | "Reports" | "Tracking health";

const nav = [
  ["Overview", Home01Icon],
  ["Attention", InboxIcon],
  ["Activity", Activity01Icon],
  ["Releases", Calendar03Icon],
  ["Launches", Rocket01Icon],
  ["Reports", ChartLineData01Icon],
  ["Tracking health", Settings01Icon],
] as const;

function Icon({ icon, size = 18 }: { icon: (typeof nav)[number][1]; size?: number }) {
  return <HugeiconsIcon icon={icon} size={size} color="currentColor" strokeWidth={1.7} />;
}

export default function PageflockDashboard() {
  const [view, setView] = useState<View>("Overview");
  const [projectId, setProjectId] = useState("all");
  const [range, setRange] = useState("7d");
  const [releaseList, setReleaseList] = useState<Release[]>(releases);
  const [showRelease, setShowRelease] = useState(false);
  const [newRelease, setNewRelease] = useState("");
  const [launchLive, setLaunchLive] = useState(false);

  const selectedProject = projects.find((project) => project.id === projectId);
  const totalVisitors = selectedProject?.visitors ?? projects.reduce((sum, item) => sum + item.visitors, 0);
  const totalOutcomes = selectedProject?.outcomeValue ?? projects.reduce((sum, item) => sum + item.outcomeValue, 0);
  const avgDelta = selectedProject?.delta ?? projects.reduce((sum, item) => sum + item.delta, 0) / projects.length;
  const combinedSpark = useMemo(() => {
    if (selectedProject) return selectedProject.spark;
    return projects[0].spark.map((_, index) => projects.reduce((sum, item) => sum + item.spark[index], 0));
  }, [selectedProject]);

  function addRelease() {
    if (!newRelease.trim()) return;
    setReleaseList((current) => [
      {
        id: `r-${Date.now()}`,
        project: selectedProject?.name ?? "Mentionloom",
        title: newRelease.trim(),
        time: "Just now",
        status: "measuring",
        effect: "Measurement started",
        metrics: [
          { label: "Baseline", value: "Saved", delta: "—" },
          { label: "Visitors", value: "0", delta: "—" },
          { label: "Outcome", value: "0", delta: "—" },
        ],
      },
      ...current,
    ]);
    setNewRelease("");
    setShowRelease(false);
    setView("Releases");
  }

  return (
    <main className="product-shell">
      <aside className="sidebar">
        <div className="brand-row">
          <div className="brand-mark"><span /><span /><span /></div>
          <span className="brand-name">Pageflock</span>
        </div>

        <button className="workspace-select" type="button">
          <span className="avatar">G</span>
          <span><strong>Personal</strong><small>4 projects</small></span>
          <span className="workspace-chevron">⌄</span>
        </button>

        <nav className="side-nav" aria-label="Product navigation">
          {nav.map(([label, icon]) => (
            <button key={label} className={view === label ? "active" : ""} onClick={() => setView(label)} type="button">
              <Icon icon={icon} />
              <span>{label}</span>
              {label === "Attention" && <em>4</em>}
            </button>
          ))}
        </nav>

        <div className="side-section-label">Projects</div>
        <div className="project-shortcuts">
          {projects.map((project) => (
            <button key={project.id} onClick={() => { setProjectId(project.id); setView("Overview"); }} type="button">
              <span className={`project-dot ${project.id}`} />
              <span>{project.name}</span>
            </button>
          ))}
        </div>

        <div className="sidebar-bottom">
          <button type="button"><Icon icon={Settings01Icon} /><span>Settings</span></button>
          <button type="button"><Icon icon={UserIcon} /><span>Account</span></button>
        </div>
      </aside>

      <section className="product-main">
        <header className="topbar">
          <div className="project-filter">
            <select aria-label="Project" value={projectId} onChange={(event) => setProjectId(event.target.value)}>
              <option value="all">All projects</option>
              {projects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}
            </select>
          </div>
          <div className="topbar-actions">
            <button className="search-button" type="button"><Icon icon={SearchIcon} /><span>Search</span><kbd>⌘K</kbd></button>
            <button className="icon-button" aria-label="Notifications" type="button"><Icon icon={Notification03Icon} /></button>
            <button className="primary-button compact" onClick={() => setShowRelease(true)} type="button">Record release</button>
          </div>
        </header>

        <div className="page-content">
          {view === "Overview" && (
            <>
              <div className="page-heading split-heading">
                <div>
                  <span className="eyebrow">Overview</span>
                  <h1>{selectedProject ? selectedProject.name : "Everything you build"}</h1>
                  <p>{selectedProject ? `What changed on ${selectedProject.domain}.` : "What deserves your attention across your projects."}</p>
                </div>
                <div className="segmented-control" aria-label="Date range">
                  {["24h", "7d", "30d"].map((option) => <button key={option} type="button" onClick={() => setRange(option)} className={range === option ? "active" : ""}>{option}</button>)}
                </div>
              </div>

              <section className="signal-strip">
                <div><span>Visitors</span><strong>{totalVisitors.toLocaleString()}</strong><small className={avgDelta >= 0 ? "up" : "down"}>{avgDelta >= 0 ? "+" : ""}{avgDelta.toFixed(1)}%</small></div>
                <div><span>{selectedProject?.outcome ?? "Outcomes"}</span><strong>{totalOutcomes}</strong><small className="up">+14.2%</small></div>
                <div><span>Attention</span><strong>{selectedProject ? attention.filter((item) => item.project === selectedProject.name).length : attention.length}</strong><small>signals</small></div>
                <div><span>Tracking</span><strong>{projects.filter((project) => project.status === "healthy").length}/{projects.length}</strong><small>healthy</small></div>
              </section>

              <section className="chart-panel panel">
                <div className="panel-head"><div><span className="panel-kicker">Traffic</span><h2>Visitors are trending up</h2></div><span className="quiet-label">Compared with previous {range}</span></div>
                <AreaChart values={combinedSpark} />
              </section>

              <div className="overview-grid">
                <section className="panel attention-preview">
                  <div className="panel-head"><div><span className="panel-kicker">Attention</span><h2>Worth looking at</h2></div><button className="text-button" onClick={() => setView("Attention")} type="button">View all <Icon icon={ArrowUpRight01Icon} size={15} /></button></div>
                  <div className="attention-list compact-list">
                    {attention.slice(0, 3).map((item) => <AttentionRow key={item.id} item={item} compact />)}
                  </div>
                </section>
                <section className="panel live-panel">
                  <div className="panel-head"><div><span className="panel-kicker">Live</span><h2>18 people now</h2></div><span className="live-dot">Live</span></div>
                  <div className="live-bars">
                    {[64, 78, 49, 88, 71, 92, 56, 80, 67, 74, 58, 84].map((height, index) => <span key={index} style={{ height: `${height}%` }} />)}
                  </div>
                  <div className="live-sources"><div><span>X / Twitter</span><strong>7</strong></div><div><span>Direct</span><strong>5</strong></div><div><span>Google</span><strong>4</strong></div><div><span>Other</span><strong>2</strong></div></div>
                </section>
              </div>

              <section className="panel projects-table-panel">
                <div className="panel-head"><div><span className="panel-kicker">Projects</span><h2>Portfolio health</h2></div><span className="quiet-label">Last {range}</span></div>
                <div className="project-table table-head"><span>Project</span><span>Visitors</span><span>Primary outcome</span><span>Trend</span><span>Status</span></div>
                {projects.map((project) => (
                  <button className="project-table table-row" key={project.id} onClick={() => setProjectId(project.id)} type="button">
                    <span className="project-cell"><span className={`project-logo ${project.id}`}>{project.name.slice(0, 1)}</span><span><strong>{project.name}</strong><small>{project.domain}</small></span></span>
                    <span><strong>{project.visitors.toLocaleString()}</strong><small className={project.delta >= 0 ? "up" : "down"}>{project.delta >= 0 ? "+" : ""}{project.delta}%</small></span>
                    <span><strong>{project.outcomeValue}</strong><small>{project.outcome}</small></span>
                    <span><Sparkline values={project.spark} /></span>
                    <span className={`status-pill ${project.status}`}>{project.status === "healthy" ? "Healthy" : "Check tracking"}</span>
                  </button>
                ))}
              </section>
            </>
          )}

          {view === "Attention" && (
            <>
              <PageTitle eyebrow="Attention inbox" title="Only the things worth looking at" description="Pageflock watches the dashboards so you do not have to." />
              <div className="filter-row"><button className="filter-chip active" type="button">All 4</button><button className="filter-chip" type="button">Growth 2</button><button className="filter-chip" type="button">Tracking 1</button><button className="filter-chip" type="button">Journeys 1</button></div>
              <section className="panel attention-full-list">{attention.map((item) => <AttentionRow key={item.id} item={item} />)}</section>
            </>
          )}

          {view === "Activity" && (
            <>
              <PageTitle eyebrow="Activity" title="What people are doing right now" description="A calm, privacy-friendly stream across every project." />
              <section className="panel activity-panel">
                <div className="activity-table activity-head"><span>Project</span><span>Event</span><span>Page</span><span>Country</span><span>When</span></div>
                {activity.map((row, index) => <div className="activity-table activity-row" key={`${row[1]}-${index}`}><span><span className="event-dot" />{row[0]}</span><strong>{row[1]}</strong><span>{row[2]}</span><span>{row[3]}</span><span>{row[4]}</span></div>)}
              </section>
            </>
          )}

          {view === "Releases" && (
            <>
              <PageTitle eyebrow="Release receipts" title="You shipped it. See what happened." description="Create a baseline when you ship, then let the outcome speak for itself." action={<button className="primary-button" type="button" onClick={() => setShowRelease(true)}>Record release</button>} />
              <div className="release-stack">
                {releaseList.map((release) => (
                  <section className="panel release-card" key={release.id}>
                    <div className="release-head"><div><div className="release-meta"><span>{release.project}</span><i>•</i><span>{release.time}</span></div><h2>{release.title}</h2></div><span className={`status-pill ${release.status === "complete" ? "healthy" : "measuring"}`}>{release.effect}</span></div>
                    <div className="receipt-metrics">{release.metrics.map((metric) => <div key={metric.label}><span>{metric.label}</span><strong>{metric.value}</strong><small className={metric.delta.startsWith("+") ? "up" : ""}>{metric.delta}</small></div>)}</div>
                    <div className="receipt-note"><span className="receipt-line" /><p>{release.status === "complete" ? "The strongest evidence is visible above. Pageflock keeps the baseline attached to this release so the comparison stays honest." : "Baseline captured. This receipt will mature as enough post-release traffic arrives."}</p></div>
                  </section>
                ))}
              </div>
            </>
          )}

          {view === "Launches" && (
            <>
              <PageTitle eyebrow="Launch mode" title={launchLive ? "Launch is live" : "Follow the first seven days closely"} description="A focused view for the moments when every source, signup and route matters." action={<button className={launchLive ? "secondary-button" : "primary-button"} onClick={() => setLaunchLive((value) => !value)} type="button">{launchLive ? "End launch" : "Start launch"}</button>} />
              <section className={`launch-hero panel ${launchLive ? "is-live" : ""}`}>
                <div className="launch-window"><span className={launchLive ? "active" : ""}>LIVE</span><span>1h</span><span>24h</span><span>7d</span></div>
                <div className="launch-number"><span>{launchLive ? "24" : "—"}</span><small>people on your projects now</small></div>
                <div className="launch-grid"><div><span>Top source</span><strong>{launchLive ? "X / Twitter" : "—"}</strong></div><div><span>Signups</span><strong>{launchLive ? "11" : "—"}</strong></div><div><span>Conversion</span><strong>{launchLive ? "9.2%" : "—"}</strong></div><div><span>Primary page</span><strong>{launchLive ? "/pricing" : "—"}</strong></div></div>
              </section>
              <div className="overview-grid"><section className="panel"><div className="panel-head"><div><span className="panel-kicker">Sources</span><h2>Where the launch is moving</h2></div></div><div className="source-bars">{[["X / Twitter",62],["Direct",43],["Google",31],["Hacker News",19]].map(([label,value]) => <div key={String(label)}><span>{label}</span><div><i style={{ width: `${value}%` }} /></div><strong>{launchLive ? value : 0}%</strong></div>)}</div></section><section className="panel"><div className="panel-head"><div><span className="panel-kicker">Receipt</span><h2>Permanent launch record</h2></div></div><p className="empty-copy">When the launch ends, Pageflock will preserve the source mix, outcomes, high-intent journeys and key changes as a launch receipt.</p></section></div>
            </>
          )}

          {view === "Reports" && (
            <>
              <PageTitle eyebrow="Briefs" title="A useful report, without dashboard homework" description="Compact summaries of what changed, what moved outcomes and what deserves a closer look." />
              <div className="report-grid"><ReportCard period="This week" title="Portfolio brief" metric="+19.4%" detail="Overall qualified traffic increased, led by Portfolio and Mentionloom." /><ReportCard period="Sep 30" title="Launch brief" metric="86" detail="Signups across tracked SaaS projects, with pricing traffic as the strongest path." /><ReportCard period="Sep 29" title="Release brief" metric="+17%" detail="Signup conversion after the Mentionloom pricing rewrite." /></div>
            </>
          )}

          {view === "Tracking health" && (
            <>
              <PageTitle eyebrow="Tracking health" title="Know when the analytics themselves break" description="Collection health, domain validation and script presence across every project." />
              <section className="panel health-panel">
                {projects.map((project) => <div className="health-row" key={project.id}><span className={`health-indicator ${project.status}`} /><div><strong>{project.name}</strong><small>{project.domain}</small></div><div><span>Last event</span><strong>{project.status === "healthy" ? "< 1 min ago" : "7h ago"}</strong></div><div><span>Tracker</span><strong>{project.status === "healthy" ? "Installed" : "Needs check"}</strong></div><span className={`status-pill ${project.status}`}>{project.status === "healthy" ? "Healthy" : "Review"}</span></div>)}
              </section>
              <section className="panel install-panel"><div><span className="panel-kicker">Install</span><h2>Tracker snippet</h2><p>Add this once to the sites you want Pageflock to watch.</p></div><code>{`<script defer data-project="PROJECT_ID" src="https://cdn.pageflock.com/p.js"></script>`}</code><button className="secondary-button" type="button" onClick={() => navigator.clipboard?.writeText('<script defer data-project="PROJECT_ID" src="https://cdn.pageflock.com/p.js"></script>')}>Copy snippet</button></section>
            </>
          )}
        </div>
      </section>

      {showRelease && <div className="modal-backdrop" role="presentation" onMouseDown={() => setShowRelease(false)}><div className="release-modal" role="dialog" aria-modal="true" aria-labelledby="release-title" onMouseDown={(event) => event.stopPropagation()}><span className="eyebrow">New release</span><h2 id="release-title">What did you ship?</h2><p>Pageflock will preserve the current baseline and watch what happens next.</p><label>Release name<input autoFocus value={newRelease} onChange={(event) => setNewRelease(event.target.value)} placeholder="e.g. New onboarding flow" /></label><label>Project<select value={projectId === "all" ? "mentionloom" : projectId} onChange={(event) => setProjectId(event.target.value)}>{projects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}</select></label><div className="modal-actions"><button className="secondary-button" type="button" onClick={() => setShowRelease(false)}>Cancel</button><button className="primary-button" type="button" onClick={addRelease}>Start measuring</button></div></div></div>}
    </main>
  );
}

function PageTitle({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: React.ReactNode }) {
  return <div className="page-heading split-heading"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>{action}</div>;
}

function AttentionRow({ item, compact = false }: { item: (typeof attention)[number]; compact?: boolean }) {
  return <article className={`attention-row ${compact ? "is-compact" : ""}`}><div className={`signal-icon ${item.tone}`}>{item.tone === "positive" ? "↗" : item.tone === "warning" ? "!" : "→"}</div><div className="attention-copy"><div className="attention-meta"><span>{item.project}</span><i>•</i><span>{item.time}</span></div><h3>{item.title}</h3>{!compact && <><p>{item.detail}</p><div className="evidence-row">{item.evidence.map((evidence) => <span key={evidence}>{evidence}</span>)}</div></>}</div><button className="row-action" aria-label={`Open ${item.title}`} type="button"><Icon icon={ArrowUpRight01Icon} size={16} /></button></article>;
}

function ReportCard({ period, title, metric, detail }: { period: string; title: string; metric: string; detail: string }) {
  return <article className="panel report-card"><span className="panel-kicker">{period}</span><h2>{title}</h2><strong className="report-metric">{metric}</strong><p>{detail}</p><button className="text-button" type="button">Open brief <Icon icon={ArrowUpRight01Icon} size={15} /></button></article>;
}
