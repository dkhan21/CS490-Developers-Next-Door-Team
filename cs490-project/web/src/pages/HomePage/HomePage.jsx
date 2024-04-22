import React from 'react'
import { useEffect } from 'react'

import { useApolloClient } from '@apollo/client' // Import useApolloClient hook

import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { QUERY as FEEDBACKS_QUERY } from 'src/components/FeedbacksCell'
import { GET_USER_HISTORY_QUERY as HistoryQuery } from 'src/components/History/HistoryForm'
import Navbar from 'src/components/Navbar/Navbar'

const HomePage = () => {
  const client = useApolloClient() // Initialize Apollo Client

  // Prefetch feedback data when hovering over the "Get Started" button
  const prefetchFeedbackData = () => {
    client
      .query({
        query: FEEDBACKS_QUERY,
      })
      .catch((error) => {
        console.error('Error prefetching feedback data:', error)
      })

    client
      .query({
        query: HistoryQuery,
      })
      .catch((error) => {
        console.error('Error prefetching history data:', error)
      })
  }

  prefetchFeedbackData()

  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const element = document.querySelector(hash)
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: 'smooth',
        })
      }
    }
  }, [window.location.hash])

  return (
    <>
      <Metadata title="Code Harbor" description="Home page" />
      <header>
        <Navbar />
      </header>
      <div id="welcome">
        <div id="welcome-text" aria-label="welcome">
          <h1>Welcome To Code Harbor!</h1>
          <h3>The Place To Convert Your Code, </h3>
          <h3>Into Other Programming Languages!</h3>
        </div>
        <Link to={'/translate'} onMouseOver={prefetchFeedbackData}>
          <button id="getStarted">Get Started</button>
        </Link>
      </div>
      <div className="container" id="section-about">
        <div id="about" aria-label="about">
          <h2>
            <u>About</u>
          </h2>
          <p>
            Welcome to CodeHarbor, the place for seamless code translation
            multiple programming languages. Our innovative tool utilizes the
            GPT-3, which is one of the most advanced natural language
            processing(NLP) chatbots in the world. With our platform you can
            easily convert code to a variety of programming languages, while
            maintaining functionality.
          </p>
        </div>
        <img
          id="people"
          src="pages/images/codeimg.jpg"
          alt="People on computer"
        />
      </div>

      <div className="container" id="section-works">
        <img
          id="codeimg"
          src="pages/images/peopleOnComp.jpg"
          alt="Code on computer"
        />
        <div id="workings" aria-label="instructions">
          <h2>
            <u>Instructions</u>
          </h2>
          <ol>
            <li>Paste or upload your code in the input box.</li>
            <li>
              From the first dropdown menu, select the programming language that
              code is currently in.
            </li>
            <li>
              Next, in the second dropdown menu, select the language desired to
              be converted to.
            </li>
            <li>Lastly, click convert!</li>
          </ol>
        </div>
      </div>
    </>
  )
}

export default HomePage
