import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SubredditAnalyzer.scss'
import { getSubredditAnalysis } from '../../api/SubredditAnalyzerApi'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function SubredditAnalyzer(props) {
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState('');
    const [analysisData, setAnalysisData] = useState(null);
    const [error, setError] = useState(null);

    const handleChangeInputValue = (event) => {
        setInputValue(event.target.value);
    };

    const isFormValid = () => {
        return inputValue.trim() !== '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isFormValid()) {
            setError('Please enter a subreddit name');
            return;
        }

        try {
            setError(null);
            setAnalysisData(null);
            const data = await getSubredditAnalysis(inputValue);
            setAnalysisData(data);
        } catch (err) {
            setError(err.message || 'An error occurred while fetching data.');
        }
    };

    const handleDisagree = (post) => {
        const analysisId = post.analysisId || post.analysis_id;

        props.setSelectedPost({
            postData: post,
            analysisId: analysisId
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

            {error && (
                <p className={`subreddit-analyzer__error ${error.includes('Error') ? 'error' : 'warning'}`}>
                    {error}
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
                                                options={{ responsive: true }}
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
