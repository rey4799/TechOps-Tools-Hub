// app/daily/page.js
import Link from 'next/link';

export default function Daily() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Daily Menu</h1>
      <ul>
        <li>
          <Link href="/daily/daily-recap">Daily Recap</Link>
        </li>
        <li>
          <Link href="/daily/fds-eyeballing">FDS Eyeballing</Link>
        </li>
        <li>
          <Link href="/daily/gtm-report">GTM Report</Link>
        </li>
        <li>
          <Link href="/daily/no-pin">No Pin</Link>
        </li>
        <li>
          <Link href="/daily/tnc">TNC</Link>
        </li>
        <li>
          <Link href="/daily/zoloz">Zoloz</Link>
        </li>
      </ul>
    </div>
  );
}
