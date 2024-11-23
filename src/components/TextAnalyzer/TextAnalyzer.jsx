import React, { useState } from 'react';
import { analyzeText } from '../../api/TextAnalyzerApi';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TextAnalyzer = () => {
    const [text, setText] = useState('');
    const [chartData, setChartData] = useState(null);
    const [error, setError] = useState(null);

    const handleAnalyze = async () => {
        try {
            setError(null); 

            const response = await analyzeText(text);

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
                        label: 'Text Analysis Scores',
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
                text: 'Text Analysis Scores (0 to 1)',
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
        <div>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to analyze"
            />
            <button onClick={handleAnalyze}>Analyze</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {chartData && <Bar data={chartData} />}
        </div>
    );
};

export default TextAnalyzer;