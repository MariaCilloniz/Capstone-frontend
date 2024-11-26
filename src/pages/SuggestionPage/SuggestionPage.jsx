import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitSuggestion } from '../../api/SuggestionApi'
import './SuggestionPage.scss';

function SuggestionPage({ postData, analysisId }) {
    const navigate = useNavigate();

    const [message, setMessage] = useState(null);
    const [formData, setFormData] = useState({
        text: postData?.content || '',
        suggestedScore: '',
        attributeName: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const isScoreValid = () => {
        const score = parseFloat(formData.suggestedScore);
        return !isNaN(score) && score >= 0 && score <= 1;
    };

    const isFormValid = () => {
        if (!formData.text || !formData.suggestedScore || !formData.attributeName) {
            return false;
        }
        if (!isScoreValid()) {
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isFormValid()) {
            setMessage('Please fill in all fields correctly');
            return;
        }

        const suggestionData = {
            text: formData.text,                               
            suggestedScore: parseFloat(formData.suggestedScore), 
            attributeName: formData.attributeName,             
            subredditAnalysisId: parseInt(analysisId)
        };

        try {
            await submitSuggestion(suggestionData);
            setMessage('Suggestion submitted successfully!');
            setTimeout(() => navigate(-1), 7000);
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div className="suggestion-page">
            <h2>Disagree with Analysis</h2>
            {postData ? (
                <>

                    <div className="suggestion-page__details">
                        <p>Post Title:{postData.title}</p>
                        <p>Content: {postData.content}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="suggestion-page__form">
                        <label htmlFor="attribute-name">
                            Attribute Name:
                            <input
                                id="attribute-name"
                                name="attributeName"
                                type="text"
                                value={formData.attributeName}
                                onChange={handleChange}
                                placeholder="e.g., TOXICITY"
                            />
                        </label>
                        <label htmlFor="suggested-score">
                            Suggested Score:
                            <input
                                id="suggested-score"
                                name="suggestedScore"
                                type="number"
                                step="0.01"
                                min="0"
                                max="1"
                                value={formData.suggestedScore}
                                onChange={handleChange}
                                placeholder="e.g., 0.8"
                                className={`form__input ${!isScoreValid() && formData.suggestedScore ? 'form__input--invalid' : ''}`}
                            />
                        </label>
                        <label htmlFor="text-content">
                            Text:
                            <textarea
                                id="text-content"
                                name="text"
                                value={formData.text}
                                onChange={handleChange}
                                placeholder="Provide text for re-analysis"
                                required
                            />
                        </label>
                        <button type="submit" className="submit-button" >Submit Appeal</button>
                    </form>
                </>
            ) : (
                <p>No post data available.</p>
            )}

            {message && (
                <p className={`suggestion-page__message ${message.includes('Error') ? 'error' : 'success'}`}>
                    {message}
                </p>
            )}

            <button type="button" onClick={() => navigate(-1)}>Go Back</button>
        </div>
    );
}

export default SuggestionPage;