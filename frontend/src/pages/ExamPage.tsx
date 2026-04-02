import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ThemeToggle } from '../components/ThemeToggle';

const EXAM_NAMES: Record<string, string> = {
  'clf-c02': 'AWS Certified Cloud Practitioner',
  'aif-c01': 'AWS Certified AI Practitioner',
  'saa-c03': 'AWS Certified Solutions Architect – Associate',
};

export default function ExamPage() {
  const { examCode } = useParams<{ examCode: string }>();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const examName = examCode ? EXAM_NAMES[examCode] : undefined;

  if (!examName) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogout = async () => {
    await logout();
    void navigate('/login');
  };

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
          <button onClick={() => void handleLogout()} className="btn-secondary">
            Sign out
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Back link */}
        <button
          onClick={() => void navigate('/dashboard')}
          className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400
                     hover:text-gray-900 dark:hover:text-white transition-colors mb-6"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
          </svg>
          Back to dashboard
        </button>

        {/* Exam header card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 sm:p-10">
          <div className="flex items-center gap-4">
            <div className="shrink-0 w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.7 5.25 1.855V4.533ZM12.75 20.605A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.072Z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-0.5">
                {examCode?.toUpperCase()}
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                {examName}
              </h1>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
