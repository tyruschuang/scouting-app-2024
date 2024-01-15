import React, {useState} from 'react';
import {Button, Container, Paper, TextField, Typography} from '@mui/material';

const PitScout = () => {
    const [teamNumber, setTeamNumber] = useState('');
    const [robotFeatures, setRobotFeatures] = useState('');
    const [isPhotoCaptured, setPhotoCaptured] = useState(false);

    const handleTeamNumberChange = (event) => {
        setTeamNumber(event.target.value);
    };

    const handleRobotFeaturesChange = (event) => {
        setRobotFeatures(event.target.value);
    };

    const handleCapturePhoto = async () => {
        // Access the Camera component to capture a photo
        try {
            const photo = await this.camera.capture(); // Assuming react-camera-pro provides an asynchronous capture method
            console.log('Captured Photo:', photo);
            setPhotoCaptured(true);
        } catch (error) {
            console.error('Error capturing photo:', error);
        }
    };

    const handleSubmit = () => {
        // You can handle the form submission logic here
        console.log(`Scouting Team ${teamNumber}'s pit with features: ${robotFeatures}`);
        // Add further logic as needed
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} style={{padding: '20px', marginTop: '20px'}}>
                <Typography variant="h4" gutterBottom>
                    Pit Scouting Form
                </Typography>
                <Typography variant="body1" paragraph>
                    Use buttons to toggle and capture photos for the pit scouting process.
                </Typography>
                {/*<Camera*/}
                {/*  style={{ width: '100%', height: 'auto' }}*/}
                {/*  ref={(cam) => (this.camera = cam)}*/}
                {/*/>*/}
                <Button variant={isPhotoCaptured ? 'contained' : 'outlined'} fullWidth onClick={handleCapturePhoto}>
                    {isPhotoCaptured ? 'Photo Captured' : 'Capture Photo'}
                </Button>
                <TextField
                    label="Team Number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={teamNumber}
                    onChange={handleTeamNumberChange}
                />
                <TextField
                    label="Robot Features"
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    margin="normal"
                    value={robotFeatures}
                    onChange={handleRobotFeaturesChange}
                />
                <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                    Submit Pit Scout
                </Button>
            </Paper>
        </Container>
    );
};

export default PitScout;
