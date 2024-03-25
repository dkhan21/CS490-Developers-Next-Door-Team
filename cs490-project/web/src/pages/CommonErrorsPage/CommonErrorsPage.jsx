import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import PageLayout from 'src/layouts/PageLayout'

const CommonErrorsPage = () => (
  <PageLayout title="User Guides" subtitle="Common Errors">
    <p style={{ marginBottom: '30px' }}>
      Welcome to the "Common Errors" guide. Here, we'll walk you through some common errors you might encounter while using CodeHarbor and how to resolve them.
    </p>

    <h3 style={{ marginBottom: '10px' }}>Incorrect Translation of Proper Nouns</h3>
    <p style={{ marginBottom: '20px' }}>
      This error occurs when proper nouns are incorrectly translated. To resolve this, ensure that proper nouns are correctly spelled and capitalized in the source code.
    </p>

    <h3 style={{ marginBottom: '10px' }}>Translation of False Friends</h3>
    <p style={{ marginBottom: '20px' }}>
      This error occurs when words that look similar in two languages but have different meanings are translated incorrectly. To resolve this, double-check the context of the source code.
    </p>

    <h3 style={{ marginBottom: '10px' }}>Words in the Wrong Order</h3>
    <p style={{ marginBottom: '20px' }}>
      This error occurs when the order of words in the translated code does not make sense. To resolve this, rearrange the words in a way that makes sense in the target language.
    </p>

    <p style={{ marginBottom: '20px' }}>
      If you encounter an error that is not listed here, please refer to our Troubleshooting guide or contact our support team.
    </p>
  </PageLayout>
);

export default CommonErrorsPage;
