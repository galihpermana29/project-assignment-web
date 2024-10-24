import { UsePokemonResult } from "@datastore/server/usecase/useGetAllPokemon";
import { mediaFrom, stringToColor } from "@helpers/styles";
import { Box, Button, Chip, Modal, Typography } from "@material-ui/core";
import { css } from "emotion";
import Image from "next/image";
import { useRouter } from "next/router";
// const style = {
//     position: "absolute",
//     top: "25%",
//     left: "25%",
//     transform: " translate(-50%, -50%)",
//     width: 700,
//     bgcolor: "background.paper",
//     boxShadow: 24,
//     p: 4,
// };

const DetailPokemonModal = ({
    isOpen,
    handleClose,
    data,
}: {
    isOpen: boolean;
    handleClose: () => void;
    data: UsePokemonResult["selectedPokemon"]["data"];
}) => {
    const router = useRouter();
    return (
        <Modal
            open={isOpen && data !== null}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            {data && (
                <Box
                    className={css(`
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  width: 80%;
                  p: 4;
                  background-color: var(--basic-neutral-100);
          ${mediaFrom(600)}{
            width: 100%;
            max-width: 700px;
          }
                
                `)}
                >
                    <Box
                        component="div"
                        className={css(
                            `display: flex; flex-direction: column; padding: 20px; ${mediaFrom(
                                600,
                            )}{flex-direction: row; padding: 0;  padding: 20px;}`,
                        )}
                    >
                        <Image width={300} height={300} src={data.image} />
                        <Box
                            component={"div"}
                            display={"flex"}
                            flexDirection={"column"}
                        >
                            <Typography
                                variant="h4"
                                style={{ textTransform: "capitalize" }}
                            >
                                {data.name}
                            </Typography>
                            <Box
                                mt={2}
                                component={"div"}
                                display={"flex"}
                                flexDirection={"column"}
                                gridRowGap={10}
                            >
                                <Typography variant="body1">
                                    <span style={{ fontWeight: 600 }}>
                                        Weight:
                                    </span>{" "}
                                    {data.weight}
                                </Typography>
                                <Typography variant="body1">
                                    <span style={{ fontWeight: 600 }}>
                                        Height:
                                    </span>{" "}
                                    {data.height}
                                </Typography>
                                <Box>
                                    <Typography variant="body1">
                                        <span style={{ fontWeight: 600 }}>
                                            Abilities:
                                        </span>
                                    </Typography>
                                    <Box
                                        mt={1}
                                        display={"flex"}
                                        gridColumnGap={5}
                                    >
                                        {data.abilities.map((abx, idx) => (
                                            <Chip
                                                label={abx.ability.name}
                                                key={idx}
                                            />
                                        ))}
                                    </Box>
                                </Box>

                                <Box>
                                    <Typography variant="body1">
                                        <span style={{ fontWeight: 600 }}>
                                            Types:
                                        </span>
                                    </Typography>
                                    <Box
                                        mt={1}
                                        display={"flex"}
                                        gridColumnGap={5}
                                    >
                                        {data.types.map((abx, idx) => (
                                            <Chip
                                                label={abx.type.name}
                                                key={idx}
                                                style={{
                                                    backgroundColor:
                                                        stringToColor(
                                                            abx.type.name,
                                                        ),
                                                    color: "var(--basic-neutral-100)",
                                                    textTransform: "capitalize",
                                                }}
                                            />
                                        ))}
                                    </Box>
                                </Box>
                            </Box>
                            <Button
                                onClick={() =>
                                    router.push(`/pokemon/detail/${data.id}`)
                                }
                                style={{
                                    backgroundColor:
                                        "var(--secondary-yellow-600)",
                                    marginTop: "20px",
                                }}
                                variant="contained"
                                color="primary"
                            >
                                Detail
                            </Button>
                        </Box>
                    </Box>
                </Box>
            )}
        </Modal>
    );
};

export default DetailPokemonModal;
