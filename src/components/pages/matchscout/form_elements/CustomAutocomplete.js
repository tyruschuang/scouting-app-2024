import {Autocomplete, FormControl, TextField} from "@mui/material";
import {Scouters} from "../../../Scouters";
import {MatchStage} from "../../../MatchConstants";
import Grid2 from "@mui/material/Unstable_Grid2";

export default function CustomAutocomplete(props) {

    const label = props.label
    const options = props.options
    const value = props.value
    const onChange = props.onChange

    return (
        <Grid2 xs={12} sm={6}>
            <FormControl fullWidth>
                <Autocomplete
                    id={label}
                    options={options}
                    value={value}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={label}
                            variant={"filled"}
                            required
                        />
                    )}
                    onChange={(event, newValue) => {
                        onChange(newValue)
                    }}
                    isOptionEqualToValue={(option, value) => option.toUpperCase() === value.toUpperCase() || value === ""}
                />
            </FormControl>
        </Grid2>
    );
}