import React from 'react';
import { useRouter } from 'next/router'
import FungiAppBar from '@components/fungishop/FungiAppBar';
import FungiFooter from '@components/fungishop/FungiFooter';
import getPublication from '@hooks/fungishop/getPublication';
import Image from 'next/image';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import { Container } from '@mui/material';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const Publication = () => {

    const router = useRouter();
    const { postId } = router.query;

    const [post, setPost] = React.useState({
        title: '',
        content: '',
        observations: '',
        created: '',
        updated: '',
        author: '',
        organization: '',    
        images: [],
        entries: []
    });

    // Fetch post data using postId
    React.useEffect(() => {
        if (!postId) {
            return;
        }

        const fetchData = async () => {
            try {
                const data = await getPublication(postId);
                setPost(data);
                //console.log(post);
            } catch (error) {
                console.error('Error fetching publication:', error);
            }
        };

        fetchData();
    }, [postId]);

    return (
        <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto', height: '100%' }}>
            <FungiAppBar/>
            <Container component={Paper} elevation={2} sx={{mt:'30px', mb:'30px', p:'30px', overflow:'auto'}} >
                <Box key={post.id} >
                    
                    <div style={{ textAlign: 'center' }}>
                        {post.images.map((image) => (
                            <img src={post.images[0].post_image} width={700} height={700}></img>
                        ))}
                    </div>

                    <Box sx={{mt:'30px', mb:'30px', p:'30px'}}>   
                        <h2>{post.title}</h2>
                        <p>{post.created}</p>
                        {post.content.split('\r\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                        <p style={{backgroundColor:'gainsboro'}}>Observaciones: {post.observations}</p>
                    </Box>
                    
                    {post.entries.map((entry) => (  
                        <Box key={entry.id} sx={{mt:'30px', mb:'30px', p:'30px'}}>
                            <h3>{entry.title}</h3>
                            {entry.content.split('\r\n').map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                            <p style={{backgroundColor:'gainsboro'}}>Observaciones: {entry.observations}</p>
                            <Stack direction={'row'} style={{overflow:'auto', justifyContent:'center'}} >
                                {entry.images.map((image) => (
                                    <img
                                        srcSet={`${image.entrie_image}?fit=crop&auto=format&dpr=2 2x`}
                                        src={`${image.entrie_image}?fit=crop&auto=format`}
                                        loading="lazy"
                                    />
                                ))}
                            </Stack>
                        </Box> 
                    ))}
                    
                </Box>
            </Container>

            <FungiFooter/>
        </div>
    );
}

export default Publication;