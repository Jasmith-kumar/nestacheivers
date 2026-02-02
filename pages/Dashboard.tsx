import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogIn, LogOut, Loader2, Inbox } from 'lucide-react';

const CREDENTIALS_KEY = 'nest_achievers_dashboard_credentials';

function getStoredCredentials(): { username: string; password: string } | null {
  try {
    const raw = sessionStorage.getItem(CREDENTIALS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.username && parsed?.password) return parsed;
  } catch {
    // ignore
  }
  return null;
}

function basicAuthHeader(username: string, password: string): string {
  const credentials = username.trim() + ':' + password;
  return 'Basic ' + btoa(credentials);
}

type FormSubmissionRow = {
  _id: string;
  studentName: string;
  currentClass: string;
  phone: string;
  board: string;
  interestedExam: string;
  message: string;
  createdAt: string;
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const Dashboard: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<{ username: string; password: string } | null>(getStoredCredentials);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [submissions, setSubmissions] = useState<FormSubmissionRow[]>([]);
  const [submissionsLoading, setSubmissionsLoading] = useState(false);
  const [submissionsError, setSubmissionsError] = useState<string | null>(null);

  useEffect(() => {
    if (loggedIn) {
      setSubmissionsLoading(true);
      setSubmissionsError(null);
      fetch('/api/submissions', {
        headers: { Authorization: basicAuthHeader(loggedIn.username, loggedIn.password) },
      })
        .then((res) => {
          if (res.status === 401) {
            sessionStorage.removeItem(CREDENTIALS_KEY);
            setLoggedIn(null);
            return [];
          }
          if (!res.ok) throw new Error('Failed to load submissions');
          return res.json();
        })
        .then((data) => {
          setSubmissions(Array.isArray(data) ? data : []);
        })
        .catch(() => setSubmissionsError('Couldn’t load submissions. Try again.'))
        .finally(() => setSubmissionsLoading(false));
    }
  }, [loggedIn]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);
    try {
      const res = await fetch('/api/submissions', {
        headers: { Authorization: basicAuthHeader(username, password) },
      });
      if (res.status === 401) {
        setLoginError('Invalid username or password.');
        setLoginLoading(false);
        return;
      }
      if (!res.ok) {
        setLoginError('Something went wrong. Try again.');
        setLoginLoading(false);
        return;
      }
      const creds = { username: username.trim(), password };
      sessionStorage.setItem(CREDENTIALS_KEY, JSON.stringify(creds));
      setLoggedIn(creds);
      setUsername('');
      setPassword('');
    } catch {
      setLoginError('Couldn’t connect. Make sure you ran npm run dev.');
    }
    setLoginLoading(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(CREDENTIALS_KEY);
    setLoggedIn(null);
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' });
    } catch {
      return dateStr;
    }
  };

  if (loggedIn === null) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center pt-5 pb-16 px-8 sm:px-16">
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion() ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion() ? 0 : 0.3 }}
          className="w-full max-w-md"
        >
          <section
            className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-8 sm:p-10"
            aria-labelledby="dashboard-login-heading"
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="p-2 rounded-xl bg-primary/10 text-primary" aria-hidden>
                <Inbox size={32} strokeWidth={2} />
              </div>
              <h1 id="dashboard-login-heading" className="text-2xl sm:text-3xl font-black text-gray-900">
                Dashboard
              </h1>
            </div>
            <p className="text-gray-700 text-center text-base mb-8">
              Sign in to view contact form submissions.
            </p>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="dashboard-username" className="block text-sm font-bold text-gray-800 mb-2">
                  Username
                </label>
                <input
                  id="dashboard-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                  className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none font-medium placeholder:text-gray-400"
                  placeholder="Enter username"
                />
              </div>
              <div>
                <label htmlFor="dashboard-password" className="block text-sm font-bold text-gray-800 mb-2">
                  Password
                </label>
                <input
                  id="dashboard-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none font-medium placeholder:text-gray-400"
                  placeholder="Enter password"
                />
              </div>
              {loginError && (
                <p className="text-red-700 text-sm font-bold py-2 px-3 bg-red-50 border border-red-200 rounded-lg" role="alert">
                  {loginError}
                </p>
              )}
              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-4 rounded-xl bg-primary text-white text-base font-bold flex items-center justify-center gap-2 hover:bg-primary/90 disabled:opacity-70 border-2 border-transparent focus:ring-2 focus:ring-primary focus:ring-offset-2 outline-none"
              >
                {loginLoading ? <Loader2 size={22} className="animate-spin" aria-hidden /> : <LogIn size={22} aria-hidden />}
                Sign in
              </button>
            </form>
          </section>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-5 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8 p-4 bg-white rounded-2xl border-2 border-gray-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10 text-primary" aria-hidden>
              <Inbox size={28} strokeWidth={2} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900">Form Submissions</h1>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 border-gray-300 bg-white text-gray-800 font-bold hover:bg-gray-50 hover:border-gray-400 focus:ring-2 focus:ring-primary focus:ring-offset-2 outline-none transition-colors"
          >
            <LogOut size={20} strokeWidth={2} />
            Log out
          </button>
        </header>

        {submissionsLoading && (
          <div className="flex justify-center py-16 bg-white rounded-2xl border-2 border-gray-200">
            <Loader2 size={48} className="animate-spin text-primary" aria-hidden />
          </div>
        )}

        {submissionsError && (
          <div className="p-4 bg-red-50 border-2 border-red-200 rounded-2xl mb-6" role="alert">
            <p className="text-red-800 font-bold">{submissionsError}</p>
          </div>
        )}

        {!submissionsLoading && !submissionsError && submissions.length === 0 && (
          <section
            className="bg-white rounded-2xl border-2 border-gray-200 p-16 text-center shadow-sm"
            aria-label="No submissions"
          >
            <div className="p-4 rounded-2xl bg-gray-100 inline-block mb-6" aria-hidden>
              <Inbox size={56} className="text-gray-600" strokeWidth={1.5} />
            </div>
            <p className="text-lg font-bold text-gray-800">No submissions yet.</p>
            <p className="text-base text-gray-600 mt-2">Contact form entries will appear here.</p>
          </section>
        )}

        {!submissionsLoading && !submissionsError && submissions.length > 0 && (
          <section className="bg-white rounded-2xl border-2 border-gray-200 shadow-sm overflow-hidden" aria-label="Submissions table">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[640px]">
                <thead>
                  <tr className="bg-gray-200 border-b-2 border-gray-300">
                    <th className="px-4 py-4 text-sm font-black text-gray-800 uppercase tracking-wide">Date</th>
                    <th className="px-4 py-4 text-sm font-black text-gray-800 uppercase tracking-wide">Student</th>
                    <th className="px-4 py-4 text-sm font-black text-gray-800 uppercase tracking-wide">Class</th>
                    <th className="px-4 py-4 text-sm font-black text-gray-800 uppercase tracking-wide">Phone</th>
                    <th className="px-4 py-4 text-sm font-black text-gray-800 uppercase tracking-wide">Board / Exam</th>
                    <th className="px-4 py-4 text-sm font-black text-gray-800 uppercase tracking-wide">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((row) => (
                    <tr key={row._id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">{formatDate(row.createdAt)}</td>
                      <td className="px-4 py-4 text-base font-bold text-gray-900">{row.studentName}</td>
                      <td className="px-4 py-4 text-base font-medium text-gray-800">{row.currentClass}</td>
                      <td className="px-4 py-4 text-base font-medium text-gray-800">
                        <a href={`tel:${row.phone}`} className="text-primary font-bold hover:underline focus:underline focus:outline-none">{row.phone}</a>
                      </td>
                      <td className="px-4 py-4 text-base font-medium text-gray-800">
                        {row.board || row.interestedExam || '—'}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-700 max-w-xs truncate" title={row.message || undefined}>
                        {row.message || '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
