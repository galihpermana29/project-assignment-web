import { AppBar, Box, Toolbar, Typography } from "@material-ui/core";
import { css } from "emotion";
import { useRouter } from "next/router";
import * as React from "react";

export default function Navbar() {
    const router = useRouter();
    const path = router.pathname.split("/").includes("type") ? "type" : "home";
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="fixed"
                style={{ backgroundColor: "var(--basic-neutral-100)" }}
            >
                <Toolbar className={css(`display: flex; gap: 30px`)}>
                    <Typography
                        variant="h6"
                        component="div"
                        style={{ color: "var(--basic-neutral-700)" }}
                    >
                        PokeDex
                    </Typography>
                    <Typography
                        onClick={() => router.push("/pokemon")}
                        variant="h6"
                        component="div"
                        style={{
                            color:
                                path === "home"
                                    ? "var(--primary-blue-700)"
                                    : "var(--basic-neutral-700)",
                            fontSize: "16px",
                            cursor: "pointer",
                        }}
                    >
                        Home
                    </Typography>
                    <Typography
                        onClick={() => router.push("/pokemon/type")}
                        variant="h6"
                        component="div"
                        style={{
                            color:
                                path === "type"
                                    ? "var(--primary-blue-700)"
                                    : "var(--basic-neutral-700)",
                            fontSize: "16px",
                            cursor: "pointer",
                        }}
                    >
                        Poke Type
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
