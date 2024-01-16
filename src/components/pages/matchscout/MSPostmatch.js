import Grid2 from "@mui/material/Unstable_Grid2";
import {useState} from "react";
import CustomRating from "./form_elements/CustomRating";
import {MatchStage} from "../../MatchConstants";
import Undo from "./form_elements/Undo";
import {Collapse, Divider} from "@mui/material";
import CustomInput from "./form_elements/CustomInput";
import CustomToggleButton from "./form_elements/CustomToggleButton";


export default function MSPostmatch(props) {

    const [data, _] = useState(props.data)
    const [counter, setCounter] = useState(0)

    const update = () => {
        setCounter(counter + 1)
    }

    return (
        <>
            <Grid2 container spacing={3}>
                <CustomRating value={data.get(MatchStage.POST_MATCH, "driver_rating")} onChange={(newValue) => {
                    data.set(MatchStage.POST_MATCH, "driver_rating", newValue)
                    update()
                }} title={"Driver Rating *"} description={"How well did the driver perform?"}/>
                <CustomInput
                    required={false}
                    label={"Extra Comments"}
                    helperText={"Anything else you would like to add? For example, did the robot break down, or did the drive team do something exceptional?"}
                    type={"text"}
                    multiline={true}
                    value={data.get(MatchStage.POST_MATCH, "comments")}
                    onChange={(newValue) => {
                        data.set(MatchStage.POST_MATCH, "comments", newValue)
                        update()
                    }}
                />
                <Grid2 xs={12}>
                    <Divider/>
                </Grid2>
                <CustomToggleButton
                    label={"Did play defense?"}
                    value={data.get(MatchStage.POST_MATCH, "defense")}
                    onClick={(newValue) => {
                        data.set(MatchStage.POST_MATCH, "defense", newValue)
                        update()
                    }}
                />
                <Collapse in={data.get(MatchStage.POST_MATCH, "defense")}>
                    <CustomRating value={data.get(MatchStage.POST_MATCH, "defense_rating")}
                                  onChange={(newValue) => {
                                      data.set(MatchStage.POST_MATCH, "defense_rating", newValue)
                                      update()
                                  }
                                  } title={"Defense Rating *"}
                                  description={"How well did the driver play defense on their target team?"}/>
                    <CustomInput
                        label={"Team Defended"}
                        description={"Mainly what team did the driver focus on defending?"}
                        type={"number"}
                        multiline={false}
                        value={data.get(MatchStage.POST_MATCH, "defended_who")}
                        onChange={(newValue) => {
                            data.set(MatchStage.POST_MATCH, "defended_who", newValue)
                            update()
                        }}
                    />
                    <CustomInput
                        label={"Comments on Defense"}
                        helperText={"Did the driver perform so well, that their performance can't even be described by a number?"}
                        type={"text"}
                        multiline={true}
                        fullWidth={true}
                        value={data.get(MatchStage.POST_MATCH, "defense_comments")}
                        onChange={(newValue) => {
                            data.set(MatchStage.POST_MATCH, "defense_comments", newValue)
                            update()
                        }}
                    />
                </Collapse>
            </Grid2>
            <Undo data={data} update={() => update()}/>
        </>
    );
}