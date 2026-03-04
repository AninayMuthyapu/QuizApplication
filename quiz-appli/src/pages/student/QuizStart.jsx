import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import quizService from '../../services/quizService';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function QuizStart() {
    const { quizId } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await quizService.getQuizById(quizId);
                setQuiz(data.quiz || data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [quizId]);

    const handleStart = () => {
        navigate(`/student/quiz/${quizId}/take`);
    };

    if (loading) return <LoadingSpinner />;
    if (!quiz) return <p className="text-center py-5 text-danger">Quiz not found.</p>;

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-7">
                    <div className="card shadow border-0">
                        <div className="card-body p-4 p-md-5 text-center">
                            <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                                style={{ width: 70, height: 70 }}>
                                <i className="bi bi-journal-text fs-2 text-primary"></i>
                            </div>

                            <h2 className="fw-bold">{quiz.title}</h2>
                            <p className="text-muted">{quiz.description}</p>

                            <div className="d-flex justify-content-center gap-4 my-4">
                                <div>
                                    <h5 className="fw-bold mb-0">{quiz.totalQuestions || '—'}</h5>
                                    <small className="text-muted">Questions</small>
                                </div>
                                <div className="border-start"></div>
                                <div>
                                    <h5 className="fw-bold mb-0">{quiz.duration || '—'} min</h5>
                                    <small className="text-muted">Duration</small>
                                </div>
                                <div className="border-start"></div>
                                <div>
                                    <h5 className="fw-bold mb-0 text-capitalize">{quiz.difficulty || 'N/A'}</h5>
                                    <small className="text-muted">Difficulty</small>
                                </div>
                            </div>

                            <div className="alert alert-info text-start small">
                                <i className="bi bi-info-circle me-1"></i>
                                <strong>Instructions:</strong>
                                <ul className="mb-0 mt-1">
                                    <li>Once started, the timer cannot be paused.</li>
                                    <li>Ensure a stable internet connection.</li>
                                    <li>Do not switch tabs — proctoring is active.</li>
                                </ul>
                            </div>

                            <button className="btn btn-primary btn-lg px-5 mt-2" onClick={handleStart}>
                                <i className="bi bi-play-fill me-2"></i>Start Quiz
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
