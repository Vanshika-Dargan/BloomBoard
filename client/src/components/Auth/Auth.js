import {useState} from 'react'
import {Grid,Container,Paper,Avatar, Typography,Button} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from './Input'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import Icon from './Icon'
import {signup,signin} from '../../actions/auth.js'
import { createTheme } from '@mui/material';
const initial={firstName:'',lastName:'',email:'',password:'',confirmPassword:''}


const Auth=()=>{
    const theme=createTheme({
      spacing:4,
    });

    const dispatch=useDispatch();
    const [formData,setFormData]=useState(initial)
    const [isSignUp,setIsSignUp]=useState(false)
    const [showPassword,setShowPassword]=useState(false)
    const navigate=useNavigate();
    const handleClick=()=>{
       setIsSignUp((prev)=>!prev) 
       
    }
    const handleSubmit=(e)=>{
       e.preventDefault();
       console.log(formData)
       if(isSignUp)
       {
       dispatch(signup(formData,navigate))
       }
       else{
        dispatch(signin(formData,navigate))
       }

    }
    const handleChange=(e)=>{
      setFormData({...formData,[e.target.name]:e.target.value})
    }
    const handleShowPassword=()=>{
    setShowPassword((prev)=>!prev)
    }
    //Google Login
    const login =  useGoogleLogin({
        onSuccess: async ({code}) => {
          try{
          const tokens = await axios.post('http://localhost:5000/auth/google', {
             code
            })
            const result=jwt_decode(tokens?.data?.id_token);
            const token=tokens?.data?.id_token;
            dispatch({type:'AUTH',data:{result,token}})
            navigate('/')
            }
            catch(error)
            {
              console.log("Error in login")
            }
      
        },
        flow:'auth-code',
        
       
      });

    return(
      <div>
        <Container component="main" maxWidth="xs">
        <Paper elevation={3} sx={{marginTop:theme.spacing(15),padding:theme.spacing(2)}}>
        <Avatar sx={{marginLeft:theme.spacing(40)}}>
         <LockOutlinedIcon/>
        </Avatar>
        <Typography sx={{marginLeft:theme.spacing(35)}}variant='h5'>{isSignUp?'Sign Up':'Sign In'}</Typography>
        <Container sx={{marginTop:theme.spacing(10)}}>
        <form onSubmit={handleSubmit} >
        <Grid container spacing={2}>
        {
            isSignUp && 
            (
                <>
            <Input name='firstName'label='First Name' handleChange={handleChange} autoFocus half/>
            <Input name='lastName'label='Last Name' handleChange={handleChange} half/> 
            </>
            )
    
        }
        <Input name='email' type='email' label='Email' handleChange={handleChange} />
        <Input name='password' label='Password' handleChange={handleChange} type={showPassword?'text':'password'} 
        handleShowPassword={handleShowPassword}/>
        {
            isSignUp && (
                <Input name='confirmPassword' label='Confirm Password' handleChange={handleChange} type='password' />

            )
        }
        </Grid>
        <Button sx={{marginTop:theme.spacing(3)}} variant='contained' type='submit' color='primary' fullWidth>{isSignUp?'Sign Up':'Sign In'}</Button>
        <Button sx={{marginTop:theme.spacing(2)}}color='primary' startIcon={<Icon/>} variant='contained' fullWidth onClick={()=>login()}>Sign In With Google</Button>
  
        <Grid container direction='row-reverse'>
            <Grid item>
             <Button  onClick={handleClick}>{isSignUp?'Already have an account? Sign In':"Don't have an account? Sign Up"}</Button>
            </Grid>
        </Grid>
        
        </form>
        </Container>
        </Paper>
        </Container>
      </div>
    )}
export default Auth;