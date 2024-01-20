import Grid2 from "@mui/material/Unstable_Grid2";
import {useState} from "react";
import {MatchStage} from "../../MatchConstants";
import Undo from "./form_elements/Undo";
import CustomToggleButton from "./form_elements/CustomToggleButton";
import SmallNumberCounter from "./form_elements/SmallNumberCounter";
import CustomRating from "./form_elements/CustomRating";
import {Button, Collapse} from "@mui/material";


export default function MSTeleop(props) {
    const [data, _] = useState(props.data);
    const [counter, setCounter] = useState(0);

    const update = () => {
        setCounter(counter + 1);
    };

    return (
        <>
            <Grid2 container spacing={3}>
                <SmallNumberCounter
                    label={"Notes Intaked"}
                    value={data.get(MatchStage.TELEOP, "intakes")}
                    onChange={(newValue) => {
                        data.set(MatchStage.TELEOP, "intakes", newValue);
                        update();
                    }}
                />
                <SmallNumberCounter
                    label={"Amp Outtakes"}
                    value={data.get(MatchStage.TELEOP, "amp_outtakes")}
                    onChange={(newValue) => {
                        data.set(MatchStage.TELEOP, "amp_outtakes", newValue);
                        update();
                    }}
                />
                <SmallNumberCounter
                    label={"Speaker Outtakes"}
                    value={data.get(MatchStage.TELEOP, "speaker_outtakes")}
                    onChange={(newValue) => {
                        data.set(MatchStage.TELEOP, "speaker_outtakes", newValue);
                        update();
                    }}
                />
                <SmallNumberCounter
                    label={"Dropped"}
                    value={data.get(MatchStage.TELEOP, "dropped")}
                    onChange={(newValue) => {
                        data.set(MatchStage.TELEOP, "dropped", newValue);
                        update();
                    }}
                />
                <SmallNumberCounter
                    label={"Missed"}
                    value={data.get(MatchStage.TELEOP, "missed")}
                    onChange={(newValue) => {
                        data.set(MatchStage.TELEOP, "missed", newValue);
                        update();
                    }}
                />
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

                <CustomRating
                    onChange={(newValue) => {
                        data.set(MatchStage.TELEOP, "trap", newValue);
                        update();
                    }}
                    value={data.get(MatchStage.TELEOP, "trap")}
                    title={"Trap Counter *"}
                    description={
                        "How many traps did the robot do?"
                    }
                    label={"Traps Scored"}
                    min={0}
                    max={3}
                />
            </Grid2>
            <Undo data={data} update={() => update()}/>
        </>
    );
}
