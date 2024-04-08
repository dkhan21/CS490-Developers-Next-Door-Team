import { useState } from 'react'

import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import Navbar from 'src/components/Navbar/Navbar'

const ResourcesPage = () => {
  const [hoveredLink, setHoveredLink] = useState(null)

  const linkStyle = (link) => ({
    color: hoveredLink === link ? '#44BBA4' : '#393E41',
    textDecoration: 'underline',
    textUnderlinePosition: 'under',
    cursor: 'pointer',
  })

  return (
    <div>
      <header>
        <Navbar />
      </header>
      <div className="resource-whole">
        <h1 style={{ marginBottom: '20px ' }}>Resources</h1>
        <p style={{ marginBottom: '30px' }}>
          Welcome to the "Resources" page. Here, you'll find a variety of
          resources to help you get the most out of CodeHarbor.
        </p>
      </div>

      <div className="resource-body">
        <h3 style={{ marginBottom: '10px' }}>GPT-3 Documentation</h3>
        <p style={{ marginBottom: '20px' }}>
          Learn more about GPT-3, the advanced natural language processing
          chatbot that powers CodeHarbor. You can find the GPT-3 documentation{' '}
          <a
            href="https://platform.openai.com/docs/api-reference/gpt-3"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle('gpt3')}
            onMouseEnter={() => setHoveredLink('gpt3')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            here
          </a>{' '}
          and{' '}
          <a
            href="https://platform.openai.com/docs/engines/gpt-3"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle('gpt3-2')}
            onMouseEnter={() => setHoveredLink('gpt3-2')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            here
          </a>
          .
        </p>
        <h3 style={{ marginBottom: '10px' }}>Language Documentation</h3>
        <p style={{ marginBottom: '20px' }}>
          Get detailed information about the programming languages that
          CodeHarbor supports:
          <ul style={{ paddingLeft: '30px' }}>
            <li>
              <a
                href="https://docs.oracle.com/en/java/"
                target="_blank"
                rel="noopener noreferrer"
                style={linkStyle('java')}
                onMouseEnter={() => setHoveredLink('java')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Java
              </a>
            </li>
            <li>
              <a
                href="https://docs.python.org/3/"
                target="_blank"
                rel="noopener noreferrer"
                style={linkStyle('python')}
                onMouseEnter={() => setHoveredLink('python')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Python
              </a>
            </li>
            <li>
              <a
                href="https://devdocs.io/c/"
                target="_blank"
                rel="noopener noreferrer"
                style={linkStyle('c')}
                onMouseEnter={() => setHoveredLink('c')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                C
              </a>
            </li>
            <li>
              <a
                href="http://www.cplusplus.com/doc/tutorial/"
                target="_blank"
                rel="noopener noreferrer"
                style={linkStyle('c++')}
                onMouseEnter={() => setHoveredLink('c++')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                C++
              </a>
            </li>
            <li>
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
                target="_blank"
                rel="noopener noreferrer"
                style={linkStyle('javascript')}
                onMouseEnter={() => setHoveredLink('javascript')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                JavaScript
              </a>
            </li>
          </ul>
        </p>

        <p style={{ marginBottom: '20px' }}>
          If you have any questions or need further assistance, please don't
          hesitate to leave feedback on the "Get Started" page.
        </p>
      </div>
    </div>
  )
}

export default ResourcesPage
