import React from 'react'
import {Card,CardActions,CardMedia,CardContent,Button,Typography,Container} from '@mui/material'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment'
import {useDispatch} from 'react-redux'
import {deletePost,likePost} from '../../../actions/posts'
import {createTheme} from '@mui/material/styles'
const Post=({post,setCurrentId})=>{
    const theme=createTheme({
    spacing:4,
    typography:{
        fontFamily:'Marck Script'
      },
    })
    const user=JSON.parse(localStorage.getItem('profile'))
    const dispatch=useDispatch();
    return(
    <Card elevation={6}sx={{padding:theme.spacing(4),position:'relative'}}>
        <CardMedia sx={{height:'200px',}}component="img" image={post.selectedFile} title={post.title}/>
        <Container sx={{position:'absolute',top:'20px',right:'2px',color:'white',fontWeight:'bold'}}>
            <Typography variant='h6'>{post.name}</Typography>
            <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
        </Container>
        <div>
        {(user?.result?.sub===post?.creator || user?.result?._id===post?.creator) && 
            <Button sx={{position:'absolute',top:'20px',left:'300px',fontWeight:'bold'}}style={{color:'white'}} size='small' onClick={()=>setCurrentId(post._id)}>
                <MoreHorizIcon fontSize='default'/>
            </Button>}
        </div>
        
        <Typography sx={{marginTop:theme.spacing(2)}}variant='body2' color="textSecondary">{post.tags.map((tag)=>`#${tag} `)}</Typography>
        
        <CardContent>
        <Typography sx={{fontFamily:theme.typography,fontSize:'30px'}}variant="h5" gutterBottom>{post.title}</Typography>
      
        <Typography variant="body2" color="textSecondary" componenet="p" >{post.message}</Typography>
        </CardContent>
        <CardActions sx={{display:'flex',justifyContent:'space-between'}}>
            <Button size='small' color='primary' onClick={()=>dispatch(likePost(post._id))}>
                <ThumbUpAltIcon fontSize='small'/>
                &nbsp; Like &nbsp;
                {post.likes.length}
            </Button>
            {(user?.result?.sub===post?.creator || user?.result?._id===post?.creator) && 
            <Button size='small' color='primary' onClick={()=>dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize='small'/>
             Delete
        </Button>
            }
            
        </CardActions>
    </Card>
    )
}

export default Post