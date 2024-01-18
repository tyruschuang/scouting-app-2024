import { Scouters } from "../../Scouters";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import { MatchStage } from "../../MatchConstants";
import Undo from "./form_elements/Undo";
import CustomAutocomplete from "./form_elements/CustomAutocomplete";

import CustomInput from "./form_elements/CustomInput";
import { Button, Divider } from "@mui/material";

export default function MSPrematch(props) {
  const [data, _] = useState(props.data);
  const [counter, setCounter] = useState(0);

  const update = () => {
    setCounter(counter + 1);
  };

  const handleAllianceChange = (newValue) => {
    data.set(MatchStage.PRE_MATCH, "alliance", newValue);
    update();
  };

  const allianceColor =
    data.get(MatchStage.PRE_MATCH, "alliance") === "RED "
      ? "#FF0000"
      : "#0000FF";

  return (
    <>
      <Grid2 container spacing={3}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <CustomAutocomplete
            label={"Name"}
            options={Scouters}
            value={data.get(MatchStage.PRE_MATCH, "name")}
            onChange={(newValue) => {
              // TODO: Autofill based off of name
              data.set(MatchStage.PRE_MATCH, "name", newValue);
              update();
            }}
            shouldNotShow
          />
          <CustomInput
            label={"Team"}
            type={"number"}
            multiline={false}
            value={data.get(MatchStage.PRE_MATCH, "team")}
            onChange={(newValue) => {
              data.set(MatchStage.PRE_MATCH, "team", newValue);
              update();
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <CustomInput
            label={"Match Number"}
            type={"number"}
            multiline={false}
            value={data.get(MatchStage.PRE_MATCH, "match")}
            onChange={(newValue) => {
              data.set(MatchStage.PRE_MATCH, "match", newValue);
              update();
            }}
          />

          <Button
            variant="contained"
            style={{
              backgroundColor: allianceColor,
              color: "#FFFFFF",
              marginLeft: "8px",
              width: "120px", // Adjust the width as needed
              textTransform: "none",
            }}
            onClick={() =>
              handleAllianceChange(
                data.get(MatchStage.PRE_MATCH, "alliance") === "RED "
                  ? "BLUE"
                  : "RED "
              )
            }
          >
            Alliance*
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/*PLEASE FIX THIS UGLINESS*/}{" "}
          <CustomAutocomplete
            label={"Driver Station"}
            options={["1", "2", "3"]}
            value={data.get(MatchStage.PRE_MATCH, "driver_station")}
            onChange={(newValue) => {
              data.set(MatchStage.PRE_MATCH, "driver_station", newValue);
              update();
            }}
          />
          <CustomAutocomplete
            label={"Robot Start Position"}
            options={["1", "2", "3"]}
            value={data.get(MatchStage.PRE_MATCH, "start_pos")}
            onChange={(newValue) => {
              data.set(MatchStage.PRE_MATCH, "start_pos", newValue);
              update();
            }}
          />
        </div>
      </Grid2>
      <Divider></Divider>
      <Button
        sx={{
          my: 3,
        }}
        fullWidth
        color={"primary"}
        variant={"outlined"}
      >
        {" "}
        SKIP{" "}
      </Button>
    </>
  );
}
