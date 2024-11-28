import React, { useState } from 'react';
import { analyzeText } from '../../api/TextAnalyzerApi';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './TextAnalyzer.scss'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TextAnalyzer = () => {
    const [inputValue, setInputValue] = useState('');
    const [chartData, setChartData] = useState(null);
    const [message, setMessage] = useState({ text: null, type: null });

    const handleChangeInputValue = (event) => {
        setInputValue(event.target.value);
    };

    const isFormValid = () => {
        if (!inputValue.trim()) {
            setMessage({
                text: 'Please enter some text or post to analyze',
                type: 'warning'
            });
            return false;
        }
        const hasLetter = inputValue.split('').some(char =>
            (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')
        );

        if (!hasLetter) {
            setMessage({
                text: 'Please enter some actual text to analyze',
                type: 'warning'
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

        try {
            setMessage({ text: null, type: null });
            const response = await analyzeText(inputValue);

            const {
                toxicity,
                severe_toxicity,
                identity_attack,
                insult,
                threat,
                profanity,
            } = response.scores;

            setChartData({
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
                        data: [
                            toxicity,
                            severe_toxicity,
                            identity_attack,
                            insult,
                            threat,
                            profanity,
                        ],
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
            });
            setMessage({
                text: 'Text analyzed successfully!',
                type: 'success'
            });
        } catch (err) {
            setMessage({
                text: 'Failed to analyze text. Please try again.',
                type: 'error'
            });
        }
    };
    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
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
            },
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
                text: 'Text/Post Analysis',
                font: {
                family: "'Nunito Sans', sans-serif",
                size:  20
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
        <div className="text-analyzer">
            <form className="text-analyzer__form" onSubmit={handleSubmit}>
                <textarea
                    className="text-analyzer__textarea"
                    name="text-input"
                    id="text-analysis-input"
                    value={inputValue}
                    onChange={handleChangeInputValue}
                    placeholder="Enter text to analyze"
                />
                <button type="submit" className="text-analyzer__button">Analyze</button>
            </form>
            {message.text && (
                <p className={`text-analyzer__message ${message.type}`}>
                    {message.text}
                </p>
            )}

            {chartData && (
                <div className="text-analyzer__scale">
                    <div className="text-analyzer__scale-bar"></div>
                    <div className="text-analyzer__scale-labels">
                        <span>0</span>
                        <span>1</span>
                    </div>
                    <div className="text-analyzer__scale-descriptions">
                        <span>No predicted probability</span>
                        <span>Highest predicted probability</span>
                    </div>
                </div>
            )}
            {chartData && <Bar data={chartData} options={options} />}
        </div>
    );
};

export default TextAnalyzer;