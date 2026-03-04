import { Link } from 'react-router-dom';
import PerformanceChart from '../../components/PerformanceChart';
import LineChart from '../../components/LineChart';

/* ── Mock live activity feed ─────────────────────────────── */
const ACTIVITY = [
    { id: 1, icon: 'bi-play-circle-fill', color: 'primary', text: 'Ravi started "DSA Mid Sem"', time: '2 min ago' },
    { id: 2, icon: 'bi-check-circle-fill', color: 'success', text: 'Priya submitted "DBMS Quiz 3"', time: '5 min ago' },
    { id: 3, icon: 'bi-exclamation-triangle-fill', color: 'danger', text: 'Tab-switch detected – Ankit (OS Quiz)', time: '8 min ago' },
    { id: 4, icon: 'bi-person-plus-fill', color: 'info', text: 'New student enrolled: Sneha M.', time: '12 min ago' },
    { id: 5, icon: 'bi-check-circle-fill', color: 'success', text: 'Karan submitted "Networks Test"', time: '14 min ago' },
    { id: 6, icon: 'bi-play-circle-fill', color: 'primary', text: 'Meera started "OOP Concepts"', time: '18 min ago' },
];

export default function AdminOverview() {
    return (
        <div className="container-fluid py-4 px-3 px-lg-4">
            {/* ── Header ───────────────────────────────────────── */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h3 className="fw-bold mb-0">Admin Dashboard</h3>
                    <p className="text-muted mb-0 small">Welcome back — here's what's happening today</p>
                </div>
                <Link to="/admin/quizzes/create" className="btn btn-primary">
                    <i className="bi bi-plus-lg me-1"></i>Create Quiz
                </Link>
            </div>

            {/* ═══════════════════════════════════════════════════
          STATS CARDS
         ═══════════════════════════════════════════════════ */}
            <div className="row g-3 mb-4">
                {[
                    { label: 'Total Quizzes', value: 24, icon: 'bi-journal-text', color: 'primary', change: '+3 this week' },
                    { label: 'Active Quizzes', value: 8, icon: 'bi-broadcast', color: 'success', change: '5 live now' },
                    { label: 'Total Students', value: 186, icon: 'bi-people-fill', color: 'info', change: '+12 this month' },
                    { label: 'Submissions Today', value: 47, icon: 'bi-send-check-fill', color: 'warning', change: '↑ 18% vs yesterday' },
                ].map((stat, i) => (
                    <div className="col-6 col-xl-3" key={i}>
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <p className="text-muted small mb-1">{stat.label}</p>
                                        <h2 className="fw-bold mb-0">{stat.value}</h2>
                                        <small className={`text-${stat.color}`}>
                                            <i className="bi bi-arrow-up-short"></i>{stat.change}
                                        </small>
                                    </div>
                                    <div className={`bg-${stat.color} bg-opacity-10 rounded-3 d-flex align-items-center justify-content-center`}
                                        style={{ width: 50, height: 50 }}>
                                        <i className={`bi ${stat.icon} fs-4 text-${stat.color}`}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ═══════════════════════════════════════════════════
          CHARTS ROW
         ═══════════════════════════════════════════════════ */}
            <div className="row g-4 mb-4">
                <div className="col-lg-6">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">
                            <PerformanceChart
                                labels={['DSA', 'DBMS', 'OS', 'Networks', 'OOP', 'Maths']}
                                scores={[74, 68, 81, 59, 77, 83]}
                                title="Quiz Performance Trend (Avg Scores)"
                            />
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">
                            <LineChart
                                labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
                                scores={[35, 48, 62, 55, 78, 85, 72]}
                                title="Student Participation (This Week)"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════
          ACTIVITY FEED + QUICK ACTIONS
         ═══════════════════════════════════════════════════ */}
            <div className="row g-4">
                {/* Live activity */}
                <div className="col-lg-7">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
                            <h6 className="fw-bold mb-0">
                                <i className="bi bi-broadcast me-2 text-danger"></i>Live Student Activity
                            </h6>
                            <span className="badge bg-danger bg-opacity-10 text-danger">
                                <i className="bi bi-circle-fill me-1" style={{ fontSize: '0.5rem' }}></i>Live
                            </span>
                        </div>
                        <div className="card-body p-0" style={{ maxHeight: 360, overflowY: 'auto' }}>
                            <ul className="list-group list-group-flush">
                                {ACTIVITY.map((a) => (
                                    <li key={a.id} className="list-group-item d-flex align-items-start gap-3 py-3 px-4">
                                        <div className={`bg-${a.color} bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0`}
                                            style={{ width: 36, height: 36 }}>
                                            <i className={`bi ${a.icon} text-${a.color}`}></i>
                                        </div>
                                        <div className="flex-grow-1">
                                            <p className="mb-0 small fw-medium">{a.text}</p>
                                            <small className="text-muted">{a.time}</small>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Quick actions */}
                <div className="col-lg-5">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-header bg-white py-3">
                            <h6 className="fw-bold mb-0">
                                <i className="bi bi-lightning-charge-fill text-warning me-2"></i>Quick Actions
                            </h6>
                        </div>
                        <div className="card-body d-flex flex-column gap-3">
                            <Link to="/admin/quizzes/create" className="btn btn-primary d-flex align-items-center gap-2 py-3 rounded-3">
                                <div className="bg-white bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center"
                                    style={{ width: 40, height: 40 }}>
                                    <i className="bi bi-plus-circle-fill fs-5"></i>
                                </div>
                                <div className="text-start">
                                    <div className="fw-semibold">Create New Quiz</div>
                                    <small className="opacity-75">Set up questions and publish</small>
                                </div>
                                <i className="bi bi-chevron-right ms-auto"></i>
                            </Link>

                            <Link to="/admin/results" className="btn btn-outline-success d-flex align-items-center gap-2 py-3 rounded-3">
                                <div className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center"
                                    style={{ width: 40, height: 40 }}>
                                    <i className="bi bi-bar-chart-fill fs-5 text-success"></i>
                                </div>
                                <div className="text-start">
                                    <div className="fw-semibold">View Results</div>
                                    <small className="text-muted">Student scores and analytics</small>
                                </div>
                                <i className="bi bi-chevron-right ms-auto"></i>
                            </Link>

                            <Link to="/admin/students" className="btn btn-outline-info d-flex align-items-center gap-2 py-3 rounded-3">
                                <div className="bg-info bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center"
                                    style={{ width: 40, height: 40 }}>
                                    <i className="bi bi-people-fill fs-5 text-info"></i>
                                </div>
                                <div className="text-start">
                                    <div className="fw-semibold">Manage Students</div>
                                    <small className="text-muted">View enrolled students</small>
                                </div>
                                <i className="bi bi-chevron-right ms-auto"></i>
                            </Link>

                            <Link to="/admin/proctor" className="btn btn-outline-danger d-flex align-items-center gap-2 py-3 rounded-3">
                                <div className="bg-danger bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center"
                                    style={{ width: 40, height: 40 }}>
                                    <i className="bi bi-shield-check fs-5 text-danger"></i>
                                </div>
                                <div className="text-start">
                                    <div className="fw-semibold">Proctoring Logs</div>
                                    <small className="text-muted">Monitor quiz integrity</small>
                                </div>
                                <i className="bi bi-chevron-right ms-auto"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
