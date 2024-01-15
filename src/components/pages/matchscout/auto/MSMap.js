import {Box, Typography} from "@mui/material";

export default function MSMap(props) {

    const data = props.data

    return (
        <Box>
            <Typography variant={"h4"}>Map</Typography>
            <Typography variant={"p"}>This is the map page</Typography>
        </Box>
    );
}