
import * as React from 'react';
import { Link, routes } from '@redwoodjs/router'
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import { useAuth } from 'src/auth'
import MenuItem from '@mui/material/MenuItem';

const Navbar = () => {
  const { isAuthenticated, currentUser, logOut } = useAuth()

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
            <Link to={`${routes.home()}#section-about`}>
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
              ><a href="section-about">About</a></Button>
            </Link>
            <Link to={`${routes.home()}#section-works`}>
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
              aria-label='Workings'
              ><a href="#section-works">Instructions</a></Button>
            </Link>
            <Link to={routes.translate()}>
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
            </Link>


            {!isAuthenticated && (
              <Link to={routes.login()}>
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
              </Link>
            )}

            {isAuthenticated && (
              <>
                <Button
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  color="inherit" sx={{
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
                  aria-label="UserEmail"
                >
                  {currentUser.email}
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <Link to={routes.profile()}><MenuItem onClick={handleClose} style={{color: 'black'}}>Profile</MenuItem></Link>
                  <Link to={routes.home()}><MenuItem onClick={logOut} style={{color: 'black'}}>Logout</MenuItem></Link>

                </Menu>
              </>
            )}





        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
