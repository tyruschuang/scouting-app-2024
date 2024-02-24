import { useEffect, useState } from "react";
import {
  AutoIntakePosition,
  getMarkerLabel,
  MatchStage,
} from "../../../../MatchConstants";
import Grid2 from "@mui/material/Unstable_Grid2";
import {
  Box,
  Button,
  Collapse,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CustomToggleButton from "../CustomToggleButton";
import { Constants } from "../../../../../Constants";
import Undo from "../Undo";
import Marker from "./Marker";
import CloseIcon from "@mui/icons-material/Close";

export default function Map(props) {
  const AutoMarkers = [
    <AutoMarker label={"Wing Ring #1"} x={17.5} y={14.25} id={1} type={1} />,
    <AutoMarker label={"Wing Ring #2"} x={17.5} y={31.25} id={2} type={1} />,
    <AutoMarker label={"Wing Ring #3"} x={17.5} y={48.1} id={3} type={1} />,
    <AutoMarker label={"Center Ring #1"} x={50} y={9} id={4} type={1} />,
    <AutoMarker label={"Center Ring #2"} x={50} y={28.25} id={5} type={1} />,
    <AutoMarker label={"Center Ring #3"} x={50} y={48} id={6} type={1} />,
    <AutoMarker label={"Center Ring #4"} x={50} y={67.4} id={7} type={1} />,
    <AutoMarker label={"Center Ring #5"} x={50} y={87} id={8} type={1} />,
    <AutoMarker label={"Speaker Outtake"} x={5} y={31.25} id={1} type={0} />,
    <AutoMarker label={"Amp Outtake"} x={11} y={5} id={2} type={0} />,
    <AutoMarker label={"Trap Outtake"} x={29.5} y={49} id={5} type={0} />,
  ];
  const TeleopMarkers = [
    <AutoMarker label={"Source"} x={94.0} y={85.25} id={1} type={1} />,
    <AutoMarker label={"Ground"} x={17.5} y={75.25} id={2} type={1} />,
    <AutoMarker label={"Speaker Outtake"} x={5} y={31.25} id={1} type={0} />,
    <AutoMarker label={"Amp Outtake"} x={11} y={5} id={2} type={0} />,
    <AutoMarker label={"Trap Outtake"} x={29.5} y={49} id={5} type={0} />,
  ];

  function AutoMarker(props) {
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
  const markers = type === "auto" ? AutoMarkers : TeleopMarkers;

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
            spacing={2}
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
                }}
              />
              {markers.map((marker) => {
                return marker;
              })}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  padding: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <Button
                  fullWidth
                  disabled={selectedIntakeLocation === -1}
                  variant={"contained"}
                  color={missedSelected ? "unselected" : "error"}
                  onClick={() => {
                    setMissedSelected(true);
                  }}
                >
                  Missed
                </Button>
                <Divider sx={{ my: 1 }}></Divider>
                <Button
                  fullWidth
                  disabled={selectedIntakeLocation === -1}
                  variant={"contained"}
                  color={"error"}
                  onClick={() => {
                    confirmOuttake("DROPPED");
                  }}
                >
                  Dropped
                </Button>
                <Divider sx={{ my: 1 }}></Divider>
                {(gamePieceCounter === 1 ||
                  matchStage === matchStage.TELEOP) && (
                  <Button
                    fullWidth
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

      <Undo
        data={data}
        update={() => {
          if (gamePieceCounter === 1) {
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
      <CustomToggleButton
        label={"Show Record"}
        value={showHistory}
        onClick={(newValue) => {
          setShowHistory(newValue);
          update();
        }}
        sx={{
          mt: 2,
        }}
        showCheckbox
      />
      <Collapse in={showHistory}>
        <Stack
          direction={"column"}
          spacing={2}
          sx={{
            mt: 2,
          }}
        >
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
                  {((i !== 0 && matchStage === MatchStage.AUTO) ||
                    matchStage === MatchStage.TELEOP) && (
                    <IconButton
                      size={"small"}
                      sx={{
                        top: -3,
                      }}
                      color={"primary"}
                      onClick={(event) => {
                        data.clearIO(matchStage, i);
                        setGamePieceCounter(gamePieceCounter - 1);
                        updateHistory();
                        update();
                      }}
                    >
                      <CloseIcon fontSize={"small"} />
                    </IconButton>
                  )}
                </Box>
              );
            }
          })}
        </Stack>
      </Collapse>
    </>
  );
}
