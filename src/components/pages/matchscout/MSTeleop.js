import Grid2 from "@mui/material/Unstable_Grid2";
import {useState} from "react";
import {MatchStage} from "../../MatchConstants";
import Undo from "./form_elements/Undo";
import CustomToggleButton from "./form_elements/CustomToggleButton";
import SmallNumberCounter from "./form_elements/SmallNumberCounter";

export default function MSTeleop(props) {

    const [data, _] = useState(props.data)
    const [counter, setCounter] = useState(0)

    const update = () => {
        setCounter(counter + 1)
    }

    return (
        <>
            <Grid2 container spacing={3}>
                <SmallNumberCounter
                    label={"Notes Intaked"}
                    value={data.get(MatchStage.TELEOP, "intakes")}
                    onChange={(newValue) => {
                        data.set(MatchStage.TELEOP, "intakes", newValue)
                        update()
                    }}
                />
                <SmallNumberCounter
                    label={"Amp Outtakes"}
                    value={data.get(MatchStage.TELEOP, "amp_outtakes")}
                    onChange={(newValue) => {
                        data.set(MatchStage.TELEOP, "amp_outtakes", newValue)
                        update()
                    }}
                />
                <SmallNumberCounter
                    label={"Speaker Outtakes"}
                    value={data.get(MatchStage.TELEOP, "speaker_outtakes")}
                    onChange={(newValue) => {
                        data.set(MatchStage.TELEOP, "speaker_outtakes", newValue)
                        update()
                    }}
                />
                <SmallNumberCounter
                    label={"Dropped"}
                    value={data.get(MatchStage.TELEOP, "dropped")}
                    onChange={(newValue) => {
                        data.set(MatchStage.TELEOP, "dropped", newValue)
                        update()
                    }}
                />
                <SmallNumberCounter
                    label={"Missed"}
                    value={data.get(MatchStage.TELEOP, "Missed")}
                    onChange={(newValue) => {
                        data.set(MatchStage.TELEOP, "Missed", newValue)
                        update()
                    }}
                />
                <CustomToggleButton
                    label={"Onstage?"}
                    value={data.get(MatchStage.TELEOP, "onstage")}
                    onClick={(newValue) => {
                        data.set(MatchStage.TELEOP, "onstage", newValue)
                        update()
                    }}
                />
                {data.get(MatchStage.TELEOP, "onstage")
                    // TODO: Slider for estimating trap and onstage time
                    && (
                        <>
                            <CustomToggleButton
                                label={"Onstage with Others?"}
                                value={data.get(MatchStage.TELEOP, "owo")}
                                onClick={(newValue) => {
                                    data.set(MatchStage.TELEOP, "owo", newValue)
                                    update()
                                }}
                            />
                            <CustomToggleButton
                                label={"Trap?"}
                                value={data.get(MatchStage.TELEOP, "trap")}
                                onClick={(newValue) => {
                                    data.set(MatchStage.TELEOP, "trap", newValue)
                                    update()
                                }}
                            />
                        </>
                    )}
            </Grid2>
            <Undo data={data} update={() => update()}/>
        </>
    );
}