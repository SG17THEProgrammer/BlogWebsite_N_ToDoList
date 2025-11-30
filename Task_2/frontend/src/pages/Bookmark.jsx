import React from 'react'
import { useAuth } from '../components/Auth'
import { Alert, Box, CardActionArea, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { marked } from 'marked';
import { format } from "date-fns";
import { NavLink } from 'react-router-dom';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    variants: [
        {
            props: ({ expand }) => !expand,
            style: {
                transform: 'rotate(0deg)',
            },
        },
        {
            props: ({ expand }) => !!expand,
            style: {
                transform: 'rotate(180deg)',
            },
        },
    ],
}));

const Bookmark = () => {
    const { contextAllBlogs } = useAuth()
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const bookmarkedBlogs = contextAllBlogs?.filter((elem) => elem.isBookmarked)

    console.log(bookmarkedBlogs);
    return (
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>

            {
                bookmarkedBlogs?.length > 0 ? (
                    <>
                        {bookmarkedBlogs?.map((elem, idx) => {
                            const { title, authorImage, category, createdAt, description, email, image, _id, tags } = elem;
                            return (
          <Card key={idx} sx={{ margin: "40px", height: "60vh" , width:"30vw" }}>
            <NavLink to={`/completePost/${_id}`} style={{textDecoration:"none"}}>
             <CardActionArea>
            <CardHeader
              avatar={
                <Avatar alt="userImage" src={authorImage}>
                </Avatar>
              }
              action={
                <Chip label={category} color='info'></Chip>
              }
              title={title}
              subheader={format(new Date(createdAt), "MMMM dd, yyyy")}
            />

            <CardMedia
              component="img"
              sx={{ height: "25vh" }}
              image={image}
              alt="Blog Image"
            />
            </CardActionArea>
            </NavLink>
            <CardContent>
              {/* <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {description}
              </Typography> */}
              <Box>
              <div dangerouslySetInnerHTML={{ __html: marked(description.substring(0,200) + '...') }} style={{ marginTop: "20px", fontSize: "12px" }} />
              </Box>
            </CardContent>

            


          </Card>
            );
      })}
        </>)
     
     : <Alert severity="info" sx={{ display: "flex", justifyContent: "center", width: "100vw" }}>No Bookmarked Blog Found</Alert>}
     
     </Box >
  )
}

export default Bookmark