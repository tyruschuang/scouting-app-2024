import Grid2 from "@mui/material/Unstable_Grid2";
import {useState} from "react";
import CustomRating from "./form_elements/CustomRating";
import {MatchStage} from "../../MatchConstants";
import Undo from "./form_elements/Undo";
import {Stack, Typography} from "@mui/material";
import CustomInput from "./form_elements/CustomInput";

export default function MSPostmatch(props) {

    const [data, _] = useState(props.data)
    const [counter, setCounter] = useState(0)

    const update = () => {
        setCounter(counter + 1)
    }

    return (
        <>
            <Grid2 container spacing={2}>
                <CustomRating value={data.get(MatchStage.POST_MATCH, "driver_rating")} onChange={(newValue) => {
                    data.set(MatchStage.POST_MATCH, "driver_rating", newValue)
                    update()
                }} title={"Driver Rating *"} description={"How well did the driver perform?"}/>
                <CustomInput
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
            </Grid2>
            <Undo data={data} update={() => update()}/>
        </>
    );
}