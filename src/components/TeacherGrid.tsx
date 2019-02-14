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
import { TeacherFragment } from "./types/TeacherFragment";
import { makeStyles } from "@material-ui/styles";
import Image from "gatsby-image";
import MoreIcon from "@material-ui/icons/MoreHorizTwoTone";
import color from "color";

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    borderRadius: 128 / 2,
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

export default function TeacherGrid({
  teachers,
}: {
  teachers: Array<TeacherFragment>;
}) {
  const styles = useStyles();

  console.log(teachers);

  return (
    <Grid container spacing={3}>
      {teachers.map(teacher => {
        return (
          <Grid key={teacher.id} item xs={12} sm={6}>
            <Card elevation={1}>
              <CardActionArea
                component="a"
                {...{
                  href: teacher.frontmatter!.website,
                } as any}
              >
                <div className={styles.cardContent}>
                  <Image
                    className={styles.avatar}
                    fixed={
                      teacher.frontmatter!.picture!.childImageSharp!
                        .fixed! as any
                    }
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5">
                      {teacher.frontmatter!.firstName}{" "}
                      {teacher.frontmatter!.lastName}
                    </Typography>
                    <Typography
                      dangerouslySetInnerHTML={{ __html: teacher.html! }}
                    />
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
  fragment TeacherFragment on Teacher {
    id
    frontmatter {
      firstName
      lastName
      website
      picture {
        childImageSharp {
          fixed(width: 128, height: 128) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
    html
  }
`;
