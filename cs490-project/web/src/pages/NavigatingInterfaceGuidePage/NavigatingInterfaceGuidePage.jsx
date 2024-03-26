import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import PageLayout from 'src/layouts/PageLayout'

const NavigatingInterfaceGuidePage = () => (
  <PageLayout title="User Guides" subtitle="Navigating the Interface">
    <p style={{ marginBottom: '30px' }}>
      Welcome to the "Navigating the Interface" guide. Here, we'll walk you through the main features of the CodeHarbor interface.
    </p>

    <h3 style={{ marginBottom: '10px' }}>Homepage</h3>
    <p style={{ marginBottom: '20px' }}>
      The homepage provides an overview of CodeHarbor and instructions on how to use the code translation feature. You can navigate to different sections of the site using the navbar.
    </p>

    <h4 style={{ marginBottom: '10px' }}>Code Translation Page</h4>
    <p style={{ marginBottom: '20px' }}>
      On the code translation page, you can insert code in one of our supported languages and click "Convert" to get the translated code. Below the translation, you'll find our feedback section where you can leave comments or suggestions.
    </p>

    <h4 style={{ marginBottom: '10px' }}>Help Section</h4>
    <p style={{ marginBottom: '20px' }}>
      The Help link in the navbar takes you to our FAQs, user guides, and other helpful resources.
    </p>

    <h4 style={{ marginBottom: '10px' }}>Login and Sign Up Pages</h4>
    <p style={{ marginBottom: '20px' }}>
      You can create a new account or log in to an existing account from the Login and Sign Up pages. Once logged in, you'll have access to your profile page.
    </p>

    <h4 style={{ marginBottom: '10px' }}>Profile Page</h4>
    <p style={{ marginBottom: '20px' }}>
      On your profile page, you can change your account information, change your password, or even delete your account.
    </p>

    <p style={{ marginBottom: '20px' }}>
      If you have any issues while navigating the interface, please refer to our Troubleshooting guide or contact our support team.
    </p>
  </PageLayout>
);

export default NavigatingInterfaceGuidePage;

