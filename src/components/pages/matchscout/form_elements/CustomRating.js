import {Box, Rating, Stack, Typography} from "@mui/material";
import {useState} from "react";
import StarIcon from '@mui/icons-material/Star';
import {MatchStage} from "../../../MatchConstants";
import Grid2 from "@mui/material/Unstable_Grid2";

// TODO: Change these labels
const labels = {
    1: 'Nuisance',
    2: 'Below Average',
    3: 'Average',
    4: 'Above Average',
    5: 'Excellent',
}

export default function CustomRating(props) {

    const onChange = props.onChange
    const value = props.value

    const title = props.title
    const description = props.description

    const [hover, setHover] = useState(-1)

    return (
        <Grid2 xs={12} sm={6}>
            <Stack spacing={1} direction={"column"}>
                <Typography variant={"h4"}>{title}</Typography>
                <Typography variant={"subtitle1"}>{description}</Typography>
                <Stack spacing={2} direction={"row"}>
                    <Rating
                        value={value}
                        onChange={(event, newValue) => {
                            onChange(newValue)
                        }}
                        onChangeActive={(event, newHover) => {
                            setHover(newHover);
                        }}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                    {value >= 0 && (
                        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                    )}
                </Stack>
            </Stack>
        </Grid2>
    )

}