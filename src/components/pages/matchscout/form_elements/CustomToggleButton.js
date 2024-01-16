import {Box, Button, Divider, Rating, Stack, Typography} from "@mui/material";
import {useState} from "react";
import StarIcon from '@mui/icons-material/Star';
import {MatchStage} from "../../../MatchConstants";
import Grid2 from "@mui/material/Unstable_Grid2";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export default function CustomToggleButton(props) {

    const label = props.label
    const color = props.color
    const onClick = props.onClick
    const value = props.value

    return (
        <Grid2 xs={12}>
            <Button
                variant={value ? "contained" : "filled"}
                color={"inherit"}
                onClick={() => {
                    onClick(!value)
                }}
                fullWidth
>
                    {value ? <CheckBoxIcon/> : <CheckBoxOutlineBlankIcon/>}
                <Box sx={{
                    mx: 1
                }}/>
                    {label}
            </Button>
        </Grid2>
    )

}