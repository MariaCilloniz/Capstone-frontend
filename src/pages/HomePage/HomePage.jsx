import React from 'react';
import './HomePage.scss';
import TransparentLogo from "../../assets/Icons/52053.png"
import RedditImage from "../../assets/Images/RedditImage.png"

function HomePage() {
    return (
        <div className="homepage">
            <div className="homepage__hero">
                <h1>Curious about how toxic your favorite subreddit might be? </h1>
                <p>
                🚀 Click here to find out with our Reddit Content Audit Tool, powered by the Perspective API! 🚀
                </p>
                <button className="homepage__hero-button">Get Started</button>
                <img
                    src={RedditImage}
                    alt="Reddit Logo"
                    className="homepage__hero-image"
                />
            </div>

            <div className="homepage__cards">
                <div className="homepage__card homepage__card--1">
                    <h2>Disagree with the scores? <br />
                    Share your feedback and help refine the analysis.</h2>
                    <span className="homepage__card-icon">
                        <img src={TransparentLogo} alt="Heart Icon" />
                    </span>
                </div>
                <div className="homepage__card homepage__card--2">
                    <h2>Focus on metrics that matter to you! 
                    <br />
                    Look for toxicity, hate speech, threat or profanity.</h2>
                    <span className="homepage__card-icon">
                        <img src={TransparentLogo}  alt="Heart Icon" />
                    </span>
                </div>
                <div className="homepage__card homepage__card--3">
                    <h2>Analyze content impact thoroughly to encourage safer and more inclusive online communities.</h2>
                    <span className="homepage__card-icon">
                        <img src={TransparentLogo}  alt="Heart Icon" />
                    </span>
                </div>
            </div>
        </div>
    );
}
export default HomePage
