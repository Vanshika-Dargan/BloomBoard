import React from 'react'
import Post from './Post/Post.js'
import {useSelector} from 'react-redux'
import {Grid,CircularProgress} from "@mui/material"
const Posts= ({setCurrentId})=>{
const {posts,isLoading} = useSelector((state) => state.posts);

if(!posts.length && !isLoading) return 'No posts found';
    return(
    isLoading ? <CircularProgress/> : (
        <Grid container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6}>
            <Post post={post} setCurrentId={setCurrentId}/>
          </Grid>
        ))}
        
        </Grid>
    )
    )
}
export default Posts