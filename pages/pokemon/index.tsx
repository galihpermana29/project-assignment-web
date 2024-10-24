import React, { FC } from "react";

import { Box, Container, Typography } from "@material-ui/core";
import Navbar from "@components/homepage/Navbar/Navbar";
import Jumbotron from "@components/homepage/Jumbotron/Jumbotron";
import AllPokemon from "@components/homepage/AllPoke/AllPoke";
import { usePokemon } from "@datastore/server/usecase/useGetAllPokemon";

const PokemonList: FC = () => {
    const {
        pokemonList,
        loading,
        error,
        setQueryPagination,
        selectedPokemon,
        setSelectedPokemon,
        queryPagination,
    } = usePokemon();

    return (
        <>
            <Navbar />
            <Container
                maxWidth="xl"
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Box component="div" style={{ width: "100%" }}>
                    <Jumbotron />
                </Box>
            </Container>
            <Box component="div">
                <AllPokemon
                    pokemonList={pokemonList}
                    loading={loading}
                    error={error}
                    selectedPokemon={selectedPokemon}
                    setSelectedPokemon={setSelectedPokemon}
                    setQueryPagination={setQueryPagination}
                    queryPagination={queryPagination}
                />
            </Box>
        </>
    );
};

export default PokemonList;
