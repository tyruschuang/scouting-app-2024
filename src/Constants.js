import Home from "./components/pages/Home";
import MatchScout from "./components/pages/MatchScout";
import Credits from "./components/pages/Credits";
import PitScout from "./components/pages/PitScout";


export const Constants = {

    pages: [
        {
            title: "Home",
            description: "Home page",
            path: "/",
            component: Home,
        },
        {
            title: "Match Scout",
            description: "Contact page",
            path: "/matchscout",
            component: MatchScout,
        },
        {
            title: "Pit Scout",
            description: "About page",
            path: "/pitscout",
            component: PitScout,
        },
        {
            title: "Gambling",
            description: "About page",
            path: "/gambling",
            component: Home,
        },
        {
            title: "Credits",
            description: "",
            path: "/credits",
            component: Credits,
        },
    ],

    field: require("./assets/field.png"),

}