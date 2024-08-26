import React, { useEffect, useRef, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { signUpUser, checkEmailAvailability } from '../../redux/features/user';
import ReCAPTCHA from 'react-google-recaptcha';

const theme = createTheme();

const SignUp = () => {

  const dispatch = useDispatch();
  const emailInputRef = useRef();
  const reCaptchaRef = useRef();
  const [state, setState] = useState({
    newUser: {
      name: '',
      email: '',
      phone: '',
      password: '',
      passwordConfirmation: ''
    },
    showPassword: false,
  });

  const [emailAvailability, setEmailAvailability] = useState({
    message: '',
    error: false
  });

  const handleChange = async (event) => {
    setState({
      ...state,
      newUser: {
        ...state.newUser,
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

  const checkEmailPattern = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  useEffect(() => {
    async function fetchData(email) {
      const result = await dispatch(
        checkEmailAvailability(email)
      );

      setEmailAvailability({
        message: result.payload.data.message,
        error: result.payload.data.error
      })

      if (result.payload.status === 404) {
        emailInputRef.current.style.color = '#d32f2f';
      } else {
        emailInputRef.current.style.color = '';
      }
    }

    if (checkEmailPattern(state.newUser.email)) {
      fetchData(state.newUser.email);
    }
  }, [state.newUser.email, dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (state.newUser.name === '') {
      toast.error('Please enter name');
    } else if (state.newUser.email === '') {
      toast.error('Please enter email');
    } else if (state.newUser.phone === '') {
      toast.error('Please enter phone number');
    } else if (state.newUser.password === '') {
      toast.error('Please enter password');
    } else if (state.newUser.password_confirmation === '') {
      toast.error('Please enter password confirmation');
    } else if (state.newUser.password !== state.newUser.passwordConfirmation) {
      toast.error('Password and password confirmation don\'t match');
    } else if (!reCaptchaRef.current.getValue()) {
      toast.error('Please verify that you aren\'t robot');
    } else {
      try {
        let user = {
          name: state.newUser.name,
          email: state.newUser.email,
          phone: state.newUser.phone,
          password: state.newUser.password
        }
        let result = await dispatch(
          signUpUser(user)
        );
        if (result.payload.status === 201) {
          toast.success('Signed up successfully');
        } else {
          toast.error('Something went wrong. Please try again later!');
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
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoFocus
              value={state.newUser.name}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={state.newUser.email}
              onChange={handleChange}
              inputRef={emailInputRef}
              helperText={emailAvailability.message}
              error={emailAvailability.error}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone number"
              name="phone"
              value={state.newUser.phone}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={state.showPassword ? "text" : "password"}
              id="password"
              value={state.newUser.password}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="passwordConfirmation"
              label="Password"
              type={state.showPassword ? "text" : "password"}
              id="passwordConfirmation"
              value={state.newUser.passwordConfirmation}
              onChange={handleChange}
            />
            <Grid
              item
              display="flex"
              justifyContent="end"
              flexDirection="row"
            >
              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    color="primary"
                    checked={state.showPassword}
                    onChange={handleShowPassword}
                  />}
                label="Show password"
              />
            </Grid>
            <ReCAPTCHA
              sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY}
              ref={reCaptchaRef}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid
              item
              display="flex"
              justifyContent="center"
              flexDirection="row"
            >
              <Link
                href="/login"
                variant="body2"
                underline="none"
              >
                {"Already have an account? Login"}
              </Link>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
