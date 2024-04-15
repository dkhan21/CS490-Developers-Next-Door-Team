import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const ReleaseNotesPage = () => {
  return (
    <>
      <Metadata title="ReleaseNotes" description="ReleaseNotes page" />

      <div>
        <h1>Welcome to CodeHarbor v1.0</h1>
        <p>We're excited to introduce CodeHarbor, a new application designed to revolutionze the way you translate code across various programming languages.</p>

        <h2>Main Features</h2>
        <ul>
          <li><strong>Code Submission and Translation Output (Translation Tool):</strong></li>
          <p>Our core feature that allows users to submit their code and receive the translated output in a variety of programming languages.</p>
          <li><strong>User Registration/Login:</strong></li>
          <p>Enables personalized experiences by allowing users to create their own accounts and log in.</p>
          <li><strong>Feedback Feature:</strong></li>
          <p>We value user input. Our feedback feature allows users to provide us with their valuable feedback.</p>
          <li><strong>User Account Management:</strong></li>
          <p>Provides users with the ability to manage their account settings, enhancing the overall user experiance.</p>
          <li><strong>Translation History:</strong></li>
          <p>Users can now view their past translations, providing an eassy access and reference to previous work.</p>
          <li><strong>Help Section Interface and Documentation</strong></li>
          <p>We've added a comprehensive Help section and documentation to assist users in navigating and utilizing our platform.</p>
        </ul>

        <h2>New + Improved</h2>
        <ul>
          {/* sprint 2 */}
          <li><strong>GPT-3 Integration</strong></li>
          <p>Enhanced our translation tool with the integration of GPT-3, improving the accuracy and efficiency of code translations.</p>
          <li><strong>Interactive Translation Results Display</strong></li>
          <p>Introduced an interactive display for translation results, including text selection, highlighting, copying, and downloading. This enhances the user experiance by providing more control over the translated output.</p>
          <li><strong>Error Reporting System</strong></li>
          <p>Implemented a system for reporting translation errors, improving the reliability and accuracy of our service.</p>
          <li><strong>Asynchronous Translation Requests</strong></li>
          <p>Improved the user experiance by introducing a queue system for translation requests, with notifications when translations are complete.</p>
          {/* sprint 3 */}
          <li><strong>Password Resets</strong></li>
          <p>Enhanced the user account management feature by adding the ability for users to reset their passwords.</p>
          <li><strong>Translation History Filtering and Sorting</strong></li>
          <p>Improved the translation history feature by adding filtering and sorting capabilities, making it easier for user to manage their past translations.</p>
          <li><strong>Feedback Mechanism Error Handling</strong></li>
          <p>Enhanced the feedback mechanism with better error handling to ensure user feedback is accurately captured.</p>
          <li><strong>Application Security</strong></li>
          <p>Strengthened the security of the application to protect user data and privacy.</p>
          <li><strong>Performance Optimization</strong></li>
          <p>Optimized the performance of the application for a smoother user experiance.</p>
          <li><strong>Delete and Clear Translation History</strong></li>
          <p>Users can now delete individual entries or clear their entire translation history, providing more control over their data.</p>
          <li><strong>Load Testing</strong></li>
          <p>Conducted load testing to ensure our application can handle real-life load conditions effectively. This is an important step in performance testing that helps ensure a smooth user experience, particularly during peak usage time.</p>
        </ul>
        <h2>Bug Fixes</h2>
        <li><strong>Code Translation Errors:</strong></li>
        <p>Resolved a bug that was causing incorrect translations for specific code snippets.</p>
        <li><strong>UI Glitches:</strong></li>
        <p>Fixed various UI glitches that were affecting the display of the translation page and the navigation bar.</p>
        <li><strong>Performance Issues:</strong></li>
        <p>Addressed a bug that was causing slow load times when accessing several links on our application.</p>
        <li><strong>Error Handling:</strong></li>
        <p>Improved error handling for failed translation requests.</p>
        <li><strong>Data Syncing:</strong></li>
        <p>Addressed a problem where data was not syncing correctly across different user sessions.</p>
        <li><strong>Accessibility Issues:</strong></li>
        <p>Fixed various issues to make the application more accessible to users with disabilities.</p>
      </div>
    </>
  )
}

export default ReleaseNotesPage
