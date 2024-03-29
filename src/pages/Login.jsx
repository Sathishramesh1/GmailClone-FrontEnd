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
import {  styled, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import {useState} from 'react'
import useApi from '../hook/useApi';
import { API_URLS } from '../service/globalUrl';
import { cssTransition, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from 'react-redux';
import {setToken,setEmail} from '../components/redux-container/slices/emailSlice'
import { PageContainer,ImageContainer,OuterContainer,defaultTheme } from '../components/Styles/StyledComponent';
import 'react-toastify/dist/ReactToastify.css';
import "animate.css/animate.min.css";




export default function SignIn() {

  const dispatch=useDispatch();
  const navigate=useNavigate();
   const[user,setUser]=useState({ email:"",password:""});

  //calling end point from global url for login api
  const getlogin=useApi(API_URLS.getLogin);

  //function to handle login
  const handleSubmit =async(event) => {
    event.preventDefault();
    try {

      const zoomTransition = cssTransition({
        enter: 'animate__animated animate__zoomIn',
        exit: 'animate__animated animate__zoomOut',
      });
        
        const isSmallScreen=screen.width<600 ;

        toast.loading(<Loading >
          
<img src='https://freight.cargo.site/w/1000/q/94/i/7f291a5e5e6d65edb2dd80ffe2bea40e6b2d0caa189ab3e7711c20fb59732cf9/Gmail_01_Slide_01_Slide.gif'/>
          
</Loading>,{
            position:toast.POSITION.TOP_LEFT,
            transition: zoomTransition,  
           style:{
           width:isSmallScreen?"980px":"100vw",   
           },
            
          });

          
            
//calling login api
  const res= await getlogin.call(user,'');
  
    //  console.log(res);
        event.target.reset();
        toast.dismiss();
        if(res.status){
          const token=res.data.jwttoken
          dispatch(setToken(token));
          dispatch(setEmail(user.email));
          localStorage.setItem('token',token);
          toast.success("Login Successfully", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          navigate("/inbox");
         
        }else{
          toast.error("Unable to Login", {
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
       
  
    } 
    catch (error) {
       
        console.log("error",error); }};

    const handlechange=(e)=>{
        e.preventDefault();
        setUser({...user,[e.target.name]: e.target.value });
    }


    const handleDemo=()=>{
      setUser({...user,email:"sathishmech2k13@gmail.com",password:'1234567890'});
      handleSubmit();

    }

  return (
     <ThemeProvider theme={defaultTheme}>
     <OuterContainer>
     <PageContainer >
     <CssBaseline />
     <ImageContainer>
      <img  src='https://img.freepik.com/free-vector/global-data-security-personal-data-security-cyber-data-security-online-concept-illustration-internet-security-information-privacy-protection_1150-37336.jpg?w=740&t=st=1700028594~exp=1700029194~hmac=9511389d44aede87172248738a36d9dde2c247e89b1d6add191ce2dd8c2ac794'/>
      </ImageContainer>  
            <Container  maxWidth="xs" component="main">
        <CssBaseline />
       
       
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            
          }}
        >
         <Typography component="h1" variant="h5">
            Welcome to Gmail Clone
          </Typography>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" id='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handlechange}
              value={user.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handlechange}
              value={user.password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              Sign In
            </Button>
            <Button
              type="click"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
              onClick={handleDemo}
            >
              Demo Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forget" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
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
  
  "&>img":{
    objectFit:'contain',
    width:'100%',
    height:'100%'
  },
  '@media (max-width: 600px)': {
    display:'flex',
    width:'100vw',
    height:'100vh',
    placeItems:'center',
    "&>img":{
      objectFit:'contain',
      width:'100%',
      height:'100%',
      marginLeft:'60vw'
      
    },
  },
})
