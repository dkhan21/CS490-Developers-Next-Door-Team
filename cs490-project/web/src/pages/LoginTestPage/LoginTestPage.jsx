import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

const LoginTestPage = () => {
  const { isAuthenticated, currentUser, logOut } = useAuth()

  return (
    <>
      <Metadata title="LoginTest" description="LoginTest page" />

      <h1>LoginTestPage</h1>
      <p>
        This page is only accessible to users logged in
      </p>
      <p>Logged in as {currentUser.email}</p>
      
      <button type="button" onClick={logOut}>
        Logout
      </button>
      <p>
        My default route is named <code>loginTest</code>, link to me with `
        <Link to={routes.loginTest()}>LoginTest</Link>`
      </p>
    </>
  )
}

export default LoginTestPage
