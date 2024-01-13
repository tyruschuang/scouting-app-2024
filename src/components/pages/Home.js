import {Button, Container, Stack, Typography} from "@mui/material";
import Page from "../Page";
import {Constants} from "../../Constants.java";
import {useEffect, useState} from "react";

export default function Home() {

    return (
        <Page>
            <Stack direction={"column"} spacing={2}>
                {Constants.pages.map((page) => (
                    <>
                        <Button sx={{
                            width: "50vw",
                        }}>
                            <Stack direction={"column"} spacing={1}>
                                <Typography component={"h2"}>{page.title}</Typography>
                                <Typography component={"p"}>{page.description}</Typography>
                            </Stack>
                        </Button>
                    </>
                ))}
            </Stack>
        </Page>
    );
}