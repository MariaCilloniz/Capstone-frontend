import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitSuggestion } from '../../api/SuggestionApi'
import './SuggestionPage.scss';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function SuggestionPage({ postData, analysisId, chartData }) {
    const navigate = useNavigate();

    const [message, setMessage] = useState({ text: null, type: null });
    const [formData, setFormData] = useState({
        text: postData?.content || '',
        suggestedScore: '',
        attributeName: ''
    });

    const validAttributes = [
        'TOXICITY',
        'SEVERE_TOXICITY',
        'IDENTITY_ATTACK',
        'INSULT',
        'THREAT',
        'PROFANITY'
    ];

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (message.type === 'error') {
            setMessage({ text: null, type: null });
        }

        if (name === 'suggestedScore' && value !== '') {
            const score = parseFloat(value);
            if (isNaN(score) || score < 0 || score > 1) {
                setMessage({
                    text: 'Score must be between 0 and 1',
                    type: 'error'
                });
            }
        }
    };

    const isScoreValid = () => {
        const score = parseFloat(formData.suggestedScore);
        return !isNaN(score) && score >= 0 && score <= 1;
    };

    const isValidAttribute = (name) => {
        const formattedName = name.trim()
            .toUpperCase()
            .split(' ')
            .filter(word => word !== '')
            .join('_');

        return validAttributes.includes(formattedName);
    };

    const isFormValid = () => {
        if (!formData.text || !formData.suggestedScore || !formData.attributeName) {
            setMessage({
                text: 'Please fill in all fields correctly',
                type: 'error'
            });
            return false;
        }
        if (!isScoreValid()) {
            setMessage({
                text: 'Score must be between 0 and 1',
                type: 'error'
            });
            return false;
        }
        if (!isValidAttribute(formData.attributeName)) {
            setMessage({
                text: 'Please enter a valid attribute name (e.g., TOXICITY, IDENTITY ATTACK)',
                type: 'error'
            });
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isFormValid()) {
            return;
        }

        const formattedAttributeName = formData.attributeName
            .trim()
            .toUpperCase()
            .split(' ')
            .filter(word => word !== '')
            .join('_');

        const suggestionData = {
            text: formData.text,
            suggestedScore: parseFloat(formData.suggestedScore),
            attributeName: formattedAttributeName,
            subredditAnalysisId: parseInt(analysisId)
        };

        try {
            await submitSuggestion(suggestionData);
            setMessage({
                text: 'Suggestion submitted successfully!',
                type: 'success'
            });
            setTimeout(() => navigate(-1), 7000);
        } catch (error) {
            setMessage({
                text: `Error: ${error.message}`,
                type: 'error'
            });
        }
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
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += (context.parsed.y * 100).toFixed(1) + '%';
                        }
                        return label;
                    }
                }
            }
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
        <div className="suggestion-page">
            <h2>Disagree with Analysis?</h2>
            {postData ? (
                <>
                    <div className="suggestion-page__details">
                        <p><strong>Post Title: </strong>{postData.title}</p>
                        <p><strong>Content: </strong>{postData.content}</p>
                        {chartData && (
                            <div className="suggestion-page__chart">
                                <h3>Current Analysis Scores:</h3>
                                <Bar
                                    data={chartData}
                                    options={options}
                                />
                            </div>
                        )}
                    </div>
                    <form onSubmit={handleSubmit} className="suggestion-page__form">
                        <label htmlFor="attribute-name">
                            Attribute Name:
                            <select
                                id="attribute-name"
                                name="attributeName"
                                value={formData.attributeName}
                                onChange={handleChange}
                            >
                                <option value="">Select attribute</option>
                                {validAttributes.map((attribute) => (
                                    <option key={attribute} value={attribute}>
                                        {attribute.split('_').join(' ')}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label htmlFor="suggested-score">
                            Suggested Score:
                            <input
                                id="suggested-score"
                                name="suggestedScore"
                                type="number"
                                step="0.01"
                                value={formData.suggestedScore}
                                onChange={handleChange}
                                placeholder="e.g., 0.8"
                                className={`form__input ${!isScoreValid() && formData.suggestedScore ? 'form__input--invalid' : ''}`}
                            />
                        </label>
                        <button type="submit" className="submit-button" >Submit</button>
                    </form>
                </>
            ) : (
                <p>No post data available.</p>
            )}
            {message.text && (
                <p className={`suggestion-page__message ${message.type}`}>
                    {message.text}
                </p>
            )}
            <button type="button" onClick={() => navigate('/subreddit')}>Go Back</button>
        </div>
    );
}

export default SuggestionPage;