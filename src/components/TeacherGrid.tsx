import React from "react";
import { Grid } from "@material-ui/core";
import { graphql } from "gatsby";
import { TeacherFragment } from "@/types/TeacherFragment";
import PersonCard from "@/components/PersonCard";
import Picture from "@/components/Picture";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  card: {
    height: "100%",
  },
});

export default function TeacherGrid({
  teachers,
}: {
  teachers: Array<TeacherFragment>;
}) {
  const styles = useStyles();

  return (
    <Grid container spacing={3}>
      {teachers.map(teacher => {
        return (
          <Grid key={teacher.id} item xs={12} md={6}>
            <PersonCard
              className={styles.card}
              href={teacher.frontmatter!.website!}
              picture={
                <Picture
                  picture={
                    teacher.frontmatter!.picture!.childImageSharp!.fixed!
                  }
                />
              }
              title={`${teacher.frontmatter!.firstName!} ${teacher.frontmatter!
                .lastName!}`}
              htmlContent={teacher.html!}
            />
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
          fixed(width: 128, height: 128, quality: 100) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
    }
    html
  }
`;
