import {
    AppBar,
    Box,
    Button,
    IconButton,
    Toolbar,
    Typography,
} from "@material-ui/core";
import * as React from "react";
// import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                style={{ backgroundColor: "var(--basic-neutral-100)" }}
            >
                <Toolbar>
                    <IconButton
                        size="small"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        // sx={{ mr: 2 }}
                    >
                        {/* <MenuIcon /> */}
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        style={{ color: "var(--basic-neutral-700)" }}
                    >
                        PokeDex
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
