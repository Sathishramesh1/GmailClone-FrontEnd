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
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import useApi from '../hook/useApi';
import { API_URLS } from '../service/globalUrl';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PageContainer,ImageContainer,OuterContainer,defaultTheme } from '../components/Styles/StyledComponent';






export default function Reset() {
const naviagte=useNavigate();
const [reset,setReset]=useState({password:''});
const {resetToken}=useParams(); 

const getReset=useApi(API_URLS.getReset);

  console.log(resetToken)
  const handleSubmit = async(event) => {
    event.preventDefault();
    event.target.reset();
    try {
     const res= await getReset.call(reset,'',resetToken);

     if(res.status){
      console.log("password resetted succesfully");  

      toast.success("Password reset Successfully", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
     naviagte('/');

     }else{
      toast.error("Unable to reset Password", {
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
   
  };

  const handlechange=(e)=>{
    e.preventDefault();
    setReset({...reset,[e.target.name]: e.target.value });
  console.log(reset);
}

  return (
    <ThemeProvider theme={defaultTheme} >
    <OuterContainer>
    <PageContainer>
    <ImageContainer>
      <img src='https://img.freepik.com/free-vector/reset-password-concept-illustration_114360-7966.jpg?w=740&t=st=1700037856~exp=1700038456~hmac=34852438feee49c73b5a2b3dfd1e120887dc2d6a79825ec1d2e146a899c7df82' alt='reset-password'/>
    </ImageContainer>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            // marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Enter new Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handlechange}
            />
                       
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save new Password
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/" variant="body2">
                  Login
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
