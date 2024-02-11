import {lightGreen, orange, red, yellow} from "@mui/material/colors";
import {createTheme} from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        mode: "dark",

        primary: orange,
        secondary: yellow,

        success: lightGreen,
        error: red,
        unselected: {main: '#ff7f7f',}
    },

    // typography: {
    //     fontSize: 25,
    //
    //     h1: {
    //         fontSize: 30,
    //         fontWeight: 400,
    //     },
    // }
});