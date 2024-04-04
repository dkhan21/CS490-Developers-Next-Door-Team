import { Link, routes, navigate } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { useAuth } from 'src/auth'
import { gql, useMutation } from '@apollo/client'
import { useState } from 'react'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { Button, Box, TextField, Typography, Divider, Grid } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from 'src/components/Navbar/Navbar'
import Sidebar from 'src/components/Sidebar/Sidebar'
import { createTheme, ThemeProvider } from '@mui/material';


const useStyles = makeStyles({
  textField: {
    width: '300px',  
  },
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#44BBA4',
    },
  },
});

const UPDATE_USER_MUTATION = gql`
  mutation UpdatedUserMutation($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      email
      name
    }
  }

`

const UpdateProfilePage = () => {
  const { currentUser, reauthenticate } = useAuth() 
  const classes = useStyles()
  const [updateUser, {loading: updating, error: updateError}] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: (response) => {
      // toast.success('Profile updated successfully')
      navigate(routes.profile())
    },
  })

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [preferredProgrammingLanguage, setPreferredProgrammingLanguage] = useState('')
  const [preferredIDE, setPreferredIDE] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()

    const input = {
      id: currentUser.id,
      email: email || currentUser.email,
      name: name || currentUser.name, 
      preferredProgrammingLanguage: preferredProgrammingLanguage || currentUser.preferredProgrammingLanguage, 
      preferredIDE: preferredIDE || currentUser.preferredIDE,
    }

    const variables = { input }
    updateUser({ variables }).then(reauthenticate)
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
              <h1>Update Profile</h1>
            </Grid>
            <Grid item xs={12} container justifyContent="center">
              <form onSubmit={onSubmit}>
                <Grid item xs={12} style={{ maxWidth: '400px', width: '100%', marginBottom: '-10px' }}>
                  <TextField
                    label="Email"
                    name="email"
                    value={currentUser.email}
                    onChange={(event) => setEmail(event.target.value)}
                    fullWidth
                    margin="normal"
                    disabled
                  />
                </Grid>
                <Grid item className={classes.textField}>
                  <TextField
                    label="Name"
                    name="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} style={{ textAlign: 'left', marginTop: '20px' }}>
                  <h3>Preferences</h3>
                </Grid>
                <Grid item xs={12} style={{ maxWidth: '300px', width: '100%', marginBottom: '-10px' }}>
                  <TextField
                    label="Preferred Programming Language"
                    name="preferredProgrammingLanguage"
                    value={preferredProgrammingLanguage}
                    onChange={(event) => setPreferredProgrammingLanguage(event.target.value)}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item className={classes.textField}>
                  <TextField
                    label="Preferred IDE"
                    name="preferredIDE"
                    value={preferredIDE}
                    onChange={(event) => setPreferredIDE(event.target.value)}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                  <Button type="submit" variant="contained" sx={{ bgcolor: '#44BBA4', '&:hover': { bgcolor: '#E7BB41' }}}>
                    Update Profile
                  </Button>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </ThemeProvider>
        </div>
      </div>
    </>
  )
  
}

export default UpdateProfilePage
