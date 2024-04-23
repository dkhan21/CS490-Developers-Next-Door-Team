import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import PageLayout from 'src/layouts/PageLayout'

const SavingRetrievingGuidePage = () => (
  <PageLayout title="User Guides" subtitle="Saving and Retrieving Past Translations">
    <p style={{ marginBottom: '30px' }}>
      Welcome to the "Saving and Retrieving Past Translations" guide. Here, we'll walk you through the process of saving your translations and retrieving them later on CodeHarbor.
    </p>

    <h3 style={{ marginBottom: '10px' }}>Saving Translations</h3>
    <p style={{ marginBottom: '20px' }}>
      After translating a piece of code, your code will be saved for future reference. 
    </p>

    <h3 style={{ marginBottom: '10px' }}>Retrieving Past Translations</h3>
    <p style={{ marginBottom: '20px' }}>
      To retrieve your past translations, navigate to the "Get Started" page. Here, you'll find a list of all the translations you've done. Click on any translation to view the original and translated code. You will also be able to perform new translations with previous inputs.
    </p>

    <p style={{ marginBottom: '20px' }}>
      If you have any issues during this process, please refer to our Troubleshooting guide or contact our support team.
    </p>
  </PageLayout>
);

export default SavingRetrievingGuidePage;

