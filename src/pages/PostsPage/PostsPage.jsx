import React from 'react'
import TextAnalyzer from '../../components/TextAnalyzer/TextAnalyzer'
import './PostsPage.scss'

function PostsPage() {
  return (
    <div className="posts-page">
      <h1 className="posts-page__title">Posts / Text Analyzer</h1>
      <TextAnalyzer/>
    </div>
  )
}

export default PostsPage
