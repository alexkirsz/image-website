import React from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Theme,
  IconButton,
} from "@material-ui/core";
import { graphql, Link } from "gatsby";
import { PersonFragment } from "./types/PersonFragment";
import { makeStyles } from "@material-ui/styles";
import Image from "gatsby-image";
import MoreIcon from "@material-ui/icons/MoreHorizTwoTone";
import color from "color";

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    borderRadius: 96 / 2,
    flexShrink: 0,
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  cardContent: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  more: {
    position: "absolute",
    right: theme.spacing(2),
    bottom: theme.spacing(2),
  },
}));

export default function PeopleGrid({
  class: class_,
  people,
}: {
  class: number;
  people: Array<PersonFragment>;
}) {
  const styles = useStyles();

  return (
    <Grid container spacing={3}>
      {people.map(person => {
        return (
          <Grid key={person.id} item xs={12} sm={6} md={4}>
            <Card elevation={1}>
              <CardActionArea
                component={Link}
                {...{
                  to: `/students/${class_}/${person.fields!.slug}`,
                } as any}
              >
                <div className={styles.cardContent}>
                  <Image
                    className={styles.avatar}
                    fixed={
                      person.frontmatter!.picture!.childImageSharp!
                        .fixed! as any
                    }
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5">
                      {person.frontmatter!.firstName}{" "}
                      {person.frontmatter!.lastName}
                    </Typography>
                    <Typography>{person.frontmatter.headline}</Typography>
                  </CardContent>

                  <IconButton classes={{ root: styles.more }}>
                    <MoreIcon fontSize="small" />
                  </IconButton>
                </div>
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

export const query = graphql`
  fragment PersonFragment on Student {
    id
    fields {
      slug
    }
    frontmatter {
      firstName
      lastName
      headline
      picture {
        childImageSharp {
          fixed(width: 96, height: 96) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }
`;
