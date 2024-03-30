import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { useEffect } from 'react'
import { useAuth } from 'src/auth'
import { useQuery, gql, useMutation } from '@apollo/client'
import { toast, Toaster } from '@redwoodjs/web/toast'

const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($id: Int!) {
    deleteUser(id: $id){
      id
    }
  }

`
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

  const [deleteUser, { loading, error }] = useMutation(DELETE_USER_MUTATION, {
    onCompleted: () => {
      //show success message
      alert('Account successfully deleted') 
      logOut()
      navigate('/')
    },
  })

  const onClickDelete = () => {
    if (confirm('Are you sure you want to delete your account?')){
      deleteUser({ variables: { id: currentUser.id }})
    }
  }


  if (!currentUser){
    return <div>Loading...</div> 
  }

  if (err){
    console.error(err)
    return <div> Error: {err.message}</div>
  }

  return (
    <>
      <Metadata title="Profile" description="Profile page" />
      <p>
        Email: {currentUser.email}
      </p>
      <p>{data && data.user && <p>Name: {data.user.name}</p>}</p>
      <p>Preferences</p>
      <p>{data && data.user && <p>Preferred Programming Language: {data.user.preferredProgrammingLanguage}</p>}</p>
      <p>{data && data.user && <p>Preferred IDE: {data.user.preferredIDE}</p>}</p>
      <div style={{ marginTop: '10px' }}>
        <Link to={routes.updateProfile()} style={{ color: 'black' }} onMouseOver={(e) => e.target.style.color = 'gray'}
        onMouseOut={(e) => e.target.style.color = 'black'}>
          Update Profile
        </Link>
      </div>
      <div>
        <Link to={routes.changePassword()} style={{ color: 'black' }} onMouseOver={(e) => e.target.style.color = 'gray'}
        onMouseOut={(e) => e.target.style.color = 'black'}>
          Change Password
        </Link>
      </div>
      <div>
        <button onClick={onClickDelete}>Delete Account</button>
      </div>
    </>
  )
  
}

export default ProfilePage

