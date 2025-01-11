import Link from 'next/link';

export default function Daily() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Daily Menu</h1>
      <ul className="space-y-6 mt-4">
        <li className="transition-transform transform hover:scale-105 flex items-center space-x-3">
          <i className="fas fa-calendar-day text-2xl text-blue-600" />
          <Link href="/daily/daily-recap" className="block p-4 bg-blue-100 rounded-lg shadow-md text-lg text-blue-700 hover:bg-blue-200">
            Daily Recap
          </Link>
        </li>
        <li className="transition-transform transform hover:scale-105 flex items-center space-x-3">
          <i className="fas fa-eye text-2xl text-green-600" />
          <Link href="/daily/fds-eyeballing" className="block p-4 bg-green-100 rounded-lg shadow-md text-lg text-green-700 hover:bg-green-200">
            FDS Eyeballing
          </Link>
        </li>
        <li className="transition-transform transform hover:scale-105 flex items-center space-x-3">
          <i className="fas fa-chart-line text-2xl text-yellow-600" />
          <Link href="/daily/gtm-report" className="block p-4 bg-yellow-100 rounded-lg shadow-md text-lg text-yellow-700 hover:bg-yellow-200">
            GTM Report
          </Link>
        </li>
        <li className="transition-transform transform hover:scale-105 flex items-center space-x-3">
          <i className="fas fa-ban text-2xl text-red-600" />
          <Link href="/daily/no-pinless" className="block p-4 bg-red-100 rounded-lg shadow-md text-lg text-red-700 hover:bg-red-200">
            No Pinless
          </Link>
        </li>
        <li className="transition-transform transform hover:scale-105 flex items-center space-x-3">
          <i className="fas fa-check-circle text-2xl text-purple-600" />
          <Link href="/daily/tnc" className="block p-4 bg-purple-100 rounded-lg shadow-md text-lg text-purple-700 hover:bg-purple-200">
            TNC
          </Link>
        </li>
        <li className="transition-transform transform hover:scale-105 flex items-center space-x-3">
          <i className="fas fa-search text-2xl text-indigo-600" />
          <Link href="/daily/zoloz" className="block p-4 bg-indigo-100 rounded-lg shadow-md text-lg text-indigo-700 hover:bg-indigo-200">
            Zoloz
          </Link>
        </li>
      </ul>
    </div>
  );
}
