import React, {useState} from 'react';
import {Button, Container, Stack, TextField, Typography} from '@mui/material';

const PitScout = (props) => {
    const [teamNumber, setTeamNumber] = useState('');
    const [robotFeatures, setRobotFeatures] = useState('');
    const [isPhotoCaptured, setPhotoCaptured] = useState(false);
    const [understage, setUnderstage] = useState(false);
    const [extraNotes, setExtraNotes] = useState('');
    const [batteryNumber, setBatteryNumber] = useState();

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
            setPhotoCaptured(true);
        } catch (error) {
            console.error('Error capturing photo:', error);
        }
    };

    const handleUnderstage = () => {
        if (understage) {
            setUnderstage(false);
        }
        else {
            setUnderstage(true);
        }
    }

    const handleExtraNotes = (event) => {
        setExtraNotes(event.target.value);
    }

    const handleBatteryNumber = (event) => {
        const newBatteryNumber = event.target.value;
        if (newBatteryNumber === '' || (!isNaN(newBatteryNumber) && newBatteryNumber >= 0)) {
            setBatteryNumber(newBatteryNumber); 
        }      
    }

    const handleSubmit = () => {
        // You can handle the form submission logic here
        console.log(`Scouting Team ${teamNumber}'s pit with features: ${robotFeatures}`);
        // Add further logic as needed
    };

    return (
        <Container maxWidth="md" style={{padding: '20px', marginTop: '20px'}}>
            <Stack direction={"column"} spacing={2}>
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
                <Button
                    fullWidth
                    variant={understage ? "contained" : "outlined"}
                    color={understage ? "primary" : "white"}
                    margin="normal"
                    onClick={()=>{
                        handleUnderstage();
                    }}
                >
                    Understage?
                </Button>
                <TextField
                    aria-label="Battery Number"
                    placeholder="0"
                    type="number"
                    fullWidth
                    margin="normal"
                    min={0}
                    value={batteryNumber}
                    onChange={handleBatteryNumber}
                    />
                <TextField
                    label="Extra Notes"
                    variant="outlined"
                    multiline
                    rows={2}
                    fullWidth
                    margin="normal"
                    value={extraNotes}
                    onChange={handleExtraNotes}
                />
                <Button
                    color={"success"}
                    variant={"outlined"}
                    fullWidth
                    onClick={handleSubmit}>
                    Submit Pit Scout
                </Button>
            </Stack>
        </Container>
    );
};

export default PitScout;
