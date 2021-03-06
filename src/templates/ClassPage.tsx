import React, { useRef, useLayoutEffect, useState, useContext } from "react";
import Meta from "@/components/Meta";
import {
  Typography,
  Theme,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
} from "@material-ui/core";
import Hero from "@/components/Hero";
import { makeStyles } from "@material-ui/styles";
import ReactDOM from "react-dom";
import Container from "@/components/Container";
import { graphql, Link } from "gatsby";
import { ClassPageQuery } from "@/types/ClassPageQuery";
import StudentGrid from "@/components/StudentGrid";
import { IntlContext } from "@/utils/IntlContext";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles((theme: Theme) => ({
  hero: {
    // From https://www.heropatterns.com/
    backgroundColor: `#1565c0`,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56 28' width='56' height='28'%3E%3Cpath fill='%231976d2' fill-opacity='0.5' d='M56 26v2h-7.75c2.3-1.27 4.94-2 7.75-2zm-26 2a2 2 0 1 0-4 0h-4.09A25.98 25.98 0 0 0 0 16v-2c.67 0 1.34.02 2 .07V14a2 2 0 0 0-2-2v-2a4 4 0 0 1 3.98 3.6 28.09 28.09 0 0 1 2.8-3.86A8 8 0 0 0 0 6V4a9.99 9.99 0 0 1 8.17 4.23c.94-.95 1.96-1.83 3.03-2.63A13.98 13.98 0 0 0 0 0h7.75c2 1.1 3.73 2.63 5.1 4.45 1.12-.72 2.3-1.37 3.53-1.93A20.1 20.1 0 0 0 14.28 0h2.7c.45.56.88 1.14 1.29 1.74 1.3-.48 2.63-.87 4-1.15-.11-.2-.23-.4-.36-.59H26v.07a28.4 28.4 0 0 1 4 0V0h4.09l-.37.59c1.38.28 2.72.67 4.01 1.15.4-.6.84-1.18 1.3-1.74h2.69a20.1 20.1 0 0 0-2.1 2.52c1.23.56 2.41 1.2 3.54 1.93A16.08 16.08 0 0 1 48.25 0H56c-4.58 0-8.65 2.2-11.2 5.6 1.07.8 2.09 1.68 3.03 2.63A9.99 9.99 0 0 1 56 4v2a8 8 0 0 0-6.77 3.74c1.03 1.2 1.97 2.5 2.79 3.86A4 4 0 0 1 56 10v2a2 2 0 0 0-2 2.07 28.4 28.4 0 0 1 2-.07v2c-9.2 0-17.3 4.78-21.91 12H30zM7.75 28H0v-2c2.81 0 5.46.73 7.75 2zM56 20v2c-5.6 0-10.65 2.3-14.28 6h-2.7c4.04-4.89 10.15-8 16.98-8zm-39.03 8h-2.69C10.65 24.3 5.6 22 0 22v-2c6.83 0 12.94 3.11 16.97 8zm15.01-.4a28.09 28.09 0 0 1 2.8-3.86 8 8 0 0 0-13.55 0c1.03 1.2 1.97 2.5 2.79 3.86a4 4 0 0 1 7.96 0zm14.29-11.86c1.3-.48 2.63-.87 4-1.15a25.99 25.99 0 0 0-44.55 0c1.38.28 2.72.67 4.01 1.15a21.98 21.98 0 0 1 36.54 0zm-5.43 2.71c1.13-.72 2.3-1.37 3.54-1.93a19.98 19.98 0 0 0-32.76 0c1.23.56 2.41 1.2 3.54 1.93a15.98 15.98 0 0 1 25.68 0zm-4.67 3.78c.94-.95 1.96-1.83 3.03-2.63a13.98 13.98 0 0 0-22.4 0c1.07.8 2.09 1.68 3.03 2.63a9.99 9.99 0 0 1 16.34 0z'%3E%3C/path%3E%3C/svg%3E")`,
  },
  heroContent: {
    minHeight: theme.spacing(24),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    display: "flex",
    alignItems: "flex-start",
    flexWrap: "wrap-reverse",
    justifyContent: "flex-end",
    alignContent: "flex-start",
  },
  heroTitle: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
  },
  promotionInput: {
    flexShrink: 0,
    marginLeft: theme.spacing(2),
    width: 100,
  },
  selectIcon: {
    color: "inherit",
  },
  content: {
    flex: 1,
    backgroundColor: theme.palette.grey[50],
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default function ClassPage({
  data,
  pageContext,
}: {
  data: ClassPageQuery;
  pageContext: { class: number };
}) {
  const intl = useContext(IntlContext);
  const students = data.allStudent != null ? data.allStudent.edges! : [];

  const styles = useStyles();
  const labelRef = useRef<InputLabel>(null);
  const [labelWidth, setLabelWidth] = useState(0);

  useLayoutEffect(() => {
    setLabelWidth(
      (ReactDOM.findDOMNode(labelRef.current!)! as HTMLElement).offsetWidth,
    );
  });

  return (
    <>
      <Meta
        title={intl.formatMessage(
          { id: "class_meta_title" },
          { class: pageContext.class },
        )}
      />

      <Hero className={styles.hero}>
        <div className={styles.heroContent}>
          <Typography variant="h3" classes={{ root: styles.heroTitle }}>
            <FormattedMessage id="class_title" />
          </Typography>

          <FormControl variant="outlined" className={styles.promotionInput}>
            <InputLabel htmlFor="promotion" ref={labelRef}>
              <FormattedMessage id="class_class" />
            </InputLabel>

            <Select
              value={2020}
              input={<OutlinedInput labelWidth={labelWidth} id="majeure" />}
              disabled={true}
              classes={{ icon: styles.selectIcon }}
            >
              <MenuItem value={2020}>2020</MenuItem>
            </Select>
          </FormControl>
        </div>
      </Hero>

      <div className={styles.content}>
        <Container>
          <StudentGrid
            class={pageContext.class}
            people={students.map(edge => edge!.node!)}
          />
        </Container>
      </div>
    </>
  );
}

export const query = graphql`
  query ClassPageQuery($class: Int!, $locale: String!) {
    allStudent(
      filter: { class: { eq: $class }, locale: { eq: $locale } }
      sort: {
        fields: [frontmatter___lastName, frontmatter___firstName]
        order: [ASC, ASC]
      }
    ) {
      edges {
        node {
          ...StudentFragment
        }
      }
    }
  }
`;
