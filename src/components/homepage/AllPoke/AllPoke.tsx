import { Box, Container, Typography } from "@material-ui/core";
import PokemonCard from "../PokemonCard/PokemonCard";
import { Pagination, Skeleton } from "@material-ui/lab";
import Image from "next/image";
import pokemon from "public/images/png-jumbotron2.png";
import DetailPokemonModal from "./DetailModal";
import { UsePokemonResult } from "@datastore/server/usecase/useGetAllPokemon";
import useTranslation from "next-translate/useTranslation";
import { css } from "emotion";
import { mediaFrom } from "@helpers/styles";

const AllPokemon = ({
    pokemonList,
    loading,
    error,
    selectedPokemon,
    setSelectedPokemon,
    setQueryPagination,
    queryPagination,
}: {
    pokemonList: UsePokemonResult["pokemonList"];
    loading: UsePokemonResult["loading"];
    error: UsePokemonResult["error"];
    selectedPokemon: UsePokemonResult["selectedPokemon"];
    setSelectedPokemon: UsePokemonResult["setSelectedPokemon"];
    setQueryPagination: UsePokemonResult["setQueryPagination"];
    queryPagination: UsePokemonResult["queryPagination"];
}) => {
    const { t } = useTranslation();
    return (
        <Box
            component="div"
            style={{
                backgroundColor: "var(--secondary-yellow-400)",
                minHeight: "100vh",
            }}
            p={2}
        >
            <DetailPokemonModal
                data={selectedPokemon.data}
                isOpen={selectedPokemon.isOpen}
                handleClose={() =>
                    setSelectedPokemon({ isOpen: false, data: null })
                }
            />
            <Container maxWidth="md">
                <Box component="div" m={10}>
                    <Typography variant="h4" align="center">
                        PokeDex
                    </Typography>
                    <Typography variant="h6" align="center">
                        {t("pokemon:pokemon-list-title")}
                    </Typography>
                </Box>
                {error ? (
                    <Box
                        component="div"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "400px",
                            gap: "30px",
                        }}
                    >
                        <Box component="div">
                            <Image
                                width={300}
                                height={300}
                                src={pokemon}
                                alt="poke-jumbo"
                            />
                        </Box>
                        <Typography variant="h4" align="center">
                            Oh! Something went wrong..
                        </Typography>
                    </Box>
                ) : (
                    <Box
                        component="div"
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit, minmax(250px, 1fr))",
                            rowGap: "40px",
                            columnGap: "40px",
                        }}
                    >
                        {loading
                            ? new Array(6)
                                  .fill(0)
                                  .map((_, idx) => (
                                      <Skeleton
                                          key={idx}
                                          variant="rect"
                                          width={250}
                                          height={300}
                                      />
                                  ))
                            : pokemonList.map((pokemon, idx) => (
                                  <PokemonCard
                                      onClick={() =>
                                          setSelectedPokemon({
                                              isOpen: true,
                                              data: pokemon,
                                          })
                                      }
                                      key={pokemon.url}
                                      data={pokemon}
                                      id={idx}
                                  />
                              ))}
                    </Box>
                )}

                <Box
                    component="div"
                    className={css(`
                  
                  margin: 20px 0px;

                  ${mediaFrom(600)}{
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  }
                  `)}
                >
                    <Pagination
                        count={queryPagination?.total}
                        variant="outlined"
                        shape="rounded"
                        onChange={(_, val) =>
                            setQueryPagination((dx) => ({ ...dx, offset: val }))
                        }
                    />
                </Box>
            </Container>
        </Box>
    );
};

export default AllPokemon;
