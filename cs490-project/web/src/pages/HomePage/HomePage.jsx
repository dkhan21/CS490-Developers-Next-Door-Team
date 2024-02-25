import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const HomePage = () => {
  return (
    <>
      <Metadata title="Home" description="Home page" />

      <header>
        <h1>HomePage</h1>
        <nav>
        <ul>
            <li>
              <Link to={routes.getStarted()}>Get Started</Link>
            </li>
          </ul>
        </nav>
      </header>


      { <p>
        My default route is named <code>home</code>, link to me with `
        <Link to={routes.home()}>Home</Link>`
      </p> }
    </>
  )
}

export default HomePage
