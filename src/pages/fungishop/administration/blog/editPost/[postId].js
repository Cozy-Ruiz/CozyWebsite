import * as React from 'react';
import { useRouter } from 'next/router';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Stack } from '@mui/material';
import { Container } from '@mui/material';

import FungiAppBar from "@components/fungishop/FungiAppBar";
import FungiAdminNav from '@components/fungishop/FungiAdminNav';
import FormEditPost from '@components/fungishop/FormEditPost';
import HeaderBlogBar from '@components/fungishop/HeaderBlogBar';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const editPost = () => {
    const router = useRouter();
    const { postId } = router.query;

    return(
        <>
        <FungiAppBar/>

        <Stack spacing={2} direction={{xs:'column', md:'row'}}>
            <Item>
                <FungiAdminNav />
            </Item>

            <Item sx={{ width: { xs: 'auto', md: '100%' } }} >
                <Container>
                    <HeaderBlogBar/>
                    <FormEditPost postId={postId} />
                </Container>
            </Item>
        </Stack>
        </>
    );
}

export default editPost;