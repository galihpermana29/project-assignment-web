import {
    PokemonDetailOriginal,
    PokemonDetails,
} from "@datastore/server/interface/PokeInterface";
import { mediaFrom, stringToColor } from "@helpers/styles";
import { Box, Chip, Container, Typography } from "@material-ui/core";
import { css } from "emotion";
import Image from "next/image";
import { useRouter } from "next/router";
import Gauge from "../Gauge/Gauge";
import PokemonCard from "@components/homepage/PokemonCard/PokemonCard";
import useTranslation from "next-translate/useTranslation";

const DetailPageJumbotron = ({
    data,
    sprites,
    evolutionList,
}: {
    data: PokemonDetailOriginal;
    sprites: string[];
    evolutionList: PokemonDetails[];
}) => {
    const router = useRouter();
    const { t } = useTranslation();

    return (
        <Container maxWidth="md">
            <Box
                component="div"
                className={css(
                    `display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 20px; min-height: 100vh;  ${mediaFrom(
                        600,
                    )}{flex-direction: row; padding: 0;  padding: 20px; justify-content: center; align-items: center; gap: 20px; margin-top: 60px; min-height: 100vh;}`,
                )}
            >
                {data && (
                    <Box
                        component="div"
                        className={css(
                            `max-width: 300px; margin-bottom: 20px; ${mediaFrom(
                                600,
                            )}{max-width: 500px;}`,
                        )}
                    >
                        <Image
                            width={600}
                            height={600}
                            src={
                                data.sprites.other["official-artwork"]
                                    .front_default
                            }
                        />
                    </Box>
                )}
                <Box
                    component={"div"}
                    display={"flex"}
                    flexDirection={"column"}
                    className={css(
                        `width: 100%; ${mediaFrom(600)}{width: initial;}`,
                    )}
                >
                    <Typography
                        variant="h3"
                        style={{ textTransform: "capitalize" }}
                    >
                        {data ? data.name : ""}
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
                                {t("pokemon:pokemon-weight")}:
                            </span>{" "}
                            {data ? data.weight : ""}
                        </Typography>
                        <Typography variant="body1">
                            <span style={{ fontWeight: 600 }}>
                                {" "}
                                {t("pokemon:pokemon-height")}:
                            </span>{" "}
                            {data ? data.height : ""}
                        </Typography>
                        <Box>
                            <Typography variant="body1">
                                <span style={{ fontWeight: 600 }}>
                                    {t("pokemon:pokemon-abilities")}:
                                </span>
                            </Typography>
                            <Box mt={1} display={"flex"} gridColumnGap={5}>
                                {data
                                    ? data.abilities.map((abx, idx) => (
                                          <Chip
                                              label={abx.ability.name}
                                              key={idx}
                                          />
                                      ))
                                    : ""}
                            </Box>
                        </Box>

                        <Box>
                            <Typography variant="body1">
                                <span style={{ fontWeight: 600 }}>
                                    {t("pokemon:pokemon-types")}:
                                </span>
                            </Typography>
                            <Box mt={1} display={"flex"} gridColumnGap={5}>
                                {data
                                    ? data.types.map((abx, idx) => (
                                          <Chip
                                              onClick={() =>
                                                  router.push(
                                                      `/pokemon/type?type=${
                                                          abx.type.url.split(
                                                              "/",
                                                          )[6]
                                                      }`,
                                                  )
                                              }
                                              label={abx.type.name}
                                              key={idx}
                                              style={{
                                                  backgroundColor:
                                                      stringToColor(
                                                          abx.type.name,
                                                      ),
                                                  color: "var(--basic-neutral-100)",
                                                  textTransform: "capitalize",
                                                  cursor: "pointer",
                                              }}
                                          />
                                      ))
                                    : ""}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box className={css(`margin: 100px 0px;`)}>
                <Typography
                    variant="h3"
                    style={{
                        textTransform: "capitalize",
                        textAlign: "center",
                        marginBottom: "40px",
                    }}
                >
                    {t("pokemon:pokemon-sprites")}
                </Typography>
                {data && (
                    <Box
                        className={css(
                            ` display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));`,
                        )}
                    >
                        {sprites.map((dx, idx) => (
                            <Box
                                key={idx}
                                className={css(
                                    ` border: 1px solid var(--basic-neutral-400); padding: 10px; display:flex; justify-content: center; align-items: center; `,
                                )}
                            >
                                <Image
                                    src={dx}
                                    alt="poke-sprite"
                                    width={300}
                                    height={300}
                                />
                            </Box>
                        ))}
                    </Box>
                )}
            </Box>
            <Box>
                <Typography
                    variant="h3"
                    style={{
                        textTransform: "capitalize",
                        textAlign: "center",
                        marginBottom: "40px",
                    }}
                >
                    {t("pokemon:pokemon-stats")}
                </Typography>
                {data && (
                    <Box
                        className={css(
                            ` display:flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 50px; `,
                        )}
                    >
                        {data.stats.map((dx, idx) => (
                            <Box key={idx} className={css(`margin-top: 50px;`)}>
                                <h1
                                    className={css(
                                        `text-transform: capitalize;
                                          font-size: 20px;
                                          text-align: center;
                                        
                                        `,
                                    )}
                                >
                                    {dx.stat.name}
                                </h1>
                                <Gauge
                                    value={dx.base_stat}
                                    name={dx.stat.name}
                                />
                            </Box>
                        ))}
                    </Box>
                )}
            </Box>
            <Box className={css(`margin: 100px 0px;`)}>
                <Typography
                    variant="h3"
                    style={{
                        textTransform: "capitalize",
                        textAlign: "center",
                        marginBottom: "40px",
                    }}
                >
                    {t("pokemon:pokemon-evolution")}
                </Typography>
                <Box
                    className={css(
                        ` display:grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 40px`,
                    )}
                >
                    {evolutionList &&
                        evolutionList.map((dx, idx) => {
                            return (
                                <Box key={dx.id}>
                                    <h1
                                        className={css(
                                            `font-weight: 400; font-size:20px; text-align:center;`,
                                        )}
                                    >
                                        {t("pokemon:pokemon-evolution")}{" "}
                                        {idx + 1}
                                    </h1>
                                    <PokemonCard
                                        onClick={() =>
                                            router.push(
                                                `/pokemon/detail/${dx.id}`,
                                            )
                                        }
                                        data={dx}
                                        id={dx.id}
                                    />
                                </Box>
                            );
                        })}
                </Box>
            </Box>
        </Container>
    );
};

export default DetailPageJumbotron;
