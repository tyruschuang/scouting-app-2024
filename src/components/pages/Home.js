import {Box, Button, Container, Stack, Typography} from "@mui/material";
import Page from "../Page";
import {Constants} from "../../Constants";
import {useEffect, useState} from "react";

export default function Home() {

    return (
        <Page>
            <Stack direction={"column"} spacing={2}>
                {Constants.pages.map((page) => (
                    (page.path !== "/" ?
                    <>
                        <Box sx={{
                            py: 3,
                            width: "50vw",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 1,
                            cursor: "pointer",
                            border: "1px solid white",
                        }}
                        onClick={
                            () => {
                                window.location.pathname = page.path;
                            }
                        }>
                                <Typography variant={"h4"}>{page.title}</Typography>
                                <Typography variant={"p"}>{page.description}</Typography>
                        </Box>
                    </> : <></>
                    )
                ))}
            </Stack>
        </Page>
    );
}