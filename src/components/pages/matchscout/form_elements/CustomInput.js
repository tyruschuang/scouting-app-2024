import {Autocomplete, FormControl, Input, InputLabel, TextField} from "@mui/material";
import {Scouters} from "../../../Scouters";
import {MatchStage} from "../../../MatchConstants";
import Grid2 from "@mui/material/Unstable_Grid2";

export default function CustomInput(props) {

    const label = props.label
    const helperText = props.helperText || ""
    const type = props.type
    const multiline = props.multiline
    const fullWidth = props.fullWidth
    const value = props.value
    const onChange = props.onChange

    return (
        <Grid2 xs={12} sm={fullWidth ? 12 : 6}>
            <FormControl fullWidth>
                <TextField
                    required
                    id={label}
                    type={type}
                    value={value}
                    multiline={multiline}
                    label={label}
                    helperText={helperText}
                    variant={"filled"}
                    onChange={(event) => {
                        onChange()
                    }}
                />
            </FormControl>
        </Grid2>
    );
}