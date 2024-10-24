import React, { FC } from "react";
import { Box, Container } from "@material-ui/core";
import Navbar from "@components/homepage/Navbar/Navbar";
import DetailPageJumbotron from "@components/detail-page/Jumbotron/DetailPageJumbotron";
import { useRouter } from "next/router";
import useGetDetailPokemon from "@datastore/server/usecase/useGetDetailPokemon";

const DetailPokemon: FC = () => {
    const router = useRouter();
    const { id } = router.query;

    const { data, sprites, evolutionList } = useGetDetailPokemon(id as string);
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
                    <DetailPageJumbotron
                        data={data}
                        sprites={sprites}
                        evolutionList={evolutionList}
                    />
                </Box>
            </Container>
            <Box component="div"></Box>
        </>
    );
};

export default DetailPokemon;
