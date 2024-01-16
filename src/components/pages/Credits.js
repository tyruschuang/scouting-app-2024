import React from 'react';
import {
    Avatar,
    Container,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper, Stack,
    Typography
} from '@mui/material';
import Grid2 from "@mui/material/Unstable_Grid2";
import Page from "../Page";
import {MatchStage} from "../MatchConstants";
import {Constants} from "../../Constants";

const Credits = () => {

    return (
        <Page>
            <Typography variant={"h3"}>
                Credits
            </Typography>
            <Typography variant={"h5"}>
                First off, thanks to all of the scouters! This app would be pointless without you.
            </Typography>
            <Divider sx={{
                my: 2
            }}/>
            <Grid2 container spacing={2}>
                <Grid2 xs={12} sm={6}>
                        <Stack direction={"column"} spacing={0.5}>
                            <Typography variant={"h5"}>
                                2024 Development Team
                            </Typography>
                            <List dense>
                                {Constants.developers.map((developer) => {
                                    return (
                                        <ListItem
                                            key={developer.name}
                                        >
                                            <ListItemAvatar>
                                                <Avatar src={developer.icon}/>
                                            </ListItemAvatar>
                                            <ListItemText id={developer.name} primary={developer.name} primaryTypographyProps={{
                                                fontSize: 20
                                            }} secondary={developer.year} secondaryTypographyProps={{
                                                fontSize: 15
                                            }}/>
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </Stack>
                </Grid2>
                <Grid2 xs={12} sm={6}>
                    <Stack direction={"column"} spacing={0.5}>
                        <Typography variant={"h5"}>
                            Special Thanks to
                        </Typography>
                        <List dense>
                            {Constants.specialThanks.map((thanks) => {
                                return (
                                    <ListItem
                                        key={thanks.name}
                                    >
                                        <ListItemText primaryTypographyProps={{
                                            fontSize: 20
                                        }} id={thanks.name} primary={thanks.name} secondary={thanks.description} secondaryTypographyProps={{
                                            fontSize: 15
                                        }}/>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Stack>
                </Grid2>
            </Grid2>
            <Divider sx={{
                my: 2
            }}/>
            <Typography component={"h4"} variant={"h4"} sx={{
                mb: 2,
            }}>
                Past Development Teams
            </Typography>
            <Grid2 container spacing={2}>
                {Constants.previousYears.map((year) => {
                    return (
                        <Grid2 xs={6} sm={4}>
                            <Stack direction={"column"} spacing={0.5}>
                                <Typography variant={"h5"}>
                                    {year.year}
                                </Typography>
                                <List dense>
                                    {year.developers.map((developer) => {
                                        return (
                                            <ListItem
                                                key={developer}
                                            >
                                                <ListItemText primaryTypographyProps={{
                                                    fontSize: 16
                                                }} id={developer} primary={developer}/>
                                            </ListItem>
                                        )
                                    })}
                                </List>
                            </Stack>
                        </Grid2>
                    )
                })}
            </Grid2>
            {/*<Paper elevation={3} style={paperStyle}>*/}
            {/*    <Typography variant="h4" gutterBottom>*/}
            {/*        Credits*/}
            {/*    </Typography>*/}
            {/*    <Typography variant="body1" paragraph>*/}
            {/*        THANKS to all the scouters -- this'd be pointless without you*/}
            {/*    </Typography>*/}
            {/*    <Typography variant="h6" gutterBottom>*/}
            {/*        Development Team*/}
            {/*    </Typography>*/}
            {/*    <Typography variant="body1" paragraph>*/}
            {/*        - Tyrus Chuang*/}
            {/*        <br/>*/}
            {/*        - Ashir Rao*/}
            {/*        <br/>*/}
            {/*        - Elisa Pan*/}
            {/*        <br/>*/}
            {/*        - Eric Hou*/}
            {/*    </Typography>*/}
            {/*    <Typography variant="h6" gutterBottom>*/}
            {/*        Special thanks to*/}
            {/*    </Typography>*/}
            {/*    <Typography variant="body1" paragraph>*/}
            {/*        - Mentors*/}
            {/*        <br/>*/}
            {/*        - People who bring food*/}
            {/*        <br/>*/}
            {/*        - Everyone who makes comps possible*/}
            {/*        <br/>*/}

            {/*    </Typography>*/}

            {/*    <Typography variant="h8" gutterBottom>*/}
            {/*        Past Development Teams*/}
            {/*    </Typography>*/}
            {/*    <Typography variant="body2" paragraph>*/}
            {/*        - 2023: Ashir Rao (lead), Elisa Pan, Johann Jacob, Edwin Hou*/}
            {/*        <br/>*/}
            {/*        - 2022: Richie Tan (lead), Ashir Rao*/}
            {/*        <br/>*/}
            {/*        - 2020: Alan Sheu, Pranav Tadepalli*/}
            {/*        <br/>*/}

            {/*    </Typography>*/}

            {/*</Paper>*/}
        </Page>
    );
};

export default Credits;
