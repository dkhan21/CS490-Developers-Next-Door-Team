import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'


const AdminTestPage = () => {
  const { isAuthenticated, currentUser, logOut } = useAuth()

  
  return (
    <>
      <Metadata title="AdminTest" description="AdminTest page" />

      <h1>AdminTestPage</h1>
      <p>
        This page is only accessible to admins logged in.
      </p>
      <p>Logged in as: {currentUser.email}</p>
      <p>
        My default route is named <code>adminTest</code>, link to me with `
        <Link to={routes.adminTest()}>AdminTest</Link>`
      </p>
    </>
  )
}

export default AdminTestPage
