import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import PageLayout from 'src/layouts/PageLayout'

const CreateAccountGuidePage = () => {
  return (
    <PageLayout title="User Guides" subtitle="Creating an Account">
    {/* Your Creating an Account guide content goes here */}
    <p style={{ marginBottom: '30px' }}>Here, we'll walk you through the process of creating a new account on CodeHarbor.</p>

    <h4 style={{ marginBottom: '10px' }}>Step 1: Navigate to the Login Page</h4>
    <p style={{ marginBottom: '20px' }}>
      To create a new account, first click on the "Login" button on the homepage. This will take you to the login page.
    </p>

    <h4 style={{ marginBottom: '10px' }}>Step 2: Go to the Register Page</h4>
    <p style={{ marginBottom: '20px' }}>
      On the login page, you'll find a "Sign Up" button. Click this button to navigate to the register page.
    </p>

    <h4 style={{ marginBottom: '10px' }}>Step 3: Enter Your Information</h4>
    <p style={{ marginBottom: '20px' }}>
      On the register page, you'll be asked to provide an email and a password. Make sure to choose a strong password to keep your account secure.
    </p>

    <h4 style={{ marginBottom: '10px' }}>Step 4: Create Your Account</h4>
    <p style={{ marginBottom: '20px' }}>
      After entering your information, click the "Create Account" button. Congratulations, you've now created your account on CodeHarbor!
    </p>
    <p style={{ marginBottom: '30px' }}>
      If you have any issues during this process, please refer to our Troubleshooting guide or contact our support team.
    </p>
    <div style={{ marginTop: '10px' }}>
      <img 
        src="/images/screenshot-creating-account.jpg"
        alt="Screenshot showing the account creation page"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  </PageLayout>
  )
}

export default CreateAccountGuidePage
