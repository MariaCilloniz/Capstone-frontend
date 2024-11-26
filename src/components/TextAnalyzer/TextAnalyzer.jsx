import React, { useState } from 'react';
import { analyzeText } from '../../api/TextAnalyzerApi';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './TextAnalyzer.scss'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TextAnalyzer = () => {
    const [inputValue, setInputValue] = useState('');
    const [chartData, setChartData] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError(null);

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
                        label: 'Categories',
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
        } catch (err) {
            setError('Failed to analyze text. Please try again.');
        }
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Text Analysis Scores',
            },
        },
        scales: {
            y: {
                min: 0,
                max: 1,
                ticks: {
                    stepSize: 0.1,
                    callback: (value) => value.toFixed(1),
                },
                title: {
                    display: true,
                    text: 'Score (0 to 1)',
                },
            },
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
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter text to analyze"
                />
                <button type="submit" className="text-analyzer__button">Analyze</button>
            </form>
            {error && <p className="text-analyzer__error">{error}</p>}
            {chartData && <Bar data={chartData} options={options} />}
        </div>
    );
};

export default TextAnalyzer;