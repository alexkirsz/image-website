import React from "react";
import { Card, CardActionArea, Typography, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MoreIcon from "@material-ui/icons/MoreHorizTwoTone";
import Link from "@/components/Link";

const useStyles = makeStyles((theme: Theme) => ({
  actionArea: {
    height: "100%",
    cursor: "pointer",
    display: "flex",
  },
  content: {
    flex: 1,
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  head: {
    display: "flex",
    alignItems: "center",
  },
  filler: {
    flexGrow: 1,
    minWidth: theme.spacing(1),
  },
  headSpacer: {
    height: theme.spacing(1),
  },
  pictureContainer: {
    display: "flex",
    flexShrink: 0,
  },
  pictureSpacer: {
    flexShrink: 0,
    width: theme.spacing(2),
    height: theme.spacing(2),
  },
  description: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
  htmlContent: {
    marginTop: "-1em",
    marginBottom: "-1em",
  },
}));

export type PersonCardProps = {
  className?: string;
  href?: string;
  to?: string;
  title?: React.ReactNode;
  picture?: React.ReactNode;
  htmlContent?: string;
  content?: React.ReactNode;
};

export default function PersonCard({
  className,
  href,
  to,
  title,
  picture,
  htmlContent,
  content,
}: PersonCardProps) {
  const styles = useStyles();

  let cardActionAreaProps = null;
  if (href) {
    cardActionAreaProps = { component: "a", href };
  } else if (to) {
    cardActionAreaProps = { component: Link, to };
  }

  const inner = (
    <div className={styles.content}>
      {picture && (
        <>
          <div className={styles.pictureContainer}>{picture}</div>
          <div className={styles.pictureSpacer} />
        </>
      )}

      <div className={styles.description}>
        <div className={styles.head}>
          {title && <Typography variant="h5">{title}</Typography>}

          <div className={styles.filler} />

          {cardActionAreaProps != null && <MoreIcon color="action" />}
        </div>

        <div className={styles.headSpacer} />

        {htmlContent && (
          <Typography
            classes={{ root: styles.htmlContent }}
            // Otherwise the content disappears on refresh.
            component="div"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        )}

        {content && <Typography>{content}</Typography>}
      </div>
    </div>
  );

  return (
    <Card elevation={1} classes={{ root: className }}>
      {cardActionAreaProps != null ? (
        <CardActionArea
          {...cardActionAreaProps as any}
          classes={{ root: styles.actionArea }}
        >
          {inner}
        </CardActionArea>
      ) : (
        inner
      )}
    </Card>
  );
}
