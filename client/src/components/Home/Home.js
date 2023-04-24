import React,{useState} from "react";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { Container, Grow, Grid,AppBar,Button,TextField} from "@mui/material";
import {useDispatch} from 'react-redux'
import { getPostsBySearch} from '../../actions/posts.js'
import Pagination from '../Pagination/Pagination';
import { useLocation,useNavigate } from "react-router-dom";
import { MuiChipsInput } from 'mui-chips-input'
import {createTheme} from '@mui/material/styles'
function useQuery()
{
  return new URLSearchParams(useLocation().search);
}
const Home=()=>{

 const dispatch=useDispatch();
 const [currentId,setCurrentId]=useState(null);
const navigate=useNavigate();
const query=useQuery();
const page=query.get('page') || 1;
const searchQuery=query.get('searchQuery')
const [search,setSearch]=useState("");
const [tags,setTags]=useState([])

  // useEffect(()=>{
  //   dispatch(getPosts())
  //   },[currentId,dispatch]);
    
    const searchPost=()=>{
      if(search.trim() || tags)
      {
      dispatch(getPostsBySearch({search,tags:tags.join(',')}))
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
      }
      else
      {
        navigate("/");
      }
    }
  const handleKeyPress=(e)=>{
    if(e.keyCode===13)
    {
      searchPost();
    }
  }
  const handleAdd=(tag)=>{
    setTags([...tags,tag])
  }
  const handleDelete=(tag)=>{
    setTags(tags.filter(t=>t!==tag))
  }
  const theme=createTheme({
    spacing:4
  });
return(
<Grow in>
        <Container maxWidth="xl">
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={6} md={8}>
           
              <Posts setCurrentId={setCurrentId}/>
            
            </Grid>
            {/* implement flex direction in styling */}
            <Grid item xs={12} sm={6} md={4}>
              <AppBar position="static" color="inherit" sx={{padding:theme.spacing(2)}}>
              <TextField 
              sx={{margin:theme.spacing(1,0)}}
              name="search" 
              label="Search in Boards" 
              variant="outlined"
              fullWidth
              value={search}
              onChange={(e)=>{setSearch(e.target.value)}}
              onKeyPress={handleKeyPress}
              />
              <MuiChipsInput 
               sx={{margin:theme.spacing(1,0)}}
              value={tags} 
              onAddChip={handleAdd}
              onDeleteChip={handleDelete}
              label="Search By Tags"
              variant="outlined"
              />
              <Button  sx={{margin:theme.spacing(1,0)}} onClick={searchPost} variant="contained" color="primary">Search</Button>
              </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
              {(!searchQuery && !tags.length) && (
              
              <Pagination page={page} />
            
          )}
            
            </Grid>
          </Grid>
        </Container>
      </Grow>
);
}
export default Home;
