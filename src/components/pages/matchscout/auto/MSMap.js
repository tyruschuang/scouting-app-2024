import {Box, Button, Container, Stack, Typography} from "@mui/material";
import Page from "../Page";
import {Constants} from "../../Constants";
import {useEffect, useState} from "react";
import MatchScoutData from "../History";

export default function MSMap(props) {

    const data = props.data

    return (
        <Box>
            <Typography variant={"h4"}>Map</Typography>
            <Typography variant={"p"}>This is the map page</Typography>
        </Box>
    );
}