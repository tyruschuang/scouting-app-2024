import {
    Autocomplete,
    Box,
    Button,
    Container,
    FormControl, Grid, Input,
    InputLabel,
    MenuItem,
    Select,
    Stack, TextField,
    Typography
} from "@mui/material";
import {Scouters} from "../../../Scouters";
import Grid2 from "@mui/material/Unstable_Grid2";
import {useEffect, useState} from "react";
import {Alliance, DriverStation, MatchStage} from "../../../MatchConstants";

export default function MSPrematch(props) {

    // const data = props.data
    const [data, setData] = useState(props.data)
    const [driverStation, setDriverStation] = useState(0)

    return (
        <>
            <Grid2 container spacing={2}>
                <Grid2 xs={12} sm={6}>
                    <FormControl fullWidth>
                        <Autocomplete
                            id="name"
                            options={Scouters}
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
                            }}
                        />
                    </FormControl>
                </Grid2>
                <Grid2 xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor={"team"} required>Team</InputLabel>
                        <Input
                            id="team"
                            type={"number"}
                            onChange={(event) => {
                                data.set(MatchStage.PRE_MATCH, "team", event.target.value)
                            }}
                        />
                    </FormControl>
                </Grid2>
                <Grid2 xs={12} sm={6}>
                    <FormControl fullWidth>
                        <Autocomplete
                            id="alliance"
                            options={Object.keys(Alliance)}
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
                            }}
                        />
                    </FormControl>
                </Grid2>
                <Grid2 xs={12} sm={6}>
                    <FormControl fullWidth>
                        <Autocomplete
                            id="driver-station"
                            options={Object.keys(DriverStation)}
                            // value={Object.keys(DriverStation)[driverStation]}
                            value={Object.keys(DriverStation)[data.get(MatchStage.PRE_MATCH, "driver_station")]}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={"Driver Station"}
                                    variant={"filled"}
                                    required
                                />
                            )}
                            onChange={(event, newValue) => {
                                data.set(MatchStage.PRE_MATCH, "driver_station", Object.keys(DriverStation).indexOf(newValue))
                                setDriverStation(Object.keys(DriverStation).indexOf(newValue))
                            }}
                        />
                    </FormControl>
                </Grid2>
            </Grid2>
        </>
    );
}