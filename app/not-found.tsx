import Link from "next/link";

export default function NotFound() {
  return <main className="not-found"><span className="eyebrow">404</span><h1>This page got zero recommendations.</h1><p>Reason: it does not exist.</p><Link className="primary-button" href="/">Back home</Link></main>;
}
