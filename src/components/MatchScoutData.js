import {Alliance, AutoIntakePosition, DriverStation, MatchStage, OuttakePosition} from "./MatchConstants";

const exampleData = [
    {
        "stage": MatchStage.PRE_MATCH,
        data: {
            "team": 1234,
            "match": 1,
            "alliance": Alliance.RED,
            "driver station": DriverStation.LEFT,
        }
    },
    {
        "stage": MatchStage.AUTO,
        data: {
            "leave": true,
            "io": [
                {
                    "intake": AutoIntakePosition.PRELOAD,
                    "outtake": OuttakePosition.SPEAKER,
                },
                {
                    "intake": AutoIntakePosition.CENTER_1,
                    "outtake": OuttakePosition.DROPPED,
                }
            ]
        }
    }
]


export default class MatchScoutData {

    constructor() {
        this.stage = MatchStage.PRE_MATCH;
        this.data = {};
    }

    push(stage, path, data) {
        
    }

    pop() {
        this.data.pop();
    }
    get() {
        return this.data;
    }
    getPrevious() {
        return this.data[this.data.length - 2];
    }

    submit() {
        // TODO: submit data to server
    }

    reset() {
        this.stage = MatchStage.PRE_MATCH;
        this.data = [];
    }
}