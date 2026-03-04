import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useQuiz } from '../../context/QuizContext';
import QuizCard from '../../components/QuizCard';
import RadarChart from '../../components/RadarChart';
import LineChart from '../../components/LineChart';
import LoadingSpinner from '../../components/LoadingSpinner';

/* ── Mock data (replace with real API data) ─────────────── */
const MOCK_UPCOMING = [
    { _id: 'q1', title: 'Data Structures — Mid Sem', subject: 'DSA', date: '2026-03-10', duration: 45, difficulty: 'medium', totalQuestions: 30, description: 'Covers arrays, linked lists, trees, and graphs.' },
    { _id: 'q2', title: 'Operating Systems Quiz 3', subject: 'OS', date: '2026-03-12', duration: 30, difficulty: 'hard', totalQuestions: 20, description: 'Process scheduling, memory management, deadlocks.' },
    { _id: 'q3', title: 'DBMS—Normalization', subject: 'DBMS', date: '2026-03-15', duration: 25, difficulty: 'easy', totalQuestions: 15, description: '1NF through BCNF, functional dependencies.' },
];

const MOCK_RESULTS = [
    { quiz: 'Data Structures Quiz 2', score: 82, total: 100, passed: true, time: '18 min' },
    { quiz: 'Computer Networks Test', score: 45, total: 100, passed: false, time: '25 min' },
    { quiz: 'OOP Concepts', score: 91, total: 100, passed: true, time: '12 min' },
    { quiz: 'DBMS Joins & Queries', score: 67, total: 100, passed: true, time: '22 min' },
    { quiz: 'Operating Systems Quiz 2', score: 38, total: 100, passed: false, time: '28 min' },
];

const RADAR_DATA = {
    labels: ['DSA', 'DBMS', 'OS', 'Networks', 'OOP', 'Math'],
    scores: [78, 65, 52, 45, 91, 70],
};

const LINE_DATA = {
    labels: ['Quiz 1', 'Quiz 2', 'Quiz 3', 'Quiz 4', 'Quiz 5', 'Quiz 6', 'Quiz 7'],
    scores: [55, 62, 58, 71, 75, 82, 78],
};

export default function StudentDashboard() {
    const { user } = useAuth();
    const { quizzes, loadQuizzes, loading } = useQuiz();

    useEffect(() => {
        loadQuizzes();
    }, [loadQuizzes]);

    if (loading) return <LoadingSpinner />;

    // Use real quizzes if available, else fallback to mock
    const upcomingQuizzes = quizzes.length > 0 ? quizzes.slice(0, 3) : MOCK_UPCOMING;

    return (
        <div className="container-fluid py-4 px-3 px-lg-4">

            {/* ═══════════════════════════════════════════════════
          1. WELCOME CARD
         ═══════════════════════════════════════════════════ */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="card border-0 shadow-sm overflow-hidden">
                        <div className="card-body p-0">
                            <div className="row g-0">
                                {/* Left - gradient welcome */}
                                <div className="col-lg-8">
                                    <div className="p-4 p-lg-5"
                                        style={{
                                            background: 'linear-gradient(135deg, #0d6efd 0%, #6610f2 100%)',
                                            color: '#fff',
                                            minHeight: 200,
                                        }}>
                                        <div className="d-flex align-items-start gap-3">
                                            <div className="bg-white bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                                                style={{ width: 64, height: 64 }}>
                                                <span className="fs-2 fw-bold">{(user?.name || 'S')[0].toUpperCase()}</span>
                                            </div>
                                            <div>
                                                <h2 className="fw-bold mb-1">Welcome back, {user?.name || 'Student'}! 👋</h2>
                                                <p className="mb-0 opacity-75">Keep going — consistency is the key to mastery.</p>
                                            </div>
                                        </div>

                                        {/* Stats row inside welcome */}
                                        <div className="row g-3 mt-4">
                                            {[
                                                { icon: 'bi-person-badge', label: 'Enrollment ID', value: user?._id?.slice(-6).toUpperCase() || 'STU-002' },
                                                { icon: 'bi-trophy', label: 'Average Score', value: '76%' },
                                                { icon: 'bi-journal-check', label: 'Quizzes Taken', value: '14' },
                                                { icon: 'bi-star-fill', label: 'Best Score', value: '95%' },
                                            ].map((stat, i) => (
                                                <div className="col-6 col-md-3" key={i}>
                                                    <div className="bg-white bg-opacity-10 rounded-3 p-3 text-center">
                                                        <i className={`bi ${stat.icon} fs-4`}></i>
                                                        <h5 className="fw-bold mt-1 mb-0">{stat.value}</h5>
                                                        <small className="opacity-75" style={{ fontSize: '0.75rem' }}>{stat.label}</small>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Right - quick actions */}
                                <div className="col-lg-4 d-flex">
                                    <div className="p-4 d-flex flex-column justify-content-center gap-3 w-100 bg-white">
                                        <h6 className="fw-semibold text-muted mb-0">
                                            <i className="bi bi-lightning-charge-fill text-warning me-1"></i>Quick Actions
                                        </h6>
                                        <Link to="/student/quizzes" className="btn btn-primary d-flex align-items-center gap-2">
                                            <i className="bi bi-play-circle-fill"></i> Browse Quizzes
                                        </Link>
                                        <Link to="/student/history" className="btn btn-outline-secondary d-flex align-items-center gap-2">
                                            <i className="bi bi-clock-history"></i> View History
                                        </Link>
                                        <Link to="/student/profile" className="btn btn-outline-info d-flex align-items-center gap-2">
                                            <i className="bi bi-person-gear"></i> Edit Profile
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════
          2. UPCOMING QUIZZES
         ═══════════════════════════════════════════════════ */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0">
                    <i className="bi bi-calendar-event me-2 text-primary"></i>Upcoming Quizzes
                </h5>
                <Link to="/student/quizzes" className="btn btn-sm btn-outline-primary">View All</Link>
            </div>

            <div className="row g-3 mb-4">
                {upcomingQuizzes.map((quiz) => (
                    <div className="col-md-6 col-xl-4" key={quiz._id}>
                        <QuizCard quiz={quiz} />
                    </div>
                ))}
            </div>

            {/* ═══════════════════════════════════════════════════
          3. RECENT RESULTS
         ═══════════════════════════════════════════════════ */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-transparent d-flex justify-content-between align-items-center pt-3">
                            <h5 className="fw-bold mb-0">
                                <i className="bi bi-clipboard-data me-2 text-primary"></i>Recent Results
                            </h5>
                            <Link to="/student/history" className="btn btn-sm btn-outline-primary">Full History</Link>
                        </div>
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th className="ps-4">Quiz Name</th>
                                            <th>Score</th>
                                            <th>Result</th>
                                            <th>Time Taken</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {MOCK_RESULTS.map((r, i) => (
                                            <tr key={i}>
                                                <td className="ps-4 fw-semibold">{r.quiz}</td>
                                                <td>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <div className="progress flex-grow-1" style={{ height: 7, width: 80 }}>
                                                            <div
                                                                className={`progress-bar bg-${r.score >= 50 ? 'success' : 'danger'}`}
                                                                style={{ width: `${r.score}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="small fw-semibold">{r.score}%</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className={`badge bg-${r.passed ? 'success' : 'danger'} bg-opacity-10 text-${r.passed ? 'success' : 'danger'} px-3 py-1`}>
                                                        <i className={`bi ${r.passed ? 'bi-check-circle-fill' : 'bi-x-circle-fill'} me-1`}></i>
                                                        {r.passed ? 'Passed' : 'Failed'}
                                                    </span>
                                                </td>
                                                <td className="text-muted">
                                                    <i className="bi bi-clock me-1"></i>{r.time}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════
          4. PERFORMANCE CHARTS
         ═══════════════════════════════════════════════════ */}
            <div className="row g-4 mb-4">
                <div className="col-lg-6">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">
                            <RadarChart
                                labels={RADAR_DATA.labels}
                                scores={RADAR_DATA.scores}
                                title="Subject-wise Scores"
                            />
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">
                            <LineChart
                                labels={LINE_DATA.labels}
                                scores={LINE_DATA.scores}
                                title="Score Improvement Trend"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════
          5. AI INSIGHT CARD
         ═══════════════════════════════════════════════════ */}
            <div className="row mb-2">
                <div className="col-12">
                    <div className="card border-0 shadow-sm"
                        style={{
                            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                            borderLeft: '4px solid #6610f2',
                        }}>
                        <div className="card-body p-4">
                            <div className="d-flex align-items-start gap-3">
                                <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                                    style={{ width: 50, height: 50 }}>
                                    <i className="bi bi-stars fs-4 text-primary"></i>
                                </div>
                                <div>
                                    <h6 className="fw-bold mb-1">
                                        <i className="bi bi-robot me-1 text-primary"></i>AI Study Insight
                                    </h6>
                                    <p className="mb-2">
                                        Based on your recent performance, your <strong>Computer Networks</strong> and <strong>Operating Systems</strong> scores
                                        are below average. We recommend focusing 30 minutes daily on these subjects.
                                    </p>
                                    <div className="d-flex flex-wrap gap-2 mb-2">
                                        <span className="badge bg-danger bg-opacity-10 text-danger">
                                            <i className="bi bi-arrow-down-circle me-1"></i>Networks — 45%
                                        </span>
                                        <span className="badge bg-warning bg-opacity-10 text-warning">
                                            <i className="bi bi-arrow-down-circle me-1"></i>OS — 52%
                                        </span>
                                        <span className="badge bg-success bg-opacity-10 text-success">
                                            <i className="bi bi-arrow-up-circle me-1"></i>OOP — 91% (Strong)
                                        </span>
                                    </div>
                                    <small className="text-muted">
                                        <i className="bi bi-lightbulb me-1"></i>
                                        <strong>Tip:</strong> Try practice quizzes on weak topics to build confidence before your upcoming mid-sem on March 10.
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
