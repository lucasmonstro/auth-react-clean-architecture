import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import cookies from 'js-cookie';
import { FormEvent } from 'react';
import { Input } from '../../../useCases/login';
import useLogin from '../hooks/useLogin';
import Copyright from './Copyright';

const Login = () => {
  const { loginUseCase, invalidCredentials } = useLogin();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const input: Input = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };
    const jwt = await loginUseCase(input);
    if (!jwt) {
      return;
    }
    cookies.set('accessToken', jwt.accessToken);
  };
  return (
    <Container component='main' maxWidth='xs'>
      <Stack direction='column' sx={{ marginTop: 8, alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            data-testid='email'
            name='email'
            margin='normal'
            required
            fullWidth
            label='Email Address'
            autoComplete='email'
            autoFocus
          />
          <TextField
            data-testid='password'
            name='password'
            type='password'
            margin='normal'
            required
            fullWidth
            label='Password'
            autoComplete='current-password'
          />
          <Button
            data-testid='submit'
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3 }}
          >
            Login
          </Button>
          {invalidCredentials && (
            <Alert
              data-testid='invalidCredentialsAlert'
              severity='error'
              sx={{ mt: 2 }}
            >
              Invalid credentials
            </Alert>
          )}
        </Box>
      </Stack>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default Login;
