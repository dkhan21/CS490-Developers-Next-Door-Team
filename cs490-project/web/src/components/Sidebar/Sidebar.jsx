import { Link, routes, useLocation } from '@redwoodjs/router'
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { useState } from 'react'; 


const Sidebar = () => {
  const [hoverIndex, setHoverIndex] = useState(null); 
  const location = useLocation()

  const isActive = (path) => location.pathname === path 

  return (
    <div style={styles.sidebar}>
      <hr style={styles.hr}/>
      <Link 
        to={routes.profile()} 
        onMouseEnter={() => setHoverIndex(1)}
        onMouseLeave={() => setHoverIndex(null)}
        // style={hoverIndex === 1 ? styles.linkHover : styles.link}>
        style={(isActive(routes.profile()) || hoverIndex === 1) ? styles.linkHover : styles.link}>
        <Person2OutlinedIcon style={styles.icon}/>
        Profile
      </Link>
      {/* <Link 
        to={routes.updateProfile()} 
        onMouseEnter={() => setHoverIndex(2)}
        onMouseLeave={() => setHoverIndex(null)}
        // style={hoverIndex === 2 ? styles.linkHover : styles.link}>
        style={(isActive(routes.updateProfile()) || hoverIndex === 2) ? styles.linkHover : styles.link}>
        <ManageAccountsOutlinedIcon style={styles.icon}/>
        Update Profile
      </Link> */}
      <Link 
        to={routes.changePassword()} 
        onMouseEnter={() => setHoverIndex(3)}
        onMouseLeave={() => setHoverIndex(null)}
        // style={hoverIndex === 3 ? styles.linkHover : styles.link}>
        style={(isActive(routes.changePassword()) || hoverIndex === 3) ? styles.linkHover : styles.link}>
        <VpnKeyOutlinedIcon style={styles.icon}/>
        Password
      </Link>
      <Link 
        to={routes.deleteAccount()} 
        onMouseEnter={() => setHoverIndex(4)}
        onMouseLeave={() => setHoverIndex(null)}
        // style={hoverIndex === 4 ? styles.linkHover : styles.link}>
        style={(isActive(routes.deleteAccount()) || hoverIndex === 4) ? styles.linkHover : styles.link}>
        <HighlightOffOutlinedIcon style={styles.icon}/>
        Delete My Account
      </Link>
    </div>
  )
}

const styles = {
  sidebar: {
    position: 'static',
    top: 0,
    left: 0,
    height: '100%',
    width: '270px',
    backgroundColor: '#D3D0CB',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: '200px',
    marginLeft: "25px"
  },
  link: {
    color: '#393E41',
    textDecoration: 'none',
    marginBottom: '1rem',
    marginLeft: '30px',
  },
  linkHover: {
    color: '#E7BB41', 
    textDecoration: 'underline', 
    marginBottom: '1rem', 
    marginLeft: '30px'
  },
  hr: {
    width: '1rem', 
    // border: '0.5px solid #393E41',
    // marginBottom: '20px', 
    marginTop: '.5rem', 
    borderBottom: 'solid .125rem #393E41',
    marginLeft: '30px',
    marginBottom: '2rem'
  },
  icon: {
    fontSize: '1rem',
    marginRight: '0.5rem', 
    position: 'relative',
    top: '0.15rem',
  },
};

export default Sidebar
