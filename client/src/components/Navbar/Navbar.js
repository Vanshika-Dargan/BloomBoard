import {AppBar, Typography,Toolbar, Avatar,Button,Container} from '@mui/material'
import {Link} from 'react-router-dom'
import {useState} from 'react'
import { useNavigate,useLocation} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {useEffect} from 'react'
import decode from 'jwt-decode';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const Navbar=()=>{
  const theme = createTheme({
  typography:{
    fontFamily:'Marck Script'
  },
  spacing:10

});

  const navigate=useNavigate();
  const dispatch=useDispatch();
  const location=useLocation();
  const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));
  console.log(user);
  const logout=()=>{
    setUser(null)
  dispatch({type:'LOGOUT'})
  navigate('/')
  }
  // const user=null;
  useEffect(()=>{
  const token=user?.token;
  if(token)
  {
    const decodedToken=decode(token);
    if(decodedToken.exp *1000<new Date().getTime())
    logout();
  }
  setUser(JSON.parse(localStorage.getItem('profile')));
  },[location])
    return (
     
        <AppBar color="inherit" position="static" 
        sx={{borderRadius:5,display:'flex',flexDirection:'row',justifyContent:'space-between',margin:'30px 0'}}>
          <div>
          <ThemeProvider theme={theme}>
            
            <Container sx={{display:'flex' , justifyContent:'space-between'}}>
            {/* <img  src={camera}  height="80" />  */}
        <Typography component={Link} to="/" variant="h2" align="center" sx={{marginLeft:'10px',marginTop:'8px',textDecoration:'none',color:'#FF6D60',marginBottom:'10px'}}>
          BloomBoard
          
          </Typography>
          </Container>
          </ThemeProvider>
          </div>
          <Toolbar sx={{display:'flex'}}>
          {user?(
          <Container sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <Avatar   alt={user?.result?.name} src={user?.result?.picture}>{user?.result?.name.charAt(0)}</Avatar>
          <Typography sx={{marginLeft:'10px'}}variant="h6">{user?.result?.name}</Typography>
          <Button sx={{marginLeft:'50px'}} variant="contained" color="secondary" onClick={logout}>Logout</Button>
          </Container>
          ):(
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
          )}
          </Toolbar>
      </AppBar>
     
      
    )
}
export default Navbar;