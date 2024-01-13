import {Box, Button, Container, Stack, Typography} from "@mui/material";
import Page from "../Page";
import {Constants} from "../../Constants";
import {useEffect, useMemo, useState} from "react";
import MatchScoutData from "../MatchScoutData";

export default function MatchScout() {

    const data = useMemo(() => new MatchScoutData(), []);

    useEffect(() => {
        data.reset();
    }, [data]);

    return (
        <Page>
        </Page>
    );
}