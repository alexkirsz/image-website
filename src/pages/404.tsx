import React, { useContext } from "react";

import Meta from "@/components/Meta";
import { FormattedMessage } from "react-intl";
import { IntlContext } from "@/utils/IntlContext";
import { Typography, Theme } from "@material-ui/core";
import Hero from "@/components/Hero";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  hero: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default function NotFoundPage() {
  const intl = useContext(IntlContext);
  const styles = useStyles();

  return (
    <>
      <Meta title={intl.formatMessage({ id: "404_meta_title" })} />

      <Hero type="light" className={styles.hero}>
        <Typography variant="h3" gutterBottom>
          <FormattedMessage id="404_title" />
        </Typography>
        <Typography variant="h5">
          <FormattedMessage id="404_subtitle" />
        </Typography>
      </Hero>
    </>
  );
}
