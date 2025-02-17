
import {  Avatar, Box, Button, Container, TextField, Typography } from '@mui/material'
import { PasswordTextField } from './components/PasswordTextField'
import { FormEvent } from 'react'
import { UserLogin } from '../../data/Entities/UserLogin';
import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import { inventoryAlert } from '../../ui/Alert/InventoryAlert';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const initialData:UserLogin = {
    email: '',
    password: ''
}
export const LoginView = () => {
    const navigate = useNavigate();
    const request = useAuth();
    const { form, setForm } = useForm(initialData);
    const { state } = useLocation();
    function handleSubmit(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        request.loginAsync(form).then(() => {
            navigate(state?.path || "/app/home");
        })
        .catch((e:any) => {
            inventoryAlert(e.response?.data?.Message ?? "Unexpected error")
        })
    }
  
  return (
    <Container fixed>
         <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              autoFocus
              name='email'
              label="Email"
              placeholder='ej: usuario123'
              value={form.email}
              onChange={e => {
                  setForm(e.target.value, "email")
              }}
            />
            <PasswordTextField name={"Password"}
                value={form.password}
                onChange={e => {
                setForm(e.target.value, "password")
                }}
                />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar sesión
            </Button>
          </Box>
        </Box>
    </Container>
  )
}
