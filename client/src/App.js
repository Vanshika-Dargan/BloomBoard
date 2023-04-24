import React from "react";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar/Navbar.js"
import Home from './components/Home/Home'
import PostDetails from './components/PostDetails/PostDetails'
import {BrowserRouter,Route,Routes,Navigate} from 'react-router-dom'
import Auth from './components/Auth/Auth'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const App = () => {
 
  const theme = createTheme({
    palette: {
        primary: {
            main: '#98D8AA',
        },
        secondary: {
            main: '#F7D060',
        },
       
    },
    
});
  const user=JSON.parse(localStorage.getItem('profile'));
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}>
    <BrowserRouter>
    <ThemeProvider theme={theme}>
    <Container maxWidth="xl">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Navigate to="/posts"/>}/>
        <Route path="/posts" element={<Home/>}/>
        <Route path="/posts/search" element={<Home/>}/>
        <Route path="/posts/:id" element={<PostDetails/>}/>
        <Route path="/auth" element={!user?<Auth/>:<Navigate to="/posts"/>}/>
      </Routes>
    </Container>
    </ThemeProvider>
    </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
