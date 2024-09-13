import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Container from '@mui/material/Container';

import Link from 'next/link';

const FungiBlogCard = ( {publication} ) => {

    return (
        <Container>
            <Card sx={{ maxWidth: "xl", p: 1, m: 4 }}>
                <CardHeader
                    avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                    }
                    action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                    }
                    title={publication.author}
                    subheader={publication.created}
                />
                <CardMedia
                    sx={{ height: 600}}
                    image={publication.images[0].post_image}
                    title="Fungi Shop"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {publication.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {publication.content}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Share</Button>
                    <Link href={`/fungishop/blog/${publication.id}`}>
                        <Button size="small">Learn More</Button>
                    </Link>
                </CardActions>
            </Card>
        </Container>
    );
}

export default FungiBlogCard;