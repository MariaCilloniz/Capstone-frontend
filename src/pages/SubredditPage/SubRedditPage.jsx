import React from 'react'
import './SubRedditPage.scss'
import SubredditAnalyzer from '../../components/SubredditAnalyzer/SubredditAnalyzer'

function SubRedditPage() {
    return (
        <div className='subreddit-page'>
            <div className="subreddit-page__container">
                <h1 className="subreddit-page__title">Subreddit Analyzer</h1>
                <SubredditAnalyzer />
            </div>
        </div>
    )
}

export default SubRedditPage
