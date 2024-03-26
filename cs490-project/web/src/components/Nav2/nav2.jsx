import * as React from 'react';
import { Link, routes } from '@redwoodjs/router';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Nav2 = () => {
  const [anchorEl1, setAnchorEl1] = React.useState(null);

  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  return (
    <Box style={{ flexGrow: 1 }}>
      <AppBar position="fixed" component="nav" style={{ backgroundColor: '#393E41' }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to={routes.home()}
            style={{
              mr: 2,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#E7E5DF',
              textDecoration: 'none',
            }}
            aria-label="Code Harbor"
          >
            Code Harbor
          </Typography>

          <Box style={{ flexGrow: 1 }} />
          <Link to={`${routes.home()}#section-about`}>
            <Button
              color="inherit"
              sx={{
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
                },
              }}
              aria-label="About"
            >
              <p>About</p>
            </Button>
          </Link>
          <Link to={`${routes.home()}#section-works`}>
            <Button
              color="inherit"
              sx={{
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
                },
              }}
              aria-label="Instructions"
            >
              <p>Instructions</p>
            </Button>
          </Link>
          <Link to={routes.translate()}>
            <Button
              color="inherit"
              sx={{
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
                },
              }}
              aria-label="Get Started"
            >
              Get Started
            </Button>
          </Link>

          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick1}
            color="inherit"
            sx={{
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
              },
            }}
            aria-label="Help"
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
            <Link to={routes.faq()}>
              <MenuItem onClick={handleClose1} style={{ color: 'black', padding: '8px' }}>
                FAQs
              </MenuItem>
            </Link>
            <Link to={routes.userGuides()}>
              <MenuItem onClick={handleClose1} style={{ color: 'black', padding: '8px' }}>
                User Guides
              </MenuItem>
            </Link>
            <Link to={routes.resources()}>
              <MenuItem onClick={handleClose1} style={{ color: 'black', padding: '8px' }}>
                Resources
              </MenuItem>
            </Link>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Nav2;
