import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import PageLayout from 'src/layouts/PageLayout'

const BasicTranslationGuidePage = () => (
  <PageLayout title="User Guides" subtitle="Basic Code Translation">
    <p style={{ marginBottom: '30px' }}>
      Welcome to the "Basic Code Translation" guide. Here, we'll walk you through the process of translating a simple piece of code from one language to another using CodeHarbor.
    </p>

    <h3 style={{ marginBottom: '10px' }}>Step 1: Navigate to the Code Translation Page</h3>
    <p style={{ marginBottom: '20px' }}>
      From the homepage, click on 'Get Started' to get to the code translation page. This is where you'll enter the code you want to translate.
    </p>

    <h3 style={{ marginBottom: '10px' }}>Step 2: Enter Your Code</h3>
    <p style={{ marginBottom: '20px' }}>
      In the code input field, enter the code you want to translate. Make sure the code is written in one of the languages supported by CodeHarbor.
    </p>

    <h3 style={{ marginBottom: '10px' }}>Step 3: Select the Target Language</h3>
    <p style={{ marginBottom: '20px' }}>
      Choose the language you want to translate your code into. CodeHarbor supports a variety of programming languages, so you have many options to choose from.
    </p>

    <h3 style={{ marginBottom: '10px' }}>Step 4: Translate Your Code</h3>
    <p style={{ marginBottom: '20px' }}>
      Click the "Convert" button to translate your code. CodeHarbor will process your code and display the translated version.
    </p>

    <p style={{ marginBottom: '30px' }}>
      If you have any issues during this process, please refer to our Troubleshooting guide or contact our support team.
    </p>
    <div style={{ marginTop: '10px' }}>
      <img 
        src="/images/basic-translation.gif"
        alt="GIF showing a basic translation"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>


  </PageLayout>
);

export default BasicTranslationGuidePage;
