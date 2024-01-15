import React from 'react';
import {Container, Paper, Typography} from '@mui/material';

const Credits = () => {
    const paperStyle = {
        padding: '20px',
        marginTop: '20px',
        backgroundColor: '#000000', // Neutral background color
    };

    const buttonStyle = {
        marginTop: '10px',
        backgroundColor: '#000000', // Neutral primary color
        color: '#000000', // Text color
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} style={paperStyle}>
                <Typography variant="h4" gutterBottom>
                    Credits
                </Typography>
                <Typography variant="body1" paragraph>
                    THANKS to all the scouters -- this'd be pointless without you
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Development Team
                </Typography>
                <Typography variant="body1" paragraph>
                    - Ashir Rao
                    <br/>
                    - Elisa Pan
                    <br/>
                    - Tyrus Chuang
                    <br/>

                    - Eric Hou
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Special thanks to
                </Typography>
                <Typography variant="body1" paragraph>
                    - Mentors
                    <br/>
                    - People who bring food
                    <br/>
                    - Everyone who makes comps possible
                    <br/>

                </Typography>

                <Typography variant="h8" gutterBottom>
                    Past Development Teams
                </Typography>
                <Typography variant="body2" paragraph>
                    - 2023: Ashir Rao (lead), Elisa Pan, Johann Jacob, Edwin Hou
                    <br/>
                    - 2022: Richie Tan (lead), Ashir Rao
                    <br/>
                    - 2020: Alan Sheu, Pranav Tadepalli
                    <br/>

                </Typography>

            </Paper>
        </Container>
    );
};

export default Credits;
