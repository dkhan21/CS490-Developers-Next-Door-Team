import { Link, routes, navigate } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { useAuth } from 'src/auth';
import { useState } from 'react';

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import Navbar from 'src/components/Navbar/Navbar'
import Sidebar from 'src/components/Sidebar/Sidebar'
import { createTheme, ThemeProvider } from '@mui/material';
import { Button, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#44BBA4',
    },
  },
});

const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($id: Int!) {
    deleteUser(id: $id){
      id
    }
  }

`

const DeleteAccountPage = () => {
  const {currentUser, logOut} = useAuth()
  const [deleteUser, { loading, error }] = useMutation(DELETE_USER_MUTATION, {
    onCompleted: () => {
      //show success message
      toast.success('Account successfully deleted') 
      logOut()
      navigate('/')
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleDeleteAccount = () => {
    setShowConfirmation(true)
  }

  const handleConfirmDelete = () => {
    if (currentUser){
      deleteUser({ variables: { id: currentUser.id }})
      setShowConfirmation(false)
    }else {
      console.log("currentUser is null or undefined")
    }
    
  }

  const handleCancelDelete = () => {
    setShowConfirmation(false)
  }

  const onSubmit = () => {
    if (confirm('Are you sure you want to delete your account?')){
      deleteUser({ variables: { id: currentUser.id }})
    }
  }

  return (
    <>
    <Navbar/>
    <div style={{ display: 'flex' }}>
    <Sidebar/>
    <div style = {{ flex: 1, marginRight: "300px" }}>
      <ThemeProvider theme={theme}>
        <Grid 
          container 
          direction="column" 
          alignItems="center" 
          justifyContent="center" 
          style={{ minHeight: '100vh'}}
        >
          <Grid item xs={12} style={{ textAlign: 'center', marginBottom: "20px "}}>
            <h1>Delete Account</h1>
          </Grid>
          <Grid item xs={12} style={{ textAlign: 'center', marginBottom: "20px "}}>
            <p style={{ marginBottom: "20px" }}>We're sorry to see you go.</p>
            <p>After confirming the deletion of your account, you will no longer have access to your 'Profile' space.</p>
          </Grid>
          <Grid item xs={12} container justifyContent="center">
            <Button variant="contained" color="error" onClick={handleDeleteAccount} disabled={loading}>
              Delete My Account
            </Button>
          </Grid>
        </Grid>
      </ThemeProvider>
      </div>
    </div>

    {/* Confirmation Dialog */}
    <Dialog open={showConfirmation} onClose={handleCancelDelete} aria-labelledby="delete-account-dialog-title">
        <DialogTitle id="delete-account-dialog-title">Delete Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDelete}>Confirm</Button>
          <Button onClick={handleCancelDelete}>Cancel</Button>
        </DialogActions>
      </Dialog>
  </>
  )
}

export default DeleteAccountPage
