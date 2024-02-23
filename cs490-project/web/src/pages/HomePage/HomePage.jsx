import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import Navbar from 'src/components/Navbar/Navbar'

const HomePage = () => {
  return (
    <>
      <Metadata title="Home" description="Home page" />

      <Navbar/>
      <header>
        <h1>HomePage</h1>
        <nav></nav>
      </header>

      
      {/* <p>
        My default route is named <code>home</code>, link to me with `
        <Link to={routes.home()}>Home</Link>`
      </p> */}
    </>
  )
}

export default HomePage
