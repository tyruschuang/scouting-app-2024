import {Autocomplete, FormControl, Input, InputLabel, TextField} from "@mui/material";
import {Scouters} from "../../Scouters";
import Grid2 from "@mui/material/Unstable_Grid2";
import {useState} from "react";
import {Alliance, MatchStage} from "../../MatchConstants";
import Undo from "./form_elements/Undo";
import CustomAutocomplete from "./form_elements/CustomAutocomplete";
import CustomInput from "./form_elements/CustomInput";

export default function MSPrematch(props) {

    const [data, _] = useState(props.data)
    const [counter, setCounter] = useState(0)

    const update = () => {
        setCounter(counter + 1)
    }

    return (
        <>
            <Grid2 container spacing={3}>
                <CustomAutocomplete
                    label={"Name"}
                    options={Scouters}
                    value={data.get(MatchStage.PRE_MATCH, "name")}
                    onChange={(newValue) => {
                        data.set(MatchStage.PRE_MATCH, "name", newValue)
                        update()
                    }}
                />
                <CustomInput
                    label={"Team"}
                    type={"number"}
                    multiline={false}
                    value={data.get(MatchStage.PRE_MATCH, "team")}
                    onChange={(newValue) => {
                        data.set(MatchStage.PRE_MATCH, "team", newValue)
                        update()
                    }}
                />
                <CustomAutocomplete
                    label={"Alliance"}
                    options={["RED", "BLUE"]}
                    value={data.get(MatchStage.PRE_MATCH, "alliance")}
                    onChange={(newValue) => {
                        data.set(MatchStage.PRE_MATCH, "alliance", newValue)
                        update()
                    }}
                />
                <CustomAutocomplete
                    label={"Driver Station"}
                    options={["LEFT", "CENTER", "RIGHT"]}
                    value={data.get(MatchStage.PRE_MATCH, "driver_station")}
                    onChange={(newValue) => {
                        data.set(MatchStage.PRE_MATCH, "driver_station", newValue)
                        update()
                    }}
                />
            </Grid2>
            <Undo data={data} update={() => update()}/>
        </>
    );
}