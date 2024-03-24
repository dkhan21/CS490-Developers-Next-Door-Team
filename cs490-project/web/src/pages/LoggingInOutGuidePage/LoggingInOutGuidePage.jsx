import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import PageLayout from 'src/layouts/PageLayout'

const LoggingInOutGuidePage = () => (
  <PageLayout title="User Guides" subtitle="Logging In and Out">
    <p style={{ marginBottom: '30px' }}>
      Welcome to the "Logging In and Out" guide. Here, we'll walk you through the process of logging in and out of your CodeHarbor account.
    </p>

    <h4 style={{ marginBottom: '10px' }}>Logging In</h4>
    <p style={{ marginBottom: '20px' }}>
      To log in to your CodeHarbor account, click on the "Login" button on the homepage. This will take you to the login page. Here, you'll need to enter the email and password you used when creating your account. After entering your information, click the "Login" button to access your account.
    </p>

    <h4 style={{ marginBottom: '10px' }}>Logging Out</h4>
    <p style={{ marginBottom: '20px' }}>
      To log out of your CodeHarbor account, click on your profile icon in the top right corner of the page. This will open a dropdown menu. Click on the "Logout" button in this menu to log out of your account.
    </p>

    <p style={{ marginBottom: '10px' }}>
      If you have any issues during this process, please refer to our Troubleshooting guide or contact our support team.
    </p>
  </PageLayout>
);

export default LoggingInOutGuidePage;
