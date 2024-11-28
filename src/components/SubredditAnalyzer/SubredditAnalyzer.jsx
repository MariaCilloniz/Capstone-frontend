import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './SubredditAnalyzer.scss'
import { getSubredditAnalysis } from '../../api/SubredditAnalyzerApi'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function SubredditAnalyzer(props) {
    const navigate = useNavigate();
    const { subredditName } = useParams();

    const [inputValue, setInputValue] = useState('');
    const [analysisData, setAnalysisData] = useState(null);
    const [message, setMessage] = useState({ text: null, type: null });

    const handleChangeInputValue = (event) => {
        setInputValue(event.target.value);
    };

    const isFormValid = () => {
        const trimmedValue = inputValue ? inputValue.trim() : '';

        if (!trimmedValue) {
            setMessage({
                text: 'Please enter a subreddit name',
                type: 'warning'
            });
            return false;
        }

        const hasLetter = trimmedValue.split('').some((char) =>
            (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')
        );

        if (!hasLetter) {
            setMessage({
                text: 'Please enter a valid subreddit name.',
                type: 'warning'
            });
            return false;
        }

        setMessage(null);
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isFormValid()) {
            return;
        }

        const trimmedValue = inputValue.trim();
        try {
            setMessage({ text: 'Analyzing subreddit...', type: 'info' });
            const data = await getSubredditAnalysis(trimmedValue);
            setAnalysisData(data);
            setMessage({
                text: `Analysis for r/${trimmedValue} completed successfully!`,
                type: 'success'
            });
            setInputValue('');
        } catch (err) {
            setMessage({
                text: 'Failed to analyze subreddit. Please try again.',
                type: 'error'
            });
        }
    };

    useEffect(() => {
        subredditName && (() => {
            setInputValue(subredditName);
            handleSubmit({ preventDefault: () => {} });
        })();
    }, [subredditName]);

    const handleDisagree = (post) => {
        const analysisId = post.analysisId || post.analysis_id;

        const chartData = post.analysis && post.analysis.attributeScores
            ? createChartData(post.analysis.attributeScores)
            : null;

        props.setSelectedPost({
            postData: post,
            analysisId: analysisId,
            chartData: chartData
        });

        navigate('/suggestion')
    };

    const createChartData = (scores) => {
        return {
            labels: [
                'Toxicity',
                'Severe Toxicity',
                'Identity Attack',
                'Insult',
                'Threat',
                'Profanity',
            ],
            datasets: [
                {
                    label: 'Category Scores',
                    data: Object.values(scores).map((score) => score.summaryScore.value),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        };
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        family: "'Nunito Sans', sans-serif"
                    }
                }
            },
            title: {
                display: true,
                text: 'Category Scores',
                font: {
                    family: "'Nunito Sans', sans-serif"
                }
            },
        },
        scales: {
            y: {
                min: 0,
                max: 1,
                ticks: {
                    stepSize: 0.1,
                    callback: (value) => value.toFixed(1),
                    font: {
                        family: "'Nunito Sans', sans-serif"
                    }
                },
                title: {
                    display: true,
                    text: 'Score',
                    font: {
                        family: "'Nunito Sans', sans-serif"
                    }
                },
            },
            x: {
                ticks: {
                    font: {
                        family: "'Nunito Sans', sans-serif"
                    }
                }
            }
        },
    };



    return (
        <div className="subreddit-analyzer">
            <form className="subreddit-analyzer__form" onSubmit={handleSubmit}>
                <input
                    className="subreddit-analyzer__input"
                    type="text"
                    name="subreddit"
                    id="subreddit-input"
                    value={inputValue}
                    onChange={handleChangeInputValue}
                    placeholder="Enter a subreddit"
                />
                <button
                    type="submit"
                    className="subreddit-analyzer__button">
                    Analyze
                </button>
            </form>

            {message.text && (
                <p className={`subreddit-analyzer__message ${message.type}`}>
                    {message.text}
                </p>
            )}

            {analysisData && (
                <div className="subreddit-analyzer__results">
                    <div className='subreddit-analyzer__info'>
                        <h2 className="subreddit-analyzer__results-title">
                            Analysis for r/{analysisData.subreddit}
                        </h2>
                        <p className="subreddit-analyzer__results-count">
                            Posts Counted: {analysisData.post_count}
                        </p>
                    </div>
                    <div className="subreddit-analyzer__scale">
                        <div className="subreddit-analyzer__scale-bar"></div>
                        <div className="subreddit-analyzer__scale-labels">
                            <span>0</span>
                            <span>1</span>
                        </div>
                        <div className="subreddit-analyzer__scale-descriptions">
                            <span>No predicted probability </span>
                            <span>Highest predicted probability</span>
                        </div>
                    </div>
                    <div className="subreddit-analyzer__posts">
                        {analysisData.analyzed_posts.map((post) => (
                            <div key={post.id} className="subreddit-analyzer__post">
                                <h4 className="subreddit-analyzer__post-title"> Title: {post.title}</h4>
                                <p className="subreddit-analyzer__post-author">User: {post.author}</p>
                                {post.content ? (
                                    <p className="subreddit-analyzer__post-content">Content: {post.content}</p>
                                ) : (
                                    <p className="subreddit-analyzer__post-content subreddit-analyzer__post-content--empty">
                                        This post has no content, only the title to analyze.
                                    </p>
                                )}
                                {post.analysis && post.analysis.attributeScores ? (
                                    <div>
                                        <div className="subreddit-analyzer__post-chart">
                                            <Bar
                                                data={createChartData(post.analysis.attributeScores)}
                                                options={options}
                                            />
                                        </div>
                                        <div className="subreddit-analyzer__button-container">
                                            <button type="button" className="subreddit-analyzer__button--disagree"
                                                onClick={() => handleDisagree(post)}
                                            >
                                                Disagree?
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="subreddit-analyzer__post-no-data">
                                        No analysis data available for this post.
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SubredditAnalyzer;
