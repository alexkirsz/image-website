import React from "react";
import Image from "gatsby-image";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import classNames from "classnames";

// Accept lenient input since Gatsby returns a very indecisive format. However,
// throw nonetheless when the expected attributes aren't found.
type FixedImage = {
  base64: string | null;
  width: number | null;
  height: number | null;
  src: string | null;
  srcSet: string | null;
};

export type PictureProps = {
  picture: FixedImage;
  className?: string;
};

const useStyles = makeStyles((theme: Theme) => ({
  picture: {
    borderRadius: "100%",
    flexShrink: 0,
    // Fix an issue with border-radius flickering on iOS
    backfaceVisibility: "hidden",
    transform: "translate3d(0, 0, 0)",
    overflow: "hidden",
  },
}));

export default function Picture({ picture, className }: PictureProps) {
  if (picture.width == null || picture.height == null) {
    throw new Error("Invalid picture");
  }

  const styles = useStyles();

  return (
    <Image
      className={classNames(styles.picture, className)}
      style={{ borderRadius: picture.width / 2 }}
      fixed={picture as any}
    />
  );
}
