import { UserCreate } from './components/UserCreate'
import { UserTableView } from './components/UserTableView'
import { useEffect } from 'react';
import { Typography } from '@mui/material';
import { useUser } from '../../hooks/useUser';
import { initialAppUser } from '../../state/initialStates';
import { useForm } from '../../hooks/useForm';

export const UsersView = () => {
  const { appUsers, getAllAsync } = useUser();
  const { form, setForm, setStateForm } = useForm(initialAppUser);

  useEffect(() => {
    getAllAsync().then();
  }, [])

  return (
    <>
        <Typography variant="h2" gutterBottom>
            Usuarios
        </Typography>
        <UserCreate/>
        <UserTableView rows={appUsers} setStateForm={setStateForm}/>
    </>
  )
}
