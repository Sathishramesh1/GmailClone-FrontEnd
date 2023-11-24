import * as React from 'react';
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
import {  ThemeProvider, styled } from '@mui/material/styles';
import { API_URLS } from '../service/globalUrl';
import useApi from '../hook/useApi';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { cssTransition, toast } from 'react-toastify';
import {  useNavigate } from 'react-router-dom';
import { PageContainer,ImageContainer,OuterContainer,defaultTheme } from '../components/Styles/StyledComponent';
import { BounceLoader } from 'react-spinners';






//valiadation schema
const validationSchema = yup.object({
    name: yup
      .string('Enter your name')
    //   .name('Enter a valid name')
      .required('Name is required'),
      email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),

    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
  });



export default function SignUp() {
 
const navigate=useNavigate();

//calling end point from global url
const getRegister=useApi(API_URLS.getRegister);





//function to handle submit in registration
const handleSubmit = async() => {    
 
   try {  
    
    const zoomTransition = cssTransition({
      enter: 'animate__animated animate__zoomIn',
      exit: 'animate__animated animate__zoomOut',
    });
      
      const isSmallScreen=screen.width<600 ;


    toast.loading(<Loading>
         <BounceLoader
  color="#1d71e2"
  size={200}
  cssOverride={{margin:'15% auto'}}/>
      
    </Loading>,{
       position:toast.POSITION.TOP_LEFT,
            transition: zoomTransition,  
           style:{
           width:isSmallScreen?"980px":"100vw",   }

    })
  const res= await getRegister.call(formik.values,'');
  toast.dismiss();
  if(res.status){
    toast.success("Registered Successfully", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    navigate('/');
    
  }else{
    
    toast.error("Unable to Register", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
   
} catch (error) {
    console.log(error);
}
}

//formik validation
const formik = useFormik({
  initialValues: {
    name: '',
    email:'',
    password: '',
  },
  validationSchema: validationSchema,
  onSubmit: () => {
     handleSubmit();
     formik.resetForm();
  },
});




  return (
    <ThemeProvider theme={defaultTheme}>
   
    <OuterContainer>
    <PageContainer>
    <CssBaseline />
    <ImageContainer>
    <img src='https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7965.jpg?w=740&t=st=1700032705~exp=1700033305~hmac=e410b5ac02984a6bda1c1c33c7ce69c68af4dcc7ca6e0b1f261dad34b13681db' alt='register-illustration image'/>
    </ImageContainer>
      <Container component="main" maxWidth="xs"  > 
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="First Name"
                  autoFocus
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                 error={formik.touched.name && Boolean(formik.errors.name)}
                 helperText={formik.touched.name && formik.errors.name}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                 />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
      
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I Accepts terms and conditions."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      
      </Container>
      </PageContainer>
      </OuterContainer>
    
    </ThemeProvider>
  );
}

const Loading=styled('div')({
  display:'flex',
  width:"100vw",
  height:'100vh',
  placeItems:'center',


})