import {AutoIntakePosition, MatchStage, OuttakePosition} from "./MatchConstants";

const exampleData = [
    {
        "stage": MatchStage.PRE_MATCH,
        "team": 9999,
        "match": 1,
        "name": "",
        "alliance": "",
        "driver_station": "",
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
        this.historyCounter = 0;
    }

    get(stage, path) {
        return this.data[stage][path];
    }

    set(stage, path, value) {
        this.history.push({
            "id": ++this.historyCounter,
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

        const latestEntry = this.history[this.history.length - 1];
        if (latestEntry.stage !== this.stage) return;

        const entriesToUndo = this.history.filter((entry) => {
            return entry.stage === this.stage && latestEntry.time - entry.time < 1000;
        })

        console.log(latestEntry)
        console.log(entriesToUndo)

        // If there are no entries, return
        if (entriesToUndo.length === 0) return;

        // Undo the entries
        entriesToUndo.reverse().forEach((entry) => {
            this.data[entry.stage][entry.path] = entry.value;
        });

        // Remove the entries from the history
        this.history = this.history.filter((entry) => {
            return !entriesToUndo.includes(entry);
        })

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