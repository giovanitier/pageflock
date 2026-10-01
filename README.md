# Pageflock

**Analytics for people building more than one thing.**

Pageflock is a multi-project analytics product built around attention, shipping and outcomes rather than dashboard homework.

## Product idea

- **Attention inbox** surfaces changes that deserve a look.
- **Release receipts** preserve a baseline when you ship and show what happened after.
- **Launch mode** follows LIVE → 1h → 24h → 7d.
- **Cross-project overview** lets builders understand multiple products from one place.
- **Tracking health** makes broken instrumentation visible instead of silently flattening charts.
- **Evidence first** means Pageflock never invents an insight to make the interface look intelligent.

## Stack

- Next.js 16 App Router
- React 19 + TypeScript
- Hugeicons (`@hugeicons/react` + `@hugeicons/core-free-icons`)
- CSS-first UI; no component framework

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000` for the marketing site and `http://localhost:3000/app` for the interactive product prototype.

## Current scope

This repository currently contains the durable frontend foundation and interaction model for Pageflock. The demo data is intentionally local. Persistent event collection, authentication, storage, billing and production deployment are the next backend milestones.
