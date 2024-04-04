import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { useEffect } from 'react'
import { useAuth } from 'src/auth'
import { useQuery, gql, useMutation } from '@apollo/client'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { Button, TextField, Box, Typography, Grid } from '@mui/material';
import Sidebar from 'src/components/Sidebar/Sidebar'
import Navbar from 'src/components/Navbar/Navbar'
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#44BBA4',
    },
  },
});

const USER_QUERY = gql`
  query FindUserById($id: Int!){
    user: user(id: $id){
      id
      email
      name
      preferredProgrammingLanguage
      preferredIDE
    }
  }
`

const ProfilePage = () => {
  const { currentUser, reauthenticate, logOut } = useAuth() 
  const { load, err, data } = useQuery(USER_QUERY, {
    variables: {id: currentUser?.id}
  })

  if (!currentUser){
    return <div>Loading...</div> 
  }

  if (err){
    console.error(err)
    return <div> Error: {err.message}</div>
  }

  return (
    <>
      <Navbar/>
      <div style={{ display: 'flex' }}>
      <Sidebar/>
      <div style = {{ flex: 1, marginRight: "300px" }}>
        <ThemeProvider theme={theme}>
          <Grid container direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '100vh'}}>
            <Grid item xs={12} style={{ textAlign: 'center', marginBottom: "20px "}}>
              <h1>Profile</h1>
            </Grid>
            <Grid item xs={12} container justifyContent="center">
              <Grid item style={{ maxWidth: '400px', width: '100%', marginBottom: '13px' }}>
                <Typography>Email: {currentUser.email}</Typography>
                {/* {data && data.user && <Typography>Name: {data.user.name} </Typography>} */}
                <Typography>Name: {data && data.user && data.user.name ? data.user.name : "Not set. Update your profile to add this information."}</Typography>
                <h3>Preferences</h3>
                {/* {data && data.user && <Typography>Preferred Programming Language: {data.user.preferredProgrammingLanguage}</Typography>} */}
                <Typography>Preferred Programming Language: {data && data.user && data.user.preferredProgrammingLanguage ? data.user.preferredProgrammingLanguage : "Not set. Update your profile to add this information."}</Typography>
                {/* {data && data.user && <Typography>Preferred IDE: {data.user.preferredIDE}</Typography>} */}
                <Typography>Preferred IDE: {data && data.user && data.user.preferredIDE ? data.user.preferredIDE : "Not set. Update your profile to add this information."}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </ThemeProvider>
        </div>
      </div>
    </>
  )
  
}

export default ProfilePage

