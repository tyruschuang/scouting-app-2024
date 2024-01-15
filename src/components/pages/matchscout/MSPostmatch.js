import {Autocomplete, FormControl, Input, InputLabel, TextField} from "@mui/material";
import {Scouters} from "../../../Scouters";
import Grid2 from "@mui/material/Unstable_Grid2";
import {useState} from "react";
import {Alliance, MatchStage} from "../../../MatchConstants";
import Undo from "../Undo";

export default function MSPrematch(props) {

    const [data, _] = useState(props.data)
    const [counter, setCounter] = useState(0)

    const update = () => {
        setCounter(counter + 1)
    }

    return (
        <>
            <Undo data={data} update={() => update()}/>
        </>
    );
}