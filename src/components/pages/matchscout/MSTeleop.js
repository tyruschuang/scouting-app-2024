import Grid2 from "@mui/material/Unstable_Grid2";
import {useState} from "react";
import CustomRating from "./form_elements/CustomRating";
import {MatchStage} from "../../MatchConstants";
import Undo from "./form_elements/Undo";
import {Divider} from "@mui/material";
import CustomInput from "./form_elements/CustomInput";
import CustomToggleButton from "./form_elements/CustomToggleButton";
import SmallNumberCounter from "./form_elements/SmallNumberCounter";

export default function MSTeleop(props) {

    const [data, _] = useState(props.data)
    const [counter, setCounter] = useState(0)

    const update = () => {
        setCounter(counter + 1)
    }

    return (
        <>
            <Grid2 container spacing={3}>
                <SmallNumberCounter
                    label={"Notes Intaked"}
                    value={data.get(MatchStage.TELEOP, "intakes")}
                    onChange={(newValue) => {
                        data.set(MatchStage.TELEOP, "intakes", newValue)
                        update()
                    }}
                />
            </Grid2>
            <Undo data={data} update={() => update()}/>
        </>
    );
}