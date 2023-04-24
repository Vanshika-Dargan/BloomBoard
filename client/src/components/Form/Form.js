import React, { useState,useEffect} from "react";
import { TextField, Typography, Paper,Button } from "@mui/material";
import FileBase64 from 'react-file-base64'
// import { useDropzone } from 'react-dropzone';
import {useDispatch} from 'react-redux'
import {createPost,updatePost} from '../../actions/posts'
import { useSelector } from "react-redux";
import { createTheme } from "@mui/material/styles";
const Form = ({currentId,setCurrentId}) => {
  
  const theme=createTheme({
    spacing:4
  });
   const user=JSON.parse(localStorage.getItem('profile'))
  const [postData, setpostData] = useState({
   
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const post=useSelector((state)=>currentId?state.posts.posts.find((p)=>p._id===currentId):null)
  const dispatch=useDispatch();
  useEffect(()=>{
  if(post)
  setpostData(post)
  },[post])
  const handleSubmit = (e) => {
   e.preventDefault();
   if(currentId)
   {
   dispatch(updatePost(currentId,{...postData,name: user?.result?.name}))
   clear();
   }
   else
   {
    dispatch(createPost({...postData,name: user?.result?.name}))
    clear();
   }
 
  };
  const clear=()=>{
    setCurrentId(null);
    setpostData({
   
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };
  return (
    
      <Paper elevation={6} sx={{borderRadius:'5px',marginTop:theme.spacing(5),padding:theme.spacing(2)}}>
        <Typography  sx={{marginLeft:theme.spacing(20),color:'#FF6D60'}}variant="h6">{currentId?'Update':'Create'} Your Board</Typography>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
         
          
           <TextField
           sx={{margin:theme.spacing(1,0)}}
            name="title"
            variant="outlined"
            label="title"
            fullWidth
            value={postData.title}
            onChange={(e) => {
              setpostData({ ...postData, title: e.target.value });
            }}
          />
           <TextField
           sx={{margin:theme.spacing(1,0)}}
            name="message"
            variant="outlined"
            label="message"
            fullWidth
            value={postData.message}
            onChange={(e) => {
              setpostData({ ...postData, message: e.target.value });
            }}
          />
           <TextField
            sx={{margin:theme.spacing(1,0)}}
            name="tags"
            variant="outlined"
            label="tags"
            fullWidth
            value={postData.tags}
            onChange={(e) => {
              setpostData({ ...postData, tags: e.target.value.split(',')});
            }}
          />
          <div>
            <FileBase64 sx={{}}type='file' multiple={false} onDone={({base64})=>setpostData({...postData,selectedFile:base64})}/>
          </div>
          <Button sx={{margin:theme.spacing(2,0)}}variant="contained" color="primary" size="large" type="submit" fullWidth>Create</Button>
          <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
        </form>
      </Paper>
      
   
  );
};
export default Form;
