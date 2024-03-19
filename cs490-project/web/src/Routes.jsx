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
      <Route path="/change-password" page={ChangePasswordPage} name="changePassword" />
      <Route path="/update-profile" page={UpdateProfilePage} name="updateProfile" />
      <Route path="/get-started" page={GetStartedPage} name="getStarted" />
      <Route path="/translate" page={TranslatePage} name="translate" />
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
