import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import PageLayout from 'src/layouts/PageLayout'

const UnderstandingOutputGuidePage = () => (
  <PageLayout title="User Guides" subtitle="Understanding the Output">
    <p style={{ marginBottom: '30px' }}>
      Welcome to the "Understanding the Output" guide. Here, we'll help you understand how to interpret the translated code and any metadata provided by CodeHarbor.
    </p>

    <h3 style={{ marginBottom: '10px' }}>Interpreting the Translated Code</h3>
    <p style={{ marginBottom: '20px' }}>
      The translated code is displayed in the output section of the code translation page. This code is a direct translation of the input code into the selected target language. It should maintain the same functionality as the original code.
    </p>

    <h3 style={{ marginBottom: '10px' }}>Understanding Metadata</h3>
    <p style={{ marginBottom: '20px' }}>
      Along with the translated code, CodeHarbor may provide metadata about the translation process. This can include information about the translation model used, the confidence score of the translation, and any potential issues or limitations with the translated code.
    </p>

    <h3 style={{ marginBottom: '10px' }}>Next Steps</h3>
    <p style={{ marginBottom: '20px' }}>
      After reviewing the translated code and metadata, you can choose to edit the code, save it for later, or use it in your project. If you encounter any issues or have questions about the output, please refer to our Troubleshooting guide or contact our support team.
    </p>
  </PageLayout>
);

export default UnderstandingOutputGuidePage;

