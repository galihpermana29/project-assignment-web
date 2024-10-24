import React, { FC } from "react";
import useTranslation from "next-translate/useTranslation";
import { Box, Container } from "@material-ui/core";
import Navbar from "@components/homepage/Navbar/Navbar";
import DetailPageJumbotron from "@components/detail-page/Jumbotron/DetailPageJumbotron";
import { useRouter } from "next/router";
import useGetDetailPokemon from "@datastore/server/usecase/useGetDetailPokemon";

const DetailPokemon: FC = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { id } = router.query;

    const { data, loading, error, sprites, evolutionList } =
        useGetDetailPokemon(id as string);
    console.log(data, "data?");
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
