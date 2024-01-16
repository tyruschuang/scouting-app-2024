import {AutoIntakePosition, MatchStage, OuttakePosition} from "./MatchConstants";

const defaultData = [
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
        "leave": false,
        "io": [
        ]
    },
    {
        "stage": MatchStage.TELEOP,
        "intaked": 0,
        "amp_outtakes": 0,
        "speaker_outtakes": 0,
        "dropped": 0,
        "missed": 0,
        "trap": false,
        "onstage": false,
        "onstage_others": false,
    },
    {
        "stage": MatchStage.POST_MATCH,
        "driver_rating": 0,
        "defense": false,
        "defense_rating": 0,
        "defended_who": 9999,
        "defense_comments": "",
        "comments": "",
    },
    {
        "stage": MatchStage.METADATA,
        "timestamp": new Date(),
    }
]


export default class MatchScoutData {

    constructor() {
        this.stage = MatchStage.PRE_MATCH;
        this.data = defaultData;
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
    }

    // TODO: Nothing was undone notification
    undo() {
        if (this.history.length === 0) return;

        const latestEntry = this.history[this.history.length - 1];
        if (latestEntry.stage !== this.stage) return;

        const entriesToUndo = this.history.filter((entry) => {
            return entry.stage === this.stage && latestEntry.time - entry.time < 1000;
        })

        if (entriesToUndo.length === 0) return;
        entriesToUndo.reverse().forEach((entry) => {
            this.data[entry.stage][entry.path] = entry.value;
        });

        this.history = this.history.filter((entry) => {
            return !entriesToUndo.includes(entry);
        })
    }

    submit() {
        const validation = this.validate();
        if (!validation.valid) {
            alert(validation.message);
            return validation;
        }

        // Add extra metadata
        this.set(MatchStage.METADATA, "timestamp", Date.now())

        console.log(this.data);
        // TODO: submit data to server

        return true
    }

    validate() {
        if (this.stage !== MatchStage.POST_MATCH) return {valid: false, message: "You must complete the match before submitting."};

        return {valid: true, message: ""};
    }

    reset() {
        this.stage = MatchStage.PRE_MATCH;
        this.data = defaultData;
    }
}