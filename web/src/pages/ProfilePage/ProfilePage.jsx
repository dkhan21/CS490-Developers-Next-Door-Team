import { Link, routes } from '@redwoodjs/router';
import { Metadata } from '@redwoodjs/web';
import { useEffect, useState } from 'react';
import { useAuth } from 'src/auth';
import { useQuery, gql, useMutation } from '@apollo/client';
import { toast, Toaster } from '@redwoodjs/web/toast';
import { TextField } from '@mui/material';
import Sidebar from 'src/components/Sidebar/Sidebar';
import Navbar from 'src/components/Navbar/Navbar';
import { createTheme, ThemeProvider } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem, Select, FormControl, InputLabel, Button, Grid } from '@mui/material';

const languages = ['JavaScript', 'Python', 'Java', 'C++', 'Ruby', 'Swift', 'Not specified'];
const IDEs = ['Visual Studio Code', 'PyCharm', 'Eclipse', 'IntelliJ IDEA', 'Xcode', 'Atom', 'Not specified'];

const theme = createTheme({
  palette: {
    primary: {
      main: '#44BBA4',
    },
  },
});

const useStyles = makeStyles({
  textField: {
    width: '300px',
  },
});

export const USER_QUERY = gql`
  query FindUserById($id: Int!) {
    user: user(id: $id) {
      id
      email
      name
      preferredProgrammingLanguage
      preferredIDE
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation UpdatedUserMutation($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      email
      name
    }
  }
`;

const ProfilePage = () => {
  const { currentUser, reauthenticate } = useAuth();
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [preferredProgrammingLanguage, setPreferredProgrammingLanguage] = useState('');
  const [preferredIDE, setPreferredIDE] = useState('');
  const [nameError, setNameError] = useState('');
  const [languageError, setLanguageError] = useState('');
  const [ideError, setIdeError] = useState('');
  const [isToastShowing, setIsToastShowing] = useState(false);

  const { load, err, data } = useQuery(USER_QUERY, {
    variables: { id: currentUser?.id },
  });

  // Update state variables with user data when available
  useEffect(() => {
    if (data && data.user) {
      setEmail(data.user.email || '');
      setName(data.user.name || '');
      setPreferredProgrammingLanguage(data.user.preferredProgrammingLanguage || '');
      setPreferredIDE(data.user.preferredIDE || '');
      console.log('success');
    }
  }, [data]);

  const [updateUser, { loading: updating, error: updateError }] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: () => {
      reauthenticate();
      // toast.success('Profile updated successfully', { toastId: 'profile-update-toast', autoClose: false });
      if (!isToastShowing) { // Check if toast is not already showing
        setIsToastShowing(true); // Set isToastShowing to true to prevent multiple toasts
        toast.success('Profile updated successfully', { toastId: 'profile-update-toast', autoClose: false }); // Show the toast
        setTimeout(() => {
          setIsToastShowing(false); // Reset isToastShowing after a delay
        }, 5000); // Adjust the delay as needed
      }
    },
  });

  // if (updateError){
  //   return <div>Error: {updateError.message}</div>
  // }

  const onSubmit = (event) => {
    event.preventDefault();

    // Reset error messages
    setNameError('');
    setLanguageError('');
    setIdeError('');

    // Validation
    if (name && name.length > 50) {
      setNameError('Name is too long. Please enter a name that is 50 characters or less.');
      return;
    }
    
    if(!/^[A-Za-z\s-]*$/.test(name)) {
      setNameError('Name contains invalid characters. Please enter a name that only contains letters, spaces, and hyphens.');
      return;
    }

    //if name field is intentionally cleared 
    const nameInput = name ? name : null; 

    const input = {
      id: currentUser.id,
      email: email || currentUser.email,
      name: nameInput,
      preferredProgrammingLanguage: preferredProgrammingLanguage !== '' ? preferredProgrammingLanguage : null,
      preferredIDE: preferredIDE !== '' ? preferredIDE : null,
    };

    const variables = { input };
    updateUser({ variables });
  };

  // if (!currentUser) {
  //   return <div>Loading...</div>;
  // }

  if (err) {
    console.error(err);
    return <div>Error: {err.message}</div>;
  }

  return (
    <>
      <Navbar />
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1, marginRight: '300px' }}>
          <ThemeProvider theme={theme}>
            <Grid container direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
              <Grid item xs={12} style={{ textAlign: 'center', marginBottom: '20px ' }}>
                <h1>Profile</h1>
              </Grid>
              <Grid item xs={12} container justifyContent="center">
                <form onSubmit={onSubmit}>
                  <Grid item xs={12} style={{ maxWidth: '400px', width: '100%', marginBottom: '-10px' }}>
                    <TextField
                      label="Email*"
                      name="email"
                      value={email}
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
                      error={!!nameError}
                      helperText={nameError}
                    />
                  </Grid>
                  <Grid item xs={12} style={{ textAlign: 'left', marginTop: '20px' }}>
                    <h3>Preferences</h3>
                  </Grid>
                  <Grid item xs={12} style={{ maxWidth: '300px', width: '100%', marginBottom: '-10px' }}>
                    {/* <TextField
                      label="Preferred Programming Language"
                      name="preferredProgrammingLanguage"
                      value={preferredProgrammingLanguage}
                      onChange={(event) => setPreferredProgrammingLanguage(event.target.value)}
                      fullWidth
                      margin="normal"
                      error={!!languageError}
                      helperText={languageError}
                    /> */}
                     <FormControl fullWidth style={{ marginTop: '1rem' }}>
                      <InputLabel id="preferred-language-label" >Preferred Programming Language</InputLabel>
                      <Select
                        labelId="preferred-language-label"
                        label = "Preferred Programming Language"
                        value={preferredProgrammingLanguage}
                        onChange={(event) => setPreferredProgrammingLanguage(event.target.value)}
                        fullWidth
                      >
                        {languages.map((language) => (
                          <MenuItem key={language} value={language}>
                            {language}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item className={classes.textField}>
                    {/* <TextField
                      label="Preferred IDE"
                      name="preferredIDE"
                      value={preferredIDE}
                      onChange={(event) => setPreferredIDE(event.target.value)}
                      fullWidth
                      margin="normal"
                      error={!!ideError}
                      helperText={ideError}
                    /> */}
                    <FormControl fullWidth style={{ marginTop: '24px', marginBottom: '10px' }}>
                      <InputLabel id="preferred-ide-label">Preferred IDE</InputLabel>
                      <Select
                        labelId="preferred-ide-label"
                        label="Preferred IDE"
                        value={preferredIDE}
                        onChange={(event) => setPreferredIDE(event.target.value)}
                        fullWidth
                      >
                        {IDEs.map((ide) => (
                          <MenuItem key={ide} value={ide}>
                            {ide}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <Button type="submit" variant="contained" sx={{ bgcolor: '#44BBA4', '&:hover': { bgcolor: '#E7BB41' } }}>
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
  );
};

export default ProfilePage;
