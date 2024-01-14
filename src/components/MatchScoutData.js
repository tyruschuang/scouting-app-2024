import {Alliance, AutoIntakePosition, DriverStation, MatchStage, OuttakePosition} from "./MatchConstants";

const exampleData = [
    {
        "stage": MatchStage.PRE_MATCH,
        "team": 1234,
        "match": 1,
        "name": "Tyrus",
        "alliance": Alliance.RED,
        "driver_station": DriverStation.LEFT,
    },
    {
        "stage": MatchStage.AUTO,
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
]


export default class MatchScoutData {

    constructor() {
        this.stage = MatchStage.PRE_MATCH;
        this.data = exampleData;
        this.history = [];
    }

    get(stage, path) {
        return this.data[stage][path];
    }

    set(stage, path, value) {
        this.history.push({
            "stage": stage,
            "path": path,
            "value": this.data[stage][path],
            "time": new Date(),
        })
        this.data[stage][path] = value;
        console.log(this.data)
    }

    undo() {
        if (this.history.length === 0) return;
        // Find all history entries entered in the last 2 seconds
        const now = new Date();
        const last = this.history.filter((entry) => {
            console.log(now - entry.time)
            return (now - entry.time) < 5000;
        });

        console.log(last)

        // If there are no entries, return
        if (last.length === 0) return;

        // Undo the entries
        last.forEach((entry) => {
            this.data[entry.stage][entry.path] = entry.value;
        });

        // Remove the entries from the history
        this.history = this.history.filter((entry) => {
            return (now - entry.time) >= 2000;
        });

        console.log(this.data);
    }

    submit() {
        // TODO: submit data to server
    }

    reset() {
        this.stage = MatchStage.PRE_MATCH;
        this.data = [];
    }
}