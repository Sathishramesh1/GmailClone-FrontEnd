import styled from 'styled-components';
import { Box, Container, createTheme,} from '@mui/material';


export const Row=styled(Box)({
    display:'grid',
    // gridTemplateColumns:'10% 10% auto 5%',
    gridTemplateColumns:'15%  85%',
     width:'100%',
     placeItems:'center',
     borderBottom:'1px solid gray',
       
     "&:hover":{
      backgroundColor:'#cbe7f5'
     }
     
});

export const MailContainer=styled('div')({
  display:'flex',
  flexDirection:'column',
    width:"100%",
    height:'100%',
    justifyContent:'flex-start',
  
});

export const Icons=styled('div')({
  display:'flex',
  alignItems:'center',
flexWrap:'nowrap',
});

export const Message=styled('div')({
 display:'grid',
 gridTemplateColumns:'10% 30% 10% 5%',
 width:'100%',
 justifyContent:'space-evenly',
 alignItems:'center'
});




export const PageContainer=styled(Container)({
  display:'flex',
  width:'90%',
  height:'100%',
  justifyContent:'space-evenly',
  alignItems:'center ',
  flexDirection:'row ! important ',
  flexWrap:'nowrap',
  border:'2px solid black',
  overflow:'hidden',
  backgroundColor:'white',
  marginTop:'7%',
  borderRadius:'2em',
  '@media (max-width: 600px)': {
    height:'100vh'
  }
  
  
});





export const OuterContainer=styled(Box)({
  display:'flex ',
  justifyContent:'center',
  alignItems:'center',
  paddingBottom:'15%',
  flexDirection:'row',
  height:'100%',
  // background: 'linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%)',
  background: 'linear-gradient(90deg, #1CB5E0 0%, #000851 100%)',
  
  
})

export const ImageContainer=styled('div')({
  width:'500px',
  height:'500px',
  // marginTop:'64px',
  borderRight:'1px solid grey',
  paddingRight:'1em',
 
  
  "& > img":{
    marginTop:'8px',
   
    width:'100%',
    height:"100%",
    objectFit:'contain',
    
    
  }
});

export const defaultTheme = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          display: 'flex'
        },
      },
    },
  },
  
});


//sidebar icon style
export const SideIconWrapper=styled(Container)({
  display:'flex',
  flexDirection:'column',
  paddingLeft:'0 !important',

});
export const ComposeWrapper=styled(Box)({
  display:'flex',
  justifyContent:'flex-start', 
  
  '& > Button':{
      background:'#c2e7ff',
      padding:'15px',
      marginLeft:'10px',
      borderRadius:20,
      border: 'none',
       outline: 'none',
      
     },

  '& > Button:hover':{
      background:'#c2e7ff',
      boxShadow:'0 1px 2px 0 rgba(60,64,67,0.302), 0 1px 3px 1px rgba(60,64,67,0.149)',
      border: 'none',
 outline: 'none'
     },
     '&>*:focus':{
      background:'#c2e7ff',
      backgroundColor:'#c2e7ff',
      
      boxShadow:'0 1px 2px 0 rgba(60,64,67,0.302), 0 1px 3px 1px rgba(60,64,67,0.149)',
      border: 'none',
 outline: 'none'
     }
 
});

export const Compose=styled(Box)({
  display:'flex',
  justifyContent:'center',
  placeItems:'center',
  gap:10,
  '& > button:hover':{
    background:'#bfd6fb',
    borderRadius:'0px 40px 40px 0px',

   },
})

export const FeaturesWrapper=styled(Box)({
  display:'flex',
  justifyContent:'center',
  flexDirection:'column',
  marginTop:10,
   color:'black',

   '& > a.active':{
    color:'black'
   },

  '& > *:hover':{
       background:'#bfd6fb',
       borderRadius:'0px 40px 40px 0px',

      },
      '& > *:active':{
          background:'#bfd6fb',
          borderRadius:'0px 40px 40px 0px',
 
         }           
     

  },


);

