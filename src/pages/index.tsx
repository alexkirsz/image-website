import React, { useContext } from "react";
import Meta from "@/components/Meta";
import { Typography, Theme } from "@material-ui/core";
import Hero from "@/components/Hero";
import { makeStyles } from "@material-ui/styles";
import AnimatedLogo from "@/components/AnimatedLogo";
import { graphql } from "gatsby";
import { IndexQuery } from "@/types/IndexQuery";
import TeacherGrid from "@/components/TeacherGrid";
import { FormattedMessage } from "react-intl";
import { IntlContext } from "@/utils/IntlContext";

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
  const intl = useContext(IntlContext);

  const teachers = data.allTeacher != null ? data.allTeacher.edges! : [];

  return (
    <>
      <Meta title={intl.formatMessage({ id: "index_meta_title" })} />

      <Hero type="light" className={styles.hero1}>
        <div className={styles.heroContent1}>
          <AnimatedLogo className={styles.logo} />

          <div className={styles.spacer} />

          <div className={styles.description}>
            <Typography variant="h2" gutterBottom>
              <FormattedMessage id="index_hero_title" />
            </Typography>
            <Typography variant="h5" color="textSecondary">
              <FormattedMessage id="index_hero_subtitle" />
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
            <FormattedMessage id="index_teachers_title" />
          </Typography>

          <TeacherGrid teachers={teachers.map(edge => edge!.node!)} />
        </div>
      </Hero>
    </>
  );
}

export const query = graphql`
  query IndexQuery($locale: String!) {
    allTeacher(
      filter: { locale: { eq: $locale } }
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
