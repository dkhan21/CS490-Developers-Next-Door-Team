import * as React from 'react'; 
import { Link, routes } from '@redwoodjs/router'
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" component="nav" sx={{backgroundColor: '#393E41'}}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to={routes.home()}
            sx={{
              mr: 2,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#E7E5DF',
              textDecoration: 'none',
            }}
            aria-label='Code Harbor'
          >
            Code Harbor
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
            {/* <Link to={routes.}> */}
              <Button color="inherit" sx={{ 
                color: '#E7E5DF',
                position: 'relative',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: '1px',
                  backgroundColor: 'currentColor',
                  transform: 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 0.5s ease-in-out',
                },
                '&:hover:after': {
                  transform: 'scaleX(1)',
                  color: '#E7BB41',
                },
                '&:hover':{
                  color:'#E7BB41',
                }
              }}
              aria-label='About'
              >About</Button>
            {/* </Link> */}

            {/* <Link to={routes.}> */}
              <Button color="inherit" sx={{ 
                color: '#E7E5DF',
                position: 'relative',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: '1px',
                  backgroundColor: 'currentColor',
                  transform: 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 0.5s ease-in-out',
                },
                '&:hover:after': {
                  transform: 'scaleX(1)',
                  color: '#E7BB41',
                },
                '&:hover':{
                  color:'#E7BB41',
                }
              }}
              aria-label="Get Started"
              >Get Started</Button>
            {/* </Link> */}

            {/* <Link to={routes.}> */}
              <Button color="inherit" sx={{ 
                color: '#E7E5DF',
                position: 'relative',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: '1px',
                  backgroundColor: 'currentColor',
                  transform: 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 0.5s ease-in-out',
                },
                '&:hover:after': {
                  transform: 'scaleX(1)',
                  color: '#E7BB41',
                },
                '&:hover':{
                  color:'#E7BB41',
                }
              }}
              aria-label="Login"
              >Login</Button>
            {/* </Link> */}

        </Toolbar>
      </AppBar>
    </Box>

  )
}

export default Navbar