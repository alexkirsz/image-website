import React from "react";
import Meta from "@/components/Meta";
import { graphql } from "gatsby";
import { StudentPageQuery } from "@/types/StudentPageQuery";
import Hero from "@/components/Hero";
import {
  Typography,
  Theme,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Image from "gatsby-image";
import classNames from "classnames";
import Container from "@/components/Container";
import AttachmentIcon from "@material-ui/icons/AttachmentTwoTone";
import LaunchIcon from "@material-ui/icons/LaunchTwoTone";
import Twitter from "mdi-material-ui/Twitter";
import Linkedin from "mdi-material-ui/Linkedin";
import GithubFace from "mdi-material-ui/GithubFace";
import Picture from "@/components/Picture";

const useStyles = makeStyles((theme: Theme) => ({
  hero: {
    backgroundColor: `#1565c0`,
  },
  heroContent: {
    minHeight: theme.spacing(24),
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  heroSpacer: {
    width: theme.spacing(4),
    height: theme.spacing(2),
  },
  headContent: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      alignItems: "center",
    },
  },
  background: {
    height: "100%",
  },
  contrastLight: {
    textShadow: "0px 2px 4px rgba(255, 255, 255, 0.6)",
  },
  contrastDark: {
    textShadow: "0px 2px 4px rgba(0, 0, 0, 0.6)",
  },
  description: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default function StudentPage({
  data,
  pageContext,
}: {
  data: StudentPageQuery;
  pageContext: { fileAbsolutePath: string };
}) {
  if (
    data.student == null ||
    data.student.frontmatter == null ||
    data.student.frontmatter.firstName == null
  ) {
    throw new Error(
      `Invalid student frontmatter format for \`${
        pageContext.fileAbsolutePath
      }\`.`,
    );
  }

  const styles = useStyles();

  return (
    <>
      <Meta title={data.student.frontmatter.firstName} />

      <Hero
        className={styles.hero}
        type={
          (data.student.frontmatter!.theme! as ("light" | "dark")) || "dark"
        }
        background={
          <Image
            className={styles.background}
            fluid={
              data.student.frontmatter!.background!.childImageSharp!
                .fluid as any
            }
          />
        }
      >
        <div className={styles.heroContent}>
          <Picture
            picture={data.student.frontmatter!.picture!.childImageSharp!.fixed!}
          />

          <div className={styles.heroSpacer} />

          <div
            className={classNames(
              styles.headContent,
              data.student.frontmatter!.contrast &&
                data.student.frontmatter!.theme === "light" &&
                styles.contrastLight,
              data.student.frontmatter!.contrast &&
                data.student.frontmatter!.theme === "dark" &&
                styles.contrastDark,
            )}
          >
            <Typography variant="h3" gutterBottom>
              {data.student.frontmatter.firstName}{" "}
              {data.student.frontmatter.lastName}
            </Typography>

            <Typography variant="h5">
              {data.student.frontmatter.headline}
            </Typography>
          </div>
        </div>
      </Hero>

      <div className={styles.description}>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} md={9}>
              <Typography variant="subtitle2" color="textSecondary">
                À propos
              </Typography>
              <Typography
                variant="body1"
                // Otherwise the content disappears on refresh.
                component="div"
                dangerouslySetInnerHTML={{ __html: data.student.html! }}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                gutterBottom
              >
                Liens utiles
              </Typography>
              <List>
                {data.student.frontmatter.resume && (
                  <ListItem
                    button
                    component="a"
                    {...{
                      href: data.student.frontmatter.resume.publicURL,
                    } as any}
                  >
                    <ListItemIcon>{<AttachmentIcon />}</ListItemIcon>
                    <ListItemText inset primary="CV" />
                  </ListItem>
                )}

                {data.student.frontmatter.website && (
                  <ListItem
                    button
                    component="a"
                    {...{
                      href: data.student.frontmatter.website,
                    } as any}
                  >
                    <ListItemIcon>{<LaunchIcon />}</ListItemIcon>
                    <ListItemText inset primary="Site web" />
                  </ListItem>
                )}

                {data.student.frontmatter.github && (
                  <ListItem
                    button
                    component="a"
                    {...{
                      href: data.student.frontmatter.github,
                    } as any}
                  >
                    <ListItemIcon>{<GithubFace />}</ListItemIcon>
                    <ListItemText inset primary="Github" />
                  </ListItem>
                )}

                {data.student.frontmatter.twitter && (
                  <ListItem
                    button
                    component="a"
                    {...{
                      href: data.student.frontmatter.twitter,
                    } as any}
                  >
                    <ListItemIcon>{<Twitter />}</ListItemIcon>
                    <ListItemText inset primary="Twitter" />
                  </ListItem>
                )}

                {data.student.frontmatter.linkedin && (
                  <ListItem
                    button
                    component="a"
                    {...{
                      href: data.student.frontmatter.linkedin,
                    } as any}
                  >
                    <ListItemIcon>{<Linkedin />}</ListItemIcon>
                    <ListItemText inset primary="LinkedIn" />
                  </ListItem>
                )}
              </List>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}

export const query = graphql`
  query StudentPageQuery($fileAbsolutePath: String!) {
    student(fileAbsolutePath: { eq: $fileAbsolutePath }) {
      frontmatter {
        firstName
        lastName
        theme
        contrast
        headline
        website
        twitter
        linkedin
        github
        resume {
          publicURL
        }
        picture {
          childImageSharp {
            fixed(width: 192, height: 192, quality: 100) {
              ...GatsbyImageSharpFixed_withWebp
            }
          }
        }
        background {
          childImageSharp {
            fluid(maxWidth: 1920, quality: 75) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      html
    }
  }
`;
