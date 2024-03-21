import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const UserGuidesPage = () => {
  return (
    <>
      <Metadata title="UserGuides" description="UserGuides page" />

      <h1>UserGuidesPage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/UserGuidesPage/UserGuidesPage.jsx</code>
      </p>
      <p>
        My default route is named <code>userGuides</code>, link to me with `
        <Link to={routes.userGuides()}>UserGuides</Link>`
      </p>
    </>
  )
}

export default UserGuidesPage
