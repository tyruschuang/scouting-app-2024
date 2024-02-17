import {MatchStage} from "./MatchConstants";
import {Scouters} from "./Scouters";
import { collection, addDoc, setDoc, doc, getFirestore } from 'firebase/firestore';

const defaultData = [
    {
        prematchstage: MatchStage.PRE_MATCH,
        team: null,
        match: null,
        name: null,
        alliance: null,
        driver_station: null,
        start_position: null,
    },
    {
        autostage: MatchStage.AUTO,
        leave: false,
        io: [
            {
                intake: "PRELOAD",
            },
        ],
    },
    {
        teleopstage: MatchStage.TELEOP,
        io: [],
        onstage: false,
        onstage_time: 0,
        harmony: false,
        trap: 0,
    },
    {
        postmatchstage: MatchStage.POST_MATCH,
        defense: "",
        comments: "",
        player: false,
        highNotes: 0,
    },
    {
        metadatastage: MatchStage.METADATA,
        timestamp: new Date(),
    },
];
var firebaseData = {};
// var iocount=0
// for(let i = 0; i < 4; i++) {
//     defaultData[i].io.forEach(function (item, index) {
//         iocount+=1
//       });
// }
// console.log(iocount);
for (const key in defaultData){
    for (const inner in defaultData[key]){
    //   console.log(`${inner}:${defaultData[key][inner]}`);
      firebaseData[`${inner}`] = `${defaultData[key][inner]}`;
    }
  }

  console.log(firebaseData)
  export default class MatchScoutData {
    constructor() {
        this.stage = MatchStage.PRE_MATCH;
        this.data = defaultData;
        this.history = [];
        this.historyCounter = 0;

        this.alert = {
            open: false,
            message: "",
            severity: "success",
        };
    }

    get(stage, path) {
        return this.data[stage][path];
    }

    set(stage, path, value) {
        this.history.push({
            id: ++this.historyCounter,
            stage: stage,
            path: path,
            value: this.data[stage][path],
            time: new Date(),
        });
        this.data[stage][path] = value;
    }

    clearIO(stage, index) {
        this.history.push({
            id: ++this.historyCounter,
            stage: stage,
            path: "io",
            value: this.data[stage]["io"],
            time: new Date(),
        });
        this.data[stage]["io"][index] = {};
    }

    setIO(stage, index, type, value) {
        this.history.push({
            id: ++this.historyCounter,
            stage: stage,
            path: "io",
            index: index,
            value: {},
            time: new Date(),
        });
        this.data[stage]["io"][index][type] = value;
    }

    getIO(stage, index, type) {
        if (this.data[stage]["io"][index] === undefined) {
            this.data[stage]["io"][index] = {};
        }
        return this.data[stage]["io"][index][type];
    }

    // TODO: Nothing was undone notification
    undo() {
        if (this.history.length === 0) return;

        const latestEntry = this.history[this.history.length - 1];
        if (latestEntry.stage !== this.stage) return;

        const entriesToUndo = this.history.filter((entry) => {
            return entry.stage === this.stage && latestEntry.time - entry.time < 1000;
        });

        if (entriesToUndo.length === 0) return;
        entriesToUndo.reverse().forEach((entry) => {
            if (entry.index !== undefined) {
                this.data[entry.stage][entry.path][entry.index] = entry.value;
            } else {
                this.data[entry.stage][entry.path] = entry.value;
            }
        });

        this.history = this.history.filter((entry) => {
            return !entriesToUndo.includes(entry);
        });
    }

    async submit() {
        const validation = this.validate(true);
        if (!validation.valid) {
            this.sendAlert(validation.message, "error");
            return validation;
        }

        // Add extra metadata
        this.set(MatchStage.METADATA, "timestamp", Date.now());
        const db = getFirestore();
        // TODO: submit data to server
        await setDoc(doc(db, "testData", defaultData[0].team+"_"+defaultData[0].match), { "data": firebaseData });

        window.location.reload();

        return true;
    }

    sendAlert(message, severity) {
        this.alert.message = message;
        this.alert.severity = severity;
        this.alert.open = true;
    }

    validate(submit = false) {
        return {valid: true, message: ""}

        let alert = null;
        if (this.stage !== MatchStage.POST_MATCH && submit)
            alert = {
                valid: false,
                message: "You must complete the match before submitting.",
            };

        if (this.stage === MatchStage.PRE_MATCH) {
            if (!Scouters.includes(this.get(MatchStage.PRE_MATCH, "name")))
                alert = {
                    valid: false,
                    message: "Error in checking your name. Did you make a typo?",
                };
            else if (this.get(MatchStage.PRE_MATCH, "alliance") === null)
                alert = {
                    valid: false,
                    message: "Please select your team's alliance.",
                };
            else if (
                !["1", "2", "3"].includes(
                    this.get(MatchStage.PRE_MATCH, "driver_station")
                )
            )
                alert = {
                    valid: false,
                    message: "Please select your team's driver station.",
                };
            else if (
                !["1", "2", "3"].includes(
                    this.get(MatchStage.PRE_MATCH, "start_position")
                )
            )
                alert = {
                    valid: false,
                    message: "Please select your team's starting position.",
                };
            else if (this.get(MatchStage.PRE_MATCH, "team") === null)
                alert = {
                    valid: false,
                    message: "Please select your assigned team.",
                };
        } else if (this.stage === MatchStage.POST_MATCH) {
            if (this.get(MatchStage.POST_MATCH, "rating") === 0)
                alert = {
                    valid: false,
                    message: "Please rate your driver's performance.",
                };
            else if (
                this.get(MatchStage.POST_MATCH, "defense") &&
                this.get(MatchStage.POST_MATCH, "defense_rating") === 0
            )
                alert = {
                    valid: false,
                    message:
                        "Please rate the your assigned team's defensive capabilities.",
                };
        }

        if (alert === null) alert = {valid: true, message: ""};

        if (!alert.valid) this.sendAlert(alert.message, "error");

        return alert;
    }
}
