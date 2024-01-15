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
            <Grid2 container spacing={2}>
                <Grid2 xs={12} sm={6}>
                    <FormControl fullWidth>
                        <Autocomplete
                            id="name"
                            options={Scouters}
                            value={data.get(MatchStage.PRE_MATCH, "name")}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={"Name"}
                                    variant={"filled"}
                                    required
                                />
                            )}
                            onChange={(event, newValue) => {
                                data.set(MatchStage.PRE_MATCH, "name", newValue)
                                update()
                            }}
                            isOptionEqualToValue={(option, value) => option.toUpperCase() === value.toUpperCase() || value === ""}
                        />
                    </FormControl>
                </Grid2>
                <Grid2 xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor={"team"} required>Team</InputLabel>
                        <Input
                            id="team"
                            type={"number"}
                            value={data.get(MatchStage.PRE_MATCH, "team")}
                            onChange={(event) => {
                                data.set(MatchStage.PRE_MATCH, "team", event.target.value)
                                update()
                            }}
                        />
                    </FormControl>
                </Grid2>
                <Grid2 xs={12} sm={6}>
                    <FormControl fullWidth>
                        <Autocomplete
                            id="alliance"
                            options={["RED", "BLUE"]}
                            value={data.get(MatchStage.PRE_MATCH, "alliance")}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={"Alliance"}
                                    variant={"filled"}
                                    required
                                />
                            )}
                            onChange={(event, newValue) => {
                                data.set(MatchStage.PRE_MATCH, "alliance", newValue)
                                update()
                            }}
                            isOptionEqualToValue={(option, value) => option.toUpperCase() === value.toUpperCase() || value === ""}
                        />
                    </FormControl>
                </Grid2>
                <Grid2 xs={12} sm={6}>
                    <FormControl fullWidth>
                        <Autocomplete
                            id="driver-station"
                            options={["LEFT", "CENTER", "RIGHT"]}
                            value={data.get(MatchStage.PRE_MATCH, "driver_station")}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={"Driver Station"}
                                    variant={"filled"}
                                    required
                                />
                            )}
                            onChange={(event, newValue) => {
                                data.set(MatchStage.PRE_MATCH, "driver_station", newValue)
                                update()
                            }}
                            isOptionEqualToValue={(option, value) => option.toUpperCase() === value.toUpperCase() || value === ""}
                        />
                    </FormControl>
                </Grid2>
            </Grid2>
            <Undo data={data} update={() => update()}/>
        </>
    );
}