import {Box, Button, Container, Divider, FormControl, Stack, Typography} from "@mui/material";
import Page from "../Page";
import {useEffect, useMemo, useState} from "react";
import MatchScoutData from "../MatchScoutData";
import {MatchStage} from "../MatchConstants";
import MSAuto from "./matchscout/auto/MSAuto";
import MSPrematch from "./matchscout/prematch/MSPrematch";

export default function MatchScout() {

    const data = useMemo(() => new MatchScoutData(), []);

    const [currentComponent, setCurrentComponent] = useState(<MSPrematch data={data}/>);

    useEffect(() => {
        // eslint-disable-next-line default-case
        switch (data.stage) {
            case MatchStage.PRE_MATCH:
                setCurrentComponent(<MSPrematch data={data}/>);
                break;
            case MatchStage.AUTO:
                setCurrentComponent(<MSAuto data={data}/>);
                break;
            case MatchStage.TELEOP:
                setCurrentComponent(<MSAuto data={data}/>);
                break;
            case MatchStage.POST_MATCH:
                setCurrentComponent(<MSAuto data={data}/>);
                break;
        }
    }, [data]);

    return (
        <Page>
            <Typography variant={"h3"}>Match Scout</Typography>
            <Divider sx={{
                my: 4
            }}/>
            {currentComponent}
            <Divider sx={{
                my: 2
            }}/>
            <Button onClick={() => {
                data.undo()
            }} fullWidth
            variant={"outlined"}>
                Undo
            </Button>
        </Page>
    );
}