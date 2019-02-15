import React from "react";
import Meta from "@/components/Meta";
import { Typography, Theme } from "@material-ui/core";
import Hero from "@/components/Hero";
import { makeStyles } from "@material-ui/styles";
import AnimatedLogo from "@/components/AnimatedLogo";
import { graphql } from "gatsby";
import { IndexQuery } from "@/types/IndexQuery";
import TeacherGrid from "@/components/TeacherGrid";

const useStyles = makeStyles((theme: Theme) => ({
  hero1: {
    // From https://www.heropatterns.com/
    backgroundImage: `url("${require("@/images/diamonds_pattern.svg")}")`,
    backgroundSize: 80,
  },
  hero2: {
    flex: 1,
    backgroundColor: theme.palette.grey[50],
  },
  heroContent1: {
    minHeight: theme.spacing(28),
    paddingTop: theme.spacing(16),
    paddingBottom: theme.spacing(16),
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  heroContent2: {
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(12),
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("md")]: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
  },
  spacer: {
    width: theme.spacing(4),
  },
  logo: {
    height: 256,

    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(4),
    },
  },
  description: {},
  avatar: {
    height: 128,
    width: 128,
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(2),
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
    marginBottom: theme.spacing(4),
  },
}));

export default function HomePage({ data }: { data: IndexQuery }) {
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

      <Hero type="light" className={styles.hero2}>
        <div className={styles.heroContent2}>
          <Typography
            variant="h3"
            color="textSecondary"
            className={styles.geniuses}
          >
            Les grands esprits au volant
          </Typography>

          <TeacherGrid
            teachers={data.allTeacher!.edges!.map(edge => edge!.node!)}
          />
        </div>
      </Hero>
    </>
  );
}

export const query = graphql`
  query IndexQuery {
    allTeacher(
      sort: {
        fields: [frontmatter___lastName, frontmatter___firstName]
        order: [ASC, ASC]
      }
    ) {
      edges {
        node {
          ...TeacherFragment
        }
      }
    }
  }
`;
