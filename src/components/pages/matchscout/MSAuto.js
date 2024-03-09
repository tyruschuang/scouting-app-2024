import {useState} from "react";
import Map from "./form_elements/map/Map";
import {Stack} from "@mui/material";
import {MatchStage} from "../../MatchConstants";
import CustomToggleButton from "./form_elements/CustomToggleButton";
import {useCookies} from "react-cookie";

export default function MSAuto(props) {
    const [data, _] = useState(props.data);
    const [counter, setCounter] = useState(0);

    const update = () => {
        setCounter(counter + 1);
    };

    return (
        <Stack direction={"column"} spacing={2}>
            <CustomToggleButton
                label={"Leave?"}
                value={data.get(MatchStage.AUTO, "leave")}
                onClick={(newValue) => {
                    data.set(MatchStage.AUTO, "leave", newValue);
                    update();
                }}
                showCheckbox={false}
            />
            <Map selectedIntakeLocation={0} data={data} update={update} type={"auto"}/>
        </Stack>
    );
}
