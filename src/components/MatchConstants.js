import MSPrematch from "./pages/matchscout/prematch/MSPrematch";

export const MatchStage = Object.freeze({
    "PRE_MATCH": 0,
    "AUTO": 1,
    "TELEOP": 2,
    "POST_MATCH": 3,
});

export const DriverStation = Object.freeze({
    LEFT: 1,
    CENTER: 2,
    RIGHT: 3,
})

export const Alliance = Object.freeze({
    RED: 1,
    BLUE: 2,
})

export const AutoIntakePosition = Object.freeze({
    PRELOAD: 1,
    ALLIANCE_1: 2,
    ALLIANCE_2: 3,
    ALLIANCE_3: 4,
    CENTER_1: 5,
    CENTER_2: 6,
    CENTER_3: 7,
    CENTER_4: 8,
    CENTER_5: 9,
})

export const OuttakePosition = Object.freeze({
    SPEAKER: 1,
    AMP: 2,
    DROPPED: 3,
    MISSED: 4,
})