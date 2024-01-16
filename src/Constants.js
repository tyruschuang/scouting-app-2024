import Home from "./components/pages/Home";
import MatchScout from "./components/pages/MatchScout";
import Credits from "./components/pages/Credits";
import PitScout from "./components/pages/PitScout";


export const Constants = {

    pages: [
        {
            title: "Home",
            path: "/",
            component: Home,
        },
        {
            title: "Match Scout",
            path: "/matchscout",
            component: MatchScout,
        },
        {
            title: "Pit Scout",
            path: "/pitscout",
            component: PitScout,
        },
        {
            title: "Gambling",
            path: "/gambling",
            component: Home,
        },
        {
            title: "Credits",
            path: "/credits",
            component: Credits,
        },
    ],

    field: require("./assets/field.png"),

    // TODO: Images!
    developers: [
        {
            name: "Tyrus Chuang",
            year: "3rd Year",
            icon: require("./assets/field.png"),
        },
        {
            name: "Ashir Rao",
            year: "3rd Year",
            icon: require("./assets/field.png"),
        },
        {
            name: "Elisa Pan",
            year: "3rd Year",
            icon: require("./assets/field.png"),
        },
        {
            name: "Eric Hou",
            year: "1st Year",
            icon: require("./assets/field.png"),
        }
    ],

    specialThanks: [
        {
            name: "Mentors",
            description: "both technical, and non-technical",
        },
        {
            name: "Scouters",
            description: "again, for giving purpose to this app",
        },
        {
            name: "Material UI React",
            description: "for making this app look passable",
        },
    ],

    previousYears: [
        {
            year: "2020",
            developers: [
                "Alan Sheu",
                "Pranav Tadepalli"
            ]
        },
        {
            year: "2022",
            developers: [
                "Richie Tan",
                "Ashir Rao"
            ]
        },
        {
            year: "2023",
            developers: [
                "Ashir Rao",
                "Elisa Pan",
                "Johann Jacob",
                "Edwin Hou"
            ]
        }
    ]
}