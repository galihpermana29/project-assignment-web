import { mediaFrom } from "@helpers/styles";
import { Box, Button, Typography } from "@material-ui/core";
import { css } from "emotion";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import pokemon from "public/images/png-jumbotron2.png";
const Jumbotron = () => {
    const { t } = useTranslation();

    return (
        <Box
            component="div"
            className={css(`
              display: flex;
              flex-direction: column-reverse;
              justify-content: space-between;
              align-items: center;
              padding: 40px 20px;
              ${mediaFrom(600)}{
                flex-direction: row;

            }
              `)}
        >
            <Box
                component="div"
                display={"flex"}
                flexDirection={"column"}
                gridRowGap={20}
                style={{ maxWidth: "600px" }}
            >
                <Typography
                    className={css(`
                        font-weight: 600 !important;
                        color: var(--basic-neutral-700);
                        font-size: 31px !important;
                        ${mediaFrom(600)}{
                          font-size: 60px !important;
                              font-weight: 600 !important;
                        }
                      `)}
                >
                    {t("pokemon:jumbotron-title")}
                </Typography>
                <Typography
                    className={css(
                        `font-size: 18px; 
                        ${mediaFrom(600)}{font-size: 22px;}`,
                    )}
                >
                    {t("pokemon:jumbotron-description")}
                </Typography>
                <Button
                    variant="contained"
                    className={css(`
                      background-color: var(--secondary-yellow-500);
                      text-transform: initial;
                      max-width: max-content;
                    `)}
                >
                    {t("pokemon:jumbotron-action")}
                </Button>
            </Box>
            <Box
                component="div"
                className={css(
                    `max-width: 300px; margin-bottom: 20px; ${mediaFrom(
                        600,
                    )}{max-width: 500px;}`,
                )}
            >
                <Image src={pokemon} alt="poke-jumbo" />
            </Box>
        </Box>
    );
};

export default Jumbotron;
