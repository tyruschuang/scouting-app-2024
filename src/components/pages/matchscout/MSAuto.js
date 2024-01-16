import {useEffect, useState} from "react";
import Undo from "./form_elements/Undo";
import {AutoIntakePosition, MatchStage, OuttakePosition} from "../../MatchConstants";
import CustomToggleButton from "./form_elements/CustomToggleButton";
import {Box, Button, Divider, Stack, Tooltip, Typography} from "@mui/material";
import {theme} from "../../../Theme";
import Grid2 from "@mui/material/Unstable_Grid2";
import {Constants} from "../../../Constants";

export default function MSAuto(props) {

    const [data, _] = useState(props.data)
    const [counter, setCounter] = useState(0)

    const update = () => {
        setCounter(counter + 1)
    }

    // 0 for preload
    const [selectedIntakeLocation, setSelectedIntakeLocation] = useState(0)
    const [gamePieceCounter, setGamePieceCounter] = useState(1)
    const [intakeHistory, setIntakeHistory] = useState([])

    const getMarkerLabel = (type, id) => {
        if (type === 0) {
            return Object.keys(OuttakePosition)[id - 1]
        } else {
            return (Object.keys(AutoIntakePosition)[id] || "NONE SELECTED").replace("_", " ")
        }
    }

    const confirmOuttake = (type) => {
        data.set(MatchStage.AUTO, `gp${gamePieceCounter}_intake`, getMarkerLabel(1, selectedIntakeLocation))
        data.set(MatchStage.AUTO, `gp${gamePieceCounter}_outtake`, type)
        setIntakeHistory([...intakeHistory, selectedIntakeLocation])
        setSelectedIntakeLocation(-1)
        setGamePieceCounter(gamePieceCounter + 1)
    }

    const updateHistory = () => {
        let history = []
        for (let i = 1; i <= 9; i++) {
            let intakePositionString = data.get(MatchStage.AUTO, `gp${i}_intake`)
            if (intakePositionString !== "") {
                intakePositionString = intakePositionString.replace(" ", "_")
                history.push(Object.keys(AutoIntakePosition).indexOf(intakePositionString))
            }
        }
        setIntakeHistory(history)
    }

    function Marker(props) {

        const id = props.id
        const type = props.type

        const x = props.x
        const y = props.y

        const shouldBeOpaque = () => {
            if (selectedIntakeLocation !== -1 && type === 0) {
                return true
            }
            if (intakeHistory.includes(id) && type === 1) {
                return false
            }
            return selectedIntakeLocation === -1 && type === 1;

        }

        const shouldShowSelectedColor = () => {
            if (selectedIntakeLocation === 0 && type === 1) {
                return false
            } else if (selectedIntakeLocation === id && type === 1) {
                return true
            }
            return false
        }

        const onClick = (event) => {
            if (type === 1) {
                if (intakeHistory.includes(id)) {
                    return
                }
                if (selectedIntakeLocation === -1) {
                    setSelectedIntakeLocation(id)
                }
            } else {
                if (selectedIntakeLocation !== -1) {
                    confirmOuttake(getMarkerLabel(type, id))
                }
            }
        }

        return (
            <Tooltip title={getMarkerLabel(type, id)} placement={"top"} arrow>
                <Box sx={{
                    width: "6%",
                    aspectRatio: "1 / 1",
                    position: "absolute",
                    top: `${y}%`,
                    left: `${x}%`,
                    transform: 'translate(-50%, -50%)',

                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",

                    backgroundColor: (shouldShowSelectedColor()) ? theme.palette.success.dark : theme.palette.secondary.dark,
                    opacity: shouldBeOpaque() ? 0.8 : 0.2,
                }} onClick={(event) => {
                    onClick(event)
                }}/>
            </Tooltip>
        );

    }

    useEffect(() => {
        let maxFilled = 0
        for (let i = 1; i <= 9; i++) {
            if (data.get(MatchStage.AUTO, `gp${i}_outtake`) !== "") {
                maxFilled = i
            }
        }
        if (maxFilled !== 0) {
            setSelectedIntakeLocation(-1)
        }
        setGamePieceCounter(maxFilled + 1)
        updateHistory()
    }, []);

    return (
        <>
            <CustomToggleButton
                label={"Leave?"}
                value={data.get(MatchStage.AUTO, "leave")}
                onClick={(newValue) => {
                    data.set(MatchStage.AUTO, "leave", newValue)
                    update()
                }}
            />
            <Divider sx={{
                my: 3
            }}/>
            <Grid2 container spacing={2}>
                <Grid2 xs={12} sm={3}>
                    <Stack direction={"column"} spacing={2}>
                        <Typography variant={"h4"}>Auto Map</Typography>
                        <Typography variant={"subtitle1"}>Click on the location of the intake and outtake.</Typography>
                        <Grid2 container spacing={1}>
                            <Grid2 xs={6} sm={12}>
                                <Typography variant={"subtitle1"}>
                                    Selected Intake Location:
                                    <Typography variant={"subtitle1"}
                                                fontWeight={"bold"}>{selectedIntakeLocation === 0 ? "PRELOAD" : getMarkerLabel(1, selectedIntakeLocation)}</Typography>
                                </Typography>
                            </Grid2>
                            <Grid2 xs={6} sm={12}>
                                <Stack direction={"column"} spacing={1}>
                                    <Button fullWidth disabled={
                                        selectedIntakeLocation === -1
                                    } variant={"outlined"} color={"error"} onClick={() => {
                                        confirmOuttake("MISSED")
                                    }}>
                                        Missed
                                    </Button>
                                    <Button fullWidth disabled={
                                        selectedIntakeLocation === -1
                                    } variant={"outlined"} color={"error"} onClick={() => {
                                        confirmOuttake("DROPPED")
                                    }}>
                                        Dropped
                                    </Button>
                                </Stack>
                            </Grid2>
                        </Grid2>
                    </Stack>
                </Grid2>
                <Grid2 xs={12} sm={9}>
                    <Stack direction={"column"} spacing={2} sx={{
                        display: "flex",
                        alignItems: "center",
                    }}>
                        <Box sx={{
                            position: "relative",
                            width: "100%",
                            height: "auto"
                        }}>
                            <Box component={"img"} src={Constants.field} sx={{
                                width: "100%",
                                height: "auto"
                            }}/>
                            { /* Image Markers */}
                            { /* This is not cursed */}
                            <Marker label={"Wing Ring #1"} x={17.5} y={14.25} id={1} type={1}/>
                            <Marker label={"Wing Ring #2"} x={17.5} y={31.25} id={2} type={1}/>
                            <Marker label={"Wing Ring #3"} x={17.5} y={48.10} id={3} type={1}/>
                            <Marker label={"Center Ring #1"} x={50} y={9} id={4} type={1}/>
                            <Marker label={"Center Ring #2"} x={50} y={28.25} id={5} type={1}/>
                            <Marker label={"Center Ring #3"} x={50} y={48} id={6} type={1}/>
                            <Marker label={"Center Ring #4"} x={50} y={67.4} id={7} type={1}/>
                            <Marker label={"Center Ring #5"} x={50} y={87} id={8} type={1}/>
                            <Marker label={"Speaker Outtake"} x={5} y={31.25} id={1} type={0}/>
                            <Marker label={"Amp Outtake"} x={11} y={5} id={2} type={0}/>
                        </Box>
                        <Typography variant={"h5"}>
                            Game Piece #
                            {gamePieceCounter}
                        </Typography>
                    </Stack>
                </Grid2>
            </Grid2>
            <Undo data={data} update={() => {
                if (gamePieceCounter === 1) {
                    return
                }
                if (gamePieceCounter === 2) {
                    setSelectedIntakeLocation(0)
                }
                setGamePieceCounter(gamePieceCounter - 1)
                updateHistory()
                update();
            }
            }/>
        </>
    );
}