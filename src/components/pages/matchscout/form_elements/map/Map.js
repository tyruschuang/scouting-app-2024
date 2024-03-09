import {useEffect, useState} from "react";
import {AutoIntakePosition, getMarkerLabel, MatchStage,} from "../../../../MatchConstants";
import Grid2 from "@mui/material/Unstable_Grid2";
import {Box, Button, Collapse, Stack, Typography,} from "@mui/material";
import CustomToggleButton from "../CustomToggleButton";
import {Constants} from "../../../../../Constants";
import Undo from "../Undo";
import Marker from "./Marker";
import {useCookies} from "react-cookie";

export default function Map(props) {
    const [cookies, setCookie] = useCookies(['flipMap']);

    const AutoMarkers = [
        <UsedMarker label={"Wing Ring #1"} x={17.5} y={10.25} id={1} type={1}/>,
        <UsedMarker label={"Wing Ring #2"} x={17.5} y={30.25} id={2} type={1}/>,
        <UsedMarker label={"Wing Ring #3"} x={17.5} y={52.1} id={3} type={1}/>,
        <UsedMarker label={"Center Ring #1"} x={50} y={9} id={4} type={1}/>,
        <UsedMarker label={"Center Ring #2"} x={50} y={28.25} id={5} type={1}/>,
        <UsedMarker label={"Center Ring #3"} x={50} y={48} id={6} type={1}/>,
        <UsedMarker label={"Center Ring #4"} x={50} y={67.4} id={7} type={1}/>,
        <UsedMarker label={"Center Ring #5"} x={50} y={87} id={8} type={1}/>,
        <UsedMarker label={"Speaker Outtake"} x={5} y={31.25} id={1} type={0}/>,
        <UsedMarker label={"Amp Outtake"} x={11} y={5} id={2} type={0}/>,
        <UsedMarker label={"Trap Outtake"} x={29.5} y={49} id={5} type={0}/>,
    ];
    const TeleopMarkers = [
        <UsedMarker label={"Source"} x={94.0} y={85.25} id={1} type={1}/>,
        <UsedMarker label={"Ground"} x={17.5} y={75.25} id={2} type={1}/>,
        <UsedMarker label={"Speaker Outtake"} x={5} y={31.25} id={1} type={0}/>,
        <UsedMarker label={"Amp Outtake"} x={11} y={5} id={2} type={0}/>,
        <UsedMarker label={"Trap Outtake"} x={29.5} y={49} id={5} type={0}/>,
    ];

    const AutoMarkersFlipped = [
        <UsedMarker label={"Wing Ring #3"} x={17.5} y={85.25} id={3} type={1}/>,
        <UsedMarker label={"Wing Ring #2"} x={17.5} y={65.25} id={2} type={1}/>,
        <UsedMarker label={"Wing Ring #1"} x={17.5} y={44.1} id={1} type={1}/>,
        <UsedMarker label={"Center Ring #5"} x={50} y={9} id={8} type={1}/>,
        <UsedMarker label={"Center Ring #4"} x={50} y={28.25} id={7} type={1}/>,
        <UsedMarker label={"Center Ring #3"} x={50} y={48} id={6} type={1}/>,
        <UsedMarker label={"Center Ring #2"} x={50} y={67.4} id={5} type={1}/>,
        <UsedMarker label={"Center Ring #1"} x={50} y={87} id={4} type={1}/>,
        <UsedMarker label={"Speaker Outtake"} x={5} y={65.25} id={1} type={0}/>,
        <UsedMarker label={"Amp Outtake"} x={11} y={92} id={2} type={0}/>,
        <UsedMarker label={"Trap Outtake"} x={29.5} y={49} id={5} type={0}/>,
    ];

    const TeleopMarkersFlipped = [
        <UsedMarker label={"Source"} x={94.0} y={9.25} id={1} type={1}/>,
        <UsedMarker label={"Ground"} x={17.5} y={29.25} id={2} type={1}/>,
        <UsedMarker label={"Speaker Outtake"} x={5} y={65.25} id={1} type={0}/>,
        <UsedMarker label={"Amp Outtake"} x={11} y={92} id={2} type={0}/>,
        <UsedMarker label={"Trap Outtake"} x={29.5} y={49} id={5} type={0}/>,
    ];

    function UsedMarker(props) {
        return (
            <Marker
                label={props.label}
                x={props.x}
                y={props.y}
                id={props.id}
                type={props.type}
                matchStage={matchStage}
                selectedIntakeLocation={selectedIntakeLocation}
                setSelectedIntakeLocation={setSelectedIntakeLocation}
                history={history}
                confirmOuttake={confirmOuttake}
            />
        );
    }

    const type = props.type;
    const matchStage = type === "auto" ? MatchStage.AUTO : MatchStage.TELEOP;
    const markers = type === "auto" ? (cookies.flipMap ? AutoMarkersFlipped : AutoMarkers) : (cookies.flipMap ? TeleopMarkersFlipped : TeleopMarkers);

    const [data, _] = useState(props.data);
    const [showHistory, setShowHistory] = useState(false);
    const [selectedIntakeLocation, setSelectedIntakeLocation] = useState(
        props.selectedIntakeLocation
    );
    const [gamePieceCounter, setGamePieceCounter] = useState(1);
    const [history, setHistory] = useState([]);
    const [missedSelected, setMissedSelected] = useState(false);

    const update = props.update;

    const confirmOuttake = (type) => {
        if (missedSelected) {
            type = `MISSED ${type}`;
        }
        data.setIO(
            matchStage,
            gamePieceCounter - 1,
            "intake",
            getMarkerLabel(matchStage, 1, selectedIntakeLocation)
        );
        data.setIO(matchStage, gamePieceCounter - 1, "outtake", type);
        setHistory([...history, selectedIntakeLocation]);
        setSelectedIntakeLocation(-1);
        setGamePieceCounter(gamePieceCounter + 1);
        setMissedSelected(false);
    };

    const updateHistory = () => {
        let history = [];
        for (let i = 1; i <= 30; i++) {
            let intakePositionString = data.getIO(matchStage, i, `intake`);
            if (intakePositionString !== undefined) {
                history.push(
                    Object.keys(AutoIntakePosition).indexOf(intakePositionString)
                );
            }
        }
        setHistory(history);
    };

    useEffect(() => {
        let maxFilled = 0;
        for (let i = 1; i <= 9; i++) {
            if (data.getIO(matchStage, i, `outtake`) !== undefined) {
                maxFilled = i;
            }
        }
        if (maxFilled !== 0) {
            setSelectedIntakeLocation(-1);
        }
        setGamePieceCounter(maxFilled + 1);
        updateHistory();
    }, []);

    return (
        <>
            <Grid2 container spacing={2}>
                <Grid2 xs={12} sm={3}>
                    <Stack direction={"column"} spacing={2}>
                        <Grid2 container spacing={1}>
                            <Grid2 xs={12}>
                                <Typography
                                    variant={"subtitle1"}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: 1,
                                    }}
                                >
                                    SELECTED:
                                    <Typography variant={"subtitle1"} fontWeight={"bold"}>
                                        {selectedIntakeLocation === 0
                                            ? "PRELOAD"
                                            : getMarkerLabel(matchStage, 1, selectedIntakeLocation)}
                                    </Typography>
                                </Typography>
                            </Grid2>
                        </Grid2>
                    </Stack>
                </Grid2>
                <Grid2 xs={12} sm={9}>
                    <Stack
                        direction={"column"}
                        spacing={1}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Box
                            sx={{
                                position: "relative",
                                width: "100%",
                                height: "auto",
                            }}
                        >
                            <Box
                                component={"img"}
                                src={Constants.field}
                                sx={{
                                    width: "100%",
                                    height: "auto",
                                    transform: `scaleY(${cookies.flipMap ? -1 : 1})`,
                                }}
                            />
                            {markers.map((marker) => {
                                return marker;
                            })}
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: (cookies.flipMap ? "25%" : 0),
                                    right: 0,
                                    padding: 1,
                                    gap: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-end",
                                }}
                            >
                                <Button
                                    disabled={selectedIntakeLocation === -1}
                                    variant={"contained"}
                                    color={missedSelected ? "unselected" : "error"}
                                    onClick={() => {
                                        setMissedSelected(!missedSelected);
                                    }}
                                >
                                    Missed
                                </Button>
                                {gamePieceCounter === 1 && matchStage === MatchStage.TELEOP && (
                                    <Button
                                        disabled={selectedIntakeLocation !== -1}
                                        variant={"contained"}
                                        color={"secondary"}
                                        onClick={() => {
                                            setSelectedIntakeLocation(0);
                                        }}
                                    >
                                        Pre-loaded
                                    </Button>
                                )}
                            </Box>
                        </Box>
                        <Typography variant={"h6"}>Note #{gamePieceCounter}</Typography>
                    </Stack>
                </Grid2>
            </Grid2>
            <CustomToggleButton
                label={"Show Record"}
                value={showHistory}
                onClick={(newValue) => {
                    setShowHistory(newValue);
                    update();
                }}
                showCheckbox
            />
            <Collapse in={showHistory}>
                <Stack direction={"column"}>
                    {/* eslint-disable-next-line array-callback-return */}
                    {[...Array(30).keys()].map((i) => {
                        if (
                            data.getIO(matchStage, i, `outtake`) !== undefined &&
                            data.getIO(matchStage, i, `intake`) !== undefined
                        ) {
                            return (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Typography variant={"subtitle1"}>
                                        Game Piece #{i + 1}: {data.getIO(matchStage, i, `intake`)}{" "}
                                        -> {data.getIO(matchStage, i, `outtake`)}
                                    </Typography>
                                </Box>
                            );
                        }
                    })}
                </Stack>
            </Collapse>
            <CustomToggleButton
                label={"Flip Map"}
                value={cookies.flipMap}
                onClick={(newValue) => {
                    setCookie('flipMap', newValue);
                    update();
                }}
                showCheckbox
            />
            <Undo
                data={data}
                shouldUndoData={() => {
                    return selectedIntakeLocation === -1;
                }}
                update={() => {
                    if (gamePieceCounter === 1 && selectedIntakeLocation === -1) {
                        return;
                    }
                    if (selectedIntakeLocation !== -1) {
                        if (gamePieceCounter === 1 && matchStage === MatchStage.AUTO) {
                            return;
                        }
                        setSelectedIntakeLocation(-1);
                        update();
                        return;
                    }
                    if (gamePieceCounter === 2 && matchStage === MatchStage.AUTO) {
                        setSelectedIntakeLocation(0);
                    }
                    setGamePieceCounter(gamePieceCounter - 1);
                    update();
                    updateHistory();
                }}
            />
        </>
    );
}
