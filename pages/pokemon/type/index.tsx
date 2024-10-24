import Navbar from "@components/homepage/Navbar/Navbar";
import { usePokemon } from "@datastore/server/usecase/useGetAllPokemon";
import useGetPokemonPerType from "@datastore/server/usecase/useGetPokemonPerType";
import { mediaFrom, stringToColor } from "@helpers/styles";
import {
    Box,
    Chip,
    CircularProgress,
    Container,
    TableBody,
    TableCell,
    TableRow,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { css } from "emotion";
import Image from "next/image";
import { useRouter } from "next/router";

const ListOfPokemonTypes = () => {
    const { pokemonList, loading } = usePokemon(1302);

    const router = useRouter();

    const {
        pokemonTableData,
        listOfPokemonTypes,
        activeType,
        setQueryPagination,
        queryPagination,
        typeName,
    } = useGetPokemonPerType(pokemonList);

    return (
        <>
            <Navbar />
            <Container
                maxWidth="lg"
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "start",
                    marginTop: "100px",
                    gap: "40px",
                    backgroundColor: stringToColor(typeName),
                    padding: "40px",
                }}
            >
                {loading ? (
                    <CircularProgress size="30px" />
                ) : (
                    <>
                        <Box component="div" className={css(`width: 10%; `)}>
                            <h1>Types</h1>
                            <Box
                                className={css(
                                    `display: flex; flex-direction: column; gap: 10px;`,
                                )}
                            >
                                {listOfPokemonTypes.map((dx) => (
                                    <Box
                                        onClick={() => {
                                            router.replace(
                                                `/pokemon/type?type=${dx.id}`,
                                            );
                                        }}
                                        key={dx.id}
                                        className={css(
                                            `display: flex; font-weight:600;  flex-direction: column; justify-content: start; align-items: start; cursor: pointer; text-transform: capitalize; color: ${
                                                dx.id === activeType
                                                    ? "var(--primary-blue-700); font-weight:600;"
                                                    : "var(--basic-neutral-500)"
                                            }`,
                                        )}
                                    >
                                        {dx.type}
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                        <Box component="div" className={css(`width: 80%;`)}>
                            <h1 className={css(`text-transform: capitalize;`)}>
                                Pokemon {typeName}
                            </h1>
                            {pokemonTableData && pokemonTableData.length > 0 ? (
                                <>
                                    <TableBody
                                        className={css(
                                            `border: 1px solid red; box-shadow: 0 0 10px var(--basic-neutral-500);`,
                                        )}
                                    >
                                        {pokemonTableData &&
                                            pokemonTableData.map((row) => (
                                                <TableRow
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                    key={row.name}
                                                    onClick={() =>
                                                        router.push(
                                                            `/pokemon/detail/${row.id}`,
                                                        )
                                                    }
                                                >
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                        className={css(
                                                            `width: 50%;`,
                                                        )}
                                                    >
                                                        <Box
                                                            className={css(
                                                                `display: flex; justify-content: center;`,
                                                            )}
                                                        >
                                                            <Image
                                                                width={200}
                                                                height={200}
                                                                src={row.image}
                                                            />
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell
                                                        className={css(
                                                            `padding: 10px;  width: 20%`,
                                                        )}
                                                        component="th"
                                                        scope="row"
                                                    >
                                                        {row.id}
                                                    </TableCell>
                                                    <TableCell
                                                        className={css(
                                                            `padding: 10px;  width: 20%`,
                                                        )}
                                                        component="th"
                                                        scope="row"
                                                    >
                                                        {row.name}
                                                    </TableCell>
                                                    {row.types.map((dx) => (
                                                        <TableCell
                                                            className={css(
                                                                `padding: 10px;  width: 20%`,
                                                            )}
                                                            align="right"
                                                        >
                                                            <Chip
                                                                label={
                                                                    dx.type.name
                                                                }
                                                                className={css(
                                                                    `background-color: ${stringToColor(
                                                                        dx.type
                                                                            .name,
                                                                    )}; color: var(--basic-neutral-100);`,
                                                                )}
                                                            />
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))}
                                    </TableBody>
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
                                                setQueryPagination((dx) => ({
                                                    ...dx,
                                                    offset: val,
                                                }))
                                            }
                                        />
                                    </Box>
                                </>
                            ) : (
                                "No Data"
                            )}
                        </Box>
                    </>
                )}
            </Container>
        </>
    );
};

export default ListOfPokemonTypes;
