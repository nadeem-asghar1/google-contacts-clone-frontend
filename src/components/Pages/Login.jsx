import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/features/user';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router';

const theme = createTheme();

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    session: {
      email: '',
      password: ''
    },
    showPassword: false,
  });

  const handleChange = async (event) => {
    setState({
      ...state,
      session: {
        ...state.session,
        [event.target.name]: event.target.value
      }
    });
  };

  const handleShowPassword = () => {
    setState({
      ...state,
      showPassword: !state.showPassword
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (state.session.email === '') {
      toast.error('Please enter email');
    } else if (state.session.password === '') {
      toast.error('Please enter password');
    } else {
      try {
        let result = await dispatch(
          loginUser(state.session)
        );

        if (result.payload.status === 200) {
          navigate('/');
        } else {
          toast.error('Invalid email or password');
        }
      } catch (error) {
        toast.error('Something went wrong. Please try again later!');
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <ToastContainer />
        <CssBaseline />
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
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={state.session.email}
              onChange={handleChange}
              autoFocus
            />
            <FormControl sx={{ width: '100%', my: 1 }} variant="outlined">
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                type={state.showPassword ? 'text' : 'password'}
                onChange={handleChange}
                value={state.session.password}
                name="password"
                fullWidth
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {state.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid
              item
              display="flex"
              justifyContent="center"
              flexDirection="row"
            >
              <Link
                href="/sign_up"
                variant="body2"
                underline="none"
              >
                {"Don\'t have an account? Sign up"}
              </Link>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
