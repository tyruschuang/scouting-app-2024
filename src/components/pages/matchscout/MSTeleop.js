import {useState} from "react";
import {MatchStage} from "../../MatchConstants";
import CustomToggleButton from "./form_elements/CustomToggleButton";
import CustomRating from "./form_elements/CustomRating";
import {Collapse, Stack} from "@mui/material";
import Map from "./form_elements/map/Map";


export default function MSTeleop(props) {
    const [data, _] = useState(props.data);
    const [counter, setCounter] = useState(0);

    const update = () => {
        setCounter(counter + 1);
    };

    return (
        <>
            <Stack direction={"column"} spacing={3}>
                <CustomToggleButton
                    label={"Onstage?"}
                    value={data.get(MatchStage.TELEOP, "onstage")}
                    onClick={(newValue) => {
                        data.set(MatchStage.TELEOP, "onstage", newValue);
                        update();
                    }}
                    showCheckbox
                />
                <Collapse in={data.get(MatchStage.TELEOP, "onstage")}>
                    <CustomRating
                        onChange={(newValue) => {
                            data.set(MatchStage.TELEOP, "onstage_time", newValue);
                            update();
                        }}
                        value={data.get(MatchStage.TELEOP, "onstage_time")}
                        title={"Onstage Time *"}
                        description={
                            "Give your best estimate as to how long it took the robot to get onstage."
                        }
                        label={"second(s)"}
                    />
                    <CustomToggleButton
                        showCheckbox={false}
                        label={"Harmony?"}
                        value={data.get(MatchStage.TELEOP, "harmony")}
                        onClick={(newValue) => {
                            data.set(MatchStage.TELEOP, "harmony", newValue);
                            update();
                        }}
                    />
                </Collapse>
                <Map selectedIntakeLocation={-1} data={data} update={update} type={"teleop"}/>
            </Stack>
        </>
    );
}
