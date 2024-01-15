import {Box, Container} from "@mui/material";

export default function Page(props) {
    return (
        <Container maxWidth={"xl"} sx={{
            pt: "5vh",
        }}>
            <Box sx={{
                ...props.sx,
            }}>
                {props.children}
            </Box>
        </Container>
    );
}