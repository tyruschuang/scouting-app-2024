import { Scouters } from "../../Scouters";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import { MatchStage } from "../../MatchConstants";
import CustomAutocomplete from "./form_elements/CustomAutocomplete";

import CustomInput from "./form_elements/CustomInput";
import { Button, Divider } from "@mui/material";

export default function MSPrematch(props) {
  const [data, _] = useState(props.data);
  const [counter, setCounter] = useState(0);

  const update = () => {
    setCounter(counter + 1);
  };

  return (
    <>
      <Grid2 container spacing={3}>
        <CustomAutocomplete
          small
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
          small
          required
          label={"Team"}
          type={"number"}
          multiline={false}
          value={data.get(MatchStage.PRE_MATCH, "team")}
          onChange={(newValue) => {
            data.set(MatchStage.PRE_MATCH, "team", newValue);
            update();
          }}
        />
        <CustomInput
          small
          required
          label={"Match Number"}
          type={"number"}
          multiline={false}
          value={data.get(MatchStage.PRE_MATCH, "match")}
          onChange={(newValue) => {
            data.set(MatchStage.PRE_MATCH, "match", newValue);
            update();
          }}
        />
        <CustomAutocomplete
          small
          shouldNotShow={false}
          label={"Alliance"}
          options={["BLUE", "RED"]}
          value={data.get(MatchStage.PRE_MATCH, "alliance")}
          onChange={(newValue) => {
            data.set(MatchStage.PRE_MATCH, "alliance", newValue);
            update();
          }}
        />
        {/*<Button*/}
        {/*  variant="contained"*/}
        {/*  style={{*/}
        {/*    backgroundColor: allianceColor,*/}
        {/*    color: "#FFFFFF",*/}
        {/*    marginLeft: "8px",*/}
        {/*    width: "120px", // Adjust the width as needed*/}
        {/*    textTransform: "none",*/}
        {/*  }}*/}
        {/*  onClick={() =>*/}
        {/*    handleAllianceChange(*/}
        {/*      data.get(MatchStage.PRE_MATCH, "alliance") === "RED "*/}
        {/*        ? "BLUE"*/}
        {/*        : "RED "*/}
        {/*    )*/}
        {/*  }*/}
        {/*>*/}
        {/*  Alliance**/}
        {/*</Button>*/}
        <CustomAutocomplete
          small
          label={"Driver Station"}
          options={["1", "2", "3"]}
          value={data.get(MatchStage.PRE_MATCH, "driver_station")}
          onChange={(newValue) => {
            data.set(MatchStage.PRE_MATCH, "driver_station", newValue);
            update();
          }}
        />
        <CustomAutocomplete
          small
          label={"Start Position"}
          options={["1", "2", "3"]}
          value={data.get(MatchStage.PRE_MATCH, "start_position")}
          onChange={(newValue) => {
            data.set(MatchStage.PRE_MATCH, "start_position", newValue);
            update();
          }}
        />
      </Grid2>
      <Divider
        sx={{
          my: 2,
        }}
      />
      <Button fullWidth color={"secondary"} variant={"outlined"}>
        Skip
      </Button>
    </>
  );
}
