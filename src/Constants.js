import Home from "./components/pages/Home";
import MatchScout from "./components/pages/MatchScout";

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
            component: Home,
        },
        {
            title: "Gambling",
            description: "About page",
            path: "/gambling",
            component: Home,
        },
    ]

}