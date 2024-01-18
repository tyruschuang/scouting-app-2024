import Grid2 from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import { MatchStage } from "../../MatchConstants";
import Undo from "./form_elements/Undo";
import CustomToggleButton from "./form_elements/CustomToggleButton";
import SmallNumberCounter from "./form_elements/SmallNumberCounter";
import CustomRating from "./form_elements/CustomRating";
import { Collapse, Button } from "@mui/material";
import CustomSlider from "./form_elements/CustomSlider";
const timeLabels = {
  1: "I fell asleep",
  2: "7-10 seconds",
  3: "5-6 seconds",
  4: "3-4 seconds",
  5: "1-2 seconds",
};

export default function MSTeleop(props) {
  const [data, _] = useState(props.data);
  const [counter, setCounter] = useState(0);

  const update = () => {
    setCounter(counter + 1);
  };

  return (
    <>
      <Grid2 container spacing={3}>
        <SmallNumberCounter
          label={"Notes Intaked"}
          value={data.get(MatchStage.TELEOP, "intakes")}
          onChange={(newValue) => {
            data.set(MatchStage.TELEOP, "intakes", newValue);
            update();
          }}
        />
        <SmallNumberCounter
          label={"Amp Outtakes"}
          value={data.get(MatchStage.TELEOP, "amp_outtakes")}
          onChange={(newValue) => {
            data.set(MatchStage.TELEOP, "amp_outtakes", newValue);
            update();
          }}
        />
        <SmallNumberCounter
          label={"Speaker Outtakes"}
          value={data.get(MatchStage.TELEOP, "speaker_outtakes")}
          onChange={(newValue) => {
            data.set(MatchStage.TELEOP, "speaker_outtakes", newValue);
            update();
          }}
        />
        <SmallNumberCounter
          label={"Dropped"}
          value={data.get(MatchStage.TELEOP, "dropped")}
          onChange={(newValue) => {
            data.set(MatchStage.TELEOP, "dropped", newValue);
            update();
          }}
        />
        <SmallNumberCounter
          label={"Missed"}
          value={data.get(MatchStage.TELEOP, "missed")}
          onChange={(newValue) => {
            data.set(MatchStage.TELEOP, "missed", newValue);
            update();
          }}
        />
        <CustomToggleButton
          label={"Onstage?"}
          value={data.get(MatchStage.TELEOP, "onstage")}
          onClick={(newValue) => {
            data.set(MatchStage.TELEOP, "onstage", newValue);
            update();
          }}
        />
        {/*Add a trap counter? */}
        <Collapse in={data.get(MatchStage.TELEOP, "onstage")}>
          {/*u said you can implement, maybe have it be discrete stages? */}
          <CustomSlider></CustomSlider>

          <Button
            fullWidth
            variant="contained"
            style={{
              backgroundColor: data.get(MatchStage.TELEOP, "harmony")
                ? "pink"
                : "black",
              color: "white", // Set text color to white
              border: "2px solid",
            }}
            sx={{
              "&:hover": {
                backgroundColor: data.get(MatchStage.TELEOP, "harmony")
                  ? "black"
                  : "pink",
                color: "white", // Set hover text color to white
              },
            }}
            onClick={() => {
              data.set(
                MatchStage.TELEOP,
                "harmony",
                !data.get(MatchStage.TELEOP, "harmony")
              );
              update();
            }}
          >
            Harmony?
            {console.log(
              "Updated leave value:",
              data.get(MatchStage.TELEOP, "harmony")
            )}
          </Button>
        </Collapse>

        {/* remove dis trap pls. idk tbh but idt we'll use trap time*/}
        <CustomToggleButton
          label={"Trap?"}
          value={data.get(MatchStage.TELEOP, "trap")}
          labels={timeLabels}
          onClick={(newValue) => {
            data.set(MatchStage.TELEOP, "trap", newValue);
            update();
          }}
        />

        {/* remove dis trap pls. idk tbh but idt we'll use trap time*/}
        <Collapse in={data.get(MatchStage.TELEOP, "trap")}>
          <CustomRating
            onChange={(newValue) => {
              data.set(MatchStage.TELEOP, "trap_time", newValue);
              update();
            }}
            labels={timeLabels}
            value={data.get(MatchStage.TELEOP, "trap_time")}
            title={"Trap Time *"}
            description={
              "Give your best estimate as to how long it took the robot to score in the trap."
            }
          />
        </Collapse>
      </Grid2>
      <Undo data={data} update={() => update()} />
    </>
  );
}
