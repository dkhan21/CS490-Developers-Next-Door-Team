import { useState } from 'react'

import { Button } from '@mui/material'
import { ButtonBase } from '@mui/material'

import { Link as RouterLink } from '@redwoodjs/router'
import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import Navbar from 'src/components/Navbar/Navbar'

const UserGuidesPage = () => {
  const style = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '70px',
    marginLeft: '80px',
  }

  const [hoveredLink, setHoveredLink] = useState(null)

  const linkStyle = (link) => ({
    color: hoveredLink === link ? '#44BBA4' : '#393E41',
    textDecoration: 'underline',
    textUnderlinePosition: 'under',
    cursor: 'pointer',
  })

  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="userguide">
        <h1 style={{ marginBottom: '20px ' }}>User Guides</h1>
        <p
          style={{
            marginBottom: '40px ',
            maxWidth: '400px',
            textAlign: 'center',
          }}
        >
          Welcome to the CodeHarbor's User Guides. Here you'll find detailed
          guides on how to use our platform. We appreciate your feedback for
          creating more helpful guides.
        </p>

        <div className="userbox">
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ marginBottom: '25px' }}>Getting Started</h2>
            <ul>
              <li style={{ marginBottom: '10px' }}>
                <ButtonBase
                  component={RouterLink}
                  to={routes.createAccountGuide()}
                  style={linkStyle('account')}
                  onMouseEnter={() => setHoveredLink('account')}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  Creating an Account
                </ButtonBase>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <ButtonBase
                  component={RouterLink}
                  to={routes.loggingInOutGuide()}
                  style={linkStyle('logging')}
                  onMouseEnter={() => setHoveredLink('logging')}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  Logging In and Out
                </ButtonBase>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <ButtonBase
                  component={RouterLink}
                  to={routes.navigatingInterfaceGuide()}
                  style={linkStyle('navigating')}
                  onMouseEnter={() => setHoveredLink('navigating')}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  Navigating the Interface
                </ButtonBase>
              </li>
            </ul>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ marginBottom: '25px' }}>Code Translation</h2>
            <ul>
              <li style={{ marginBottom: '10px' }}>
                <ButtonBase
                  component={RouterLink}
                  to={routes.basicCodeTranslationGuide()}
                  style={linkStyle('translation')}
                  onMouseEnter={() => setHoveredLink('translation')}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  Basic Code Translation
                </ButtonBase>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <ButtonBase
                  component={RouterLink}
                  to={routes.understandingOutputGuide()}
                  style={linkStyle('output')}
                  onMouseEnter={() => setHoveredLink('output')}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  Understanding the Output
                </ButtonBase>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <ButtonBase
                  component={RouterLink}
                  to={routes.troubleshootingTranslationGuide()}
                  style={linkStyle('troubleshooting')}
                  onMouseEnter={() => setHoveredLink('troubleshooting')}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  Troubleshooting the Translation
                </ButtonBase>
              </li>
            </ul>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ marginBottom: '25px' }}>Advanced Features</h2>
            <ul>
              <li style={{ marginBottom: '10px' }}>
                <ButtonBase
                  component={RouterLink}
                  to={routes.savingRetrievingGuide()}
                  style={linkStyle('past')}
                  onMouseEnter={() => setHoveredLink('past')}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  Saving and Retrieving Past Translations
                </ButtonBase>
              </li>
            </ul>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ marginBottom: '25px' }}>Troubleshooting</h2>
            <ul>
              <li style={{ marginBottom: '10px' }}>
                <ButtonBase
                  component={RouterLink}
                  to={routes.commonErrors()}
                  style={linkStyle('errors')}
                  onMouseEnter={() => setHoveredLink('errors')}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  Common Errors
                </ButtonBase>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <ButtonBase
                  component={RouterLink}
                  to={routes.reportingBugs()}
                  style={linkStyle('bugs')}
                  onMouseEnter={() => setHoveredLink('bugs')}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  Reporting Bugs
                </ButtonBase>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <ButtonBase
                  component={RouterLink}
                  to={routes.requestingFeatures()}
                  style={linkStyle('features')}
                  onMouseEnter={() => setHoveredLink('features')}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  Requesting Features
                </ButtonBase>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserGuidesPage
