// src/layouts/PageLayout/PageLayout.js
import { Button } from '@mui/material';
import { Link, routes } from '@redwoodjs/router';
import Navbar from 'src/components/Navbar/Navbar'

const PageLayout = ({ title, subtitle, children }) => (
  <div style={{ margin: '0 auto', maxWidth: '900px', marginTop: '140px' }}>
    <header><Navbar/></header>
    <h1 style={{ textAlign: 'center', marginBottom: "20px " }}>{title}</h1>
    <Button sx={{
                color: '#FFFFFF',
                backgroundColor: '#393E41',
                position: 'relative',
                width: '100px', 
                height: '32px',
                borderRadius: '10px',
                marginBottom: '40px', 
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
                // '&:hover:after': {
                //   transform: 'scaleX(1)',
                //   color: '#E7BB41',
                // },
                '&:hover':{
                  color:'#FFFFFF',
                  backgroundColor: '#E7BB41'
                }
              }}
             component={Link} to={routes.userGuides()}>
      Back
    </Button>
    <h2 style={{ marginBottom: '30px' }}>{subtitle}</h2>
    {children}
  </div>
);

export default PageLayout;
