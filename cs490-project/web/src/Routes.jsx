// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import {Set, PrivateSet, Router, Route } from '@redwoodjs/router'

import { useAuth } from './auth'

const Routes = () => {
  return (

    <Router useAuth={useAuth}>
      <Route path="/understanding-output-guide" page={UnderstandingOutputGuidePage} name="understandingOutputGuide" />
      <Route path="/basic-code-translation-guide" page={BasicCodeTranslationGuidePage} name="basicCodeTranslationGuide" />
      <Route path="/navigating-interface-guide" page={NavigatingInterfaceGuidePage} name="navigatingInterfaceGuide" />
      <Route path="/logging-in-out-guide" page={LoggingInOutGuidePage} name="loggingInOutGuide" />
      <Route path="/create-account-guide" page={CreateAccountGuidePage} name="createAccountGuide" />
      <Route path="/user-guides" page={UserGuidesPage} name="userGuides" />
      <Route path="/faq" page={FAQPage} name="faq" />
      <Route path="/get-started" page={GetStartedPage} name="getStarted" />
      <Route path="/translate" page={TranslatePage} name="translate" />
      <PrivateSet unauthenticated="home" roles="admin">
        <Route path="/admin-test" page={AdminTestPage} name="adminTest" />
      </PrivateSet>
      <PrivateSet unauthenticated="home">
        <Route path="/login-test" page={LoginTestPage} name="loginTest" />
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
