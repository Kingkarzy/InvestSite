import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  // useTheme,
} from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from '../state/index';
import axios from 'axios';

const registerSchema = yup.object().shape({
  username: yup.string().required('required'),
  firstName: yup.string().required('required'),
  lastName: yup.string().required('required'),
  email: yup.string().email('invalid email').required('required'),
  password: yup.string().required('required'),
});

const loginSchema = yup.object().shape({
  username: yup.string().required('required'),
  password: yup.string().required('required'),
});

const initialValuesRegister = {
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const initialValuesLogin = {
  email: '',
  password: '',
};

const Form = () => {
  const [pageType, setPageType] = useState('login');
  // const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const isLogin = pageType === 'login';
  const isRegister = pageType === 'register';

  const register = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }

    try {
      const response = await axios.post(
        'http://localhost:3001/api/auth/register',
        formData
      );
      const savedUser = response.data;

      onSubmitProps.resetForm();

      if (savedUser) {
        setPageType('login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (values, onSubmitProps) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/api/auth/login',
        values
      );
      const loggedIn = response.data;

      onSubmitProps.resetForm();

      if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        navigate('/');
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <div className='h-screen background-gradient flex flex-col justify-center items-center'>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={
          isLogin ? initialValuesLogin : initialValuesRegister
        }
        validationSchema={isLogin ? loginSchema : registerSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          resetForm,
        }) => (
          <form
            onSubmit={handleSubmit}
            className='flex flex-col justify-center items-center p-6 rounded-md bg-white w-2/5 '
          >
            <Box
              display='grid'
              gap='30px'
              gridTemplateColumns='repeat(4, minmax(0, 1fr))'
              sx={{
                '& > div': {
                  gridColumn: isNonMobile ? undefined : 'span 4',
                },
              }}
            >
              {isRegister && (
                <>
                  <TextField
                    label='First Name'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name='firstName'
                    error={
                      Boolean(touched.firstName) &&
                      Boolean(errors.firstName)
                    }
                    helperText={touched.firstName && errors.firstName}
                    sx={{ gridColumn: 'span 2' }}
                  />
                  <TextField
                    label='Last Name'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name='lastName'
                    error={
                      Boolean(touched.lastName) &&
                      Boolean(errors.lastName)
                    }
                    helperText={touched.lastName && errors.lastName}
                    sx={{ gridColumn: 'span 2' }}
                  />
                  <TextField
                    label='Email'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name='email'
                    error={
                      Boolean(touched.email) && Boolean(errors.email)
                    }
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: 'span 4' }}
                  />
                </>
              )}
              <TextField
                label='Username'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                name='username'
                error={
                  Boolean(touched.username) &&
                  Boolean(errors.username)
                }
                helperText={touched.username && errors.username}
                sx={{ gridColumn: 'span 4' }}
              />
              <TextField
                label='Password'
                type='password'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name='password'
                error={
                  Boolean(touched.password) &&
                  Boolean(errors.password)
                }
                helperText={touched.password && errors.password}
                sx={{ gridColumn: 'span 4' }}
              />
            </Box>
            {/* BUTTONS */}
            <Box>
              <Button
                fullWidth
                type='submit'
                sx={{
                  m: '2rem 0',
                  p: '1rem',
                  backgroundColor: 'skyblue',
                  color: 'white',
                  '&:hover': { color: 'orange' },
                }}
              >
                {isLogin ? 'LOGIN' : 'REGISTER'}
              </Button>
              <Typography
                onClick={() => {
                  setPageType(isLogin ? 'register' : 'login');
                  resetForm();
                }}
                sx={{
                  textDecoration: 'underline',
                  color: 'skyblue',
                  '&:hover': {
                    cursor: 'pointer',
                    color: 'purple',
                  },
                }}
              >
                {isLogin
                  ? "Don't have an account? Sign Up here."
                  : 'Already have an account? Login here.'}
              </Typography>
            </Box>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Form;
