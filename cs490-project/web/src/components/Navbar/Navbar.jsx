
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
  if (isAuthenticated) {
    const userEmail = currentUser.email;
    // Proceed with rendering or operations involving userEmail
  }

  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);

  // const open = Boolean(anchorEl);

  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = (event) => {
    setAnchorEl2(null);
  }
  return (
    <Box style={{ flexGrow: 1 }}>
      <AppBar position="fixed" component="nav" style={{ backgroundColor: '#393E41' }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to={"/"}
            style={{
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


          <Box style={{ flexGrow: 1 }} />
          <Link to={`${"/"}#section-about`}>
            <Button color="inherit" style={{
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
              '&:hover': {
                color: '#E7BB41',
              }
            }}
              aria-label='About'
            ><p>About</p></Button>
          </Link>
          <Link to={`${"/"}#section-works`}>
            <Button color="inherit" style={{
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
              '&:hover': {
                color: '#E7BB41',
              }
            }}
              aria-label='Workings'
            ><p>Instructions</p></Button>
          </Link>
          <Link to={'/translate'}>
            <Button color="inherit" style={{
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
              '&:hover': {
                color: '#E7BB41',
              }
            }}
              aria-label="Get Started"
            >Get Started</Button>
          </Link>

          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick1}
            color="inherit" style={{
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
              '&:hover': {
                color: '#E7BB41',
              }
            }}
            aria-label="UserEmail"
          >
            Help
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl1}
            open={Boolean(anchorEl1)}
            onClose={handleClose1}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            style={{ width: '10%' }}
          >
            <Link to={"/faq"}><MenuItem onClick={handleClose1} style={{ color: 'black', padding: '8px' }}>FAQs</MenuItem></Link>
            <Link to={"/user-guides"}><MenuItem onClick={handleClose1} style={{ color: 'black', padding: '8px' }}>User Guides</MenuItem></Link>
            <Link to={"/resources"}><MenuItem onClick={handleClose1} style={{ color: 'black', padding: '8px' }}>Resources</MenuItem></Link>
          </Menu>

          {!isAuthenticated && (
            <Link to={"/login"}>
              <Button color="inherit" style={{
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
                '&:hover': {
                  color: '#E7BB41',
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
                onClick={handleClick2}
                color="inherit" style={{
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
                  '&:hover': {
                    color: '#E7BB41',
                  }

                }}
                aria-label="UserEmail"
              >
                {currentUser.email}
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl2}
                open={Boolean(anchorEl2)}
                onClose={handleClose2}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                style={{ width: '10%' }}
              >
                <Link to={routes.profile()}><MenuItem onClick={handleClose2} style={{ color: 'black', padding: '8px' }}>Profile</MenuItem></Link>

                <Link to={routes.home()}><MenuItem onClick={logOut} style={{ color: 'black', padding: '8px' }}>Logout</MenuItem></Link>

              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
