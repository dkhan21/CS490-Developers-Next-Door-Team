import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import Navbar from 'src/components/Navbar/Navbar'
import React from 'react';

const HomePage = () => {


  return (
    <>
      <Metadata title="Home" description="Home page" />
      <header>

        <Navbar/>
        <h1>HomePage</h1>
        <nav>
          <ul>
            <li>
              <Link to={routes.translate()}>Get Started</Link>
            </li>
          </ul>
        </nav>
    </header>
      <div id="welcome">
        <h1>Welcome To Code Harbor!</h1>
        <h3>The Place To Convert Your Code, </h3>
        <h3>Into Other Programming Languages!</h3>
        <Link to={routes.translate()}>
        <button id="getStarted" >Get Started</button>
        </Link>
      </div>
      <body>
        <div className="container" id="section-about">
          <div id="about">
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
          <div id="workings">
            <h2>
              <u>How it Works</u>
            </h2>
            <ol>
              <li>Paste or upload your code in the input box.</li>
              <li>
                From the first dropdown menu, select the programming language
                that code is currently in.
              </li>
              <li>
                Next, in the second dropdown menu, select the language desired
                to be converted to.
              </li>
              <li>Lastly, click convert!</li>
            </ol>
          </div>
        </div>
      </body>

    </>
  )
}

export default HomePage
