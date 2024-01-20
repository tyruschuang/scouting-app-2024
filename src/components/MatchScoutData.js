import {MatchStage} from "./MatchConstants";
import {Scouters} from "./Scouters";

const defaultData = [
    {
        stage: MatchStage.PRE_MATCH,
        team: null,
        match: null,
        name: null,
        alliance: "BLUE",
        driver_station: null,
        start_position: null,
    },
    {
        stage: MatchStage.AUTO,
        leave: false,
        gp1_intake: "PRELOAD",
        gp1_outtake: "",
        gp2_intake: "",
        gp2_outtake: "",
        gp3_intake: "",
        gp3_outtake: "",
        gp4_intake: "",
        gp4_outtake: "",
        gp5_intake: "",
        gp5_outtake: "",
        gp6_intake: "",
        gp6_outtake: "",
        gp7_intake: "",
        gp7_outtake: "",
        gp8_intake: "",
        gp8_outtake: "",
        gp9_intake: "",
        gp9_outtake: "",
    },
    {
        stage: MatchStage.TELEOP,
        intakes: 0,
        amp_outtakes: 0,
        speaker_outtakes: 0,
        dropped: 0,
        missed: 0,
        trap: 0,
        onstage: false,
        onstage_time: 0,
        harmony: false,
    },
    {
        stage: MatchStage.POST_MATCH,
        rating: 0,
        defense: "",
        comments: "",
    },
    {
        stage: MatchStage.METADATA,
        timestamp: new Date(),
    },
];

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
            this.data[entry.stage][entry.path] = entry.value;
        });

        this.history = this.history.filter((entry) => {
            return !entriesToUndo.includes(entry);
        });
    }

    submit() {
        const validation = this.validate(true);
        if (!validation.valid) {
            this.sendAlert(validation.message, "error");
            return validation;
        }

        // Add extra metadata
        this.set(MatchStage.METADATA, "timestamp", Date.now());

        console.log(this.data);
        // TODO: submit data to server

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
