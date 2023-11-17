import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {  ThemeProvider } from '@mui/material/styles';
import useApi from '../hook/useApi';
import { API_URLS } from '../service/globalUrl';
import { toast } from 'react-toastify';
import { PageContainer,ImageContainer,OuterContainer ,defaultTheme} from '../components/Styles/StyledComponent';






export default function Forget() {

    const [email,setEmail]=useState({email:""});

    //api for forget password
const getForget=useApi(API_URLS.getForget);
   


//function to handle submit
  const handleSubmit = async(event) => {
    event.preventDefault();
   
    try {
    const res=await  getForget.call(email,'')
    event.target.reset();
    if(res.status){
      toast.success("mail send Successfully", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

    }else{
      toast.error("Unable to send mail", {
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


//function to handle change
  const handlechange=(e)=>{
    e.preventDefault();
    setEmail({...email,[e.target.name]: e.target.value });

}
  

  return (
    <ThemeProvider theme={defaultTheme}>
    <OuterContainer>
    <PageContainer>
    <ImageContainer>
      <img src='https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1123.jpg?w=740&t=st=1700036792~exp=1700037392~hmac=8e4fc4e1f80bac55e98121de8cfe2e745874c8753e51678f876b2f8ba62a7fa1' alt='forget-password-image'/>
    </ImageContainer>
      <Container component="main" maxWidth="xs">
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
            Forget Password
          </Typography>
          <Box component="form" id='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            />
                  <Typography color={'red'}>
                    Enter Registered Email 
                    </Typography>     
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/" variant="body2">
                   Go  to Login Page
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

