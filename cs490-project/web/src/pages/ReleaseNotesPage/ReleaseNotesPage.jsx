import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import Navbar from 'src/components/Navbar/Navbar'

const ReleaseNotesPage = () => {
  return (
    <>
      <Metadata title="ReleaseNotes" description="ReleaseNotes page" />

      <div >
        <Navbar/>
          <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '120px',
          }}>
            <h1 style={{ marginBottom: '20px ' }}>Welcome to CodeHarbor v1.0</h1>
            <p>We're excited to introduce CodeHarbor, a new application designed to revolutionze the way you translate code across various programming languages.</p>

            <h2 style={{ marginTop: '30px', marginBottom: '20px ' }}>Main Features</h2>
            <ul style={{
              textAlign: 'left',
              maxWidth: '90%', 
              paddingLeft: '5%',
              paddingRight: '5%', 
            }} >
              <li style={{ marginBottom: '5px ' }}><strong>Code Submission and Translation Output (Translation Tool):</strong></li>
              <p style={{ marginBottom: '10px ' }}>Our core feature that allows users to submit their code and receive the translated output in a variety of programming languages.</p>
              <li style={{ marginBottom: '5px ' }}><strong>User Registration/Login:</strong></li>
              <p style={{ marginBottom: '10px ' }}>Enables personalized experiences by allowing users to create their own accounts and log in.</p>
              <li style={{ marginBottom: '5px ' }}><strong>Feedback Feature:</strong></li>
              <p style={{ marginBottom: '10px ' }}>We value user input. Our feedback feature allows users to provide us with their valuable feedback.</p>
              <li style={{ marginBottom: '5px ' }}><strong>User Account Management:</strong></li>
              <p style={{ marginBottom: '10px ' }}>Provides users with the ability to manage their account settings, enhancing the overall user experiance.</p>
              <li style={{ marginBottom: '5px ' }}><strong>Translation History:</strong></li>
              <p style={{ marginBottom: '10px ' }}>Users can now view their past translations, providing an eassy access and reference to previous work.</p>
              <li style={{ marginBottom: '5px ' }}><strong>Help Section Interface and Documentation</strong></li>
              <p style={{ marginBottom: '30px ' }}>We've added a comprehensive Help section and documentation to assist users in navigating and utilizing our platform.</p>
            </ul>

            <h2 style={{ marginBottom: '20px ' }}>New + Improved</h2>
            <ul style={{
              textAlign: 'left',
              maxWidth: '80%', 
              paddingLeft: '10.5%', 
              paddingRight: '10%', 
            }} >
              <li style={{ marginBottom: '5px ' }}><strong>GPT-3 Integration</strong></li>
              <p style={{ marginBottom: '10px ' }}>Enhanced our translation tool with the integration of GPT-3, improving the accuracy and efficiency of code translations.</p>
              <li style={{ marginBottom: '5px ' }}><strong>Interactive Translation Results Display</strong></li>
              <p style={{ marginBottom: '10px ' }}>Introduced an interactive display for translation results, including text selection, highlighting, copying, and downloading. This enhances the user experiance by providing more control over the translated output.</p>
              <li style={{ marginBottom: '5px ' }}><strong>Error Reporting System</strong></li>
              <p style={{ marginBottom: '10px ' }}>Implemented a system for reporting translation errors, improving the reliability and accuracy of our service.</p>
              <li style={{ marginBottom: '5px ' }}><strong>Asynchronous Translation Requests</strong></li>
              <p style={{ marginBottom: '10px ' }}>Improved the user experiance by introducing a queue system for translation requests, with notifications when translations are complete.</p>
              <li style={{ marginBottom: '5px ' }}><strong>Password Resets</strong></li>
              <p style={{ marginBottom: '10px ' }}>Enhanced the user account management feature by adding the ability for users to reset their passwords.</p>
              <li style={{ marginBottom: '5px ' }}><strong>Translation History Filtering and Sorting</strong></li>
              <p style={{ marginBottom: '10px ' }}>Improved the translation history feature by adding filtering and sorting capabilities, making it easier for user to manage their past translations.</p>
              <li style={{ marginBottom: '5px ' }}><strong>Feedback Mechanism Error Handling</strong></li>
              <p style={{ marginBottom: '10px ' }}>Enhanced the feedback mechanism with better error handling to ensure user feedback is accurately captured.</p>
              <li style={{ marginBottom: '5px ' }}><strong>Application Security</strong></li>
              <p style={{ marginBottom: '10px ' }}>Strengthened the security of the application to protect user data and privacy.</p>
              <li style={{ marginBottom: '5px ' }}><strong>Performance Optimization</strong></li>
              <p style={{ marginBottom: '10px ' }}>Optimized the performance of the application for a smoother user experiance.</p>
              <li style={{ marginBottom: '5px ' }}><strong>Delete and Clear Translation History</strong></li>
              <p style={{ marginBottom: '10px ' }}>Users can now delete individual entries or clear their entire translation history, providing more control over their data.</p>
              <li style={{ marginBottom: '5px ' }}><strong>Load Testing</strong></li>
              <p style={{ marginBottom: '30px ' }}>Conducted load testing to ensure our application can handle real-life load conditions effectively. This is an important step in performance testing that helps ensure a smooth user experience, particularly during peak usage time.</p>
              </ul>
      
            <h2 style={{ marginBottom: '20px ' }}>Bug Fixes</h2>
            <ul style={{
              textAlign: 'left',
              maxWidth: '80%', 
              paddingLeft: '0%', 
              paddingRight: '12%', 
            }}>
              <li style={{ marginBottom: '5px ' }}><strong>Code Translation Errors:</strong></li>
              <p style={{ marginBottom: '10px ' }}>Resolved a bug that was causing incorrect translations for specific code snippets.</p>
              <li style={{ marginBottom: '5px ' }}><strong>UI Glitches:</strong></li>
              <p style={{ marginBottom: '10px ' }}>Fixed various UI glitches that were affecting the display of the translation page and the navigation bar.</p>
              <li style={{ marginBottom: '5px ' }}><strong>Performance Issues:</strong></li>
              <p style={{ marginBottom: '10px ' }}>Addressed a bug that was causing slow load times when accessing several links on our application.</p>
              <li style={{ marginBottom: '5px ' }}><strong>Error Handling:</strong></li>
              <p style={{ marginBottom: '10px ' }}>Improved error handling for failed translation requests.</p>
              <li style={{ marginBottom: '5px ' }}><strong>Data Syncing:</strong></li>
              <p style={{ marginBottom: '10px ' }}>Addressed a problem where data was not syncing correctly across different user sessions.</p>
              <li style={{ marginBottom: '5px ' }}><strong>Accessibility Issues:</strong></li>
              <p style={{ marginBottom: '30px ' }}>Fixed various issues to make the application more accessible to users with disabilities.</p>
            </ul>
          </div>
      </div>
    </>
  )
}

export default ReleaseNotesPage
