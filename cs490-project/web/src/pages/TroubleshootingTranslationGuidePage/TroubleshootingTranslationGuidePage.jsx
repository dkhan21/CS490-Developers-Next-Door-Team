import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import PageLayout from 'src/layouts/PageLayout'

const TroubleshootingTranslationGuidePage = () => (
  <PageLayout title="User Guides" subtitle="Troubleshooting the Translation">
    <p style={{ marginBottom: '30px' }}>
      Welcome to the "Troubleshooting the Translation" guide. Here, we'll help you understand how to resolve common issues that might arise during code translation with CodeHarbor.
    </p>

    <h3 style={{ marginBottom: '10px' }}>Incorrect Translation</h3>
    <p style={{ marginBottom: '20px' }}>
      If the translated code doesn't work as expected or has errors, check the original code for any mistakes. Make sure the code is written in a language supported by CodeHarbor and doesn't contain any syntax errors.
    </p>

    <h3 style={{ marginBottom: '10px' }}>Unsupported Language</h3>
    <p style={{ marginBottom: '20px' }}>
      CodeHarbor supports a variety of programming languages, but not all. If you're trying to translate code in an unsupported language, consider converting it to a supported language first.
    </p>

    <h3 style={{ marginBottom: '10px' }}>Large Blocks of Code</h3>
    <p style={{ marginBottom: '20px' }}>
      If you're trying to translate a large block of code and it's taking a long time or not working, try breaking it down into smaller parts and translating each part separately.
    </p>

    <h3 style={{ marginBottom: '10px' }}>Reporting Issues</h3>
    <p style={{ marginBottom: '20px' }}>
      If you encounter an issue that you can't resolve, you can report it to our support team. Provide as much detail as possible about the issue, including the original code, the translated code, and any error messages.
    </p>

    <p style={{ marginBottom: '20px' }}>
      We hope this guide helps you troubleshoot any issues you encounter while using CodeHarbor. If you have any other questions, please refer to our other user guides or contact our support team.
    </p>
  </PageLayout>
);

export default TroubleshootingTranslationGuidePage;
