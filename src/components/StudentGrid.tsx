import React from "react";
import { Grid } from "@material-ui/core";
import { graphql } from "gatsby";
import { StudentFragment } from "@/types/StudentFragment";
import Picture from "@/components/Picture";
import PersonCard from "@/components/PersonCard";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  card: {
    height: "100%",
  },
});

export default function PeopleGrid({
  class: class_,
  people,
}: {
  class: number;
  people: Array<StudentFragment>;
}) {
  const styles = useStyles();

  return (
    <Grid container spacing={3}>
      {people.map(person => {
        return (
          <Grid key={person.id} item xs={12} sm={6} md={4}>
            <PersonCard
              className={styles.card}
              to={`/students/${class_}/${person.fields!.slug!}`}
              picture={
                <Picture
                  picture={person.frontmatter!.picture!.childImageSharp!.fixed!}
                />
              }
              title={`${person.frontmatter!.firstName!} ${person.frontmatter!
                .lastName!}`}
              content={person.frontmatter!.headline!}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

export const query = graphql`
  fragment StudentFragment on Student {
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
          fixed(width: 96, height: 96, quality: 100) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
    }
  }
`;
