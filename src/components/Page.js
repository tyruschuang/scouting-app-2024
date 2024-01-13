import {Container, Typography} from "@mui/material";

export default function Page(props) {
    return (
        <Container maxWidth={"xl"} sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            pt: "5vh",
            ...props.sx,
        }}>
            {props.children}
        </Container>
    );
}