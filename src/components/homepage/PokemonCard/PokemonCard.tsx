import { PokemonDetails } from "@datastore/server/interface/PokeInterface";
import { stringToColor } from "@helpers/styles";
import { Box, Button, Card, CardContent, Typography } from "@material-ui/core";
import { css } from "emotion";
import Image from "next/image";

export default function PokemonCard({
    data,
    id,
    onClick,
}: {
    data: PokemonDetails;
    id: number;
    onClick?: () => void;
}) {
    return (
        <Card
            onClick={onClick}
            className={css`
                cursor: pointer;
                &:hover {
                    box-shadow: 0 0 10px var(--basic-neutral-500);
                }
            `}
        >
            <Box component={"div"} display="flex" justifyContent="center">
                <Image width={200} height={200} src={data.image} />
            </Box>
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    #{id}
                </Typography>
                <Typography
                    variant="h5"
                    style={{ textTransform: "capitalize" }}
                >
                    {data.name}
                </Typography>

                <Box display="flex" my={2}>
                    {data.types.map((type, idx) => (
                        <Button
                            key={idx}
                            variant="contained"
                            color="primary"
                            style={{
                                marginRight: "10px",
                                backgroundColor: stringToColor(type.type.name),
                            }}
                        >
                            {type.type.name}
                        </Button>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
}
