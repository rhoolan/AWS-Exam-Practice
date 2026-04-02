import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ThemeToggle } from '../components/ThemeToggle';

const EXAMS = [
  { name: 'Cloud Practitioner',   code: 'clf-c02' },
  { name: 'AI Practitioner',      code: 'aif-c01' },
  { name: 'Solutions Architect',  code: 'saa-c03' },
] as const;

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    void navigate('/login');
  };

  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <ThemeToggle />

      {/* Top nav */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
              </svg>
            </div>
            <span className="font-semibold text-gray-900 dark:text-white text-sm">AWS Exam Prep</span>
          </div>
          <button
            onClick={() => void handleLogout()}
            className="btn-secondary"
          >
            Sign out
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Greeting card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 sm:p-10">
          <div className="flex items-start gap-4 sm:gap-6">
            {/* Avatar */}
            <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xl sm:text-2xl font-bold select-none">
              {user?.display_name?.[0]?.toUpperCase() ?? '?'}
            </div>

            {/* Text */}
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">
                Welcome back
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                Hello, {user?.display_name}!
              </h1>
              {memberSince !== null && (
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Member since {memberSince}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Exam cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {EXAMS.map((exam) => (
            <button
              key={exam.code}
              onClick={() => void navigate(`/exam/${exam.code}`)}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-6
                         hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-sm
                         transition-all duration-200 cursor-pointer group text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-4 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.7 5.25 1.855V4.533ZM12.75 20.605A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.072Z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{exam.name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{exam.code.toUpperCase()}</p>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
