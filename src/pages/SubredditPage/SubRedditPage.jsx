import React from 'react'
import './SubRedditPage.scss'
import SubredditAnalyzer from '../../components/SubredditAnalyzer/SubredditAnalyzer'

function SubRedditPage(props) {
    return (
        <div className='subreddit-page'>
                <h1 className="subreddit-page__title">Subreddit Analyzer</h1>
                <SubredditAnalyzer setSelectedPost={props.setSelectedPost} />
        </div>
    )
}

export default SubRedditPage
