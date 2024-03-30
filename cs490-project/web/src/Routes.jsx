// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import {Set, PrivateSet, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import { useAuth } from './auth'
// import translatepagemock from './pages/TranslatePage/translatepagemock'

const Routes = () => {
  return (

    <Router useAuth={useAuth}>
      <Route path="/resources" page={ResourcesPage} name="resources" />
      <Route path="/requesting-features" page={RequestingFeaturesPage} name="requestingFeatures" />
      <Route path="/reporting-bugs" page={ReportingBugsPage} name="reportingBugs" />
      <Route path="/common-errors" page={CommonErrorsPage} name="commonErrors" />
      <Route path="/saving-retrieving-guide" page={SavingRetrievingGuidePage} name="savingRetrievingGuide" />
      <Route path="/troubleshooting-translation-guide" page={TroubleshootingTranslationGuidePage} name="troubleshootingTranslationGuide" />
      <Route path="/understanding-output-guide" page={UnderstandingOutputGuidePage} name="understandingOutputGuide" />
      <Route path="/basic-code-translation-guide" page={BasicCodeTranslationGuidePage} name="basicCodeTranslationGuide" />
      <Route path="/navigating-interface-guide" page={NavigatingInterfaceGuidePage} name="navigatingInterfaceGuide" />
      <Route path="/logging-in-out-guide" page={LoggingInOutGuidePage} name="loggingInOutGuide" />
      <Route path="/create-account-guide" page={CreateAccountGuidePage} name="createAccountGuide" />
      <Route path="/user-guides" page={UserGuidesPage} name="userGuides" />
      <Route path="/faq" page={FAQPage} name="faq" />

      <Route path="/change-password" page={ChangePasswordPage} name="changePassword" />
      <Route path="/update-profile" page={UpdateProfilePage} name="updateProfile" />

      <Set wrap={ScaffoldLayout} title="Histories" titleTo="histories" buttonLabel="New History" buttonTo="newHistory">
        <Route path="/histories/new" page={HistoryNewHistoryPage} name="newHistory" />
        <Route path="/histories/{id:Int}/edit" page={HistoryEditHistoryPage} name="editHistory" />
        <Route path="/histories/{id:Int}" page={HistoryHistoryPage} name="history" />
        <Route path="/histories" page={HistoryHistoriesPage} name="histories" />
      </Set>
      <Route path="/get-started" page={GetStartedPage} name="getStarted" />
      <Route path="/translate" page={TranslatePage} name="translate" />
      {/* <Route path="/translate" page={translatepagemock} name="translate" /> */}
      <PrivateSet unauthenticated="home" roles="admin">
        <Route path="/admin-test" page={AdminTestPage} name="adminTest" />
      </PrivateSet>
      <PrivateSet unauthenticated="home">
        <Route path="/login-test" page={LoginTestPage} name="loginTest" />
        <Route path="/profile" page={ProfilePage} name="profile" />
      </PrivateSet>
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
