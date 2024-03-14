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

const Routes = () => {
  return (

    <Router useAuth={useAuth}>
      <Set wrap={ScaffoldLayout} title="Histories" titleTo="histories" buttonLabel="New History" buttonTo="newHistory">
        <Route path="/histories/new" page={HistoryNewHistoryPage} name="newHistory" />
        <Route path="/histories/{id:Int}/edit" page={HistoryEditHistoryPage} name="editHistory" />
        <Route path="/histories/{id:Int}" page={HistoryHistoryPage} name="history" />
        <Route path="/histories" page={HistoryHistoriesPage} name="histories" />
      </Set>
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
