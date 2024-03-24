import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import PageLayout from 'src/layouts/PageLayout'

const ReportingBugsPage = () => (
  <PageLayout title="User Guides" subtitle="Reporting Bugs">
    <p style={{ marginBottom: '30px' }}>
      Welcome to the "Reporting Bugs" guide. Here, we'll walk you through the process of reporting bugs you might encounter while using CodeHarbor.
    </p>

    <h3 style={{ marginBottom: '10px' }}>How to Report a Bug</h3>
    <p style={{ marginBottom: '20px' }}>
      If you encounter a bug while using CodeHarbor, please report it via our feedback section on the Get Started page. When reporting a bug, please include the following information:
    </p>

    <ul>
      <li><strong>Title/Bug ID:</strong> Provide a brief, descriptive title for the bug.</li>
      <li><strong>Environment:</strong> Describe the environment in which the bug occurred (e.g., browser type and version, operating system).</li>
      <li><strong>Steps to reproduce the bug:</strong> Provide a detailed list of steps that led to the occurrence of the bug.</li>
      <li><strong>Expected Result:</strong> Describe what the user expected to happen.</li>
      <li><strong>Actual Result:</strong> Describe what actually happened.</li>
    </ul>

    <p style={{ marginTop: '20px', marginBottom: '20px' }}>
      Our team will review your bug report and work on a fix as soon as possible. Thank you for helping us improve CodeHarbor!
    </p>
  </PageLayout>
);

export default ReportingBugsPage;
