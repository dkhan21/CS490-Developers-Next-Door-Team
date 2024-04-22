import * as React from 'react'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { IoClose, IoMenu } from 'react-icons/io5'

import { Link } from '@redwoodjs/router'

const Navbar = () => {
  const [anchorEl1, setAnchorEl1] = React.useState(null)
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  // const open = Boolean(anchorEl);

  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget)
  }

  const handleClose1 = () => {
    setAnchorEl1(null)
  }
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  const handleButtonClick = () => {
    setIsMenuOpen(false)
  }
  return (
    <Box style={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        component="nav"
        style={{ backgroundColor: '#393E41' }}
      >
        <Toolbar>
          <Typography
            className="nav__brand"
            variant="h6"
            noWrap
            component={Link}
            to={'/'}
            sx={{
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
          <div className={`nav__list ${isMenuOpen ? 'open' : ''}`}>
            <div onClick={handleButtonClick}>
              <Link to={`${'/'}#section-about`}>
                <Button
                  style={{ color: 'white' }}
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
            </div>
            <div onClick={handleButtonClick}>
              <Link to={`${'/'}#section-works`}>
                <Button
                  style={{ color: 'white' }}
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
                  aria-label="Workings"
                >
                  <p>Instructions</p>
                </Button>
              </Link>
            </div>
            <div onClick={handleButtonClick}>
              <Link to={'/translate'}>
                <Button
                  style={{ color: 'white' }}
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
            </div>

            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick1}
              style={{ color: 'white' }}
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
              style={{ width: '50%' }}
            >
              <div onClick={handleButtonClick}>
                <Link to={'/faq'}>
                  <MenuItem
                    onClick={handleClose1}
                    style={{ color: 'black', padding: '8px' }}
                  >
                    FAQs
                  </MenuItem>
                </Link>
              </div>
              <div onClick={handleButtonClick}>
                <Link to={'/user-guides'}>
                  <MenuItem
                    onClick={handleClose1}
                    style={{ color: 'black', padding: '8px' }}
                  >
                    User Guides
                  </MenuItem>
                </Link>
              </div>
              <div onClick={handleButtonClick}>
                <Link to={'/resources'}>
                  <MenuItem
                    onClick={handleClose1}
                    style={{ color: 'black', padding: '8px' }}
                  >
                    Resources
                  </MenuItem>
                </Link>
              </div>
            </Menu>
          </div>
          <div className="menu-button-container">
            <IconButton onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? (
                <IoClose className="menu-icon" />
              ) : (
                <IoMenu className="menu-icon" />
              )}
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
