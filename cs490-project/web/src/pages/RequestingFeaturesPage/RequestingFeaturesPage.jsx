import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import PageLayout from 'src/layouts/PageLayout'

const RequestingFeaturesPage = () => (
  <PageLayout title="User Guides" subtitle="Requesting Features">
    <p style={{ marginBottom: '30px' }}>
      Welcome to the "Requesting Features" guide. Here, we'll walk you through the process of requesting new features or improvements for CodeHarbor.
    </p>

    <h3 style={{ marginBottom: '10px' }}>How to Request a Feature</h3>
    <p style={{ marginBottom: '20px' }}>
      If you have an idea for a new feature or an improvement to an existing feature, we'd love to hear from you! Please submit your request via our feedback section on the Get Started page. When requesting a feature, please include the following information:
    </p>

    <ul>
      <li><strong>Title/Feature ID:</strong> Provide a brief, descriptive title for the feature.</li>
      <li><strong>Description:</strong> Describe the feature in detail and explain how it would benefit users.</li>
      <li><strong>Use Case:</strong> Explain a scenario where this feature would be useful.</li>
    </ul>

    <p style={{ marginTop: '20px', marginBottom: '20px' }}>
      Our team will review your feature request and consider it for future updates. Thank you for helping us improve CodeHarbor!
    </p>
  </PageLayout>
);

export default RequestingFeaturesPage;
