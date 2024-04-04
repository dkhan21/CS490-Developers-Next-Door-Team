import { Link, routes, navigate} from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
// import { Form, Label, TextField, Submit, FieldError } from '@redwoodjs/forms'
import { toast } from '@redwoodjs/web/toast'
import { useAuth } from 'src/auth'
import { useMutation } from '@redwoodjs/web'
import Navbar from 'src/components/Navbar/Navbar'
import Sidebar from 'src/components/Sidebar/Sidebar'
import { createTheme, ThemeProvider } from '@mui/material';
import { Button, Box, TextField, Typography, Divider, Grid } from '@mui/material';
import InputLabel from '@material-ui/core/InputLabel';
import { useState } from 'react'

const theme = createTheme({
  palette: {
    primary: {
      main: '#44BBA4',
    },
  },
});

const CHANGE_PASSWORD_MUTATION = gql`
  mutation ChangePasswordMutation($email: String!, $newPassword: String!) {
    changePassword(email: $email, newPassword: $newPassword) {
      email
    }
  }

`


const ChangePasswordPage = () => {
  const { currentUser } = useAuth()
  const [changePassword, { loading, error }] = useMutation(CHANGE_PASSWORD_MUTATION, {
    onCompleted: () => {
      toast.success('Password changed successfully')
      console.log(newPassword)
      navigate('/')
    }, 
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  // const onSubmit = (data) => {
  //   if (data.newPassword !== data.confirmNewPassword){
  //     alert('Passwords do not match!')
  //   }else{
  //     changePassword( { variables: { ...data, email: currentUser.email } })
  //   }
    
  // }
  const onSubmit = (event) => { 
    event.preventDefault()
    if (newPassword !== confirmNewPassword){
      alert('Passwords do not match')
    }else{
      changePassword( { variables: { newPassword, email: currentUser.email } })
    }
  }

  return (
    // <div >
    //   <Form onSubmit={onSubmit} >
    //     <Label name="newPassword" errorClassName="error">New Password</Label>
    //     <TextField
    //       name="newPassword"
    //       placeholder="New Password"
    //       validation={{ required: true }}
    //       errorClassName='error'
    //     />
    //     <Label name="confirmNewPassword" errorClassName="error">Confirm New Password</Label>
    //     <TextField
    //       name="confirmNewPassword"
    //       placeholder="Confirm New Password"
    //       validation={{ required: true }}
    //       errorClassName='error'
    //     />
    //     <Submit disabled={loading}>Change Password</Submit>

    //     {error && <div className='error'>{error.message}</div>}
    //   </Form>
    // </div>

      <>
      <Navbar/>
      <div style={{ display: 'flex' }}>
      <Sidebar/>
      <div style = {{ flex: 1, marginRight: "300px" }}>
        <ThemeProvider theme={theme}>
          <Grid container direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '100vh'}}>
            <Grid item xs={12} style={{ textAlign: 'center', marginBottom: "20px "}}>
              <h1>Change Password</h1>
            </Grid>
            <Grid item xs={12} container justifyContent="center">
              <form onSubmit={onSubmit}>
                <Grid item style={{ width: '100%', marginBottom: '13px' }}>
                  {/* <InputLabel name="newPassword" errorClassName="error">New Password</InputLabel> */}
                  <TextField
                    label="New Password"
                    name="newPassword"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    // placeholder="New Password"
                    validation={{ required: true }}
                    errorClassName='error'
                    InputProps={{ style: { width: '300px' } }}
                  />
                </Grid>
                <Grid item >
                  {/* <InputLabel name="confirmNewPassword" errorClassName="error">Confirm New Password</InputLabel> */}
                  <TextField
                    label="Confirm New Password"
                    name="confirmNewPassword"
                    value={confirmNewPassword}
                    onChange={(event) => setConfirmNewPassword(event.target.value)}
                    // placeholder="Confirm New Password"
                    validation={{ required: true }}
                    errorClassName='error'
                    InputProps={{ style: { width: '300px' } }}
                  />
                </Grid>
                <Grid item xs={12} style={{ textAlign: 'center', marginTop: '10px' }}>
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

export default ChangePasswordPage
