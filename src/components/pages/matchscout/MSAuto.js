import {Box} from "@mui/material";
import {useState} from "react";

export default function MSAuto(props) {

    const [data, _] = useState(props.data)
    const [counter, setCounter] = useState(0)

    const update = () => {
        setCounter(counter + 1)
    }

    return (
        // map
        <>

        </>
    );
}