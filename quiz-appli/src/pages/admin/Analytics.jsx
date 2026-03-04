import { useEffect, useState } from 'react';
import quizService from '../../services/quizService';
import PerformanceChart from '../../components/PerformanceChart';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function Analytics() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await quizService.getAnalytics();
                setData(res);
            } catch (err) {
                console.error(err);
                // Fallback sample data if API isn't connected yet
                setData({
                    overview: {
                        totalQuizzes: 24,
                        totalStudents: 186,
                        totalAttempts: 1043,
                        avgScore: 72,
                    },
                    quizScores: {
                        labels: ['DSA', 'DBMS', 'OS', 'Networks', 'OOP'],
                        scores: [74, 68, 81, 59, 77],
                    },
                    monthlyAttempts: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                        scores: [85, 120, 98, 140, 170, 160],
                    },
                });
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (loading) return <LoadingSpinner />;
    if (!data) return null;

    const { overview, quizScores, monthlyAttempts } = data;

    return (
        <div className="container-fluid py-4">
            <h3 className="fw-bold mb-4"><i className="bi bi-graph-up me-2"></i>Analytics</h3>

            {/* Overview cards */}
            <div className="row g-3 mb-4">
                {[
                    { label: 'Total Quizzes', value: overview.totalQuizzes, color: 'primary', icon: 'bi-journal-text' },
                    { label: 'Total Students', value: overview.totalStudents, color: 'success', icon: 'bi-people' },
                    { label: 'Total Attempts', value: overview.totalAttempts, color: 'info', icon: 'bi-pencil-square' },
                    { label: 'Average Score', value: `${overview.avgScore}%`, color: 'warning', icon: 'bi-trophy' },
                ].map((s, i) => (
                    <div className="col-6 col-lg-3" key={i}>
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body text-center">
                                <i className={`bi ${s.icon} fs-2 text-${s.color}`}></i>
                                <h3 className="fw-bold mt-2 mb-0">{s.value}</h3>
                                <small className="text-muted">{s.label}</small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts */}
            <div className="row g-4">
                <div className="col-lg-6">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <PerformanceChart
                                labels={quizScores.labels}
                                scores={quizScores.scores}
                                title="Subject-wise Average Scores"
                            />
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <PerformanceChart
                                labels={monthlyAttempts.labels}
                                scores={monthlyAttempts.scores}
                                title="Monthly Attempts"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
