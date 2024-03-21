import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const UserGuidesPage = () => {
  const style = {
    display: 'grid', 
    gridTemplateColumns: '1fr 1fr', 
    gap: '20px',
  }

  return (
    <div>
      <h1>User Guides</h1>
      <p>Welcome to the User Guides section of CodeHarbor. Here you'll find detailed guides on how to use our platform. Please leave feedback for more guides.</p>

      <div style={style}>
        <div>
          <h2>Getting Started</h2>
          <p><Link>Creating an Account</Link></p>
          <p><Link>Logging In and Out</Link></p>
          <p><Link>Navigating the Interface</Link></p>
        </div>

        <div>
          <h2>Code Translation</h2>
          <p><Link>Basic Code Translation</Link></p>
          <p><Link>Understanding the Output</Link></p>
          <p><Link>Troubleshooting the Translation</Link></p>
        </div>

        <div>
          <h2>Advanced Features</h2>
          <p><Link>Saving and Retrieving Past Translations</Link></p>
        </div>

        <div>
          <h2>Troubleshooting</h2>
          <p><Link>Common Errors</Link></p>
          <p><Link>Reporting Bugs</Link></p>
          <p><Link>Requesting Features</Link></p>
        </div>
      </div>
    </div>
  )
}

export default UserGuidesPage
