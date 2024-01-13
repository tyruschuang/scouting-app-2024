import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import {Box, CssBaseline, ThemeProvider} from "@mui/material";
import {theme} from "./Theme";

export default function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <BrowserRouter>
                    <Routes>
                        <Route element={<Outlet/>}>
                            <Route path="*" element={<NotFound/>}/>
                            <Route index element={<Home/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </>
    );
}
