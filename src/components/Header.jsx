import { AppBar, Toolbar, styled, InputBase, Box, IconButton, Menu, MenuItem } from "@mui/material";
import {
  Menu as MenuIcon,
  Tune,
  HelpOutlineOutlined,
  SettingsOutlined,
  AppsOutlined,
} from "@mui/icons-material";
import '../App.css'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Avatar from '@mui/material/Avatar';
import { useState } from "react";
import { removeToken } from "./redux-container/slices/emailSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";




const Header = ({ toggleDrawer }) => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const avatorLetter=useSelector((state)=>state.email.user.email).slice(0,1);
  
  const [anchorEl, setAnchorEl] =useState(null)
  const open = Boolean(anchorEl);

  //function  on avator click
  const handleClick = (event) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget);
  };


  //handle menu close
  const menuClose=(event)=>{
    event.stopPropagation();
    setAnchorEl(null);
  }
  //handle logout
  const handleClose = (event) => {
    event.stopPropagation()
    setAnchorEl(null);
    localStorage.removeItem('token');
    localStorage.clear();
    dispatch(removeToken());
   
    navigate("/")
    
  };



  return (
    <StyledAppBar  >
      <StyledToolbar>
      <LogoWrapper>
        <IconButton onClick={toggleDrawer}>
        <MenuIcon color="action"   />
        </IconButton>
        <img
          src='https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png'
          alt="logo"
          style={{  marginLeft:10 }}
        />
       
        </LogoWrapper>
        
        <SearchRapper>
        <IconButton>
          <SearchRoundedIcon color="action"/>
          </IconButton>
          <InputBase placeholder="Search mail"
          id="search"
          name='search'
          type="text"
         
          />
           <IconButton>
          <Tune color="action" />
          </IconButton>
        </SearchRapper>

        <IconsWrapper>
          <Icon>
            <IconButton>
          <HelpOutlineOutlined color="primary"  />
          </IconButton>
          <IconButton>
          <SettingsOutlined color="action"  />
          </IconButton>
        
          <IconButton>
          <AppsOutlined color="action"  />
          </IconButton>
          <IconButton onClick={handleClick} >
          <Avatar sx={{width:36,height:36,fontSize:14,background:'green',textTransform:'uppercase'}}>{avatorLetter}</Avatar>
          </IconButton>
          <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={menuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem> Profile</MenuItem>
        <MenuItem >My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
          </Icon>
        </IconsWrapper>
        
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;

const StyledAppBar = styled(AppBar)({
  background: "#f5f5f5",
  boxShadow: "none",
  height:'64px !important',
  position:"static",
  flexGrow:1,
  width:'100% !important',
  paddingRight:"0px ! important",

});

const StyledToolbar=styled(Toolbar)({
    background: "#f5f5f5",
    display:"grid",
    gridTemplateColumns:"15% auto 20%"

})

const SearchRapper = styled(Box)({
  background: "#EAF1FB",
  marginLeft: 20,
  borderRadius: 8,
  marginRight:8,
  height:'48px',
 
 
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0px 10px",
  "& > div": {
    width: "100%",
    padding: "0 10px",
    
  },
});

const IconsWrapper = styled(Box)({

  display: "grid",
  width:"70%",
  gridTemplateRows:"repeat(4,40)",
  background: "#f5f5f5",
  marginLeft:'20%',
  
  

});

const LogoWrapper=styled(Box)({
        display:'flex',
        alignItems:'center',
       
})

const Icon=styled(Box)({
   display:'flex',
   justifyContent:'space-between'

})