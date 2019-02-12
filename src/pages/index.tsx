import React from "react";
import Meta from "@/components/Meta";
import {
  Typography,
  Theme,
  Grid,
  Paper,
  Card,
  Avatar,
  CardActionArea,
  CardContent,
} from "@material-ui/core";
import Hero from "@/components/Hero";
import { makeStyles } from "@material-ui/styles";
import AnimatedLogo from "@/components/AnimatedLogo";
import OpenInNewIcon from "@material-ui/icons/OpenInNewTwoTone";

const useStyles = makeStyles((theme: Theme) => ({
  hero1: {
    // From https://www.heropatterns.com/
    backgroundImage: `url("${require("@/images/diamonds_pattern.svg")}")`,
    backgroundSize: 64,
  },
  heroContent1: {
    minHeight: theme.spacing.unit * 48,
    paddingTop: theme.spacing.unit * 16,
    paddingBottom: theme.spacing.unit * 16,
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      paddingTop: theme.spacing.unit * 8,
      paddingBottom: theme.spacing.unit * 8,
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  heroContent2: {
    paddingTop: theme.spacing.unit * 12,
    paddingBottom: theme.spacing.unit * 12,
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("md")]: {
      paddingTop: theme.spacing.unit * 8,
      paddingBottom: theme.spacing.unit * 8,
    },
  },
  spacer: {
    width: theme.spacing.unit * 4,
  },
  logo: {
    height: 256,

    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing.unit * 4,
    },
  },
  description: {},
  avatar: {
    height: 128,
    width: 128,
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
  cardContent: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  geniuses: {
    marginBottom: theme.spacing.unit * 6,
  },
}));

export default function HomePage() {
  const styles = useStyles();

  return (
    <>
      <Meta title="Accueil" />

      <Hero type="light" className={styles.hero1}>
        <div className={styles.heroContent1}>
          <AnimatedLogo className={styles.logo} />

          <div className={styles.spacer} />

          <div className={styles.description}>
            <Typography variant="h2" gutterBottom>
              La meilleure majeure
            </Typography>
            <Typography variant="h5" color="textSecondary">
              Mais ce serait sympa de trouver un autre nom, parce qu'IMAGE c'est
              vachement générique quand même.
            </Typography>
          </div>
        </div>
      </Hero>

      <Hero type="light">
        <div className={styles.heroContent2}>
          <Typography variant="h3" className={styles.geniuses}>
            Les grands esprits au volant
          </Typography>

          <Grid container spacing={24}>
            <Grid item xs={12} md={6}>
              <Card elevation={0}>
                <CardActionArea
                  component="a"
                  href="https://www.lrde.epita.fr/wiki/User:Elodie"
                >
                  <div className={styles.cardContent}>
                    <Avatar
                      src={require("@/images/elodie_puybareau.jpg")}
                      className={styles.avatar}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5">
                        Élodie Puybareau
                      </Typography>
                      <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </Typography>
                    </CardContent>
                  </div>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card elevation={0}>
                <CardActionArea
                  component="a"
                  href="https://www.lrde.epita.fr/wiki/User:Gtochon"
                >
                  <div className={styles.cardContent}>
                    <Avatar
                      src={require("@/images/guillaume_tochon.jpg")}
                      className={styles.avatar}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5">
                        Guillaume Tochon
                      </Typography>
                      <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </Typography>
                    </CardContent>
                  </div>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </div>
      </Hero>
    </>
  );
}
